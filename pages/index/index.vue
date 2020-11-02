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
				<limit-item ref="limit"></limit-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import NetItem from '../../components/index/NetItem.vue'
	import LimitItem from '../../components/index/LimitItem.vue'
	import swiperMixin from '../../minxin/swiperHe.js'
	export default {
		mixins: [swiperMixin],
		data() {
			return {
				tabs: [{ 
					name: '上网管理'
				}, {
					name: '管理权限分配'
				}],  
				current: 0, // tabs组件的current值，表示当前活动的tab选项
			}
		},
		components: {
			NetItem,
			LimitItem
		},
		methods: {
			tabsChange(index) {
				this.swiper.swiperCurrent = index;
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
