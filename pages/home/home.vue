<template>
	<view>
		<set-view :num="num" :Money="23432" :rankNum="784"></set-view>
		<!-- <view class="flex_row" style="width: 100%;justify-content: flex-end;height: 60rpx;padding: 0 30rpx;">
			<view class="gold_bar" style="margin-right: 20rpx;">
				<view style="width: 50rpx;height: 60rpx;" @click.stop="showSetView"></view>
				<view class="omit white_font" style="width: calc(100% - 100rpx);text-align: center;margin: 2rpx auto 0 auto;">{{ getNumber(num) }}</view>
				<view style="width: 50rpx;height: 60rpx;" ></view>
			</view>
			<image src="../../static/ico/rank_ico.png" style="width: 60rpx;height: 60rpx;margin-right: 20rpx;" />
			<image src="../../static/ico/set_ico.png" style="width: 60rpx;height: 60rpx;" @click.stop="showSetView" />
		</view> -->
			<view 
				class="all_center flex_column yellow_font"
				style="width: 100%;padding: 0 30rpx;height: 300rpx;">
				<view 
					style="width: 80%;word-break: break-all;text-align: center;margin-bottom: 20rpx;font-size: 50rpx;">
					{{ info }}
				</view>
				<image 
					src="https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_dian.png?sign=907ce315ed4d486cf6830f7730e7f884&t=1607422996" 
					mode="widthFix" 
					style="width: 22rpx;margin-top: 20rpx;" />
			</view>
			<view class="flex_column" style="width: 100%;padding: 0 140rpx;">
				<text class="but_item all_center" space="emsp" :class="itemIndex == 1 ? 'active':''" @click="changeItem(1)">
					邀 请 好 友
				</text>
				<text class="but_item all_center" space="emsp" :class="itemIndex == 2 ? 'active':''" @click="changeItem(2)">
					在 线 匹 配
				</text>
			</view>
			<view class="all_center flex_row" style="width: 100%; margin: 40rpx 0;">
				<view class="yellow_font font_16" @click.stop="showGuiz">规则说明</view>
				<image src="../../static/ico/rule_ico.png" style="width: 34rpx;height: 34rpx;margin-left: 10rpx;" mode="widthFix" @click.stop="showGuiz" />
			</view>
			<view class="flex_row" style="width: 100%; justify-content: space-around;padding: 30rpx;">
				<text class="but_bot all_center" space="emsp" @click="nextBut">
					下一步
				</text>
			</view>
			<uni-popup ref="popup" type="center" :maskClick="false">
				<view class="guiz_info flex_column" style="align-items: center;">
					<image src="/static/img/right_top_img.png" mode="widthFix" class="top_right_img" />
					<view class="flex_row" style="width: 100%;justify-content: flex-end;margin-top: 40rpx;height: 76rpx;">
						<text style="font-size: 50rpx;flex-grow: 1;text-align: center;margin-left: 80rpx;">规则说明</text>
						<image src="../../static/ico/close_ico.png" mode="widthFix" style="width: 80rpx;margin-right: 20rpx;z-index: 99;" @click.stop="close"></image>
					</view>
					<scroll-view :scroll-y="true" style="height: calc(100% - 156rpx);width: 100%;padding: 30rpx 30rpx 0 60rpx;z-index: 98;">
						<rich-text :nodes="contentText" style="width: 100%;"></rich-text>
					</scroll-view>
					<image src="/static/img/left_bottom_img.png" mode="widthFix" class="bottom_right_img" />
				</view>
			</uni-popup>
		</block>
		
	</view>
</template>

<script>
	import setView from '@/components/set-up-view/set-up-view.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			setView,
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				topWidth:300,
				num:23849839,
				info:'',
				is_show:1,  //2：等待加入
				itemIndex:0,
				contentText:'',
				time:30,
				// marLeft:getTime,
			}
		},
		
		onLoad() {
			let _this = this;
			_this.info = uni.getStorageSync('gender').gender + '，性格' + uni.getStorageSync('gender').character
			_this.$http.getRules({}).then( res => {
				console.log('成功获取规则===',res)
				_this.contentText = res.data
			}).catch( err => {
				console.log(err)
				wx.showModal({
					title: '错误',
					content: err.data.msg||"服务器繁忙,请稍后重试",
					showCancel: false,
					confirmText: '确定',
					confirmColor: '#3CC51F',
				});
			})
		},
		
		methods: {
			close(){
				this.$refs.popup.close()
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
			
			getNumber(num){ 
				let _this = this;
				console.log(_this.$utils.get_number_txt(num))
				return _this.$utils.get_number_txt(num)
			},
			
			changeItem(val){
				let _this = this;
				this.itemIndex = val
			},
			
			getPeople(time){
				let _this = this;
				if( time == 25 ){
					_this.is_show = 1
					_this.time = 30
					clearTimeout(setTime)
					uni.redirectTo({
						url:'/pages/matching_success/matching_success'
					})
				}
			},
			
			nextBut(){
				if( this.itemIndex == 0 || this.itemIndex == '' ){
					uni.showToast({
						icon:'none',
						title:'请先选择游戏类型！'
					})
				}else{
					uni.navigateTo({
						url:'/pages/change_pattern/change_pattern?is_show=' + this.itemIndex
					})
				}
			},
			
			showGuiz(){
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
	
	.gold_bar{
		width: 216rpx;
		height: 100%;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/gold_bar_bg.png?sign=c1812f80d5ae79222cf9987466c8c963&t=1607421994');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center; 
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
		height: 1000rpx;
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
</style>
