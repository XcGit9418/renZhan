<script>
	export default {
		data() {
			return {
					timeout: 60000, // 1分钟
					timeoutObj: null,
				}
		},
		
		onLaunch: function(options) {
			let _this = this;
			uni.loadFontFace({
			  family: 'jiangxizhuokai',
			  source: 'url("https://renzhan.52xml.cn/jiangxizhuokai.TTF")',
			  success() {
			      console.log('success')
			  },
				complete(com){
					console.log('字体调用结果==',com)
				}
			})
			
			console.log('App Launch',options)
			if( options.query.room_id ){
				uni.reLaunch({
					url:'/pages/add_room/add_room?room_id=' + options.query.room_id
				})
				return
			}
			// if( !uni.getStorageSync('token') || uni.getStorageSync('token') == '' || uni.getStorageSync('token') == 'undefined' ){
			// 	uni.reLaunch({
			// 		url:'/pages/login/login'
			// 	})
			// }
			if( uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo') != '' && uni.getStorageSync('userInfo') != 'undefined' && uni.getStorageSync('userInfo') != undefined && uni.getStorageSync('userInfo') != null && uni.getStorageSync('userInfo') != 'null' ){
				if( uni.getStorageSync('userInfo').gender != '' && uni.getStorageSync('userInfo').gender != null && uni.getStorageSync('userInfo').gender != 'null' ){
					uni.reLaunch({
						url:'/pages/home/home'
					})
				}
			} 
			if( uni.getStorageSync('gender') && uni.getStorageSync('gender').gender && uni.getStorageSync('gender').character ){
				uni.reLaunch({
					url:'/pages/home/home'
				})
			}

			// this.innerAudioContext.autoplay = true;
			// this.innerAudioContext.loop = true;
			// this.innerAudioContext.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
			// this.innerAudioContext.onPlay(() => {
			//   console.log('开始播放');
			// });
			// this.innerAudioContext.onEnded((res) => {
			// 	console.log('播放结束',res)
			// 	_this.innerAudioContext.Play()
			// })
			// this.innerAudioContext.onError((res) => {
			//   console.log(res.errMsg);
			//   console.log(res.errCode);
			// });

			// .判断是否已连接
			// this.SocketInit();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.closeSocket();
		},

		methods: {
			// async	SocketInit() { // 打开连接
			// let _this = this
			// 	await	uni.connectSocket({
			// 		url: 'wss://renzhan.52xml.cn:2348',
			// 		success(res) {
			// 			console.log('连接成功 connectSocket=', res);
			// 		},
			// 		fail(err) {
			// 			console.log('连接失败 connectSocket=', err);
			// 		}
			// 	});
			// 	await	uni.onSocketOpen((res) => {
			// 		console.log('WebSocket连接已打开！====', res);
			// 		var body = {
			// 			code:'201',
			// 			token:uni.getStorageSync('token'),
			// 			openid:uni.getStorageSync('userInfo').open_id
			// 		}
			// 		uni.sendSocketMessage({
			// 			data:JSON.stringify(body),
			// 			async success(data){
			// 				console.log(data,'开门成功')
			// 			}
			// 		})
			// 	});
			// 	uni.onSocketError(function (res) {
			// 	  console.log('WebSocket连接打开失败，请检查！',res);
			// 	});
			// 	await	this.onSocketMessage(); // 打开成功监听服务器返回的消息
			// },
			// //	打开成功监听服务器返回的消息
			// onSocketMessage() { // 消息
			// 	this.timeout = 60000;
			// 	this.timeoutObj = null;
			// 	uni.onSocketMessage((res) => {
			// 		console.log('接受服务器消息',res)
			// 		this.getSocketMsg(res.data); // 监听到有新服务器消息
			// 	});
			// },
			// // 监听到有新服务器消息
			// getSocketMsg(reData) { // 监听到服务器消息
			// 	console.log('监听到服务器消息 reData=', reData);
			// 	let info = JSON.parse(reData);
			// 	console.log('app onMessage=', info)
			// },
			// // 检测心跳reset
			// reset() {
			// 	clearInterval(this.timeoutObj);
			// 	this.start(); // 启动心跳
			// },
			// // 启动心跳 start 
			// start() {
			// 	let self = this;
			// 	this.timeoutObj = setInterval(function() {
			// 		uni.sendSocketMessage({
			// 			data: 'ping',
			// 			success: (res) => {
			// 				console.log('连接中....');
			// 			},
			// 			fail: (err) => {
			// 				console.log('连接失败重新连接....');
			// 				self.openConnection();
			// 			}
			// 		});
			// 	}, this.timeout);
			// }
		},
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./app.css");

	page,
	view,
	scroll-view,
	text,
	image,
	textarea,
	button,
	input {
		box-sizing: border-box;
	}

	@font-face {
		font-family: 'jiangxizhuokai';
		src: url('https://7863-xc-9418-mgm4q-1304458187.tcb.qcloud.la/font/jiangxizhuokai.TTF?sign=c0c76131a1a0798fec48806c3b3c6da3&t=1607440934') format('truetype');
		/* src: url('https://renzhan.52xml.cn/jiangxizhuokai.TTF') format('truetype'); */
	}

	page {
		width: 750rpx;
		background-color: #000000;
		font-size: 28rpx;
		font-family: 'jiangxizhuokai';
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
