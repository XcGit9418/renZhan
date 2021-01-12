<template>
	<view>
		<view class="top">
			<view class="title flex_column all_center">
				<text space="ensp" style="margin-left: -20rpx;">人物</text>
				<text space="ensp" style="margin-left: -20rpx;">性格</text>
			</view>
			<image src="https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/bg_dian.png?sign=c231305a725e828ef4db5653a5f9aee4&t=1607417469" mode="widthFix" />
		</view>
		<view class="flex_column" style="width: 100%;padding: 0 140rpx;">
			<text class="but_item all_center" space="emsp" :class="itemIndex == 1 ? 'active':''" @click="changeItem(1)">
				果 决 刚 毅
			</text>
			<text class="but_item all_center" space="emsp" :class="itemIndex == 2 ? 'active':''" @click="changeItem(2)">
				温 文 尔 雅
			</text>
		</view>
		<view class="all_center" style="width: 100%; margin: 40rpx 0;">
			<view class="yellow_font font_20">已选{{ gender }}</view>
		</view>
		<view class="flex_row" style="width: 100%; justify-content: space-around;padding: 30rpx;">
			<text class="but_bot all_center" space="emsp" @click="upBut">
				上 一 步
			</text>
			<text class="but_bot all_center" space="emsp" @click="nextBut">
				确  定
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemIndex:0,
				gender:'',
				character:'',
			}
		},
		
		onLoad(options) {
			this.gender = options.gender
		},
		
		methods: {
			changeItem(val){
				let _this = this;
				this.itemIndex = val
				if( val == 1 ){
					_this.character = '果决刚毅'
				}else{
					_this.character = '温文尔雅'
				}
			},
			
			upBut(){
				uni.navigateBack({})
			},
			
			nextBut(){
				const gender = {
					gender:this.gender,
					character:this.character,
				}
				uni.setStorageSync('gender',gender)
				uni.navigateTo({
					url:'/pages/confirm_role/confirm_role?character='+ this.character + '&gender=' + this.gender
				})
				
				// uni.navigateTo({
				// 	url:'/pages/home/home'
				// })
			}
		}
	}
</script>

<style>
	.top{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 500rpx;
	}
	
	.title{
		width: 180rpx;
		height: 174rpx;
		background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/change_character_img/character_img_gb.png?sign=27490b5490c308f15710d56760c6d68e&t=1607416783');
		background-size: 190rpx 180rpx;
		overflow: visible;
		background-position: center center;
		background-repeat: no-repeat;
		color: #000000;
		font-size: 62rpx;
	}
	
	.title text{
		margin-top: -20rpx;
	}
	
	.top image{
		width: 22rpx;
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
	}
</style>
