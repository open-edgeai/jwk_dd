<template>
	<view>
		<scroll-view :style="{height: swiper.winHeight + 'rpx'}" scroll-y @scrolltolower="onreachBottom">
			<view v-if="!isload">
				<tag-page
					:crumbsList="tag.tagList" 
					:scrollIndex="tag.scrollIndex"
					@crumbsClick="crumbsClick"
				>
				</tag-page>
				<depart-page
					:departList="depart.departList"
					@departClick="departClick"
				 >
				</depart-page>
				<!-- 人员列表 -->
				<man-page 
					:manList="mans.manList" 
					:loadText="mans.loadText"
					:loadstatus="mans.loadstatus"
					@limitChange="limitChange"
					@checkChange="checkChange"
				>
				</man-page>
			</view>
			<view class="load" v-else>
				<!-- 加载 -->
				<u-loading mode="flower" :show="isload" size="88"></u-loading>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import TagPage from './Tag.vue'
	import DepartPage from './LimitCom/DepartMent.vue'
	import ManPage from './LimitCom/ManList.vue'
	import API from '../../util/api.js'
	import swiperMixin from '../../minxin/swiperHe.js'
	export default {
		mixins: [swiperMixin],
		data () {
			return {
				isload: true,  // 加载状态
				offset: 0,
				tag: {
					tagList: [],
					scrollIndex: ''
				},
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
			}
		},
		components: {
			TagPage,
			DepartPage,
			ManPage
		},
		mounted () {
			this.getAjax () 
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
				this.mans.manList = []
				this.mans.isNotMan = false
				this.mans.loadstatus = 'loadmore'
				this.offset = 0
				this.isload = true
				this.getAjax () 
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
					this.depart.departList = res.departments.map((item) => {
						return {
							name: item.name,
							id: item.id,
							nums: item.cnt,
						}
					})
					if(res.users.length < 10) {
						this.mans.isNotMan = true
						this.mans.loadstatus = 'nomore'
					}
					let newList = []
					newList = res.users.map((item) => {
						return {
							userid: item.userid,
							name: item.name,
							isLeader: item.isLeader,
							isAdmin: item.isAdmin,
							avatar: item.avatar,
							isBoss: item.isBoss,
							position: item.position,
							isSurfingNet: item.isSurfingNet,
							isSurfingControll: item.isSurfingControll,
							isExamine: item.isExamine,
							netTxt: item.isSurfingControll ? '关闭管控网络' : '开启管控网络',
							exMaineTxt: item.isExamine ? '关闭审核权限' : '开启审核权限'
						}
					})
					this.mans.manList = [ ...this.mans.manList , ...newList]
				}).catch(() => {
					this.isload = false
				})
			},
			// 网络管控权限
			limitChange (e,index,userid) {
				let data = {
					enable: e,   
					userids: [userid]
				}
				API.setLimit(data).then(res => {
					let txt
					e ? txt = '关闭管控网络' : txt = '开启管控网络';
					this.mans.manList[index].isSurfingControll = e;
					this.mans.manList[index].netTxt = txt
				}).catch(()=> {
					this.mans.manList[index].isSurfingControll = !e;
				})
			},
			// 是否审核员
			checkChange (e,index,userid) {
				let data = {
					enable: e,   
					userids: [userid]
				}
				API.setCheck(data).then(res => {
					let txt
					e ? txt = '关闭审核权限' : txt = '开启审核权限';
					this.mans.manList[index].isExamine = e;
					this.mans.manList[index].exMaineTxt = txt
				}).catch(()=> {
					this.mans.manList[index].isExamine = !e;
				})
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				// 所在位置管理权限分配
				if(!this.mans.isNotMan) {
					this.mans.loadstatus = 'loading'
					this.offset += 10
					this.getAjax () 
				}
			},
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
</style>
