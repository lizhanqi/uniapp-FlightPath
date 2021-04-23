 <template >
 	<view  class="  app-bg app-center-align uni-flex" 
	style="	-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
"  >
 
 	<view class="app-card"  style="
	flex: 1;-webkit-flex: 1;  padding: 30rpx;" >
	  <view style="margin-top: 30rpx;" class="app-border-grey">
		 <uni-easyinput     
 		 :inputBorder="true" type="text"   placeholder="登录用户名/手机号" v-model="uName"/>
	 	</view>
		<view style="margin-top: 30rpx;" class="app-border-grey">  
		<uni-easyinput    
 		 type="password" password="true" 
		 v-model="pwd" 	placeholder="用户密码"/> 
 	 	</view>
		<button v-on:click="login" style="margin-top: 40rpx; background-color: #00aaff;"type="primary">登录</button> 
   </view>
  
 	</view>
 </template> 
<script>
 // <button v-on:click="login" style="margin-top: 20rpx; background-color: #00aaff;"type="primary">登录</button>
 	import ut  from "@/common/util.js"
	 export default {
		 onLoad(opt) {  
			this.extra=opt; 
		  //  if(this.cid){
			 //   setTimeout(() =>{
			 //         this.getCompany(this.cid)
			 //   },3000); 
		  //  } 
  
 		},
		data() {
			return {
		extra:{},
		 uName:"",
		 pwd:""
			}
		},
		
  methods: {    
	login(){ 
		// ut.setHistory("wb")
		// console.log('保存历史'+JSON.stringify(ut.getHistory()))
		if(!this.uName){
			uni.showToast({
				title:"用户名不能为空"
			})
			return 
		}
		 	if(!this.pwd){
				uni.showToast({
					title:"密码不能为空"
				})
		 } 
				uni.showLoading({
					title:"登录中"
				})
	 var api=	getApp().globalData.API;
	 
	 api.send({
	 	url:api.URLS.login+"?account="+this.uName +"&password="+this.pwd ,
		data:{
			 account :this.uName, password :this.pwd 
		},
	 	 success: (res) => {  
	 		 uni.hideLoading() 
			 getApp().globalData.userInfor=res.data.userinfo
			 uni.setStorageSync("userInfor",	 getApp().globalData.userInfor)
			
			   uni.showToast({
			 	title:"登录成功"
			 }) 
			 
			 if(this.extra.callBakcTag){
				uni.$emit(decodeURIComponent(this.extra.callBakcTag),getApp().globalData.userInfor)
			 }
	
			 if(  uni.navigateBack()){ 
				 uni.reLaunch({
				 	url:"../Home/Home"
				 })
			 }
			 
	 		 },
	 	  	error: (e) => {  
				uni.hideLoading()
				uni.showToast({
					title:e
				})
	 		}
	 })
	} , 
  }
 }
</script> 
<style>  
 
</style>
