<template>
	<!-- 部门列表 -->
	<view class="department" v-if="departList.length > 0">
		<u-checkbox-group style="width: 100%;">
			<view class="depart-item" v-for="item in departList" :key="item.id">
				<u-checkbox
					v-model="item.checked"
					:name="item.id"
					shape="circle"
					@change="checkItem"
				> 
					<!-- <view class="name">{{item.name}} <text class="nums">({{item.nums}})</text></view> -->
					<view class="name">{{item.name}}</view>
				</u-checkbox>
				<view class="right-con" @click="departClick(item.id)">
					<u-icon name="arrow-right" color="#C0C4CC" size="36"></u-icon>
				</view>
			</view>
		</u-checkbox-group>
	</view>
</template>

<script>
	export default {
		props: ["departList"],
		methods: {
			checkItem (e) {
				// 单个部门选中
				this.$emit("checkItem",e)
			},
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
