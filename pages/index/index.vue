<template>
	<view>
		<view class="tabs" v-if="isAdmin">
			<u-tabs-swiper 
				ref="uTabs" 
				:bar-width="100" 
				:font-size="32" 
				:list="tabs" 
				:current="current" 
				:is-scroll="false"
				swiperWidth="750"
				@change="tabsChange" 
			>
			</u-tabs-swiper>
		</view>

		<swiper 
			class="swipers" 
			:style="{height: swiper.winHeight + 'rpx', top: swiper.swiperTop + 'rpx'}" 
			:current="swiper.swiperCurrent" 
			@transition="transition" 
			@animationfinish="animationfinish"
		>
			<swiper-item>
				<net-item></net-item>
			</swiper-item>
			<swiper-item v-if="isAdmin">
				<scroll-view :style="{height: swiper.winHeight + 'rpx'}" scroll-y @scrolltolower="onreachBottom">
					<limit-item ref="limit"></limit-item>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import NetItem from '../../components/index/NetItem.vue'
	import LimitItem from '../../components/index/LimitItem.vue'
	export default {
		data() {
			return {
				tabs: [{ 
					name: '上网管理'
				}, {
					name: '管理权限分配'
				}],  
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiper: {
					swiperCurrent: 0, // swiper当前索引
					winHeight: 0,  // swiper高度
					swiperTop: 88,  // swiper顶部距离
				},
				isAdmin: true,
			}
		},
		components: {
			NetItem,
			LimitItem
		},
		created () {
			this.statusFun ()
		},
		methods: {
			statusFun () {
				let userInfo = uni.getStorageSync('userInfo')
				this.isAdmin = userInfo.isAdmin
				this.isAdmin ? this.swiper.swiperTop = 88 : this.swiper.swiperTop = 0
				this.swiperHeFun(this.swiper.swiperTop)
			},
			tabsChange(index) {
				this.swiper.swiperCurrent = index;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				// 所在位置管理权限分配
				if(!this.$refs.limit.mans.isNotMan) {
					this.$refs.limit.mans.loadstatus = 'loading'
					this.$refs.limit.offset += 10
					this.$refs.limit.getAjax () 
				}
			},
			transition(e) {
				if(this.$refs.uTabs) {
					let dx = e.detail.dx;
					this.$refs.uTabs.setDx(dx);
				}
			},
			animationfinish(e) {
				if(this.$refs.uTabs) {
					let current = e.detail.current;
					this.$refs.uTabs.setFinishCurrent(current);
					this.swiper.swiperCurrent = current;
					this.current = current;
				}
			},
			// swiper高度
			swiperHeFun(num) {
				var that = this;
				uni.getSystemInfo({
					success: function(res) {
						var clientHeight = res.windowHeight,
							clientWidth = res.windowWidth,
							rpxU = 750 / clientWidth;
						var calc = parseInt(clientHeight * rpxU - num);
						that.swiper.winHeight = calc
					}
				});
			},
		},
		onShow () {
			dd.ready(function() {
				dd.biz.navigation.setTitle({
					title: "公司组织结构"
				})
			})
		},
	}
</script>
<style lang="scss" scoped>
	.tabs {
		border-bottom: 15rpx solid #F2F6FC;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 88rpx;
		background-color: white;
		// z-index: 2;
	}
	.swipers {
		position: fixed;
		left: 0;
		width: 100%;
	}
</style>
