<template>
	<view>
		<view class="tips">
			<u-icon class="tips-icon" name="info-circle" color="#fcbd71" size="30"></u-icon>
			请仔细填写,错误填写将会导致无法使用
		</view>
		<view class="site-con">
			<u-form class="forms" :model="form" ref="uForm">
				<u-form-item :label-style="{fontSize: '30rpx'}" label-position="top" label="AgentId:(以下都支持复制粘贴)" prop="AgentId">
					<u-input v-model="form.AgentId" placeholder="请输入AgentId" />
				</u-form-item>
				<u-form-item :label-style="{fontSize: '30rpx'}" label-position="top" label="AppKey:" prop="AppKey">
					<u-input v-model="form.AppKey" placeholder="请输入AppKey" />
				</u-form-item>
				<u-form-item :label-style="{fontSize: '30rpx'}" label-position="top" label="AppSecret:" prop="AppSecret">
					<u-input v-model="form.AppSecret" placeholder="请输入AppSecret" />
				</u-form-item>
				<u-form-item :label-style="{fontSize: '30rpx'}" label-position="top" label="CorpId:" prop="CorpId">
					<u-input v-model="form.CorpId" placeholder="请输入CorpId" />
				</u-form-item>
			</u-form>
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import * as dd from 'dingtalk-jsapi';
	import API from '../../util/api.js'
	import {resetLogin} from '../../util/common.js'
	export default {
		data() {
			return {
				form: {
					AgentId: '', //AgentId
					AppKey: '', // AppKey
					AppSecret: '', // AppSecret
					CorpId: '', // corpId
				},
				rules: {
					AgentId: [
						{
							required: true,
							message: '请输入AgentId',
							trigger: ['blur', 'change']
						}
					],
					AppKey: [
						{
							required: true,
							message: '请输入AppKey',
							trigger: ['blur', 'change']
						}
					],
					AppSecret: [
						{
							required: true,
							message: '请输入AppSecret',
							trigger: ['blur', 'change']
						}
					],
					CorpId: [
						{
							required: true,
							message: '请输入CorpId',
							trigger: ['blur', 'change']
						}
					],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow () {
			dd.ready(function() {
				dd.biz.navigation.setTitle({
					title: "极网控信息修改",
				})
			})
			this.getDatas ()
		},
		methods: {
			getDatas () {
				let site = uni.getStorageSync('siteInfo')
				if(site) {
					this.form = {
						AgentId: site.AgentId, //AgentId
						AppKey: site.AppKey, // AppKey
						AppSecret: site.AppSecret, // AppSecret
						CorpId: site.CorpId, // corpId
					}
				}
			},
			submit () {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// 填写成功
						this.postAjax(this.form)
					} 
				});
			},
			// 提交配置
			postAjax (forms) {
				let data = {
						"CorpId": forms.CorpId,
						"AppKey": forms.AppKey,
						"AppSecret": forms.AppSecret,
						"AgentId": forms.AgentId,
				}
				API.postSite(data).then(res => {
					let forms = {
						AgentId: this.form.AgentId, 
						AppKey: this.form.AppKey,
						AppSecret: this.form.AppSecret,
						CorpId: this.form.CorpId,
						Rails: `${window.location.protocol}//${window.location.host}`
					}
					uni.setStorageSync('siteInfo',forms)
					resetLogin(forms)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tips {
		width: 100%;
		height: 80rpx;
		background-color: #2979ff;
		color: white;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		.tips-icon {
			margin-right: 10rpx;
		}
	}
	.site-con {
		width: 90%;
		margin: 0 auto 40rpx;
		.forms {
			border-bottom: 1px solid #f4f4f5;
			padding-bottom: 40rpx;
		}
	}
</style>
