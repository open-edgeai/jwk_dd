<template>
	<view>
		<view v-if="!isload">
			<!-- 部门标签 -->
			<tag-page 
				:crumbsList="tag.tagList" 
				:scrollIndex="tag.scrollIndex"
				@crumbsClick="crumbsClick"
			>
			</tag-page>
			<!-- 部门列表 -->
			<depart-page
				:departList="depart.departList"
				@departClick="departClick"
				@checkItem="departCheckItem"
			 >
			</depart-page>
			<!-- 人员列表 -->
			<man-page 
				:manList="mans.manList" 
				:loadText="mans.loadText"
				:loadstatus="mans.loadstatus"
				@manCheckItem="manCheckItem"
			>
			</man-page>
		</view>
		
		<view class="load" v-else>
			<!-- 加载动画 -->
			<u-loading mode="flower" :show="isload" size="88"></u-loading>
		</view>
		
		<!-- 底部悬浮框选择 -->
		<view class="check-bottom" v-if="isLimit || isAdmin">
			<view class="check">
				<u-checkbox @change="allChange" v-model="allCheck">{{checkTxt}}</u-checkbox>
			</view>
			<view class="btn">
				<view class="sub-btn" @click="sureMan">确定部门人员</view>
			</view>
		</view>
		
		<sure-modal @closeClick="closeClick" @subClick="subClick" :isModal="isModal"></sure-modal>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import TagPage from './Tag.vue'
	import DepartPage from './NetCom/DepartMent.vue'
	import ManPage from './NetCom/ManList.vue'
	import SureModal from './NetCom/SureModal.vue'
	import API from '../../util/api.js'
	export default {
		data () {
			return { 
				isAdmin: false,// 是否为管理员
				isLimit: false,// 是否拥有控制权限
				isload: true,  // 加载状态
				offset: 0,  
				tag: {
					tagList: [],
					scrollIndex: ''
				},  //部门标签
				depart: {
					departList: [],
					id: 1
				}, // 部门
				mans: {
					manList: [],
					loadText: {
						loadmore: '上拉加载更多',
						loading: '人员加载中',
						nomore: '~实在没有了~'
					},
					loadstatus: "loadmore",
					isNotMan: false
				}, // 人员
				posts: {
					departId: [],
					users: [],
					not_users: [],
					not_depart: []
				}, // 提交后台id
				isModal: false,
				saveCheck: false,  // 全选储存状态
				allCheck: false, // 全选显示状态
			}
		},
		components: {
			TagPage,
			DepartPage,
			ManPage,
			SureModal
		},
		mounted () {
			const userInfo = uni.getStorageSync('userInfo')
			this.isLimit = userInfo.isSurfingControll
			this.isAdmin = userInfo.isAdmin
			this.getAjax ()
		},
		computed: {
			checkTxt () {
				if(this.allCheck) {
					return '取消全选'
				} else {
					return '当前全选'
				}
			},
		},
		methods: {
			// 菜单栏点击
			crumbsClick (id) {
				this.pubDepart (id)
			},
			// 部门点击
			departClick (id) {
				this.tag.scrollIndex = "scroll" + id
				this.pubDepart (id)
			},
			// 公共部门和菜单栏点击跳转
			pubDepart (id) {
				this.depart.id = id
				this.mans = {
					manList: [],
					isNotMan: false,
					loadstatus: 'loadmore'
				}
				this.offset = 0
				this.isload = true
				this.allCheck = false
				this.saveCheck = false
				this.posts.departId.length = 0
				this.posts.users.length = 0
				this.posts.not_users.length = 0
				this.posts.not_depart.length = 0
				this.getAjax () 
			},
			// 部门选择
			departCheckItem (e) {
				if(this.saveCheck) {
					if(!e.value) {
						this.allCheck = false
						this.posts.not_depart.push(Number(e.name))
					} else {
						this.posts.not_depart = this.posts.not_depart.filter(item => {
							return Number(item) !== Number(e.name)
						})
					}
				} else {
					if(e.value) {
						this.posts.departId.push(Number(e.name))
					} else {
						this.posts.departId = this.posts.departId.filter(item => {
							return Number(item) !== Number(e.name)
						})
					}
				}
			},
			// 人员选择
			manCheckItem (e) {
				if(this.saveCheck) {
					if(!e.event.value) {
						this.allCheck = false
						this.posts.not_users.push(e.event.name)
					} else {
						this.posts.not_users = this.posts.not_users.filter(item => {
							return item !== e.event.name
						})
					}
				} else {
					if(e.event.value) {
						this.posts.users.push({userid: e.value.userid,deparment_id: Number(this.depart.id),name: e.value.name})
					} else {
						this.posts.users = this.posts.users.filter(item => {
							return item.userid !== e.event.name
						})
					}
				}
			},
			// 全选
			allChange (e) {
				this.allCheck = e.value
				this.saveCheck = e.value
				this.allCheckFun(this.allCheck)
				this.posts.users.length = 0
				this.posts.not_users.length = 0
				this.posts.not_depart.length = 0
			},
			allCheckFun (newVal) {
				if(newVal) {
					this.depart.departList.filter((item) => {
						return item.checked = true
					})
					this.mans.manList.filter((item) => {
						return item.checked = true
					})
					this.posts.departId = [Number(this.depart.id)]
				} else {
					this.depart.departList.filter((item) => {
						return item.checked = false
					})
					this.mans.manList.filter((item) => {
						return item.checked = false
					})
					this.posts.departId.length = 0
				}
			},
			// 上网管理请求
			getAjax () {
				let data = {
					department_id: this.depart.id,
					offset: this.offset,
					size: 10
				}
				API.getDepart(data).then(res => {
					this.isload = false
					this.tag.tagList = res.title.reverse()
					// 翻页刷新防止丢失之前状态
					if(this.offset === 0) {
						this.depart.departList = res.departments.map((item) => {
							return {
								name: item.name,
								id: item.id,
								nums: item.cnt,
								checked: this.saveCheck ? true : false,
							}
						})
					}
					if(res.users.length < 10) {
						this.mans.isNotMan = true
						this.mans.loadstatus = 'nomore'
					}
					let newList = []
					newList = res.users.map((item) => {
						return {
							userid: item.userid,
							name: item.name,
							checked: this.saveCheck ? true : false,
							isLeader: item.isLeader,
							isAdmin: item.isAdmin,
							avatar: item.avatar,
							isBoss: item.isBoss,
							position: item.position,
							isSurfingNet: item.isSurfingNet,
							isSurfingControll: item.isSurfingControll
						}
					})
					this.mans.manList = [ ...this.mans.manList , ...newList]
				}).catch(() => {
					this.isload = false
				})
			},
			
			// 确定人员
			sureMan () {
				if(this.posts.departId.length > 0 || this.posts.users.length > 0) {
					this.isModal = true
				} else {
					this.$refs.uToast.show({
						title: '请选择人员或者部门',
						type: 'warning'
					})
				}
			},
			// 提交
			subClick (e) {
				let status = e === 0 ? true : false
				this.netWorkAjax(status)
				console.log(this.posts)
			},
			// 上网开关请求
			netWorkAjax (status) {
				let data = {
					enable: status,
					department_ids: this.posts.departId,
					users: this.posts.users,
					department_not_userids: this.posts.not_users,
					department_not: this.posts.not_depart
				}
				API.setNetwork(data).then(() => {
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success',
					})
					this.pubDepart(this.depart.id)
					this.isModal = false
				}).catch(() => {
					this.isModal = false
				})
			},
			closeClick (val) {
				this.isModal = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.load {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
}
.check-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background-color: white;
	z-index: 2;
	border-top: 1px solid #F2F6FC;
	box-sizing: border-box;
	padding:0 30rpx 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.sub-btn {
		width: 220rpx;
		height: 80rpx;
		background-color: #2979ff;
		color: white;
		line-height: 80rpx;
		text-align: center;
		border-radius: 16rpx;
		font-size: 30rpx;
	}
}

</style>