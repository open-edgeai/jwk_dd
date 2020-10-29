<template>
	<view>
		<!-- 模态框 -->
		<u-mask :show="isShow" @click="closeClick">
			<view class="warp">
				<view class="rect" @tap.stop>
					<p>选择上网权限</p>
					<view class="tips">
						提示：如果勾选部门后，则会选中部门下的所有人
					</view>
					<u-radio-group size="40" v-model="radios" @change="changeRadio">
						<u-radio 
						    label-size="32"
							v-for="(item, index) in radioList" :key="index" 
							:name="item.id"
						>
							{{item.name}}
						</u-radio>
					</u-radio-group>
					<view class="btn">
						<view class="sub-btn" @click="subClick">提交</view>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		props: ["isModal"],
		data () {
			return {
				radios: 0,
				radioList: [{name: '开通上网',id:0},{name: '关闭上网',id:1}],
			}
		},
		computed: {
			isShow () {
				if(this.isModal) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			changeRadio (e) {
				this.radios = e
			},
			subClick () {
				this.$emit("subClick",this.radios)
			},
			closeClick () {
				this.$emit("closeClick", false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	
	.rect {
		width: 80%;
		height: 400rpx;
		background-color: #fff;
		border-radius: 28rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		p {
			font-size: 34rpx;
			color: #303133;
			border-bottom: 1px solid #EBEEF5;
			display: block;
			width: 100%;
			text-align: center;
			padding: 10rpx 0 20rpx 0;
		}
		.tips{
			text-align: center;
			font-size: 24rpx;
			color: #909399;
		}
		.btn {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-bottom: 20rpx;
			.sub-btn {
				width: 45%;
				height: 80rpx;
				background-color: #2979ff;
				color: white;
				line-height: 80rpx;
				text-align: center;
				border-radius: 16rpx;
				font-size: 30rpx;
			}
		}
	}
</style>
