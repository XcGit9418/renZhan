<template>
	<view>
		<view :style="'height:' + topHeight +'px;margin-left:calc( 100% - '+ topLeft +'rpx);'"></view>
		<view class="user_bar" style="margin-left: 30rpx;">
			<image :src="other_info.avatar_url"></image>
			<view class="omit userName">{{ other_info.nick_name }}</view>
		</view>
		<view style="width: 278rpx;height: 116rpx;"></view>
		
		<view class="img_bar">
			<image src="/static/img/pk_1.png" class="pk1" mode="widthFix"/>
			<image src="/static/img/pk.png" class="pk" />
			<image src="/static/img/pk_2.png" class="pk2" />
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: flex-end;">
			<view class="bottom_user_bar" style="margin-right: 30rpx;">
				<view class="omit userName">{{ me_info.nick_name }}</view>
				<image :src="me_info.avatar_url"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topHeight:56,
				topLeft:15,
				
				info:'',
				room_id:0,
				
				me_info:{
					"nick_name":'',
					"avatar_url":''
				},
				other_info:{
					"nick_name":'',
					"avatar_url":''
				},
			}
		},
		
		onLoad(options) {
			let _this = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			_this.topHeight = menuButtonInfo.top
			_this.topLeft = (menuButtonInfo.left + menuButtonInfo.width) * 2
			_this.info = JSON.parse(options.info)
			console.log('匹配成功用户信息',_this.info)
			if( Number(_this.info.user_id) === Number(uni.getStorageSync('userInfo').id) ){
				_this.me_info = {
					"nick_name":_this.info.nick_name,
					"avatar_url":_this.info.avatar_url
				}
				_this.other_info = {
					"nick_name":_this.info.r_nick_name,
					"avatar_url":_this.info.r_avatar_url
				}
			}else{
				_this.other_info = {
					"nick_name":_this.info.nick_name,
					"avatar_url":_this.info.avatar_url
				}
				_this.me_info = {
					"nick_name":_this.info.r_nick_name,
					"avatar_url":_this.info.r_avatar_url
				}
			}
				
			
			_this.room_id = options.room_id
			_this.getReady()
		},
		
		methods: {
			getReady(){
				let _this = this
				const info = {
					me_info:_this.me_info,
					other_info:_this.other_info,
				}
				setTimeout(function(){
					uni.reLaunch({
						url:'/pages/game_ready/game_ready?room_id=' + _this.room_id +'&userInfo=' + JSON.stringify(info)
					})
				},5000)
			},
		}
	}
</script>

<style>
	.top_sol{
		position: fixed;
		z-index: 999;
		background-color: #000000;
		width: 100%;
		top: 0;
	}
	
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
	
	.user_bar .userName{
		max-width: 160rpx;
		text-align: center;
		color: #000000;
		font-size: 36rpx;
		margin: 0 6rpx;
	}
	
	.bottom_user_bar{
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/right_bottom.png?sign=8b523db7ba89a6794010a9693dd1ac35&t=1607763672');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center; 
		width: 278rpx;
		height: 116rpx;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
	}
	
	.bottom_user_bar image{
		width: 90rpx;
		height: 90rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	
	.bottom_user_bar .userName{
		max-width: 160rpx;
		text-align: center;
		color: #000000;
		font-size: 36rpx;
		margin: 0 6rpx;
		margin-bottom: 20rpx;
	}
	
	.img_bar{
		position: relative;
		width: 100%;
		padding: 0 30rpx;
		margin: 60rpx 0;
		height: 710rpx;
	}
	
	.pk1{
		position: absolute;
		bottom: 40px;
		left: 30rpx;
		width: 460rpx;
	}
	
	.pk{
		position: absolute;
		left: calc(50% - 164rpx);
		top:calc(50% - 105rpx);
		z-index: 100;
		width: 328rpx;
		height: 210rpx;
	}
	
	.pk2{
		width: 560rpx;
		height: 750rpx;
		z-index: 99;
		position: absolute;
		bottom: 0;
		right: 30rpx;
	}

</style>
