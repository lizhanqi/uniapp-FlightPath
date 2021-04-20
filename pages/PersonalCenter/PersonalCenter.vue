<template>
	<!-- 	background-image: url(../../static/bg.webp); -->
	<view class="app-bg" style="padding: 100rpx  10rpx;"  > 
		
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row" style="padding: 50rpx; height: 150rpx;">
				<image :src="head"
				 style="width: 150rpx; height: 150rpx; border-radius: 150rpx;"></image> 
				 <navigator v-if="!userName"  :url="'/pages/Login/Login'">
				<text  class="uni-flex" style="height: 100rpx;
				color:#007AFF; margin: 50rpx  30rpx;"  >注册&登录</text>
				</navigator>
			<text  v-else class="uni-flex" style="height: 100rpx;
			color:#007AFF; margin: 50rpx  30rpx;"  >{{userName}}</text>
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
		onShow() { 
			 
			 this.userName= getApp().globalData.userInfor.nickname
		 
			if( !getApp().globalData.userInfor.avatar){
			 this.head='../../static/head.png'
			}else{
			 this.head=getApp().globalData.userInfor.avatar
			}
		},
		data() {
			return {
				head:'../../static/head.png',
				userName:""
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
