<template>
	<view>
		<!-- <view class="men_item" :style="'background-image: url(' + men_url + ');'">
			<view class="row_center_between">
				<text class="men_font" style="">男</text>
			</view>
		</view> -->
		<view class="men_item" style="top:160rpx" @click.stop="changeA">
			<image src="../../static/img/men.png" style="width: 100%;" mode="widthFix"></image>
		</view>
		<view class="men_item" style="top:680rpx" @click.stop="changeB">
			<image src="../../static/img/women.png" style="width: 100%;" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		
		onLoad() {
			let _this = this;
		},
		
		methods: {
			changeA(){
				console.log('AAA')
				uni.navigateTo({
					url:'/pages/change_character/change_character?gender=' + '男性'
				})
			},
			changeB(){
				console.log('BBB')
				uni.navigateTo({
					url:'/pages/change_character/change_character?gender=' + '女性'
				})
			},
		}
	}
</script>

<style>
	page{
		width: 600rpx;
		margin: 0 auto;
	}
	
	.men_item{
		width: 600rpx;
		position: absolute;
/* 		height: 560rpx;
		opacity: 1;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: 100%;
		background-repeat: no-repeat; */
	}
	
/* 	.men_font{
		font-size: 166rpx;
		font-family: jiangxizhuokai;
		font-weight: 400;
		line-height: 108px;
		color: #000000;
		opacity: 1;

	} */

</style>
