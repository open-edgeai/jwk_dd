<template>
	<!-- 部门列表 -->
	<view class="department" v-if="departList.length > 0">
		<view class="depart-item" v-for="item in departList" :key="item.id" @click="departClick(item.id)">
			<view class="name">{{item.name}}</view>
			<view class="right-con">
				<u-icon name="arrow-right" color="#C0C4CC" size="36"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["departList"],
		methods: {
			departClick (e) {
				this.$emit("departClick",e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.department {
		width: 95%;
		margin: 0 auto 20rpx;
		.depart-item {
			width: 100%;
			height: 140rpx;
			line-height: 140rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EBEEF5;
			.name {
				font-size: 36rpx;
				color: #303133;
				margin-left: 10rpx;
				.nums {
					color: #909399;
					margin-left: 10rpx;
				}
			}
			.right-con {
				flex: 1;
				height: 140rpx;
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
