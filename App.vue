<script>
	import APIS from "@/common/API.js"
	import ut  from "@/common/util.js"
	export default {
		globalData: {
		  API :APIS, 
		   allCitys :[], 
		    userInfor :{}, 
		},
		onLaunch: function() {  
			this.globalData.userInfor=uni.getStorageSync("userInfor")  
				},
		onShow: function() { 
		},
		onHide: function() { 
		}

	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css'; 
	@import './common/app.css'; 
	
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		
		background-color: #f5f5f5;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	} 
</style>
