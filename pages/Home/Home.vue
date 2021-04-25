<template> 
	<!-- 背景 -->
	<view    class="uni-flex uni-column app-bg app-center-align center" 
		style=" padding: 100rpx 50rpx 0rpx 50rpx ; "  
		 > 
		 
   <date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type'   @change='dateTimeChange'></date-time-picker>
	<view class="center uni-flex gradcent"  style="margin-bottom: 50rpx;">  
		<image  
		class="center"
		src="../../static/logo.png" style="display: none;  width: 150rpx; height: 150rpx;  border-radius:20rpx;"></image>
		
	</view> 
		 <!-- 模拟card-->
		<view  
		  class="uni-flex uni-column app-card"   > 
		<view class="center">
		 </view>
		 <!-- 航班号标题-->
		 <view v-if="!isAddrss" class="uni-flex uni-row"> 
			<view class="uni-flex uni-column"> 
		 	 		 <text class="slecet"  >按航班号</text>
					 </view>
		 			 <text class="unselect" @click="changeType(true)"
		 			  style=" margin-left: 50rpx;   ">按起降地</text>	 
		 </view> 
		<!-- 航班号标题End--> 
			<!-- 起降地标题 -->	
			<view v-if="isAddrss" class="uni-flex uni-row">
				<text class="unselect" @click="changeType(false) ">按航班号</text>
				<view class="uni-flex uni-column"> 
				  <text class="slecet"  >按起降地</text> 	 
				</view> 
			</view>
				<!-- 起降地标题END -->	  
				<!-- 航班号输入-->
				<view  v-if="!isAddrss" class="uni-flex uni-row" style="border-bottom: #00AAFF solid 1rpx; padding:20rpx 10rpx;">
					<image style="height: 40rpx; width: 40rpx; margin-right: 25rpx;" 
					 src="../../static/f1.png"></image>
					<input @input="vinInput"  value="flightNo"  v-model="flightNo" placeholder="请输入航班号"></rich-text>
				</view> 
				<!-- 航班号输入End--> 
				
				<!-- 起降地 -->
				<view   v-if="isAddrss" class="uni-flex uni-row" 
				style="-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;"
				>
					<!-- 起飞 -->
					<view @click="placeOfDeparture"   class="uni-flex uni-row boderpading"
					 style="-webkit-flex: 1;flex: 1; ">
					 						<image style=" height: 50rpx;
					 						width:50rpx; margin-right: 25rpx;" 
					 						src="../../static/f1.png"></image> 
					 						<text style="	
					 						-webkit-flex: 1;flex: 1;
					 						overflow: hidden !important;
					 								text-overflow: clip !important;
					 								display: -webkit-box !important;
					 								-webkit-line-clamp: 1;  
					 								-webkit-box-orient: vertical;   "  >{{startLocation}}</text> 
					</view>
					 <!-- 起飞End -->
					<!-- 切换 -->
					<image src="../../static/change.png" @click="doConvert"
					style=" display: flex; align-items: center;
					width: 50rpx; height: 50rpx; padding: 30rpx;"  />  
					<!-- 降落 -->
					<view @click="landingSite()"
					 class="uni-flex uni-row boderpading"
					 style=" -webkit-flex: 1;flex: 1; ">
						<image style=" height: 50rpx;
						width:50rpx; margin-right: 25rpx;" 
						src="../../static/f2.png"></image> 
						<text style="	
						-webkit-flex: 1;flex: 1;
						overflow: hidden !important;
								text-overflow: clip !important;
								display: -webkit-box !important;
								-webkit-line-clamp: 1;  
								-webkit-box-orient: vertical;   "  >{{endLocation}}</text> 
					</view>
				<!-- 降落End -->
			 </view>
			<!-- 起降地END --> 
				 
				<!-- 时间选择-->
				<view class="uni-flex uni-row" 
				style="border-bottom: #00AAFF solid 1rpx; padding:20rpx 10rpx; 
				margin-top: 30rpx;">
					<image style="height: 50rpx; width: 50rpx; margin-right: 25rpx;" src="../../static/select_date.png"></image>
<!-- 	 	 	<text @click="optDate" style="width: 100%;" >{{date}}</text> 	 --> 
					<picker style="width: 100%; " mode="date" :value="date"  @change="bindDateChange">
						<view  style="width: 100%; background-color: rgba(255,255,255,0);">{{date}}</view>
					</picker> 
				</view>  
				<!-- 按钮 -->
				 <button @click="search()" style=" 
				  margin-top: 50rpx;  font-size: 38rpx;
				   width: 100%;">航班查询</button>
	 
	 </view> 
	   <!-- cardEnd-->
		<view class="uni-flex uni-column"> 
		</view> 
  </view>  
  <!-- 背景--> 
</template>

<script>
import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue'
import util from '@/common/util.js'
 
    

 export default {
	onLoad() {
	  this.date = new Date().format("YYYY-mm-dd") 
	   this.loadData()
	  console.log("日期-----------------"+this.date)
	},
	 components: {
	     DateTimePicker
	 },
		data() {
			return {  
				type: 'date',
				date:'请选日期',
				isAddrss:true,
				num:"",
		 "startLocationObj":{},
		 flightNo:"",
		  "endLocationObj": {},
		"startLocation":"起飞地点",
		"endLocation":"降落地点"
			}
		},
		computed: {
		    indicatorStyle() {
		        return {
		            background: 'rgba(255,0,0,.2)',
		            height: '40px',
		        };
		    }
		},
		methods: {  
		changeType(b){
			this.isAddrss=b
		},
	optDate(){ 
        this.$refs['date-time'].show();
	},	
	
	// 过滤vin输入
	vinInput(e) {
		let val = e.detail.value;
		if (/[^a-zA-Z0-9]/g.test(val)) { // 先过滤不需要的字符，只保留数字和字母
			val = val.replace(/[^a-zA-Z0-9]/g, '');
		}
		
		if (!/^[A-Z\d]+$/.test(val)) {// 再进行转换，小写转为大写
			val = val.toUpperCase();
		}
		this.flightNo = val; //这里对应的是value绑定的变量
		return val; // 最后输出值，要保证输入框的值和value绑定的值一致
	}, 
 doConvert(){
	 var tmp=this.startLocation
 	 var tmpLocationObj=this.startLocationObj
	 console.log("降落："+this.endLocation+(this.endLocation=='降落地点') )
  if(this.endLocation=='降落地点' ){ 
		 this.startLocation ='起飞地点' 
		this.startLocationObj ={} 
	 }else{
		 this.startLocation =this.endLocation 
	   this.startLocationObj =this.endLocationObj 
	 }  
	 
	 if(tmp=='起飞地点' ){
	   this.endLocation ='降落地点' 
	      this.endLocationObj ={ }
	 }else{
	   this.endLocation =tmp
	      this.endLocationObj =tmpLocationObj
	 } 
 }, 		bindDateChange: function(e) {
			
				var starttoday =new Date(new Date().format("YYYY-mm-dd")).getTime() 
				var eld =24*60*60*1000*7
				var dt =	new Date( e.detail.value ).getTime()
				if(dt<starttoday||dt>(starttoday+eld)){
					uni.showModal({
					    title: '日期不可用',
					    content:'只能查询未来七日内数据', 
						showCancel:false,
						cancelText:"知道了",  
					}); 
				}else{
						this.date = e.detail.value 
				}
			},
				
		dateTimeChange(value) {  
			this.date=value; 
		    }	,
			search(){
				var starttoday =new Date(new Date().format("YYYY-mm-dd")).getTime()
				
				var eld =24*60*60*1000*7
				var dt =	new Date(this.date).getTime() 
				if(dt<starttoday||dt>(starttoday+eld)){
					uni.showModal({
					    title: '日期不可用',
					    content:'只能查询未来七日内数据', 
						showCancel:false,
						cancelText:"知道了",  
					}); 
					return
				}
			 if(this.isAddrss){   
				if(this.startLocation=='起飞地点'){
					uni.showToast({
						icon:'none',
						title:"请选择起飞地点"
					})
						return
				 }
				 if(this.endLocation=='降落地点'){
				 	uni.showToast({
						icon:'none',
				 		title:"请选择目的地"
				 	})
					return
				  } 
					this.navigateTo({
						url:"../SearchList/SearchList", 
						data:{
							"startLocationObj":this.startLocationObj,
							"endLocationObj":this.endLocationObj,
							"date":this.date,
							},
						
					})    
				}else{ 
					if(!this.flightNo){
						uni.showToast({
							title:"请输入航班号"
						})
					}else{
						this.navigateTo({ 
							url:"../Details/Details",
							data:{flightNo:this.flightNo,	"date":this.date}
						}) 
					}
						
				}
			}	,
			landingSite(){
				var key="end"
				uni.$once(key,(data)=>{ 
					this.endLocationObj=data
					if(data.cityNameCn){
						this.endLocation=data.cityNameCn
					}else{
						this.endLocation=data.cityName 	
					} 
				   })
				 this.navigateTo({
					url:"../AirportSelection/AirportSelection", 
					data:{"title":"降落地点","callBackTag":key}
				})  
			},
			placeOfDeparture(){
			var 	key="start"
			uni.$once(key,(data)=>{ 
				this.startLocationObj=data
				if(data.cityNameCn){
					this.startLocation=data.cityNameCn
				}else{
					this.startLocation=data.cityName 	
				} 
		       })
			 this.navigateTo({
				url:"../AirportSelection/AirportSelection", 
				data:{"title":"起飞地点","callBackTag":key}
			})
			} ,
				loadData(){ 
				var api=	getApp().globalData.API; 
					if(getApp().globalData.allCitys.length==0){  
								api.send({
									url:api.URLS.getCity,
									 success: (res) => {  
										this.allCity=[]
										 res.data.forEach((item)=>{
											  if(item.cityCode){
												     this.allCity.push(item) 
											  }
										  })
										console.log("过滤前"+ res.data.length+"过滤后"+this.allCity.length)
										 getApp().globalData.allCitys=this.allCity; 
										 },
									  	error: (e) => {  
										}
								})
								
				} 					
			}
		}
	}
</script>

<style>
.block::after {
content: '';
  width: 96%;
  height: 1px;
  display: block;
  margin: 0 auto;
  border-bottom: 1px solid rgba(186, 205, 223, 1.0);
}
 
.slecet{
 color: #00AAFF;
 margin-left: 20rpx; 
 border-bottom: #00AAFF solid 4rpx; font-size: 40rpx;
}

.unselect{
	padding: 30rpx; font-size:40rpx;
}
.gradcent{
	-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
}


.boderpading{
	border-bottom: #00AAFF solid 1rpx;
	padding:20rpx 10rpx;
}
view{font-size: 32rpx;}
</style>
