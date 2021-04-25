 <template >
 	<view  class="  app-bg app-center-align uni-flex" 
	style="	-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
"  > 
 	<view class="app-card"  style=" margin: -100rpx 40rpx;
	flex: 1;-webkit-flex: 1;  padding: 30rpx;" > 
	<!-- 航班号标题-->
	 <view v-if="!isAddrss" class="uni-flex uni-row"> 
		<view class="uni-flex uni-column"> 
	 	 		 <text class="slecet"  >账号密码</text>
				 </view>
	 			 <text class="unselect" @click="changeType(true)"
	 			  style=" margin-left: 50rpx;  ">短信注册/登录</text>	 
	 </view> 
	<!-- 航班号标题End--> 
		<!-- 起降地标题 -->	
		<view v-if="isAddrss" class="uni-flex uni-row">
			<text class="unselect" @click="changeType(false) ">账号密码</text>
			<view class="uni-flex uni-column"> 
			  <text class="slecet"  >短信注册/登录</text> 	 
			</view> 
		</view>
	 	<!-- 起降地标题END -->	   
	  <view style="margin-top: 30rpx;" class="app-border-grey">
		 <uni-easyinput     
 		 :inputBorder="true" type="uType"   :placeholder="uhint" v-model="uName"/>
	 	</view>  
		<view v-if="!isAddrss"  style="margin-top: 30rpx;" class="app-border-grey">  
		<uni-easyinput    
 		 type="password" password="true" 
		 v-model="pwd" 	placeholder="用户密码"/> 
 	 	</view>
		
		<view v-if="isAddrss"  style="
			 -webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		margin-top: 30rpx; display: flex; flex-direction: row;" class="app-border-grey">
		<uni-easyinput    
		 type="number" password="true" 
		 v-model="code" 	placeholder="验证码"/> 
		 <text  class="app-theme-btn app-center-align" style="
		 align-items: center;
		  text-align: center; 	
		   background-color: #00aAFF;  border-radius: 10rpx;  margin:10rpx 15rpx; 
		 width: 100rpx; height: 100%;" @click="sendSMS">{{smstext}}</text>
		</view> 
		<button v-on:click="login" style="margin-top: 40rpx; font-size: 38rpx; background-color: #00aaff;"type="primary">登录</button> 
      </view> 
 	</view>
 </template> 
<script>
   	import ut  from "@/common/util.js"
	 export default {
		 onLoad(opt) {  
			this.extra=opt;   
 		},
		data() {
			return {
				isAddrss:true,
				uhint:"手机号",
				uType:"number",
				code:'',
		extra:{},
		 uName:"",
		 pwd:"",
		   codeTime:0,
		 smstext:"发送"
			}
		},
		
  methods: {   
	   getCheckNum(){
	   if(this.codeTime>0){
	    uni.showToast({
	    title: '不能重复获取',
	    icon:"none"
	    });
	    return false;
	   }else{
	    this.codeTime = 60
	    let timer = setInterval(()=>{
	    this.codeTime--;
		this.smstext=this.codeTime+"S"
	    if(this.codeTime<1){
	    clearInterval(timer);
	    this.codeTime = 0
			this.smstext="发送"
	    }
	    },1000)
	      }
		  return true
	     },
	 
	  sendSMS(){
		  if(    !this.getCheckNum()){
		  	return
		  }
		  var api=	getApp().globalData.API; 
		   uni.showLoading({
		  	title:"发送中"
		    })  
		  api.send({
		  	url:api.URLS.sendSMS+'?event=notice&mobile='+this.uName   ,
		  		data:{
		  			 event :'notice', mobile :this.uName 
		  		},
		  	 success: (data,res) => { 
					uni.hideLoading()   
					uni.showToast({
						icon:"none",
						title:res.data.msg
					})
		  		 },
		  	  	error: (e) => {  
		  				uni.hideLoading()
		  				uni.showToast({
		  					title:e
		  				})
		  		}
		  })
		
	  },
 
	  changeType(b){
	  	this.isAddrss=b
		this.code=''
		this.uName=''
		this.pwd=''
		if(this.isAddrss){
			this.uhint='手机号'
			this.uType='number'
		}else{
			 this.uhint='手机号/用户名'
			 this.uType='text'
		}
	  },
	login(){ 
		// ut.setHistory("wb")
		// console.log('保存历史'+JSON.stringify(ut.getHistory()))
		if(!this.uName){
			uni.showToast({
				title:"用户名不能为空",
								icon:'none'
			})
			return 
		}
		if(this.isAddrss){
			if(!this.code){
							uni.showToast({
								title:"验证码不能为空",
								icon:'none'
							})
								return 
			} 
		}else{
			if(!this.pwd){
							uni.showToast({
								title:"密码不能为空",
								icon:'none'
							})
								return 
			} 
		}
		
	 uni.showLoading({ title:"登录中" 	})
	 var api=getApp().globalData.API; 	 	
	var url=  this.isAddrss?api.URLS.smsLogin+"?mobile="+this.uName +"&captcha="+this.code  :
	 api.URLS.login+"?account="+this.uName +"&password="+this.pwd 
	 api.send({
	 	url:url,
		data:{
			 account :this.uName, password :this.pwd 
		},
	 	 success: (data,res) => {  
	 		 uni.hideLoading() 
				console.log(JSON.stringify(data))
			 if(  !data.data){ 
			 				 uni.showToast({
			 				 	title:data.msg,
								icon:"none"
			 				 })
							 return
				} 
			 
			 getApp().globalData.userInfor=data.data.userinfo
			 
			 
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
.slecet{
 color: #00AAFF;
 margin-left: 20rpx; 
 border-bottom: #00AAFF solid 4rpx; 
 font-size: 40rpx;
}

.unselect{
	padding: 30rpx; font-size:38rpx;
}
view{font-size: 32rpx;} 
</style>
