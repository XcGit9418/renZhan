<template>
	<view>
		<view class="flex_end" @tap="btn">积分兑换规则</view>
		<view class="top_num">
			<text class="num">{{ userInfo.max_exam_record }}</text>
			<text style="font-size: 24rpx; color: #EEEEEE;">当前积分</text>
			<view class="site" @tap="changeAddress">收货地址</view>
		</view>
		<view style="height: 200rpx;"></view>
		<view class="hint_bar">
			<view class="left">
				<view class="hint_name">尊敬的“<view class="omit" style="max-width: 240rpx;">{{ userInfo.nickName }}</view>”</view>
				<text style="color: #4c4c4c;">积分可参与兑换商品~</text>
			</view>
		</view>

		<view class="main">
			<block v-for="(item, index) in goodsList" :key="index">
				<view class="li">
					<image style="width: 100%;height: 320rpx;" src="/static/logo.png" mode=""></image>
					<view class="paL">
						<view class="title omit">{{item.title}}</view>
						<view class="pal_hint">积分{{ item.score }}</view>
						<view class="pal_but">
							<view class="flex_row">
								<view class="omit">{{item.change_num}}</view>
								<text style="font-size: 18rpx;color: #808080;">人已兑换</text>
							</view>
							<view class="all_center" style="background-color: #c6c6c6;" v-if="item.is_exchange == 1">已领取</view>
							<view class="all_center" style="background-color: #EECC9B;" v-else @tap="getWenju(item.goods_id)">领取</view>
						</view>
						
					</view>
				</view>
			</block>
		</view>

		<!-- 弹出层 -->
		<view class="modalDlg" v-if="showModal">
			<!-- 二维码或其他图片 -->
			<view class='del-view'>
				<image class='del' src='/static/ico/close_ico.png' @tap='ok' />
			</view>
			<view class="hint_bar_info">
				<rich-text :nodes="type_data"></rich-text>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				
				userInfo:{
					max_exam_record:99999,
					nickName:'用户'
				},
				
				goodsList: [
					{
						title:'商品名字',
						score:900,
						change_num:29,
						is_exchange:0,
						goods_id:6,
					},
					{
						title:'商品名字',
						score:1100,
						change_num:9,
						is_exchange:1,
						goods_id:7,
					},
				],
				address:'',//收货地址
				type_data:'判断奇扫频哈佛好好',
			}
		},
		
		onLoad() {
			// this.getInfo()
			
			// this.getContetn()
			
		},
		
		onShow() {
			if( uni.getStorageSync('address') ){
				this.address = uni.getStorageSync('address')
			} 
			console.log('收货地址===',this.address)
		},

		methods: {
			// getContetn(){
			// 	var that = this
			// 	that.$utils._post_form(that.$apiRoot + 'note/getOne', {
			// 		notice_id: 10005,
			// 	}, (result) => {
			// 		console.log('获取规则返回==',result)
			// 			this.type_data = result.data.res.content
			// 	})
			// },
			
			//获取信息
			// getInfo(){
			// 	var that = this
			// 	// 请求接口
			// 	that.$utils._post_form(that.$apiRoot + 'exam/get_goods_lst', {
			// 		user_id: that.userInfo.user_id
			// 	}, (result) => {
			// 		console.log('获取列表返回==',result)
			// 			this.goodsList = result.data.res
			// 	})
			// },
			
			//查看积分规则
			btn(){
				console.log('=========')
				this.showModal = true
			},
			
			//关闭积分规则
			ok(){
				this.showModal = false
			},
			
			//选择收货地址
			changeAddress() {
				uni.navigateTo({
					url: '/pages/receiverAddress/receiverAddress?is_jiang=1',
				});
			},
			
			//点击领取
			getWenju(id){
				console.log('当前点击的ID===',id)
				console.log('当前用户的ID===',this.userInfo.user_id)
				console.log('收货地址===',this.address)
				if( this.address != '' ){
					uni.showModal({
						title: '提示',
						content: '是否确认领取到下列收货地址？\n' + '收货人：'+ this.address.name + '\n' + '电话：'+ this.address.phone +'\n' + '收货地址：' + this.address.address,
						showCancel: true,
						cancelText: '取消',
						confirmText: '确认',
						success: res => {
							if( res.cancel ){
								return false
							}
							if( res.confirm ){
								console.log('点击了确认')
								var that = this
								// 请求接口兑换会员
								that.$utils._post_form(that.$apiRoot + 'exam/get_prize', {
									user_id: that.userInfo.user_id,
									address_id: that.address.address_id,
									goods_id:id
								}, (result) => {
									console.log('确认领取返回==',result)
									uni.showToast({
										title: result.msg,
										icon:'none'
									});
									this.getInfo()
								})
							}
						},
					});
				}else{
					uni.showToast({
						title: '请选择收货地址！',
						icon:'none'
					});
				}
				
			},


		}
	}
</script>

<style>
	.flex_end {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: flex-end;
		padding: 20rpx 50rpx 0 0;
		font-size: 24rpx;
	}
	
	.top_num {
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		margin-bottom: 10rpx;
	}
	
	.top_num .num {
		font-size: 70rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
	.site {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 190rpx;
		height: 60rpx;
		position: absolute;
		right: 0;
		top: 50rpx;
		background-color: #EECC9B;
		color: #000;
		font-size: 26rpx;
		border-top-left-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
	}
	
	.hint_bar {
		/* 	display: flex;
		flex-direction: column;
		align-items: flex-start; */
		width: 670rpx;
		padding: 30rpx;
		margin: 10rpx auto;
		background-color: #EECC9B;
		box-shadow: 0 8rpx 8rpx 0 rgba(238, 238, 238, 0.5);
		border-radius: 20rpx;
		color: #000000;
	}
	
	.left {
		display: flex;
		flex-direction: column;
	}
	
	.left .hint_name {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 30rpx;
		color: #000;
	}
	
	.left text{
		font-size: 20rpx;
		color: #808080;
	}
	
	
	.main {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 670rpx;
		margin: 20rpx auto;
		background-color: #000;
	}
	
	.li {
		box-shadow: 0 0 20rpx 0 rgba(191, 191, 191, 0.5);
		width: 320rpx;
		margin-bottom: 36rpx;
		border-radius: 22rpx;
		padding-bottom: 16rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.paL {
		padding: 20rpx;
		width: 100%;
	}
	
	.paL .title{
		max-width: 100%;
	}
	
	.pal_hint{
		font-size: 22rpx;
		color: #808080;
		margin: 5rpx 0;
	}
	
	.flex_row{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.flex_row .omit{
		font-size: 26rpx;
		color: #ff5733;
		margin-right: 5rpx;
		max-width: 90rpx;
		font-weight: bold;
	}
	
	.pal_but{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.all_center{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100rpx;
		height: 50rpx;
		border-radius: 25rpx;
		color: #000;
		font-size: 24rpx;
	}
	
	/* 弹出层 */
	
	.modalDlg {
	  position: fixed;
	  top: 40rpx;
	  left: 0;
	  right: 0;
	  z-index: 9999;
	  margin: 0 auto;
	  /* background-color: #fff; */
	  border-radius: 5px;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	
	/* 关闭按钮 */
	
	.ok {
	  width: 80px;
	  height: 35px;
	  background: #EECC9B;
	  line-height: 35px;
	  text-align: center;
	  color: #fff;
	  font-size: 15px;
	  margin: 20px auto;
	  border-radius: 100px;
	}
	
	.del-view {
	  display: flex;
	  justify-content: flex-end;
	  width: 88%;
	  height: 70rpx;
	  align-items: center;
	}
	
	.del {
	  width: 50rpx;
	  height: 50rpx;
	}
	
	.hint_bar_info{
		width: 80%;
		background-color: #EECC9B;
		color: #000;
		opacity: 0.8;
		padding: 20rpx;
		border-radius: 20rpx;
	}
</style>
