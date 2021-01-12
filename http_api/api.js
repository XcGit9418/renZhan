const API_BASE_URL = "https://renzhan.52xml.cn";
import MD5 from '../common/md5.min.js'

let sign;
//获取当前时间戳
let timestamp = new Date();
// let time = Math.round(new Date() / 1000);
//获取当前时间
var time = new Date().getTime().toString()
const md5Time = time.substring(0,7)
//

const request = (url, method, data) => {
	const md5Url = url.replace(/\//g,'');
	let header = {}; 
	const _url = API_BASE_URL + "/api/" + url;
	return new Promise((resolve, reject) => {
		if (method == "POST") {
			header = {
				"content-type": "application/x-www-form-urlencoded",
				"token":uni.getStorageSync('token') ?  uni.getStorageSync('token'):'',
				"sign":uni.getStorageSync('token') ? MD5( 'api' + md5Url + md5Time + uni.getStorageSync('token')):'',
			}
		}else{
			header = {
				"content-type": "application/json",
				"token":uni.getStorageSync('token') ?  uni.getStorageSync('token'):'',
				"sign":uni.getStorageSync('token') ? MD5( 'api' + md5Url + md5Time + uni.getStorageSync('token')):'',
			}
		}
		console.log('api' + md5Url + md5Time + uni.getStorageSync('token'))
		uni.request({
			url: _url,
			method: method,
			data: data,
			header,
			success(res) {
				console.log(res)
				switch (res.data.code) {
					case 0: case 200:
						{
							resolve(res.data);
							break;
						}
					
					case 106: case 90002: case 90003: 
						{
							console.log('106路径',res.data);
							uni.removeStorageSync('token');
							uni.getStorageSync('token');
								let that = this;
								// 自动登录
								uni.login({
									success: (rests) => {
										console.log('wx.login',rests);
										// 检测授权
										uni.getSetting({
											success: (resCode) => {
												console.log(resCode)
												if (resCode.authSetting['scope.userInfo']) {
													uni.getUserInfo({
														success: (result) => {
															console.log(result)
															// 请求接口
															let enterUrl = API_BASE_URL + "/api/login/wx_login"
															uni.request({
																url: enterUrl,
																method: method,
																header: {
																	"content-type": "application/x-www-form-urlencoded"
																},
																data: {
																	code: rests.code || 'unknow',
																	encryptedData: result.encryptedData || 'unknow',
																	iv: result.iv || 'unknow',
																	rawData: result.rawData || 'unknow',
																	signature: result.signature || 'unknow',
																},
																success(loginRes) {
																	console.log(loginRes);
																	uni.setStorageSync('token', loginRes.data.data.token);
																	console.log('自动登录成功 token', loginRes.data.data.token)
																	request(url, method, data);
																},
																fail(loginErr) {
																	console.log('loginErr',loginErr);
																	setTimeout(() => {
																		uni.showModal({
																			title: '错误',
																			content: loginErr.data.msg,
																			showCancel: false,
																			confirmText: '确定',
																			confirmColor: '#3CC51F',
																		});
																	}, 200)
																}
															})
														},
														fail: () => {},
														complete: () => {}
													});
												} else {
													console.log('未授权')
													//提示跳转到登录界面
													uni.reLaunch({
														url:'/pages/login/login',
													})
												}
											},
											fail: () => {},
											complete: () => {}
										});
									},
									fail: () => {},
									complete: () => {}
								});
								// uni.showModal({
								//     title: "提示",
								//     content: "您还没有登录,前往登陆",
								//     showCancel: true,
								//     cancelText: "取消",
								//     cancelColor: "#000000",
								//     confirmText: "确定",
								//     confirmColor: "#3CC51F",
								//     success: result => {
								//         if (result.confirm) {
								//             var url = {
								//                 1: "/pagesUser/pages/mine/mine",
								//                 2: "/pagesDrive/pages/mine/mine"
								//             };
								//             uni.navigateTo({
								//                 url: url[type]
								//             });
								//         }
								//     },
								//     fail: () => { },
								//     complete: () => { }
								// });
							// reject(res);
							break;
						}
					default:
						{

							reject(res);
							break;
						}
				}
			},
			fail(err) {
				reject('这里是失败',err);
			}
		});
	});
};

module.exports = {
	//登录
	login: data => {
		return request("login/wx_login", "POST", data);
	},
	//获取规则详情
	getRules: data => {
		return request("api/rules_of_the_game","POST", data);
	},
	//更新信息
	upDateUserInfo: data => {
		return request("api/user_info","POST",data);
	},
	//获取个人信息
	getUserInfo: data => {
		return request("api/user","POST",data);
	},
	//用户签到
	userSign: data => {
		return request("api/user_sign", "POST", data);
	},
	//获取对战数据
	getBattle: data => {
		return request("api/battle", "POST", data)
	},
	//获取排名
	getRank:data => {
		return request("api/ranking_list", "POST", data)
	}

};
