<template> 
	<!-- 背景 -->
	<view    class="uni-flex uni-column app-bg app-center-align" 
		style=" padding: 100rpx 50rpx 0rpx 50rpx ; " 
		 > 
		 
   <date-time-picker ref='date-time' :indicatorStyle='indicatorStyle' :type='type'   @change='dateTimeChange'></date-time-picker>
		 <!-- 模拟card-->
		<view  
		  class="uni-flex uni-column app-card"   > 
		 <!-- 航班号标题-->
		 <view v-if="!isAddrss" class="uni-flex uni-row">
			<view class="uni-flex uni-column"> 
		 	 		 <text class="slecet"  >按航班号</text>
					 </view>
		 			 <text class="unselect" @click="changeType(true)"
		 			  style=" margin-left: 50rpx; font-size: 20rpx;">按起降地</text>	 
		 </view> 
		<!-- 航班号标题End--> 
			<!-- 起降地标题 -->	
			<view v-if="isAddrss" class="uni-flex uni-row">
				<text class="unselect" @click="changeType(false)">按航班号</text>
				<view class="uni-flex uni-column"> 
				  <text class="slecet"  >按起降地</text> 	 
				</view> 
			</view>
				<!-- 起降地标题END -->	  
				<!-- 航班号输入-->
				<view  v-if="!isAddrss" class="uni-flex uni-row" style="border-bottom: #007AFF solid 1rpx; padding:20rpx 10rpx;">
					<image style="height: 40rpx; width: 40rpx; margin-right: 25rpx;" 
					 src="../../static/f1.png"></image>
					<input   placeholder="请输入航班号"></rich-text>
				</view> 
				<!-- 航班号输入End-->
				
				 
				
				
				<!-- 起降地 -->
				<view   v-if="isAddrss" class="uni-flex uni-row" 
				style="-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;"
				>
					<!-- 起飞 -->
					<view @click="placeOfDeparture"   class="uni-flex uni-row boderpading"
					 style="-webkit-flex: 1;flex: 1; ">
					 						<image style=" height: 40rpx;
					 						width:40rpx; margin-right: 25rpx;" 
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
					width: 40rpx; height: 40rpx; padding: 30rpx;"  />  
					<!-- 降落 -->
					<view @click="landingSite()"
					 class="uni-flex uni-row boderpading"
					 style=" -webkit-flex: 1;flex: 1; ">
						<image style=" height: 40rpx;
						width:40rpx; margin-right: 25rpx;" 
						src="../../static/f-12.png"></image> 
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
				style="border-bottom: #007AFF solid 1rpx; padding:20rpx 10rpx; 
				margin-top: 30rpx;">
					<image style="height: 40rpx; width: 40rpx; margin-right: 25rpx;" src="../../static/select_date.png"></image>
				 	<text @click="optDate" style="width: 100%;" >{{date}}</text>
				</view>  
				<!-- 按钮 -->
				 <button @click="search()" style=" 
				  margin-top: 50rpx; 
				  
				   width: 100%;"    >航班查询</button>
	 
	 </view> 
	   <!-- cardEnd-->
		<view class="uni-flex uni-column">

		</view>
	
	
  </view>  
  <!-- 背景--> 
</template>

<script>
import DateTimePicker from '@/components/bory-dateTimePicker/bory-dateTimePicker.vue'
    
 export default {
	onLoad() {
	  this.date = new Date().format("YYYY-mm-dd") 	
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
 doConvert(){
	 var tmp=this.startLocation 
	 console.log("降落："+this.endLocation+(this.endLocation=='降落地点') )
	 
  if(this.endLocation=='降落地点' ){ 
		 this.startLocation ='起飞地点' 
	 }else{
		 this.startLocation =this.endLocation 
	 } 
	 console.log("起飞tmp："+tmp)
	 
	 if(tmp=='起飞地点' ){
	   this.endLocation ='降落地点' 
	 }else{
	   this.endLocation =tmp
	 } 
 }, 
  
		dateTimeChange(value) { 
			this.date=value; 
		    }	,
			search(){
					this.navigateTo({
						url:"../SearchList/SearchList", 
						data:{"title":"降落地点" }
					})  
				if(this.isAddrss){
					
				}else{
						
				}
			}	,
			landingSite(){
				var key="end"
				uni.$once(key,(data)=>{ 
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
 color: #007AFF;
 					margin-left: 20rpx; 
 border-bottom: #007AFF solid 4rpx; font-size: 30rpx;
}

.unselect{
	padding: 30rpx; font-size: 20rpx;
}
.gradcent{
	-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
}


.boderpading{
	border-bottom: #007AFF solid 1rpx;
	padding:20rpx 10rpx;
}

</style>
