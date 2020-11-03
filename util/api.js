import {
	resetLogin,
	Aurl
} from './common.js'

function creatRequest(url, method, data, isload = true, loadMsg) {
	let header = {
		"Content-Type": "application/json",
		"Authorization": uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo').auth_token : ""
	};
	return new Promise((resolve, reject) => {
		isload == false ? '' : uni.showLoading({
			title: loadMsg ? loadMsg : '加载中...',
			mask: true
		});
		uni.request({
			url: Aurl + url,
			data: data ? data : '',
			header,
			method: method,
			success: function(res) {
				if (isload) uni.hideLoading()
				if (res.statusCode == 200) {
					resolve(res.data)
				} else if (res.statusCode == 210) {
					uni.showToast({
						title: '登录加载中...',
						icon: 'none'
					})
					// token失效重新登录
					resetLogin()
				} else {
					// message
					uni.showToast({
						title: JSON.stringify(res.data.message),
						icon: 'none'
					})
					reject(res)
				}
			},
			fail: function(err) {
				if (isload) uni.hideLoading()
				uni.showToast({
					title: "请退出应用，稍后重新打开",
					icon: 'none'
				})
				reject(new Error(err))
			}
		})
	})
}
// 获取配置
function getSite() {
	return creatRequest('/ddconfigs', 'get')
}
// 提交配置
function postSite(opt) {
	return creatRequest('/ddconfigs', 'post', opt, true, '提交中...')
}

// 登录
function loginFun(opt) {
	return creatRequest('/authenticate', 'post', opt)
}

// 部门获取
function getDepart(opt) {
	return creatRequest('/departments', 'get', opt, false)
}

// 设置上网开关
function setNetwork(opt) {
	return creatRequest('/surfingNet', 'post', opt, true, '提交中')
}

// 设置管理上网权限
function setLimit(opt) {
	return creatRequest('/surfingControll', 'post', opt, true, '修改中')
}

// 设置审核权限
function setCheck(opt) {
	return creatRequest('/examine', 'post', opt, true, '修改中')
}

module.exports = {
	getSite,
	postSite,
	loginFun,
	getDepart,
	setNetwork,
	setLimit,
	setCheck,
}
