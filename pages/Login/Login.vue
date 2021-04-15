 <template >
 	<view  class="
	 
	app-bg app-center-align uni-flex" 
	style="	-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
"  >
 
 	<uni-card  style="   flex: 1;-webkit-flex: 1;  padding: 30rpx;" >  
 		<uni-easyinput     
			 	class="inclass app-border-grey"
 		 
 		 :inputBorder="true" type="text"   placeholder="登录用户名" v-model="uName"/>
 		<uni-easyinput  
		
		style="margin-top: 40rpx; " 
 		 	class="inclass app-border-grey"
 			:inputBorder="true" type="password" password="true"  	v-model="pwd" 	placeholder="用户密码"/> 
 	 	<button v-on:click="login" style="margin-top: 40rpx; background-color: #00aaff;"type="primary">登录</button> 
   </uni-card>
  
 	</view>
 </template> 
<script>
 // <button v-on:click="login" style="margin-top: 20rpx; background-color: #00aaff;"type="primary">登录</button>
 
	 export default {
		 onLoad(opt) { 
	 
		  //  if(this.cid){
			 //   setTimeout(() =>{
			 //         this.getCompany(this.cid)
			 //   },3000); 
		  //  } 
  
 		},
		data() {
			return {
		 uName:"admin",
		 pwd:"123456"
			}
		},
		
  methods: {    
	login(){  
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
			 uni.showToast({
			 	title:"登录成功"
			 })
			 uni.navigateBack();
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
