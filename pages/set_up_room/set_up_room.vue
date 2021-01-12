<template>
	<view>
		<set-view :num="num" :Money="23432" :rankNum="784"></set-view>
		<view class="flex_column progress_bar">
			<view class="row_center" style="width: 100%;">
				<view :style="'height:60rpx;width:calc( 100% - '+ getTime() +' - 40rpx);'"></view>
				<view class="flex_column pointer">
					<image src="/static/img/progress_tag.png" style="width: 78rpx;height: 100rpx;" />
					<image src="../../static/ico/bottom_ico.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
			<view class="flex_column all_center" style="width: 100%;">
				<image src="/static/img/progress_img.png" style="width: 100%;" mode="widthFix" />
				<text class="font_16 white_font" style="margin-top: 10rpx;" v-if="is_show == 2">等待加入（{{ time }}S）</text>
			</view>
		</view>
		<view class="font_20 yellow_font" style="width: 100%;text-align: center;" @click="begin">重新开始</view>
		
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="guiz_info flex_column" style="align-items: center;">
				<image src="/static/img/right_top_img.png" mode="widthFix" class="top_right_img" />
				<view class="flex_row" style="width: 100%;justify-content: flex-end;margin-top: 40rpx;height: 76rpx;">
					<text style="font-size: 50rpx;flex-grow: 1;text-align: center;margin-left: 80rpx;">温馨提示</text>
					<image src="../../static/ico/close_ico.png" mode="widthFix" style="width: 80rpx;margin-right: 20rpx;z-index: 99;" @click.stop="close"></image>
				</view>
				<text>是否确认邀请好友进行游戏？</text>
				<view class="flex_row" style="width: 90%; justify-content: space-between;margin: 30rpx 0;">
					<view class="but_bot_popup all_center" @click.stop="begin">
						取 消
					</view>
					<view class="but_bot_popup all_center" style="position: relative;" >
						确  定
						<button open-type="share" style="width: 100%;height: 100%;opacity: 0;position: absolute;" ></button>
					</view>
				</view>
				<image src="/static/img/left_bottom_img2.png" mode="widthFix" class="bottom_right_img" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import setView from '@/components/set-up-view/set-up-view.vue'
	var setTime;
	var setMessage;
	export default {
		components:{
			setView,
		},
		data() {
			return {
				topHeight:56,
				topLeft:15,
				topWidth:300,
				num:23849839,
				info:'',
				
				itemIndex:0,
				time:0,
				is_show:1,  //1:邀请好友 2：在线匹配
				type:0,  //1:赢一拳 2：赢二拳
				
				timeout: 60000, // 1分钟
				timeoutObj: null,
				
				timeNum:1,
				room_id:0,
			}
		},
		
		onLoad(options) {
			let _this = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			let topWidth = 300
			if( options.type ){
				_this.type = options.type
			}
			// console.log(menuButtonInfo)
			_this.topHeight = menuButtonInfo.top
			_this.topLeft = menuButtonInfo.right * 2
			 _this.SocketInit();
			if( options.is_show == 2 ){
				_this.is_show = 2
				_this.getZaiXian()
				_this.timeProgress()
			}else{
				_this.getSocketMsg()
				setTimeout(function(){
					_this.$refs.popup.open()
				},500)
			}

			// this.checkOpenSocket();
		},
		
		
		onShareAppMessage() {
			let _this = this;
			
			// console.log(_this.room_id)
			return {
				title: '快来跟我一起划酒拳~room_id='+ _this.room_id ,
				path: '/pages/add_room/add_room?room_id=' + _this.room_id,
				// title: '快来跟我一起划酒拳~room_id=109',
				// path: '/pages/add_room/add_room?room_id=109',
			}
		},
		
		onShow() {
			 // this.checkOpenSocket(); 
		},
		
		onUnload() {
			// uni.closeSocket()
		},
		
		methods: {
			
			getRoom(){
				this.getSocketMsg()
			},
			close(){
				this.$refs.popup.close()
				this.begin()
			},
			checkOpenSocket () {
				let _this = this;
				uni.sendSocketMessage({
					data: 'ping',
					 success: (res) => {
						return 
					},
					fail: (err) => { // 未连接打开websocket连接
						_this.SocketInit(); 
					}
				});
			},
			
			async SocketInit() { // 打开连接
				let _this = this
				// uni.closeSocket();
				uni.connectSocket({
					url: 'wss://renzhan.52xml.cn:2348',
				});
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！',res);
				});
				uni.onSocketOpen(function(res){
					// console.log(JSON.parse(res.data))
					let data = {
						code:'201',
						token:uni.getStorageSync('token'),
						openid:uni.getStorageSync('userInfo').open_id
					}
					_this.sendSocketMessage(data) //绑定服务器
				})
				_this.onSocketMessage(); // 打开成功监听服务器返回的消息
			},
			
			sendSocketMessage(msg) {
				let _this = this;
				console.log('是否发送消息到服务器？',JSON.stringify(msg))
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					async success(res){
						console.log('发送成功？',res)
					}
				});
			},
			
			//在线匹配
			getZaiXian(){
				let _this = this;
				let data = {
						"code":'213',
						"type":_this.type,  //一拳两拳
					}
				_this.sendSocketMessage(data)
			},
			
			// 获取房间号
			getSocketMsg() { // 监听到服务器消息
				let _this = this
				let data = {
						"code":'210',
						"type":_this.type,  //一拳两拳
						"is_matching":_this.is_show  //邀请好友 在线匹配
					}
				_this.sendSocketMessage(data)
			},
			
			onSocketMessage(){
				let _this = this;
				uni.onSocketMessage((res) => {
					console.log('接受服务器消息',res.data)
					if( res.type ){
						return false
					}
					console.log('接受服务器消息',JSON.parse(res.data))
					let info = JSON.parse(res.data)
					if( JSON.stringify(info).indexOf('你的id为') !== -1 && _this.room_id == 0 && _this.is_show == 1){
						_this.getSocketMsg()
					}
					if( info.code == 200 && _this.is_show == 1 && _this.room_id == 0 ){
						_this.room_id = info.msg
					}
					if( info.code == 200 && info.msg == 'ok' && _this.room_id != 0 && info.data && info.data != '' ){
						uni.redirectTo({
							url:'/pages/matching_success/matching_success?info=' + JSON.stringify(info.data) + '&room_id=' + _this.room_id
						})
						uni.setStorageSync('gameType',this.type)
					}
					if( info.code == 215 && info.msg == '匹配成功！'  ){
						uni.redirectTo({
							url:'/pages/matching_success/matching_success?info=' + JSON.stringify(info.other) + '&room_id=' + info.data
						})
						uni.setStorageSync('gameType',this.type)
					}
					this.reset();
				});
			},
			
			// 检测心跳reset
			reset () {
				clearInterval(this.timeoutObj);
				this.start(); // 启动心跳
			},
			// 启动心跳 start 
			start () {
				let self = this;
				self.timeoutObj = setInterval(function(){
					uni.sendSocketMessage({
						data: 'ping',
						 success: (res) => {
							console.log('连接中....');
						},
						fail: (err) => {
							console.log('连接失败重新连接....');
							self.SocketInit();
						}
					});
				}, this.timeout);
			},
			
			getTime(){
				let _this = this;
				let num = parseFloat( 30 - _this.time);
				let total = parseFloat(30);
				if (isNaN(num) || isNaN(total)) {
						return "-";
				}
				let time = total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%"
				if( _this.time > 27 ){
					return '40rpx'
				}else{
					return time
				}
				_this.$forceUpdate()
			},
			
			getPeople(time){
				let _this = this;
				// if( time == 25 ){
					_this.is_show = 1
					_this.time = 30
					clearTimeout(setTime)
					// uni.reLaunch({
					// 	url:'/pages/matching_success/matching_success'
					// })
				// }
			},
			
			getNumber(num){
				let _this = this;
				console.log(_this.$utils.get_number_txt(num))
				return _this.$utils.get_number_txt(num)
			},
			
			changeItem(val){
				let _this = this;
				this.itemIndex = val
			},
			
			
			begin(){
				let _this = this;
				_this.time = 0
				clearTimeout(setTime)
				_this.upBut()
			},
			
			timeProgress(){
				let _this = this;
				if( _this.time >= 0 ){
					setTime = setTimeout(function(){
						_this.time += 1
						_this.timeProgress()
						// _this.getPeople(_this.time)
					},1000)
				}else{
					_this.begin()
				}
			},
			
			upBut(){
				let info = {
					"code":'214'
				}
				this.sendSocketMessage(info)
				uni.navigateBack({})
				
			},
		}
	}
</script>

<style>
	.user_bar{
		/* position: absolute; */
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/user_bg.png?sign=3a5168d092368341224731c09c2b589e&t=1607420608');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center; 
		width: 278rpx;
		height: 116rpx;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
	}
	
	.user_bar image{
		width: 90rpx;
		height: 90rpx;
		margin-left: 6rpx;
		margin-top: 6rpx;
	}
	
	.userName{
		max-width: 160rpx;
		text-align: center;
		color: #000000;
		font-size: 36rpx;
		margin: 0 6rpx;
	}
	
	.gold_bar{
		width: 216rpx;
		height: 100%;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/gold_bar_bg.png?sign=c1812f80d5ae79222cf9987466c8c963&t=1607421994');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center; 
	}
	
	.title{
		width: 180rpx;
		height: 174rpx;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/character_img_gb.png?sign=27490b5490c308f15710d56760c6d68e&t=1607416783');
		background-size: 190rpx 180rpx;
		overflow: visible;
		background-position: center center;
		background-repeat: no-repeat;
		color: #000000;
		font-size: 62rpx;
	}
	
	.title text{
		margin-top: -20rpx;
	}
	
	.but_item{
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_but.png?sign=335ab5312e594fc6d1f74708a7750f32&t=1607417639');
		background-size: 100% 114rpx;
		background-repeat: no-repeat;
		background-position: center 30rpx;
		width: 100%;
		height: 140rpx;
		font-size: 46rpx;
		margin: 30rpx 0;
		color: #FFFFFF;
	}
	
	.active{
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_but_change.png?sign=d9d5fccd29be5eb19b4f55f84e63ec7f&t=1607417656') !important;
		color: #EECC9B !important;
	}
	
	.but_bot{
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/but_ico.png?sign=21f4cba3321163a14f6f16790f32c34b&t=1607358598');
		background-size: 100% 114rpx;
		background-repeat: no-repeat;
		background-position: center 30rpx;
		width: 316rpx;
		height: 150rpx;
		font-size: 40rpx;
		margin: 50rpx auto;
	}
	
	.progress_bar{
		width: 100%;
		padding: 80rpx;
		margin: 150rpx 0;
		align-items: flex-start;
	}
	
	.pointer{
		width: 80rpx;
		height: 160rpx;
		align-items: center;
		justify-content: space-around;
	}
	
	.guiz_info{
		background-color: #EECC9B;
		width: 620rpx;
		height: 400rpx;
		margin: 0 auto;
		position: relative;
		padding: 30rpx;
		color: #000000;
	}
	
	.top_right_img{
		position: absolute;
		right: 0;
		width: 186rpx;
	}
	
	.bottom_right_img{
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 186rpx;
	}
	
	.but_bot_popup{
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/but_ico.png?sign=21f4cba3321163a14f6f16790f32c34b&t=1607358598');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center 0;
		width: 48%;
		height: 90rpx;
		font-size: 28rpx;
	}
</style>
