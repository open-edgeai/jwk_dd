<template>
	<!-- 人员列表 -->
	<view>
		<view class="man">
			<view class="man-item" v-for="(item,index) in manList" :key="index">
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
					<view class="limit" v-if="!item.isAdmin">
						<view class="limit-item">
							<text :class="{blueTxt: item.isSurfingControll}">{{item.netTxt}}:</text>
							<u-switch @change='limitChange($event,index,item.userid)' v-model="item.isSurfingControll"></u-switch>
						</view>
						<view class="limit-item">
							<text :class="{blueTxt: item.isExamine}">{{item.exMaineTxt}}:</text>
							<u-switch @change='checkChange($event,index,item.userid)' v-model="item.isExamine"></u-switch>
						</view>
					</view> 
				</view>
			</view>
		</view>
		<u-loadmore style="padding-top: 20rpx;" :status="loadstatus" icon-type="flower" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		props: ["manList","loadText","loadstatus"],
		methods: {
			limitChange (e,index,userid) {
				this.$emit("limitChange",e,index,userid)
			},
			checkChange (e,index,userid) {
				this.$emit("checkChange",e,index,userid)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.man {
		width: 95%;
		margin: 0 auto;
		.man-item {
			width: 100%;
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
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-left: 20rpx;
				border-bottom: 1px solid #EBEEF5;
				padding-bottom: 30rpx;
				.info-con {
					padding-top: 30rpx;
					flex-shrink: 0;
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
					color: #606266;
					.limit-item {
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						padding-top: 25rpx;
						text {
							margin-right: 20rpx;
						}
					}
				}
			}
		}
	}
	.man-item:last-child {
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
	.blueTxt {
		color: #2979ff !important;
	}
</style>
