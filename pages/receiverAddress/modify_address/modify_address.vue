<template>
	<view>
		<!-- title -->
		<view class="title">
			<view class="">您好,</view>
			<view class="">欢迎修改收货地址!</view>
		</view>
		<!-- 收货人信息 -->
		<view class="addressInfo">
			<view class="item name uni-flex-rw-center">
				<text>姓名:</text>
				<input v-model="sendData.name" class="margin-left" type="text" placeholder-style="color:#b5b5b5" value="" placeholder="请输入收货人姓名" />
			</view>
			<view class="item phone uni-flex-rw-center">
				<text>电话:</text>
				<input
					v-model="sendData.phone"
					maxlength="11"
					class="margin-left"
					type="text"
					placeholder-style="color:#b5b5b5"
					value=""
					placeholder="请输入收货人电话"
				/>
			</view>
			<view class="item address uni-flex-rw-center">
				<text>地区选择：</text>
				<picker mode="region" :value="city" @change="changeCity" style="flex-grow: 1;">
					<text style="padding-left: 20rpx;">{{city ? city : '点此选择地区'}}</text>
				</picker>
			</view>
			<view class="item address uni-flex-rw-center">
				<text>详细地址:</text>
				<input v-model="sendData.address" class="margin-left" type="text" placeholder-style="color:#b5b5b5" value="" placeholder="请输入收货人地址" />
			</view>
			
		</view>
		<!-- 立即提交 -->
		<view class="addButton"><view class="button" @tap="addAddress">立即提交</view></view>
		<!-- 地区联动 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 城市索引
			cityPickerValueDefault: [0, 0, 1],
			index: 0,
			city:'',
			sendData: {
				name: '',
				phone: '',
				address: '',
				address_id: ''
			},
		};
	},
	methods: {
		changeCity(e){
			this.city = e.detail.value
		},
		
		// 提交
		addAddress() {
			const that = this;
			//console.log('用户输入的信息================', this.sendData);
			
			if (!this.sendData.name) {
				this.$utils._showModal('请输入姓名');
				return false;
			} else if (!this.sendData.phone) {
				this.$utils._showModal('请输入电话');
				return false;
			} else if (!this.sendData.address) {
				this.$utils._showModal('请输入地址');
				return false;
			} else {
				this.sendData.address = this.city+this.sendData.address
				// console.log("拼接地址============",this.sendData);
				uni.request({
					url: this.$apiRoot + 'user/create_address',
					method:'POST',
					data:{
						user_id: this.userInfo.user_id,
						UserName:this.sendData.name,
						address:this.sendData.address,
						phone:this.sendData.phone,
						address_id:this.sendData.address_id
					},
					success: (res) => {
						console.log('修改收货地址返回====',res)
						if( res.data.code == 200 ){
							uni.showToast({
								title: '修改收货地址成功，即将返回...',
								icon:'none'
							});
							setTimeout(function(){
								uni.navigateBack({});
							},1500)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							});
						}
					}
				});
			}
		},
		// 选择地址数据
		openAddres() {
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			this.city = e.label
			//console.log(this.city);
		}
	},
	onLoad(option) {
		if (option.data) {
			//console.log('修改功能传来的数据', JSON.parse(option.data));
			this.sendData = JSON.parse(option.data);
			// this.sendData.name = data.data.name
			// this.sendData.phone = data.data.phone
			// this.sendData.address = data.data.address
			// this.sendData.receiving_address_id = data.data.receiving_address_id
		}
	}
};
</script>

<style lang="scss">
	.uni-flex-rw-center{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.margin-left{
			margin-left: 20rpx;
	}
	
// title
.title {
	padding: 0 60rpx;
	margin: 80rpx 0;
	view {
		font-size: 40rpx;
		font-weight: bold;
		line-height: 1.5;
	}
}
// 收货人信息
.addressInfo {
	padding: 0 60rpx;
	.item {
		font-size: 28rpx;
		color: #b5b5b5;
		border-bottom: 2rpx solid rgba(241, 241, 241, 1);
		padding: 40rpx 0;
		text {
			flex-shrink: 0;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
		}
		input {
			flex: 1;
			color: #FFFFFF;
		}
		.address-input {
			padding: 0 20rpx;
			height: auto;
		}
	}
}
//提交
.addButton {
	padding: 100rpx 100rpx 30rpx 100rpx;
	.button {
		width: 100%;
		height: 106rpx;
		opacity: 0.88;
		color: #000;
		background: #EECC9B;
		border-radius: 54rpx;
		font-size: 30rpx;
		line-height: 106rpx;
		text-align: center;
	}
}
</style>
