<template>
	<view>
		<view class="top">
<!-- 		<swiper 
				class="top" 
				:indicator-dots="false" 
				:autoplay="false" 
				:interval="3000" 
				:duration="1000" 
				@change="itemChange"
				:current="itemIndex"> -->
			<image 
				@click="nextBut(itemIndex)"
				src="../../static/ico/left_ico.png" 
				style="width: 42rpx;height: 80rpx;" />
			<!-- <swiper-item class="role_item" v-for="(item,index) in changeList" :key="index"> -->
				<!-- <view class="flex_column role_item" v-for="(item,index) in changeList" :key="index" v-if="index == itemIndex"> -->
				<swiper 
					style="width: calc(100% - 84rpx);height: 100%;"
					:indicator-dots="false"
					:circular="true"
					:autoplay="false" 
					:interval="3000" 
					:duration="1000" 
					@change="itemChange"
					:current="itemIndex">
					<swiper-item style="width: 100%;height: 100%;" v-for="(item,index) in changeList" :key='index'>
						<view class="flex_column role_item">
							<view class="white_font" style="font-size: 120rpx;">{{ gender }}</view>
							<image :src="item.src" style="width: 330rpx;height: 594rpx;"></image>
							<view class="yellow_font" style="font-size: 54rpx;">{{ character }}</view>
						</view>
					</swiper-item>
				</swiper>
			<!-- </swiper-item> -->
			<image 
				@click="nextBut(itemIndex)"
				src="../../static/ico/right_ico.png" 
				style="width: 42rpx;height: 80rpx;" />
		<!-- </swiper> -->
		</view>
		<text class="but_bot all_center" space="emsp" @click="sumbit">
			确  定
		</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemIndex:0,
				changeList:[
					{
						role:'男性',
						src:'https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/men.png?sign=a73efdbaf4a7acfcb1d13fc5abebae49&t=1607358347',
						character:'果决刚毅'
					},
					{
						role:'女性',
						src:'https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/women.png?sign=49fb83a02661d1a329e9b4e81b12d671&t=1607415073',
						character:'温文尔雅'
					},
				],
				
				gender:'',
				character:'',
			}
		},
		
		onLoad( options ) {
			this.character = options.character
			this.gender = options.gender
		},
		
		methods: {
			nextBut(val){
				if( val == 0 ){
					this.itemIndex = 1
				}else{
					this.itemIndex = 0
				}
			},
			
			itemChange(e){
				this.itemIndex = e.detail.current
			},
			
			sumbit(){
				let _this = this;
				// .判断是否已连接
				// _this.SocketInit();
				uni.reLaunch({
					url:'/pages/home/home'
				})
				// uni.reLaunch({
				// 	url:'/pages/change_pattern/change_pattern?is_show=2'
				// })
			},
			
		}
	}
</script>

<style>
	page{
		padding: 0 30rpx;
	}
	
.top{
	width: 100%;
	margin: 0 auto;
	height: 860rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.role_item{
	width: 100%;
	align-items: center;
	height: 100%;
	justify-content: space-between;
	background-image: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/img/men_swiper.png?sign=2eae1045468eb81c7f9e50e1f6a2a8c8&t=1607357393');
	background-size: 80% 88%;
	background-repeat: no-repeat;
	background-position: center 80rpx;
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
</style>
