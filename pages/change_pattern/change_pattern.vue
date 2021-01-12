<template>
	<view>
		<set-view :num="num" :Money="23432" :rankNum="784"></set-view>
		<view 
			class="all_center flex_column" 
			style="width: 100%;padding: 0 30rpx;height: 300rpx;">
			<view class="title flex_column all_center">
				<text space="ensp" style="margin-left: -20rpx;">游戏</text>
				<text space="ensp" style="margin-left: -20rpx;">模式</text>
			</view>
			<image 
				src="https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_dian.png?sign=907ce315ed4d486cf6830f7730e7f884&t=1607422996" 
				mode="widthFix" 
				style="width: 22rpx;margin-top: 20rpx;" />
		</view>
		<view class="flex_column" style="width: 100%;padding: 0 140rpx;">
			<text class="but_item all_center" space="ensp" :class="itemIndex == 1 ? 'active':''" @click="changeItem(1)">
				赢一拳为胜
			</text>
			<text class="but_item all_center" space="ensp" :class="itemIndex == 2 ? 'active':''" @click="changeItem(2)">
				赢两拳为胜
			</text>
		</view>
		<view class="flex_row" style="width: 100%; justify-content: space-around;padding: 30rpx;">
			<text class="but_bot all_center" space="emsp" @click="upBut">
				上 一 步
			</text>
			<text class="but_bot all_center" space="emsp" @click="nextBut">
				确  定
			</text>
		</view>
	</view>
</template>

<script>
	import setView from '@/components/set-up-view/set-up-view.vue'
	var setTime;
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
				time:30,
				is_show:1,  //1:邀请好友 2：在线匹配
			}
		},
		
		onLoad(options) {
			let _this = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			let topWidth = 300
			console.log(menuButtonInfo)
			_this.topHeight = menuButtonInfo.top
			_this.topLeft = menuButtonInfo.right * 2
			if( options.is_show ){
				_this.is_show = options.is_show
			}
			uni.connectSocket({
				url: 'wss://renzhan.52xml.cn:2348',
			});
			uni.onSocketOpen(function(res){
				// console.log(JSON.parse(res.data))
				let data = {
					code:'201',
					token:uni.getStorageSync('token'),
					openid:uni.getStorageSync('userInfo').open_id
				}
				uni.sendSocketMessage({
					data: JSON.stringify(data),
					async success(res){
						console.log('发送成功？',res)
					}
				});
			})
			// _this.SocketInit(); 
		},
		
		methods: {
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
				_this.is_show = 1
				_this.time = 30
				clearTimeout(setTime)
				// uni.reLaunch({
				// 	url:'/pages/matching_success/matching_success'
				// })
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
			
			nextBut(){
				let _this = this;
				// if( !uni.getStorageSync('token') || uni.getStorageSync('token') == '' || uni.getStorageSync('token') == 'undefined' ){
				// 	uni.navigateTo({
				// 		url:'/pages/login/login?is_back=true'
				// 	})
				// }else{
				// 	_this.$http.upDateUserInfo({
				// 		token:uni.getStorageSync('token'),
				// 		gender:uni.getStorageSync('gender').gender,
				// 		character:uni.getStorageSync('gender').character
				// 	})
				// 	.then( res => {
				// 		console.log('更新成功====',res)
				// 	})
				// 	.catch( err => {
				// 		console.log('更新失败====',err)
				// 	})
				// }
				if( this.itemIndex == 0 || this.itemIndex == '' ){
					uni.showToast({
						icon:'none',
						title:'请先选择游戏模式！'
					})
					return false
				}
				// uni.navigateTo({
				// 	url:'/pages/confirm_role/confirm_role'
				// })
				
				_this.checkOpenSocket()
			},
			
			checkOpenSocket () {
				let _this = this;
				console.log('===')
				uni.sendSocketMessage({
					data: 'ping',
					 success: (res) => {
						uni.navigateTo({
							url:'/pages/set_up_room/set_up_room?is_show=' + _this.is_show + '&type=' + _this.itemIndex
						})
					},
					fail: (err) => { // 未连接打开websocket连接
					console.log('失败',err)
						_this.SocketInit(); 
					}
				});
			},
			
			SocketInit() { // 打开连接
				let _this = this
				// uni.closeSocket();
				uni.connectSocket({
					url: 'wss://renzhan.52xml.cn:2348',
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
				
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！',res);
				});
			},
			
			sendSocketMessage(msg) {
				let _this = this;
				console.log('是否发送消息到服务器？',JSON.stringify(msg))
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					async success(res){
						console.log('发送成功？',res)
						uni.navigateTo({
							url:'/pages/set_up_room/set_up_room?is_show=' + _this.is_show + '&type=' + _this.itemIndex
						})
					}
				});
			},
			
			begin(){
				let _this = this;
				_this.is_show = 1
				_this.time = 30
				clearTimeout(setTime)
			},
			
			timeProgress(){
				let _this = this;
				if( _this.time >= 1 ){
					setTime = setTimeout(function(){
						_this.time -= 1
						_this.timeProgress()
						// _this.getPeople(_this.time)
					},1000)
				}else{
					_this.begin()
				}
			},
			
			upBut(){
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
</style>
