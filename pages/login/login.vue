<template>
	<view>
		<view class="bugu-header">
			<image :src="logo" mode=""></image>
			<view class="app-name">仁战</view>
			<!-- <view class="company">Guizhou HvaTeng Technology Co., Ltd.</view> -->
		</view>
		<view class="bugu-footer">
			<view class="footer-title">仁战将获取以下授权:</view>
			<view class="footer-content">- 获取您的公开信息（昵称，头像等）</view>
			<view class="footer-btns">
				<button class="tui-modal-btn tui-gray" role="button" hover-class="tui-gray-hover" @tap="handleClickCancel">取消</button>
				<button class="tui-modal-btn tui-green" hover-class="tui-green-hover" open-type="getUserInfo" @getuserinfo="handleClickWxapp">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				back: false,
				logo: ''
			}
		},
		onLoad(options) {
			this.back = options.is_back;
			console.log(this.back)
		},
		methods: {
			handleClickCancel() {
				uni.navigateBack()
			},

			/**
			 * 微信小程序登录
			 * @param {Object} e
			 */
			handleClickWxapp(e) {
				if (e.detail.iv) {
					uni.showLoading({
						title: '登录中...'
					})
					var that = this;
					uni.login({
						success: function(loginRes) {
							console.log('登录获取返回====', loginRes)
							// 发送 res.code 到后台换取 openId, sessionKey, unionId
							if (loginRes.code) {
								wx.getUserInfo({
									withCredentials: true,
									success: function(res2) {
										console.log(res2);
										that.$http.login({
											code:loginRes.code,
											encryptedData:res2.encryptedData,
											iv:res2.iv,
											rawData:res2.rawData,
											signature:res2.signature,
										}).then( res => {
											console.log(res)
											uni.setStorageSync('token', res.data.token);
											uni.setStorageSync('userInfo', res.data);
											if( that.back == true ){
												uni.navigateBack({})
											}else if(uni.getStorageSync('gender')){
												uni.reLaunch({
													url:'/pages/home/home'
												})
											}else{
												uni.reLaunch({
													url:'/pages/chaneg_role/chaneg_role'
												})
											}
											uni.hideLoading()
										})
										.catch( err => {
											console.log(err)
											uni.hideLoading()
											wx.showModal({
												title: '错误',
												content: err.msg||"服务器繁忙,请稍后重试",
												showCancel: false,
												confirmText: '确定',
												confirmColor: '#3CC51F',
											});
										})
									}
								})
							} else {
								uni.showToast({
									title: '获取用户登录态失败！',
									icon: 'none'
								})
								console.log('获取用户登录态失败！' + res.errMsg);
							}
						}
					})
				} else {
					// 用户拒绝授权
					uni.showToast({
						title: '您拒绝了授权，登录失败',
						icon: 'none'
					})
				}
			},

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.bugu-header {
		padding: 60upx 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px solid #EDEDED;
	}

	.bugu-header image {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
	}

	.app-name {
		font-size: 34upx;
		color: #000000;
		font-weight: bold;
		line-height: 2.5em;
	}

	.company {
		font-size: 26upx;
		color: #888888;
	}

	.bugu-footer {
		padding: 60upx 40upx;
	}

	.footer-title {
		font-size: 32upx;
		color: #000000;
		line-height: 2.5em;
	}

	.footer-content {
		font-size: 24upx;
		color: #888888;
		line-height: 2.5em;
	}

	.footer-btns {
		padding: 60upx 0upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-modal-btn {
		width: 44%;
		height: 68upx;
		line-height: 68upx;
		position: relative;
		border-radius: 34upx;
		font-size: 24upx;
		overflow: visible;
		margin: 0;
	}

	.tui-modal-btn::after {
		content: "";
		position: absolute;
		width: 200%;
		height: 200%;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		left: 0;
		top: 0;
		border-radius: 20upx;
		border: 0;
	}

	.tui-green {
		background: #19be6b;
		color: #fff;
	}

	.tui-green-hover {
		background: #16ab60;
		color: #e5e5e5;
	}

	.tui-gray {
		background: #ededed;
		color: #999;
	}

	.tui-gray-hover {
		background: #d5d5d5;
		color: #898989;
	}
</style>
