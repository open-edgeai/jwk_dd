<template>
	<view>
		<view class="user-info">
			<view class="user">
				<img :src="user.pic" alt="">
				<p>{{user.name}}</p>
			</view>
		</view>
		<!-- 只允许boss管理员修改 -->
		<view class="items" @click="editClick" v-if="user.isAdmin">
			修改参数配置
			<u-icon name="arrow-right" color="#c8c9cc" size="40"></u-icon>
		</view>
		<view class="items" @click="reloadClick">
			刷新应用
			<u-icon :class="{refresh: isReload}" name="reload" color="#c8c9cc" size="40"></u-icon>
		</view>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import { resetLogin } from '../../util/common.js'
	export default {
		data () {
			return {
				user: {
					pic: require('../../static/user.png'),
					name: '用户名',
					isAdmin: false
				},
				isReload: false,
				historyReLoad: true
			}
		},
		mounted () {
			this.getUser ()
		},
		onShow () {
			dd.ready(function() {
				dd.biz.navigation.setTitle({
					title: "我的"
				})
			})
		},
		methods: {
			getUser () {
				let userInfo = uni.getStorageSync('userInfo')
				if(userInfo) {
					this.user = {
						pic: userInfo.avatar !== '' ? userInfo.avatar : require('../../static/user.png'),
						name: userInfo.name,
						isAdmin: userInfo.isAdmin
					}
				}
			},
			editClick () {
				uni.navigateTo({
					url: '../editSite/editSite'
				})
			},
			reloadClick () {
				this.isReload = true
				// 防止请求中频繁点击
				if(this.historyReLoad) {
					resetLogin()
				}
				this.historyReLoad = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		width: 100%;
		height: 350rpx;
		background: radial-gradient(#8CC5FF, #2979ff);
		display: flex;
		justify-content: center;
		align-items: center;
		.user {
			img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: 0 auto;
				display: block;
			}
			p {
				text-align: center;
				color: white;
				font-size: 32rpx;
				padding-top: 20rpx;
			}
		}
	}
	.items {
		margin: 40rpx auto;
		width: 90%;
		height: 120rpx;
		border-radius: 16rpx;
		background-color: white;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx 0 30rpx;
		font-size: 32rpx;
		color: #909399;
		.refresh {
			animation: DH 0.8s infinite linear;
		}
	}
	@keyframes DH {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
