<template>
	<view class="app-bg">
		<textarea   value="text" v-model="text" style=" width: auto;  height: 70%;" class="app-card"></textarea>
		<button @click="submint" style=" margin-top: 30rpx; co">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:""
			}
		},
		methods: {
			submint(){ 
				
				if(!this.text){
					uni.showToast({
						title:"请填写内容"
					})
					return
				}
	
				if(!getApp().globalData.userInfor){
					
					uni.showToast({
						title:"需要登录后操作"
					})
					var callBakcTag='freeback'
					uni.$once(callBakcTag,(data)=>{ 
					 this.submint()
					})
					this.navigateTo({
						url:"../Login/Login",
						data:{callBakcTag:callBakcTag}
					})
				
				}
			 
						var api=	getApp().globalData.API;
			var userInfor=			getApp().globalData.userInfor; 
			console.log(userInfor.email )
 
			var optData={
		'user_id'  :userInfor.user_id,
		  'name'  :userInfor.username ,
						 	 'mobile'  :userInfor.mobile,
							 'email'  :'' ,
							  'detail'  :this.text   
			}   
				api.send({
					url:api.URLS.freeBack ,  
					data:optData,
						success:(data)=>{  
							
							uni.showModal({
							    title: '提示',
							    content: '已反馈',
								showCancel:false,
							    success:   (res)=> {
							        if (res.confirm) {
										this.text='' 
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
					 
						},error:(data)=>{ 
						 
					} }
					 ) 
			}
		}
	}
</script>

<style>

</style>
