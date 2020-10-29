<template>
	<view class="box">
		<view class="pic-border">
			<view class="logo"></view>
			<image src="../../static/logo.png"></image>
		</view>
		<text class="txt">{{txt}}</text>
	</view>
</template>

<script>
	import API from '../../util/api.js'
	import {resetLogin} from '../../util/common.js'
	export default {
		data () {
			return {
				txt: '欢迎来到极网控'
			}
		},
		onReady () {
			// 清理所有缓存
			uni.clearStorageSync()
		},
		onLoad () {
			this.getSite ()
		},
		methods: {
			getSite () {
				this.txt = '欢迎来到极网控,页面加载中...'
				API.getSite().then(res => {
					if(res.CorpId) {
						uni.setStorageSync('siteInfo',res)
						resetLogin(res)
					} else {
						uni.showToast({
							title: "该应用暂未配置钉钉参数",
							icon: 'none'
						})
						this.txt = '请联系管理员在极网控管理系统上配置好钉钉相关参数后才可以正常使用'
					}
				}).catch(() => {
					this.txt = '系统网络出错，请退出稍后再试'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.pic-border {
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
			margin: 100rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 5rpx solid #2979ff;
			position: relative;
			.logo {
				width: 240rpx;
				height: 240rpx;
				border-radius: 50%;
				animation: DH 3s infinite linear;
				background: radial-gradient(circle at 100px 100px, #99AAFF, #072DE5);
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -120rpx;
				margin-top: -120rpx;
			}
			image {
				width: 154rpx;
				height: 191rpx;
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 2;
				margin-left: -77rpx;
				margin-top: -95.5rpx;
			}
		}
		.txt {
			width: 70%;
			margin: 0 auto;
			font-size: 36rpx;
			color: #606266;
			display: block;
			text-align: center;
		}
	}
	@keyframes DH{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
