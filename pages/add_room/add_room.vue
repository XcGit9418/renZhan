<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				room_id:'',
				timeout: 60000, // 1分钟
				timeoutObj: null,
			}
		},
		
		onLoad(options) {
			let _this = this;
			if( options.room_id ){
				_this.room_id = options.room_id
				if( !uni.getStorageSync('token') || uni.getStorageSync('token') == '' || uni.getStorageSync('token') == 'undefined' ){
					uni.reLaunch({
						url:'/pages/login/login?is_back=true'
					})
				}else{
					_this.SocketInit(); 
					_this.addRoom()
				}
			}
			_this.onSocketMessage(); // 打开成功监听服务器返回的消息
		},
		
		methods: {
			
			
			checkOpenSocket () {
				let _this = this;
				uni.sendSocketMessage({
					data: 'ping',
					 success: (res) => {
						return
					},
					fail: (err) => { // 未连接打开websocket连接
						_this.SocketInit(); 
					}
				});
			},
			
			//加入房间
			addRoom(){
				let _this = this
				let data = {
						"code":'211',
						"room_id":_this.room_id,
					}
				_this.sendSocketMessage(data)
			},
			
			SocketInit() { // 打开连接
				let _this = this
				// uni.closeSocket();
				uni.connectSocket({
					url: 'wss://renzhan.52xml.cn:2348',
				});
				
				
				uni.onSocketOpen(function(res){
					// console.log(JSON.parse(res.data))
					let data = {
						code:'201',
						token:uni.getStorageSync('token'),
						openid:uni.getStorageSync('userInfo').open_id
					}
					
					_this.sendSocketMessage(data) //绑定服务器
				})
				
				uni.onSocketError(function (res) {
				  console.log('WebSocket连接打开失败，请检查！',res);
				});
				// this.onSocketMessage(); // 打开成功监听服务器返回的消息
			},
			
			sendSocketMessage(msg) {
				let _this = this;
				console.log('是否发送消息到服务器？',JSON.stringify(msg))
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					async success(res){
						console.log('发送成功？',res)
					}
				});
			},
			
			onSocketMessage(){
				let _this = this;
				uni.onSocketMessage((res) => {
					console.log('接受服务器消息',JSON.parse(res.data))
					let info = JSON.parse(res.data)
					console.log(info)
					if( JSON.stringify(info).indexOf('你的id为') !== -1 && _this.room_id != 0 ){
						_this.addRoom()
					}
					if( info.code == 200 && info.msg == 'ok' && _this.room_id != 0 && info.data && info.data != '' ){
						console.log('room_id',_this.room_id)
						uni.redirectTo({
							url:'/pages/matching_success/matching_success?info=' + JSON.stringify(info.data) + '&room_id=' + _this.room_id
						})
					}
					this.reset();
				});
			},
			
			// 检测心跳reset
			reset () {
				clearInterval(this.timeoutObj);
				this.start(); // 启动心跳
			},
			// 启动心跳 start 
			start () {
				let self = this;
				this.timeoutObj = setInterval(function(){
					uni.sendSocketMessage({
						data: 'ping',
						 success: (res) => {
							console.log('连接中....');
						},
						fail: (err) => {
							console.log('连接失败重新连接....');
							self.SocketInit();
						}
					});
				}, this.timeout);
			},
		},
	}
</script>

<style>

</style>
