<template>
	<view>
		<!-- 部门标签 -->
		<scroll-view class="scroll" :scroll-into-view="scrollIndex" scroll-x="true">
			<view 
				:style="{color: index !== crumbsList.length - 1 ? '#2979ff' : '#606266'}" 
				class="scroll-box" 
				v-for="(item, index) in crumbsList" 
				:key="item.id"
				:id='"scroll"+ item.id'
				@click="crumbsClick(item.id, index)"
			>
				{{item.name}}
				<u-icon v-if="index !== crumbsList.length - 1" class="jt-icon" name="arrow-right" color="#C0C4CC" size="28"></u-icon>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ["crumbsList","scrollIndex"],
		methods: {
			crumbsClick (id,index) {
				if(index !== this.crumbsList.length - 1) {
					this.$emit("crumbsClick", id)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		overflow: hidden;
		white-space: nowrap;
		box-sizing: border-box;
		padding: 0 30rpx 0 30rpx; 
		.scroll-box {
			display: inline-block;
			font-size: 34rpx;
			color: #606266;
			.jt-icon {
				margin: 0 10rpx 0 10rpx;
			}
		}
	}
</style>
