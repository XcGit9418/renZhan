// import $api from '@/api/api.js';

const utils = {
		// 成功弹窗
		showSuccess: function(msg, callback) {
			uni.showToast({
				title: msg,
				icon: 'success',
				mask: true,
				duration: 1500,
				success: function() {
					callback && (setTimeout(function() {
						callback();
					}, 1500));
				}
			})
		},
		// 弹窗
		_showModal: function(msg, callback) {
			uni.showModal({
				title: '提示',
				content: msg,
				mask: true,
				showCancel: false,
				success: function(res) {
					callback && callback();
				}
			})
		},

		//数字缩略
		get_number_txt: function($number) {
			var $b = 1000;
			var $c = 10000;

			if ($number > $b) {
				if ($number < $c) {
					return ($number / $b).toFixed(1) + 'K';
				} else {
					return ((($number / $c) * 10).toFixed(0) / 10) + 'W';
				}
			} else {
				return $number;
			}
			console.log('===', $number)
		},

		showError: function(msg, callback) {
			uni.showModal({
				title: '提示',
				content: msg,
				showCancel: false,
				success: function(res) {
					callback && callback();
				}
			})
		},

		/**
		 * 更新token
		 */
		// _get_token: function() {
		// 	let _this = this;
		// 	uni.login({
		// 		success: function(it) {
		// 			uni.request({
		// 				url: $api.https + $api.getToken,
		// 				data: {
		// 					code: it.code
		// 				},
		// 				method: 'GET',
		// 				success: function(res) {
		// 					uni.setStorageSync("tokenInfo", res.data.data)
		// 					// console.log('更新后===', uni.getStorageSync('tokenInfo').token)
		// 				},
		// 				fail: function(ret) {
		// 					uni.showModal({
		// 						title: '提示',
		// 						content: '发生未知错误【' + ret.data.message + '】，错误码：' + ret.data.code,
		// 						showCancel: false,
		// 						confirmText: '我知道了',
		// 						confirmColor: '#686DFF',
		// 						success: res => {
		// 							uni.navigateBack()
		// 						},
		// 					});
		// 				},
		// 			});
		// 		}
		// 	})
		// },

		// _get_from: function(url, data, success, login, fail, complete) {
		// 	let _this = this;
		// 	data = data || {},
		// 		uni.request({
		// 			url: $api.https + url,
		// 			method: 'GET',
		// 			data:data,
		// 			header: {
		// 				'Authorization': uni.getStorageSync('tokenInfo').token
		// 			},
		// 			success: res => {
		// 				uni.hideLoading()
		// 				if (res.statusCode !== 200 || typeof res.data !== 'object') {
		// 					console.log(res);
		// 					uni.showModal({
		// 						title: '网络请求出错'
		// 					});
		// 					return false;
		// 				} else if (res.data.code == 401) {
		// 					// 登录态失效, 重新登录
		// 					uni.hideLoading();
		// 					uni.login({
		// 						success: function(it) {
		// 							uni.request({
		// 								url: $api.https + $api.getToken,
		// 								data: {
		// 									code: it.code
		// 								},
		// 								method: 'GET',
		// 								success: function(res) {
		// 									uni.setStorageSync("tokenInfo", res.data.data)
		// 									_this._get_from(url, data, success, login, fail, complete)
		// 								},
		// 								fail: function(ret) {
		// 									console.log('错误返回===', ret)
		// 									uni.showToast({
		// 										title: '网络错误',
		// 										icon: 'none'
		// 									})
		// 								},
		// 							});
		// 						}
		// 					})
		// 					return false;
		// 				} else {
		// 					success && success(res.data);
		// 				}
		// 			},
		// 			fail: (ret) => {
		// 				uni.showModal({
		// 					title: '提示',
		// 					content: '发生未知错误，错误码：' + ret.data.code,
		// 					showCancel: false,
		// 					confirmText: '我知道了',
		// 					confirmColor: '#686DFF',
		// 					success: res => {
		// 						uni.navigateBack({
		// 							fail(){
		// 								uni.switchTab({
		// 									url:'/pages/home/home'
		// 								})
		// 							}
		// 						})
		// 					},
		// 				});
		// 			},
		// 		});
		// },

	// 	_post_form: function(url, data, success, fail, complete) {
	// 		var _this = this;
	// 		uni.request({
	// 				url: $api.https + url,
	// 				header: {
	// 					'content-type': 'application/json',
	// 					'Authorization': uni.getStorageSync('tokenInfo').token,
	// 				},
	// 				method: 'POST',
	// 				data: data,
	// 				success: function(res) {
	// 					if (res.statusCode !== 200 || typeof res.data !== 'object') {
	// 						console.log(res);
	// 						uni.showModal({
	// 							title: '提示',
	// 							content: '网络请求出错',
	// 							showCancel: false
	// 						});
	// 						return false;
	// 					}
	// 					if (res.data.code === 401) {
	// 						// 登录态失效, 重新登录
	// 						uni.hideLoading();
	// 						uni.login({
	// 							success: function(it) {
	// 								uni.request({
	// 									url: $api.https + $api.getToken,
	// 									data: {
	// 										code: it.code
	// 									},
	// 									method: 'GET',
	// 									success: function(res) {
	// 										uni.setStorageSync("tokenInfo", res.data.data)
	// 										_this._post_form(url, data, success, login, fail, complete);
	// 									},
	// 									fail: function(ret) {
	// 										console.log('错误返回===', ret)
	// 										uni.showToast({
	// 											title: '网络错误',
	// 											icon: 'none'
	// 										})
	// 									},
	// 								});
	// 							}
	// 						})
	// 						return false;
	// 					} else{
	// 						success && success(res.data);
	// 				}
	// 			},
	// 			fail: function(res) {
	// 				_this.showError(res.errMsg, function() {
	// 					fail && fail(res);
	// 				})
	// 			},
	// 			complete: function(res) {
	// 				complete && complete(res);
	// 			}
	// 		});
	// },


	//去除空白
	sliceNull: function(lrc) {
		var result = []
		for (var i = 0; i < lrc.length; i++) {
			if (lrc[i][1] == "") {} else {
				result.push(lrc[i]);
			}
		}
		return result
	},



	// 提取汉字
	getChinese: function(str) {
		if (str != null && str != "") {
			var reg =
				/[\u4e00-\u9fa5]|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;

			return str.match(reg).join("");
		} else {
			return ""
		}
	},

	// 去除汉字
	removeChinese: function(str) {
		if (str != null && str != "") {
			var reg =
				/[\u4e00-\u9fa5]|[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
			return str.replace(reg, "");
		} else {
			return ""
		}
	},

};

export default utils
