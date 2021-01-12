<template>
	<view class="conduct_page">
		<view class="top_user">
			<view class="change_gesture_bar_popup">
				<view class="gesture_item_popup" v-for="(item,index) in gestureList" :key="index">
					<image src="/static/ico/bottom_ico.png" class="icon_15" v-show="item.status == 1" />
					<view class="icon_15" v-show="item.status == 0 || item.src === ''"></view>
					<view class="mask" v-show="item.status == 0 || item.src === ''"></view>
					<image class="menu_icon_popup" v-if="item.src === 0" src="/static/game_img/zero_img.png" />
					<image class="menu_icon_popup" v-if="item.src === 1" src="/static/game_img/one_img.png" />
					<image class="menu_icon_popup" v-if="item.src === 2" src="/static/game_img/two_img.png" />
					<image class="menu_icon_popup" v-if="item.src === 3" src="/static/game_img/three_img.png" />
					<image class="menu_icon_popup" v-if="item.src === 4" src="/static/game_img/four_img.png" />
					<image class="menu_icon_popup" v-if="item.src === 5" src="/static/game_img/five_img.png" />
				</view>
			</view>
		</view>
		<view class="info">
			<view class="top_user_av_bar">
				<image :src="userInfo.other_info.avatar_url" style="width: 90rpx;height: 90rpx;margin-top: 6rpx;margin-left: 6rpx;" />
			</view>
			<view class="p1_text">
				{{ p1.title }}
			</view>
			<image src="/static/img/info_0.png" v-if="p1.status === 0" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<image src="/static/img/info_1.png" v-if="p1.status === 1" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<image src="/static/img/info_2.png" v-if="p1.status === 2" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<image src="/static/img/info_3.png" v-if="p1.status === 3" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<image src="/static/img/info_4.png" v-if="p1.status === 4" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<image src="/static/img/info_5.png" v-if="p1.status === 5" style="width: 228rpx;height: 280rpx;" class="p1_info_gesture" />
			<view class="bottom_user_av_bar">
				<image :src="userInfo.me_info.avatar_url" style="width: 90rpx;height: 90rpx;margin-top: 6rpx;margin-left: 6rpx;" />
			</view>
			<view class="p2_text" @click.stop="show">
				{{ p2.title }}
			</view>
			<image src="/static/img/info_0.png" v-if="p2.status === 0" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
			<image src="/static/img/info_1.png" v-if="p2.status === 1" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
			<image src="/static/img/info_2.png" v-if="p2.status === 2" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
			<image src="/static/img/info_3.png" v-if="p2.status === 3" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
			<image src="/static/img/info_4.png" v-if="p2.status === 4" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
			<image src="/static/img/info_5.png" v-if="p2.status === 5" style="width: 228rpx;height: 280rpx;" class="p2_info_gesture" />
		</view>
		<view class="bottom_user">
			<view class="change_gesture_bar">
				<view 
					class="gesture_item" 
					@click.stop="changeItem(index)"
					v-for="(item,index) in changeList" 
					:key="index">
					<view class="mask" style="margin-top: -24rpx !important;" v-show="item.status == 0 || item.src === ''"></view>
					<image class="menu_icon" v-if="item.src === 0" src="/static/game_img/change_zero.png" />
					<image class="menu_icon" v-if="item.src === 1" src="/static/game_img/change_one.png" />
					<image class="menu_icon" v-if="item.src === 2" src="/static/game_img/change_two.png" />
					<image class="menu_icon" v-if="item.src === 3" src="/static/game_img/change_three.png" />
					<image class="menu_icon" v-if="item.src === 4" src="/static/game_img/change_four.png" />
					<image class="menu_icon" v-if="item.src === 5" src="/static/game_img/change_five.png" />
					<text class="font_16" style="color: #000000;" v-show="item.title != ''">{{ titleList[item.title] }}</text>
				</view>
			</view>
		</view>
	
		<uni-popup ref="success" type="center" :maskClick="false">
			<view class="flex_column" style="align-items: center;width: 100%;position: relative;">
				<!-- 胜利 -->
				<view class="flex_column popup_bar" v-if="is_success === 1">
					<view class="popup_info">
						<view class="flex_row" style="width: 100%;justify-content: flex-end;" @click.stop="close">
							<image src="/static/ico/close_ico.png" style="width: 60rpx;" mode="widthFix"></image>
						</view>
						<view class="flex_column all_center" style="width: 100%;height: auto;margin: 30rpx;">
							<text style="font-size: 160rpx;">胜利</text>
							<text space="emsp" class="font_13">—————— 本局奖励 ——————</text>
						</view>
						<view class="flex_column all_center" style="width: 100%; height: 200rpx;">
							<image src="/static/ico/my_money_ico.png" style="width: 42rpx;height: 46rpx;" />
							<text class="font_22">300</text>
						</view>
					</view>
				</view>
				<!-- 平局 -->
				<view class="flex_column popup_bar" v-if="is_success === 2">
					<view class="popup_info">
						<view class="flex_row" style="width: 100%;justify-content: flex-end;" @click.stop="close">
							<image src="/static/ico/close_ico.png" style="width: 60rpx;" mode="widthFix"></image>
						</view>
						<view class="flex_column all_center" style="width: 100%;height: auto;margin: 30rpx;">
							<text style="font-size: 160rpx;">平局</text>
							<text space="emsp" class="font_13">—————— 本局奖励 ——————</text>
						</view>
						<view class="flex_column all_center" style="width: 100%; height: 200rpx;">
							<image src="/static/ico/my_money_ico.png" style="width: 42rpx;height: 46rpx;" />
							<text class="font_22">200</text>
						</view>
					</view>
				</view>
				<!-- 失败 -->
				<view class="flex_column popup_bar" v-if="is_success === 3">
					<view class="popup_info">
						<view class="flex_row" style="width: 100%;justify-content: flex-end;" @click.stop="close">
							<image src="/static/ico/close_ico.png" style="width: 60rpx;" mode="widthFix"></image>
						</view>
						<view class="flex_column all_center" style="width: 100%;height: auto;margin: 30rpx;">
							<text style="font-size: 160rpx;">失败</text>
						</view>
					</view>
				</view>
				<view class="flex_column" style="width: 100%;padding: 0 140rpx;position: relative;">
					<text class="but_item all_center" space="ensp" @click.stop="toAgin">
						再 来 一 次
					</text>
					<view class="but_item all_center" style="position: relative;" v-if="is_success != 3">
						分 享 结 果
						<button open-type="share" style="width: 100%;height: 100%;opacity: 0;position: absolute;" ></button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	var interval;
	export default {
		components:{
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				meWin:0,//自己赢
				otherWin:0,//对方赢
				resNum:0,
				is_success:0,
				room_id:'',
				p1Index:0,
				p2Index:0,
				
				userInfo:{},
				
				titleList:['零坨坨','一心敬','两兄弟','三星照','四喜财','五魁首','六六顺','七巧板','八仙过','酒在手','满十在'],
				
				gestureList:[],	//对方
				changeList:[],  //自己
				
				//对方
				p1:{
					status:'',
					title:''
				},
				
				//自己
				p2:{
					status:'',
					title:'',
				},
				meId:0,
				otherId:0,
			}
		},
		
		watch:{
			is_success(){
				let _this = this;
				clearInterval(interval)
				_this.$refs.success.open()
			},
			otherWin(){
				let _this = this;
				console.log('otherWin对方胜利拳数===',_this.otherWin)
				console.log('otherWin我胜利拳数===',_this.meWin)
				console.log('otherWin胜利规则===',Number(uni.getStorageSync('gameType')))
				if( _this.otherWin === Number(uni.getStorageSync('gameType')) ){
					_this.is_success = 3
					return false
				}
				if ( _this.meWin === Number(uni.getStorageSync('gameType')) ){
					_this.is_success = 1
					return false
				} 
				if( _this.resNum === 9 && _this.meWin !== Number(uni.getStorageSync('gameType')) && _this.otherWin !== Number(uni.getStorageSync('gameType')) ) {
					_this.is_success = 2
					return false
				}
			},
			meWin(){
				let _this = this;
				console.log('meWin对方胜利拳数===',_this.otherWin)
				console.log('meWin我胜利拳数===',_this.meWin)
				console.log('meWin胜利规则===',Number(uni.getStorageSync('gameType')))
				if( _this.otherWin === Number(uni.getStorageSync('gameType')) ){
					_this.is_success = 3
					return false
				} 
				if ( _this.meWin === Number(uni.getStorageSync('gameType')) ){
					_this.is_success = 1
					return false
				} 
				if( _this.resNum === 9 && _this.meWin !== Number(uni.getStorageSync('gameType')) && _this.otherWin !== Number(uni.getStorageSync('gameType')) ) {
					_this.is_success = 2
					return false
				}
			},
		},
		
		onShareAppMessage() {
			let _this = this;
			return {
				title: '又赢了~无敌是多么寂寞',
				path: '/pages/home/home',
				// title: '快来跟我一起划酒拳~room_id=109',
				// path: '/pages/add_room/add_room?room_id=109',
			}
		},
		
		onLoad(options) {
			const info = JSON.parse(options.info)
			const userInfo = JSON.parse(options.userInfo)
			console.log('game_conduct',info)
			this.userInfo = userInfo
			console.log(info)
			let _this = this;
			_this.room_id = JSON.parse(options.room_id)
			let p1 = []
			let p2 = []
			let r_user_han = info.r_user_han.split(',')
			let r_user_res = info.r_user_res.split(',')
			let user_han = info.user_han.split(',')
			let user_res = info.user_res.split(',')
			r_user_han.forEach( item => {
			 let	p1_item = {
					"title":item == 'null' ? '':item,
				}
				p1.push(p1_item)
			})
			r_user_res.forEach( (item,index) => {
				p1[index].src = item == 'null' ? '': Number(item)
			})
			user_han.forEach( item => {
			let	p2_item = {
					"title":item == 'null' ? '':item
				}
				p2.push(p2_item)
			})
			user_res.forEach( (item,index) => {
				p2[index].src = item == 'null' ? '': Number(item)
			})
			console.log('被邀请人数组==',p1)
			console.log('自己数组==',p2)
			if( Number(info.user_id) === Number(uni.getStorageSync('userInfo').id) ){
				_this.changeList = p2
				_this.gestureList = p1
				_this.meId = Number(info.user_id)
				_this.otherId = Number(info.r_user_id)
			}else{
				_this.meId = Number(info.r_user_id)
				_this.otherId = Number(info.user_id)
				_this.changeList = p1
				_this.gestureList = p2
			}
			let dataInfo = {
				"code":'216',
				"room_id":_this.room_id,
				// "user_h":p2Item.user_h,
				// "user_l":p2Item.user_l,
				// "r_user_h":p1Item.r_user_h,
				// "r_user_l":p1Item.r_user_l,
			}
			console.log('是否发送游戏数据到服务器？',JSON.stringify(dataInfo))
			console.log('当前游戏规则？1：赢一拳 2：赢两拳',uni.getStorageSync('gameType'))
			uni.sendSocketMessage({
				data: JSON.stringify(dataInfo),
				async success(res){
					console.log('发送成功？',res)
				}
			});
			
			_this.onSocketMessage(); // 打开成功监听服务器返回的消息
			interval = setInterval(function(){
				_this.gameStar()
			},3000)
		},
		
		methods: {
			gameStar(){
				let _this = this;
				var p1Item;
				var p2Item;
				if( _this.resNum <= 9 ){
					// console.log('当前下标===',_this.p1Index)
					// console.log('当前下标+++',_this.gestureList[_this.p1Index])
					// console.log('当前下标===',_this.p2Index)
					// console.log('当前下标+++',_this.changeList[_this.p2Index])
					if( _this.gestureList[_this.p1Index].src !== '' && _this.titleList[_this.gestureList[_this.p1Index].title] !== '' ){
						p1Item = {
							status:Number(_this.gestureList[_this.p1Index].src),
							title:_this.titleList[_this.gestureList[_this.p1Index].title],
							r_user_h:_this.gestureList[_this.p1Index].title,
							r_user_l:Number(_this.gestureList[_this.p1Index].src),
						}
						_this.gestureList[_this.p1Index].status = 0
						// if( _this.gestureList[_this.p1Index + 1].src !== '' && _this.titleList[_this.gestureList[_this.p1Index + 1].title] !== '' ){
						// 	_this.gestureList[_this.p1Index + 1].status = 1
						// }
					}else{
						p1Item = {
							status:'',
							title:'未出拳',
							r_user_h:'',
							r_user_l:'',
						}
						_this.is_success = 1
					}
					_this.p1 = p1Item
					_this.p1Index += 1
					if( _this.changeList[_this.p2Index].src !== '' && _this.titleList[_this.changeList[_this.p2Index].title] !== '' ){
						p2Item = {
							status:Number(_this.changeList[_this.p2Index].src),
							title:_this.titleList[_this.changeList[_this.p2Index].title],
							user_h:_this.changeList[_this.p2Index].title,
							user_l:Number(_this.changeList[_this.p2Index].src)
						}
						_this.changeList[_this.p2Index].status = 0
						// if( _this.changeList[_this.p2Index + 1].src !== '' && _this.titleList[_this.changeList[_this.p2Index + 1].title] !== '' ){
						// 	_this.changeList[_this.p2Index + 1].status = 1
						// }
					}else{
						p2Item = {
							status:'',
							title:'未出拳',
							user_h:'',
							user_l:'',
						}
						_this.is_success = 3
					}
					_this.p2 = p2Item
					_this.p2Index += 1
					_this.resNum += 1
					
					const num = Number(p2Item.user_l) +  Number(p1Item.r_user_l)
					if( (num === Number(p2Item.user_h)) && (num !== Number(p1Item.r_user_h)) ){
						_this.meWin += 1
					}
					if( (num === Number(p1Item.r_user_h)) && (num !== Number(p2Item.user_h)) ){
						_this.otherWin += 1
					}
					
					// let data = {
					// 	"code":'217',
					// 	"room_id":_this.room_id,
					// 	"user_h":p2Item.user_h,
					// 	"user_l":p2Item.user_l,
					// 	"r_user_h":p1Item.r_user_h,
					// 	"r_user_l":p1Item.r_user_l,
					// }
					// console.log('是否发送游戏数据到服务器？',JSON.stringify(data))
					// // console.log('是否发送游戏数据到服务器？',_this.room_id)
					// uni.sendSocketMessage({
					// 	data: JSON.stringify(data),
					// 	async success(res){
					// 		console.log('发送成功？',res)
					// 	}
					// });
				}else{
					clearInterval(interval)
				}
			},
			
			show(){
				this.$refs.success.open()
			},
			close(){
				this.$refs.success.close()
				uni.reLaunch({
					url:'/pages/home/home'
				})
			},
			
			toAgin(){
				uni.reLaunch({
					url:'/pages/home/home'
				})
			},
			
			onSocketMessage(){
				let _this = this;
				uni.onSocketMessage((res) => {
					console.log('接受游戏结果',JSON.parse(res.data))
					// let info = JSON.parse(res.data)
					// console.log(info)
				});
			},
		}
	}
</script>

<style>
	.conduct_page{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.top_user{
		background-color: #c8c9ca;
		width: 100%;
		height: 27%;
		border-radius: 0 0 40rpx 40rpx;
		position: absolute;
	}
	
	.change_gesture_bar_popup{
		width: 100%;
		padding: 0 30rpx;
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
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-right: 20rpx;
	}
	
	.menu_icon_popup{
		width: 100rpx;
		height: 100rpx;
	}
	
	.mask{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: #0000007F;
	}
	
	.info{
		width: 100%;
		height: 43%;
		position: absolute;
		top: 27%;
		margin: auto 0;
		padding: 30rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/game_info_bg.png?sign=664a16680842186ded580268f7007caf&t=1607857717');
		background-size: calc(100% - 60rpx) calc(100% - 60rpx);
		background-position: center center;
		background-repeat: no-repeat;
	}
	
	.top_user_av_bar{
		width: 120rpx;
		height: 120rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/top_av_bg.png?sign=cf5388e4971d88c6f74897d658033366&t=1607858197');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center center;
		position: absolute;
		right: 50rpx;
		top: -10rpx;
	}
	
	.p1_text{
		position: absolute;
		right: 180rpx;
		top: 110rpx;
		transform: rotateZ(-35deg);
		font-size: 32rpx;
		color: #EECC9B;
	}
	
	.p1_info_gesture{
		position: absolute;
		left: 100rpx;
		top: -20rpx;
		z-index: 99;
		transform: rotateZ(-110deg);
	}
	
	.bottom_user_av_bar{
		width: 120rpx;
		height: 120rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/av_bg.png?sign=d169e27a06ff4b3319c57a4620bf7e3e&t=1607859716');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center center;
		position: absolute;
		left: 50rpx;
		bottom: -10rpx;
	}
	
	.p2_text{
		position: absolute;
		left: 180rpx;
		bottom: 130rpx;
		transform: rotateZ(-35deg);
		font-size: 32rpx;
		color: #EECC9B;
	}
	
	.p2_info_gesture{
		position: absolute;
		right: 134rpx;
		bottom: -20rpx;
		z-index: 99;
		transform: rotateZ(-15deg);
	}
	
	.bottom_user{
		width: 100%;
		height: 30%;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #EECC9B;
		position: absolute;
		bottom: 0;
	}
	
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
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-right: 22rpx;
	}
	
	.menu_icon{
		width: 100rpx;
		height: 100rpx;
	}

	.popup_bar{
		align-items: center;
		width: 550rpx;
		margin: 0 auto;
	}
	
	.popup_info{
		width: 100%;
		height: 640rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/popup_bg.png?sign=b324d727174e1f10f8ac3f560f9d9d32&t=1607860934');
		background-size: 100% 100%;
		background-position: center center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50rpx;
		color: #000000;
	}

	.but_item{
			background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_but.png?sign=335ab5312e594fc6d1f74708a7750f32&t=1607417639');
			background-size: 100% 114rpx;
			background-repeat: no-repeat;
			background-position: center 30rpx;
			width: 270rpx;
			height: 140rpx;
			font-size: 40rpx;
			margin: 30rpx 0;
			color: #FFFFFF;
		}
</style>
