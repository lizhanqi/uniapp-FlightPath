<script>
	import APIS from "@/common/API.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: { 
		  API :APIS, 
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
