<template>
	<view>
		<view :style="'height:' + topHeight +'px;margin-left:calc( 100% - '+ topLeft +'rpx);'"></view>
		<view :style="'height:' + topHeight +'px;margin-left:calc( 100% - '+ topLeft +'rpx);'" class="top_sol"></view>
		<view class="user_bar" style="margin-left: 30rpx;" @click.stop="toMy" v-if="is_login">
			<image :src="userInfo.avatar_url"></image>
			<view class="omit userName">{{ userInfo.nick_name }}</view>
		</view>
		<view class="user_bar" style="margin-left: 30rpx;" @click.stop="toLogin" v-if="!is_login">
			<view class="omit userName" style="max-width: 320rpx;">当前未登录</view>
		</view>
		<view class="flex_row" style="width: 100%;justify-content: flex-end;height: 60rpx;padding: 0 30rpx;" v-if="is_login">
			<view class="gold_bar" style="margin-right: 20rpx;">
				<!-- <view style="width: 50rpx;height: 60rpx;" @click.stop="showSetView"></view> -->
				<view class="omit white_font" style="width: calc(100% - 100rpx);text-align: center;margin: 2rpx auto 0 auto;">{{ userInfo.profit_sum == null ? 0:getNumber(userInfo.profit_sum) }}</view>
				<!-- <view style="width: 50rpx;height: 60rpx;" ></view> -->
			</view>
			<image src="../../static/ico/rank_ico.png" style="width: 60rpx;height: 60rpx;margin-right: 20rpx;" @click.stop="showRankView" />
			<image src="../../static/ico/set_ico.png" style="width: 60rpx;height: 60rpx;" @click.stop="showSetView" />
		</view>
		<uni-popup ref="popup" type="center">
			<view class="set_bar all_center yellow_font flex_column">
				<view class="row_center_between" style="width: 100%;">
					<view class="row_center" style="width: 49%;">
						<image src="../../static/ico/yingyue.png" style="width: 40rpx;height: 70rpx;"></image>
						<slider class="progress" min="0" max="1" activeColor="#231815" backgroundColor="#EECC9B" block-color="#231815" block-size="4"></slider>
					</view>
					<view class="row_center" style="width: 49%;">
						<image src="../../static/ico/yinliang.png" style="width: 60rpx;height: 50rpx;"></image>
						<slider class="progress" min="0" max="1" step="0.1" activeColor="#231815" backgroundColor="#EECC9B" block-color="#231815" block-size="4"></slider>
					</view>
				</view>
				<text class="ship all_center" space="ensp">
					视 频 教 程
				</text>
			</view>
		</uni-popup>
		<uni-popup ref="rankView" type="center" :maskClick="false">
			<view class="flex_column rank_bar">
				<view class="title_rank all_center">好友排名</view>
				<view class="rank_list_bar">
					<scroll-view class="rank_list_bar_top" :scroll-y="true" style="width: 100%;height: calc(100% - 60rpx);">
						<block v-for="(item,index) in rankList" :key="index">
							<view class="rank_item">
								<view class="row_center" style="width: 100%;padding: 0 30rpx;height: 128rpx;">
									<image src="/static/ico/rank_1.png" style="width: 60rpx;height: 68rpx;margin-right: 30rpx;" v-if="index == 0" />
									<image src="/static/ico/rank_2.png" style="width: 60rpx;height: 68rpx;margin-right: 30rpx;" v-if="index == 1" />
									<text class="all_center" v-if="index > 1" style="width: 60rpx;height: 68rpx;margin-right: 30rpx;font-size: 42rpx;">{{ index + 1 }}</text>
									<view class="user_av all_center">
										<image src="/static/logo.png" style="width: 74rpx;height: 74rpx;margin-right: 12rpx;margin-bottom: 12rpx;"></image>
									</view>
									<view class="flex_column" style="align-items: flex-start;justify-content: space-between;width: calc(100% - 182rpx);height: 80rpx;">
										<view class="omit font_16" style="width: 100%;">{{ item.nick_name }}</view>
										<view class="row_center_between" style="width: 100%;height: 30rpx;">
											<text 
												class="ship all_center font_10" 
												space="ensp" 
												style="width: 88rpx !important;height: 22rpx !important;background-size: 100% 100% !important;">
												99级
											</text>
											<view class="row_center">
												<image src="/static/ico/money_ico.png" style="width: 30rpx;height: 30rpx;margin-right: 10rpx;" />
												<text class="font_12">{{getNumber(item.profit_sum)}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</scroll-view>
		
					<view class="ship row_center_between" style="width: 100%;padding: 20rpx;">
						<view class="font_16">我的排名：{{ userInfo }}</view>
						<view class="row_center">
							<image src="../../static/ico/money_ico.png" style="width: 28rpx;height: 28rpx;margin-right: 10rpx;"></image>
							<text>{{ userInfo.profit_sum == null ? 0:getNumber(userInfo.profit_sum) }}</text>
						</view>
					</view>
				</view>
				<image src="../../static/ico/close_ico.png" style="width: 84rpx;height: 80rpx;" @click.stop="rankViewClose" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				v1: 1,
				topHeight:56,
				topLeft:15,
				is_login: uni.getStorageSync('token') ? true:false,
				userInfo:uni.getStorageSync('userInfo') || [],
				rankList:[],
			};
		},
		
		created() {
			let _this = this;
			console.log('获取个人信息==',uni.getStorageSync('userInfo'))
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)
			_this.topHeight = menuButtonInfo.top
			_this.topLeft = (menuButtonInfo.left + menuButtonInfo.width) * 2
			if( uni.getStorageSync('userInfo') == '' ){
				//获取个人信息
				_this.$http.getUserInfo({}).then( res => {
				 console.log('成功获取个人信息===',res)
				 uni.setStorageSync('userInfo', res.data);
				 _this.userInfo = res.data
				}).catch( err => {
					wx.showModal({
						title: '错误',
						content: err.msg||"服务器繁忙,请稍后重试",
						showCancel: false,
						confirmText: '确定',
						confirmColor: '#3CC51F',
					});
				})
			}
			
			
			//获取排名
			_this.$http.getRank({}).then( res => {
				console.log('获取当前排名',res)
				_this.rankList = res.data
				_this.meRank = res.other
			})
		},

		methods: {
			toMy(){
				uni.navigateTo({
					url:'/pages/my/my'
				})
			},
			
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login?is_back=true'
				})
			},
			
			change_(e) {
				if (e) {
					console.log(e.type, e.value)
					this.v1 = e.value
				}
				this.$forceUpdate()
			},
			changeMax() {
				this.max = this.max == 100000 ? 10 : 100000
			},
			changeEndtext() {
				this.infoEndText = this.infoEndText == '$' ? '美元' : '$'
			},
			
			showSetView(){
				this.$refs.popup.open()
			},
			
			showRankView(){
				this.$refs.rankView.open()
			},
			
			rankViewClose(){
				this.$refs.rankView.close()
			},

			getNumber(num) {
				let _this = this;
				return _this.$utils.get_number_txt(num)
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
	
	.userName{
		max-width: 160rpx;
		text-align: center;
		color: #000000;
		font-size: 36rpx;
		margin: 0 6rpx;
	}

	.gold_bar {
		width: 216rpx;
		height: 100%;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/gold_bar_bg.png?sign=c1812f80d5ae79222cf9987466c8c963&t=1607421994');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
	}
	
	.set_bar {
		background-color: #F7F7F7CC;
		width: 500rpx;
		height: 340rpx;
		border-radius: 15rpx;
		padding: 30rpx;
	}
	
	.cu-progress {
		display: flex;
		flex-direction: column;
		font-size: 16px;
	}
	
	.show {
		display: flex;
		flex-direction: column;
		margin: 0 30px;
	}
	
	.progress {
		margin: 0 20rpx;
		width: 70rpx;
	}
	
	.ship{
		width: 80%;
		height: 100rpx;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/but_lv.png?sign=88ea9343296d9a8d3bef4357d642d50d&t=1607669411');
		background-repeat: no-repeat;
		background-size: 100% 70rpx;
		background-position: center center;
		color: #000000;
		margin-top: 20rpx;
	}
	
	.rank_bar{
		width: 650rpx;
		height: calc(100vh - 240rpx);
		align-items: center;
		justify-content: space-around;
		color: #000000;
	}
	
	.rank_bar .title_rank{
		width: 50%;
		height: 72rpx;
		background-color: #F7F7F7;
		border-radius: 16rpx;
		font-size: 48rpx;
	}
	.rank_bar .rank_list_bar{
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #F7F7F7CC;
		height: 75%;
		border-radius: 12rpx;
	}
	
	.rank_bar .rank_list_bar .rank_list_bar_top{
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.rank_bar .rank_list_bar .rank_item{
		width: 100%;
		height: 128rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/rank_item_bg.png?sign=f958c4e691ee061aa902493b9dd49ffa&t=1607670575');
		background-repeat: no-repeat;
		background-size: 100% 128rpx;
		background-position: center center;
		margin-bottom: 16rpx;
	}
	
	.user_av{
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/av_bg.png?sign=4216f27b472429d95761a5bc805591fa&t=1607672078');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		width: 92rpx;
		height: 92rpx;
		margin-right: 10rpx;
	}
	
</style>
