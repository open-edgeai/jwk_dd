<template>
	<!-- 人员列表 -->
	<view class="man">
		<u-checkbox-group>
			<u-checkbox
				v-model="item.checked" 
				:name="item.userid"
				v-for="(item,index) in manList" 
				:key="index"
				shape="circle"
				@change="manCheckItem($event,item)"
			>
				<view class="man-item" >
					<view class="pic">
						<image v-if="item.avatar === ''" src="../../../static/userPic.png"></image>
						<image v-else :src="item.avatar"></image>
					</view>
					<view class="info">
						<view class="info-con">
							<view class="name">
								{{item.name}} 
								<text class="tag blue" v-if="item.isBoss">负责人</text> 
								<text class="tag green" v-if="item.isAdmin">管理员</text>
								<text class="tag" v-if="item.isLeader">主管</text> 
							</view>
							<view class="position" v-if="item.position !== null">{{item.position}}</view>
						</view>
						<view class="limit">
							<text v-if="item.isSurfingNet">可上网</text>
							<text class="red" v-else>未开通</text>
						</view> 
					</view>
				</view>
			</u-checkbox>
		</u-checkbox-group>
		<u-loadmore :status="loadstatus" icon-type="flower" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		props: ["manList","loadText","loadstatus"],
		methods: {
			manCheckItem (e,item) {
				let data = {
					event: e,
					value: item
				}
				this.$emit("manCheckItem", data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.man {
		width: 95%;
		margin: 0 auto 100rpx;
		.man-item {
			width: 100%;
			height: 150rpx;
			display: flex;
			align-items: center;
			.pic {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				overflow: hidden;
				flex-shrink: 0;
				border: 1px solid #E4E7ED;
				position: relative;
				image {
					width: 100%;
					height: 110rpx;
				}
			}
			.info {
				width: 540rpx;
				height: 150rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-left: 20rpx;
				border-bottom: 1px solid #EBEEF5;
				.info-con {
					.name {
						width: 100%;
						height: 60rpx;
						font-size: 32rpx;
						color: #303133;
						display: flex;
						align-items: center;
						line-height: 38rpx;
						.tag {
							margin-left: 15rpx;
							padding: 0 10rpx 0 10rpx;
							border: 1px solid #909399;
							color: #909399;
							font-size: 24rpx;
							border-radius: 8rpx;
						}
					}
					.position {
						width: 100%;
						color: #606266;
						font-size: 28rpx;
						padding-top: 10rpx;
					}
				}
				.limit {
					font-size: 28rpx;
					color: #2979ff;
				}
			}
		}
	}
	.u-checkbox:last-child .man-item {
		.info {
			border-bottom: none;
		}
	}
	.green {
		color: #19be6b !important;
		border: 1px solid #19be6b !important;
	}
	.blue {
		color: #2979ff !important;
		border: 1px solid #2979ff !important;
	}
	.red {
		color: #fa3534 !important;
	}
</style>
