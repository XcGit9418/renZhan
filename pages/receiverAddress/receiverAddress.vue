<template>
	<view>
		<!-- 地址列表 -->
		<view class="addressList">
			<block v-for="(item,idx) in addressList" :key="idx">
				<view class="item ">
					<view class="" @tap="selectAddress(idx)">
						<view class="title uni-flex-rw-rl">
							<view class="omit" style="max-width: 260rpx;">收货人：{{item.name}}</view>
							<view class="">电话：{{item.phone}}</view>
						</view>
						<view class="addressInfo">地址：{{item.address}}</view>
					</view>
					<view class="setting uni-flex-rw-rl">
						<!-- <view class="left" @tap="changeDefault(item.id,idx)">
							<text class="iconfont yes" v-if="item.is_default == 1" >&#xe645;</text>
							<text class="iconfont " v-else>&#xe623;</text>
							<text>设为默认地址</text>
						</view> -->
						<view class="right row_center_between">
							<view class="butt" @tap="updataAddress(item)">
								<!-- <text class="iconfont">&#xe630;</text> -->
								<text>修改</text>
							</view>
							<view class="margin-left butt" style="background-color: #ececec;color: #383838;" @tap="deleteAddress(item.address_id)">
								<!-- <text class="iconfont">&#xe613;</text> -->
								<text>删除</text>
							</view>
						</view>
					</view>
				</view>
			</block>

		</view>
		
		<!-- 新增银行卡 -->
		<view class="addBankButton" @tap="openAddress">
			<view class="Button">新增收货地址</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 收货地址列表
				addressList: [
					{
						address_id:2,
						name:'徐晨',
						phone:'18216619446',
						address:'贵州省贵阳市南明区'
					},
				],
				is_jiang:0,		//是否奖品中心跳转过来  1：是  0：不是
			}
		},
		methods: {
			// 获取收货地址列表
			getAddressList() {
				const that = this

				// uni.request({
				// 	url: this.$apiRoot + 'user/getAddressList',
				// 	method: 'POST',
				// 	data: {
				// 		user_id: that.userInfo.user_id,
				// 	},
				// 	success: (res) => {
				// 		console.log('获取收货地址返回====', res)
				// 		uni.hideLoading()
				// 		if (res.data.code == 1) {
				// 			that.addressList.length = 0
				// 			res.data.data.res.forEach((v) => {
				// 				that.addressList.push(v)
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				title: res.data.msg,
				// 				icon: "none"
				// 			});
				// 		}
				// 	}
				// });
			},
			// 选择地址
			selectAddress(index) {
				// 存储默认地址
				// this.$store.commit("setDefultAddress", this.addressList[index])
				// 设置缓存
				 uni.setStorageSync('address', this.addressList[index]);
				// uni.setStorageSync('address', this.addressList[index]);
				uni.navigateBack({})
			},
			// 编辑地址
			updataAddress(data) {
				//console.log("点击的地址元素",data);
				uni.navigateTo({
					url: `/pages/receiverAddress/modify_address/modify_address?data=${JSON.stringify(data)}`,
				})
			},
			// 删除地址
			deleteAddress(id) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确认删除当前收货地址？',
					showCancel: true,
					cancelText: '点错了',
					confirmText: '删掉它',
					success: res => {
						if(res.confirm){
							// uni.request({
							// 	url: this.$apiRoot + 'user/delAddress',
							// 	method: 'POST',
							// 	data: {
							// 		address_id: id,
							// 	},
							// 	success: (res) => {
							// 		console.log('获取删除收货地址返回====', res)
							// 		if (res.data.code == 200) {
							// 			uni.showToast({
							// 				title: '删除成功',
							// 				icon: "none"
							// 			});
							// 			this.getAddressList()
							// 		} else {
							// 			uni.showToast({
							// 				title: res.data.msg,
							// 				icon: "none"
							// 			});
							// 		}
							// 	}
							// });
						}
						if( res.cancel ){
							return false
						}
					},
				});
				
				
				// this.$utils._post(this.url+'member/detele_receiving_address',{receiving_address_id:id},function(res){
				// 	//console.log("是否是否删除了地址数据===================",res);
				// 	if(res.code == 1){
				// 		that.$utils._showModal("删除成功",function(){
				// 			// 重新请求列表
				// 			that.addressList=[]
				// 			that.getAddressList()
				// 		})
				// 	}
				// })
			},
			// 页面打开===============================
			openAddress() {
				uni.navigateTo({
					url: "/pages/receiverAddress/addAddress/addAddress",
				})
			}
			//页面打开==================================
		},
		onLoad(options) {
			// uni.showLoading({
			// 	title: '加载中...',
			// 	mask: true
			// });
			if( options.is_jiang ){
				this.is_jiang = options.is_jiang
			}
		},
		onShow() {
			// 获取收货地址列表
			this.getAddressList()
		}
	}
</script>

<style lang="scss">
	.butt{
		width: 140rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10rpx;
		background-color: #00ddcd;
		color: #FFFFFF;
	}
	
	// 新增银行卡
	.addBankButton {
		padding: 0 108rpx;
		margin: 80rpx 0;

		.Button {
			width: 100%;
			height: 92rpx;
			color: #FFFFFF;
			border-radius: 48rpx;
			font-size: 26rpx;
			line-height: 92rpx;
			text-align: center;
			border: 2rpx dashed #FFFFFF;
		}
	}

	.uni-flex-rw-rl {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.row_center_between {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	// 地址列表
	.addressList {
		padding: 40rpx;

		.item {
			color: #4c4c4c;
			padding: 28rpx;
			width: 100%;
			background-color: #EECC9B;
			border-radius: 30rpx;
			box-shadow: 0px 0px 22rpx 0px rgba(217, 217, 217, 0.5);
			margin-bottom: 30rpx;

			.title {
				color: #000000;
				font-size: 30rpx;
			}

			.addressInfo {
				font-size: 22rpx;
				color: #4c4c4c;
				border-bottom: 2rpx solid rgba(241, 241, 241, 1);
				padding: 20rpx 0;
			}

			.setting {
				font-size: 26rpx;
				padding-top: 20rpx;

				.iconfont {
					font-size: 26rpx;
				}

				.left {
					.yes {
						color: #ffc300;
					}
				}

				.right {
					width: 100%;
				}
			}
		}
	}
</style>
