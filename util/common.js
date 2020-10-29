import * as dd from 'dingtalk-jsapi';

let ajaxUrl = '';
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
	ajaxUrl = 'http://10.1.0.136:8011'
}else{
    console.log('生产环境')
	ajaxUrl = `${window.location.protocol}//${window.location.host}`;
}
// 接口地址
export const Aurl = ajaxUrl

// 重新登录
export function resetLogin (datas) {
	dd.ready(function() {
		let site = datas ? datas : uni.getStorageSync('siteInfo')
		dd.runtime.permission.requestAuthCode({
			corpId: site.CorpId, // 企业id
			onSuccess: function(info) {
				uni.request({
				    url: ajaxUrl + '/authenticate', 
				    data: {
				        authcode: info.code
				    },
					method: 'post',
				    header: {
				        "Content-Type": "application/json"
				    },
				    success: (res) => {
						if(res.statusCode == 200) {
							uni.setStorageSync('userInfo', res.data)
							uni.reLaunch({
								url: '../index/index'
							})
						} else {
							uni.showToast({
								title: JSON.stringify(res.data.message) ? JSON.stringify(res.data.message) : '接口出错，请稍后再试',
								icon: 'none'
							})
						}
				    },
					fail: function(err) {
						uni.showToast({
							title: err.response.data ? err.response.data.message : "服务器出错,请退出稍后再试",
							icon: 'none'
						})
					}
				})
			},
			onFail: function(err) {
				uni.showToast({
					title: '登录失败',
					duration: 2000,
					icon: 'none'
				})
			}
		});
	})
}