<template>
	<view>
		<view :style="'height:' + topHeight +'px;margin-left:calc( 100% - '+ topLeft +'rpx);'"></view>
		<view :style="'height:' + topHeight +'px;margin-left:calc( 100% - '+ topLeft +'rpx);'" class="top_sol"></view>
		<view class="user_bar" style="margin-left: 30rpx;">
			<image :src="userInfo.avatar_url"></image>
			<view class="userName">
				<view class="row_center_between" style="width: 100%;align-items: flex-end !important;">
					<view class="omit font_18" style="max-width: calc(100% - 150rpx);">{{ userInfo.nick_name }}</view>
					<view class="tag_bar" style="text-align: center;padding-top: 4rpx;">人生赢家</view>
				</view>
				<view class="row_center" style="width: 100%;height: 60rpx;">
					<view class="font_13" style="margin-right: 10rpx;">LV15</view>
					<view class="flex_column" style="align-items: flex-end;margin-bottom: 20rpx;">
						<text style="font-size: 14rpx;margin-bottom: 8rpx;">{{ minNum }}/{{ maxNum }}</text>
						<view class="progress_bar">
							<view class="active_progress" :style="'width:'+ progressNum +' ;'"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="row_center_around" style="width: 100%;padding: 30rpx 100rpx;">
			<view class="row_center" style="max-width: 50%;" @click.stop="showMoney(1)">
				<image src="/static/ico/money_ico.png" style="width: 36rpx;height: 36rpx;margin-right: 20rpx;" />
				<view class="flex_row" style="align-items: flex-start;">
					<text class="font_16">{{getMoney( money )}}</text>
					<image src="/static/ico/rule_ico.png" style="width: 11px;margin-left: 10rpx;" mode="widthFix"></image>
				</view>
			</view>
			<view class="row_center" style="max-width: 50%;" @click.stop="showMoney(2)">
				<image src="/static/img/progress_tag.png" style="width: 28rpx;height: 36rpx;margin-right: 20rpx;" />
				<view class="flex_row" style="align-items: flex-start;">
					<text class="font_16">{{getMoney( money )}}</text>
					<image src="/static/ico/rule_ico.png" style="width: 11px;margin-left: 10rpx;" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<view class="row_center_around" style="width: 100%;padding: 30rpx;">
			<view class="row_center yellow_font font_15" style="max-width: 33%;text-align: left;">
				<text>总对局：</text>
				<view class="omit" style="max-width: 120rpx;">{{ totalNum }}</view>
			</view>
			<view class="row_center yellow_font font_15" style="max-width: 33%;text-align: center;">
				<text>胜率：</text>
				<view class="omit" style="max-width: 120rpx;">{{ winning }}</view>
			</view>
			<view class="row_center yellow_font font_15" style="max-width: 33%;text-align: right;">
				<text>最高连胜：</text>
				<view class="omit" style="max-width: 80rpx;">{{ sum }}</view>
			</view>
		</view>
		
		<view class="info_bar">
			<view class="font_20 row_center" style="width: 100%;">
				<text style="color: #000000;">已连续签到</text>
				<text style="color: #d61518;">{{ dayNum }}</text>
				<text style="color: #000000;">天</text>
			</view>
			<view class="qiandao_bar flex_row" style="margin: 0 auto;">
				<block v-for="(item,index) in 7" :key="index">
					<view class="qiandao_item flex_column" style="align-items: center;">
						<view 
							v-show=" index >= dayNum "
							class="all_center bg_white font_13" 
							style="width: 66rpx;height: 66rpx;color: #000000;border-radius: 50%;">
							+20
						</view>
						<image src="/static/ico/success_ico.png" style="width: 66rpx;height: 66rpx;" v-show=" index < dayNum "></image>
						<text class="font_10" style="color: #000000;margin-top: 20rpx;">第{{ index + 1 }}天</text>
					</view>
					<view style="color: #FFFFFF;margin-top: 12rpx;" v-if="index < 6">—</view>
				</block>
			</view>
			<view class="sumbit_bar" @click="toSign" v-if="is_qian">
				立即签到
			</view>
			<view class="sumbit_bar" v-if="!is_qian">
				已签到
			</view>
		</view>
		
		<view style="width: 690rpx;height: 200rpx;background-color: #EECC9B;margin: 60rpx auto;"></view>
		<view class="flex_column" style="width: 100%;padding: 30rpx;">
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<text>积分商城</text>
				<view class="all_center item_but" @click="toPrize_center">前往</view>
			</view>
			
			<view class="yellow_font" style="margin-bottom: 30rpx;font-size: 50rpx;">每日任务</view>
			
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>完成两次单人模式</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="status == 1">前往(2/2)</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已完成</view>
			</view>
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>在游戏里获得5次胜利</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="status == 1">前往(5/5)</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已完成</view>
			</view>
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>完成一次游戏签到</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="is_qian" @click="toSign">去签到</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已签到</view>
			</view>
			<view class="row_center_between" style="width: 100%;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>分享一次战绩给好友或朋友圈</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but">分享</view>
			</view>
		</view>
		<view class="flex_column" style="width: 100%;padding: 30rpx;">
			<view class="yellow_font" style="margin-bottom: 30rpx;font-size: 50rpx;">循环任务</view>
			
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>赛季期间，每周完成10场好友挑战</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but">前往(10/10)</view>
			</view>
			<view class="row_center_between" style="width: 100%;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>赛季期间，连续2周内签到全勤</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but">前往(7/7)</view>
			</view>
		</view>
		
		<view class="flex_column" style="width: 100%;padding: 30rpx;">
			<view class="yellow_font" style="margin-bottom: 30rpx;font-size: 50rpx;">悬赏任务</view>
			
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>获得100场胜利</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="status == 1">20/100</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已完成</view>
			</view>
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>打败20个对手</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="status == 1">前往(10/20)</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已完成</view>
			</view>
			<view class="row_center_between" style="width: 100%;margin-bottom: 50rpx;">
				<view class="flex_column font_16" style="align-items: flex-start;">
					<text>赛季期间，累计获得500个荣誉币</text>
					<view class="row_center" style="margin-top: 20rpx;">
						<image src="/static/ico/exp.png" style="width: 70rpx;height: 63rpx; margin-right: 20rpx;"></image>
						<text>20</text>
					</view>
				</view>
				<view class="all_center item_but" v-if="status == 1">210/500</view>
				<view class="all_center item_but" style="background-color: #B4A99B;" v-else>已完成</view>
			</view>
		</view>
		
		<uni-popup ref="popup1" type="center" :maskClick="false">
			<view class="guiz_info flex_column" style="align-items: center;">
				<image src="/static/img/right_top_img.png" mode="widthFix" class="top_right_img" />
				<view class="flex_row" style="width: 100%;justify-content: flex-end;margin-top: 40rpx;height: 76rpx;">
					<text style="font-size: 50rpx;flex-grow: 1;text-align: center;margin-left: 80rpx;">金币说明</text>
					<image src="../../static/ico/close_ico.png" mode="widthFix" style="width: 80rpx;margin-right: 20rpx;z-index: 99;" @click.stop="close(1)"></image>
				</view>
				<scroll-view :scroll-y="true" style="width: 100%;padding: 30rpx 30rpx 30rpx 60rpx;z-index: 98;">
					<rich-text :nodes="contentText" style="width: 100%;font-size: 28rpx;color: #000000;"></rich-text>
				</scroll-view>
				<image src="/static/img/left_bottom_img2.png" mode="widthFix" class="bottom_right_img" />
			</view>
		</uni-popup>
		<uni-popup ref="popup2" type="center" :maskClick="false">
			<view class="guiz_info flex_column" style="align-items: center;">
				<image src="/static/img/right_top_img.png" mode="widthFix" class="top_right_img" />
				<view class="flex_row" style="width: 100%;justify-content: flex-end;margin-top: 40rpx;height: 76rpx;">
					<text style="font-size: 50rpx;flex-grow: 1;text-align: center;margin-left: 80rpx;">荣耀币说明</text>
					<image src="../../static/ico/close_ico.png" mode="widthFix" style="width: 80rpx;margin-right: 20rpx;z-index: 99;" @click.stop="close(2)"></image>
				</view>
				<scroll-view :scroll-y="true" style="width: 100%;padding: 30rpx 30rpx 30rpx 60rpx;z-index: 98;">
					<rich-text :nodes="contentText2" style="width: 100%;font-size: 28rpx;color: #000000;"></rich-text>
				</scroll-view>
				<image src="/static/img/left_bottom_img2.png" mode="widthFix" class="bottom_right_img" />
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
				contentText:'通过对战和签到可以获得金币，金币可用于兑换荣耀币，100个金币可兑换一个荣耀币。',
				contentText2:'可通过提升品阶来获得荣耀币。荣耀币可用于购买仁战酒。',
				
				topHeight:56,
				topLeft:15,
				progressNum:'30%',
				minNum:862,
				maxNum:1000,
				
				money:893432,
				dayNum:4,
				status:1,
				
				totalNum:0 || '- -',
				winning:0 || '- -',
				sum:0 || '- -',
				
				userInfo:uni.getStorageSync('userInfo') || [],
			}
		},
		watch:{
			minNum(){
				let _this = this;
				_this.getProgressNum()
			},
		},
		
		onLoad() {
			let _this = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)
			_this.topHeight = menuButtonInfo.top
			_this.topLeft = (menuButtonInfo.left + menuButtonInfo.width) * 2
			_this.getProgressNum()
			let time = setTimeout(function(res){
				_this.status = 2
				clearTimeout(time)
			},10000)
		},
		
		onShow() {
			let _this = this;
			
			_this.getUserInfo()
			_this.getBattle()
		},
		
		methods: {
			//签到
			toSign(){
				let _this = this;
				_this.$http.userSign({}).then( res => {
					console.log('签到成功返回===',res)
					uni.showToast({
						title:'签到成功！'
					})
					_this.is_show = false
				}).catch( err => {
					wx.showModal({
						title: '错误',
						content: err.msg||"服务器繁忙,请稍后重试",
						showCancel: false,
						confirmText: '确定',
						confirmColor: '#3CC51F',
					});
				})
			},
			
			//获取个人信息
			getUserInfo(){
				let _this = this;
				_this.$http.getUserInfo({}).then( res => {
				 console.log('成功获取个人信息===',res)
				}).catch( err => {
					wx.showModal({
						title: '错误',
						content: err.msg||"服务器繁忙,请稍后重试",
						showCancel: false,
						confirmText: '确定',
						confirmColor: '#3CC51F',
					});
				})
			},
			
			//获取对战数据
			getBattle(){
				let _this = this;
				_this.$http.getBattle({}).then( res => {
				 // console.log('成功获取对战===',res)
				 let num = parseFloat( res.data.sl);
				 let total = parseFloat(res.data.zdj);
				 if (isNaN(num) || isNaN(total)) {
				 		_this.progressNum = '0%';
				 }
				 // console.log(total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%")
				 _this.winning = total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%"
				 _this.totalNum = res.data.zdj
				 // _this.winning = res.data.sl
				 _this.sum = res.data.sum
				})
			},
			
			showMoney(val){
				let _this = this;
				if( val == 1 ){
					_this.$refs.popup1.open()
				}else{
					_this.$refs.popup2.open()
				}
			},
			close(val){
				let _this = this;
				if( val == 1 ){
					_this.$refs.popup1.close()
				}else{
					_this.$refs.popup2.close()
				}
			},
			
			getMoney(num){
				return this.$utils.get_number_txt(num)
			},
			
			getProgressNum(){
				let _this = this;
				let num = parseFloat( _this.minNum);
				let total = parseFloat(_this.maxNum);
				if (isNaN(num) || isNaN(total)) {
						_this.progressNum = '0%';
				}
				console.log(total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%")
				_this.progressNum = total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%"
				_this.$forceUpdate()
			},
			
			toPrize_center(){
				uni.navigateTo({
					url:'/pages/Prize_center/Prize_center'
				})
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
		width: 60%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.user_bar image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	
	.userName{
		width: calc(100% - 160rpx);
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
	
	.tag_bar{
		width: 120rpx;
		height: 44rpx;
		margin-left: 30rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_but_change.png?sign=b7cf7758a70b25e8601b3409a3ea115a&t=1607921097') no-repeat;
		background-size: 100% 100%;
		background-position: center center;
		color: #EECC9B;
		font-size: 20rpx;
	}
	
	.progress_bar{
		width: 220rpx;
		height: 12rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
	}
	
	.active_progress{
		height: 100%;
		background-color: #EECC9B;
	}
	
	.guiz_info{
		background-color: #EECC9B;
		width: 620rpx;
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
		width: 134rpx;
	}
	
	.info_bar{
		width: 690rpx;
		margin: 30rpx;
		height: 480rpx;
		background: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/bg_img/my_info_bg.png?sign=3d8ab8181e26ab5c9699b341f0c4b304&t=1607926817') no-repeat;
		background-position: center center;
		background-size: 100% 100%;
		padding: 0 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.sumbit_bar{
		width: 500rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		color: #EECC9B;
		margin: 0 auto;
		margin-bottom: 30rpx;
	}
	
	.item_but{
		width: 200rpx;
		height: 80rpx;
		border-radius: 40rpx;
		color: #000000;
		background-color: #EECC9B;
		font-size: 32rpx;
	}
</style>
