<template>
	<!-- 	background-image: url(../../static/bg.webp); -->
	<view class="app-bg" style="padding: 100rpx  10rpx;"  > 
		
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row" style="padding: 50rpx; height: 150rpx;">
				<image src="../../static/logo.png"
				 style="width: 150rpx; height: 150rpx;"></image>
				 <navigator :url="'/pages/Login/Login'">
				<text  class="uni-flex" style="height: 100rpx;
				color:#007AFF; margin: 50rpx  30rpx;"  >注册&登录</text>
				  </navigator>
			
			</view> 
			<uni-card class="uni-flex" style="height: 100%; 
		 "> 
					<view>   
					 <navigator :url="'/pages/feedback/feedback'">    
					<text style="font-size: 30rpx; padding: 25rpx; " >帮助反馈</text>
				 </navigator>

				</view>	  
					<view style="border-bottom: #6e6e6e solid; border-width:0.5px ;margin: 10rpx;  "></view>
					<navigator :url="'/pages/about/about'">    
					 <text style="font-size: 30rpx; padding: 25rpx;">关于我们</text>	
					</navigator>
			 </uni-card> 
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
