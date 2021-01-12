<template>
	<view>
		<set-view :num="num" :Money="23432" :rankNum="784"></set-view>
		<view class="all_center" style="width: 100%;margin: 20rpx;">
			<view class="row_center white_font" style="margin: 0 auto;font-size: 56rpx;">
				<text>游戏开始（</text>
				<text class="yellow_font">{{ time }}</text>
				<text>S)</text>
			</view>
		</view>
		<view class="change_gesture_bar">
			<view 
				class="gesture_item" 
				@click.stop="changeItem(i)"
				v-for="(item,i) in changeList" 
				:key="i">
				<image class="menu_icon" :src="item.src"></image>
				<text class="font_16 yellow_font" v-show="item.title != ''">{{ item.title }}</text>
			</view>
		</view>
		
		<text class="but_bot all_center" style="margin: 30rpx auto;" space="emsp" @click="sumbit">
			确  定
		</text>
		
		<uni-popup ref="gesture" type="bottom" :maskClick="false">
			<view style="width: 100%;height: 200rpx;padding: 30rpx;border-radius: 40rpx 40rpx 0 0;background-color: #EECC9B;">
				<view class="change_gesture_bar_popup">
					<view class="gesture_item_popup" v-for="(item,idx) in gestureList" :key="idx" @click.stop="changeGesture(idx)">
						<image class="menu_icon_popup" :src="item"></image>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="title" type="bottom" :maskClick="false">
			<view style="width: 100%;;padding: 30rpx;border-radius: 40rpx 40rpx 0 0;background-color: #EECC9B;">
				<scroll-view :scroll-x="true" class="title_bar" >
					<view 
						class="title_items" 
						v-for="(item,indx) in titleList" 
						:key="indx" 
						@click.stop="changeTitle(indx,item)" 
						v-if=" gestureIndex + 5 >= indx && indx  >= gestureIndex">
						<view class="all_center title_item">
							<view class="info">{{ item }}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import setView from '@/components/set-up-view/set-up-view.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	var setTime;
	export default {
		components:{
			setView,
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				room_id:0,			//房间ID
				
				userInfo:'',
				
				time:60,
				index:0,  //当前点击的选择下标
				gestureIndex:'',
				gestureList:[
					'/static/game_img/zero_img.png',
					'/static/game_img/one_img.png',
					'/static/game_img/two_img.png',
					'/static/game_img/three_img.png',
					'/static/game_img/four_img.png',
					'/static/game_img/five_img.png',
				],
				titleList:['零坨坨','一心敬','两兄弟','三星照','四喜财','五魁首','六六顺','七巧板','八仙过','酒在手','满十在'],
				
				changeList:[
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
					{
						"src":'/static/game_img/change_img.png',
						"title":"",
					},
				],
				
				sumbitList:[
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
					{
						punches:'',
						user_han:'',
					},
				],
			}
		},
		
		watch:{
			time(){
				let _this = this;
				if( _this.time === 50 ){
					_this.sumbit()
				}
			}
		},
		
		onLoad(options) {
			let _this = this;
			_this.timeProgress()
			console.log(options)
			if( options.room_id && options.room_id != 0 ){
				_this.room_id = options.room_id
			}
			if( options.userInfo ){
				_this.userInfo = options.userInfo
			}
			
			this.onSocketMessage()
		},
		
		methods: {
			sumbit(){
				let _this = this;
				let punches = [];
				let user_han = [];
				// _this.begin()
				_this.sumbitList.forEach( item => {
					if( item.punches === '' ){
						item.punches = 'null'
					}
					if( item.user_han === '' ){
						item.user_han = 'null'
					}
					punches.push(item.punches)
					user_han.push(item.user_han)
				})
				let data = {
					"code":'212',
					"room_id":_this.room_id,
					"punches":punches.join(','),
					"user_han":user_han.join(','),
				}
				console.log('是否发送游戏数据到服务器？',JSON.stringify(data))
				uni.sendSocketMessage({
					data: JSON.stringify(data),
					async success(res){
						console.log('发送成功？',res)
					}
				});
					
					// uni.reLaunch({
					// 	url:'/pages/game_conduct/game_conduct'
					// })
			},
			
			onSocketMessage(){
				let _this = this;
				uni.onSocketMessage((res) => {
					console.log('接受服务器消息',JSON.parse(res.data))
					let info = JSON.parse(res.data)
					console.log(info)
					if( info.code == 200 && info.data != '' ){
						if( info.msg == '等待对方出拳中！' ){
							uni.showLoading({
								title:'等待对方出拳中！'
							})
						}else if( info.msg == 'ok!' ){
							uni.hideLoading()
							uni.showToast({
								icon:'none',
								title:'开始比赛！'
							})
							console.log('game_ready',_this.userInfo)
							uni.redirectTo({
								url:'/pages/game_conduct/game_conduct?info=' + JSON.stringify(info.data) + '&userInfo=' + _this.userInfo +'&room_id=' + _this.room_id
							})
						}
					}
				});
			},
			
			timeProgress(){
				let _this = this;
				if( _this.time >= 1 ){
					setTime = setTimeout(function(){
						_this.time -= 1
						_this.timeProgress()
					},1000)
				}else{
					_this.begin()
				}
			},
			
			begin(){
				let _this = this;
				_this.time = 60
				clearTimeout(setTime)
			},
			
			changeItem(val){
				if( val > 0 && (!this.changeList[val - 1].title || this.changeList[val - 1].title == '') ){
					uni.showToast({
						icon:'none',
						title:'请按顺序出拳！'
					})
					return false
				}
				this.index = val
				this.$refs.gesture.open()
			},
			
			changeGesture(idx){
				let _this = this;
				_this.gestureIndex = Number(idx)
				_this.$refs.gesture.close()
				_this.$refs.title.open()
				var src;
				if( idx == 0 ){
					src = '/static/game_img/change_zero.png'
				}
				if( idx == 1 ){
					src = '/static/game_img/change_one.png'
				}
				if( idx == 2 ){
					src = '/static/game_img/change_two.png'
				}
				if( idx == 3 ){
					src = '/static/game_img/change_three.png'
				}
				if( idx == 4 ){
					src = '/static/game_img/change_four.png'
				}
				if( idx == 5 ){
					src = '/static/game_img/change_five.png'
				}
				
				_this.changeList[_this.index].src = src
				_this.changeList[_this.index].index = idx
				_this.sumbitList[_this.index].punches = idx
				_this.$forceUpdate()
			},
			
			changeTitle(idx,info){
				let _this = this;
				_this.changeList[_this.index].title = info
				_this.sumbitList[_this.index].user_han = idx
				_this.$refs.title.close()
			},
		}
	}
</script>

<style>
	
	.change_gesture_bar{
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		white-space: inherit;
		align-items: center;
	}
	
	.gesture_item:nth-child(5n){
		margin-right: 0;
	}
	
	.gesture_item {
		width: 120rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin: 10px 0;
		margin-right: 22rpx;
	}
	
	.menu_icon{
		width: 120rpx;
		height: 120rpx;
	}


	.change_gesture_bar_popup{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		white-space: inherit;
		align-items: center;
		justify-content: space-between;
	}
	
	.gesture_item_popup:nth-child(5n){
		margin-right: 0;
	}
	
	.gesture_item_popup {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin: 10px 0;
	}
	
	.menu_icon_popup{
		width: 100rpx;
		height: 100rpx;
	}
	
	.title_bar{
		width: 100%;
		height: 380rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		white-space: nowrap;
	}
	
	.title_items{
		height: 100%;
		width: 108rpx;
		display: inline-block;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/game_bg.png?sign=fdda170fe31926f183a96be9991aa0fe&t=1607840426');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center; 
		margin-right: 20rpx;
	}
	
	.title_item{
		height: 100%;
		width: 108rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		word-break: break-all;
	}
	.title_item .info{
		width: 50%;
		font-size: 50rpx;
		color: #000000;
		word-break: break-all;
		white-space:pre-wrap !important;
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
</style>
