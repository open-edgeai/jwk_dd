module.exports = {
	data () {
		return {
			swiper: {
				swiperCurrent: 0, // swiper当前索引
				winHeight: 0,  // swiper高度
				swiperTop: 88,  // swiper顶部距离
			},
			isAdmin: true,// 是否为管理员
			isLimit: false,// 是否拥有控制权限
		}
	},
	created () {
		this.statusFun ()
	},
	methods: {
		statusFun () {
			let userInfo = uni.getStorageSync('userInfo')
			this.isLimit = userInfo.isSurfingControll
			this.isAdmin = userInfo.isAdmin
			this.isAdmin ? this.swiper.swiperTop = 88 : this.swiper.swiperTop = 0
			this.swiperHeFun(this.swiper.swiperTop)
		},
		// swiper高度
		swiperHeFun(num) {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					var clientHeight = res.windowHeight,
						clientWidth = res.windowWidth,
						rpxU = 750 / clientWidth;
					var calc = parseInt(clientHeight * rpxU - num);
					that.swiper.winHeight = calc
				}
			});
		},
	}
}