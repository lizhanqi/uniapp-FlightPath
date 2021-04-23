<template>
	<scroll-view  scroll-y="true"   class="uni-flex uni-column app-bg" style="padding: 10rpx;">
		<view v-if="data.length>0" >
		  <uni-card  > 
 				
 			 	<!--机场与起飞降落信息  -->
 			 <view  class="uni-flex"  style="padding-bottom: 10rpx;" > 
 				 <!-- 起飞机场信息-->
 				  <view class="uni-flex uni-column center" style="flex: 1; text-overflow:ellipsis;overflow:hidden;">
 					<view> 
				  {{ 	new  Date(parseInt(data[0].localDepTimesStamp)*1000)  .format('mm-dd')}}  
				  	</view> 
 					{{  data[0].depCityName}} 
 				</view>
 			 <!-- 起飞end-->
 			 <!-- 中转信息-->
 			<view class="uni-flex uni-column center" style="margin: 0rpx 10rpx;width: 200rpx;"> 
 			<!-- 中转机场 -->
 			<text  
 			v-if="data.length>1"		
 			style="color: #00aaff; 
 			padding:  10rpx 0rpx; 
 			overflow:hidden; 
 			text-align: center;
 			-webkit-line-clamp:2;  
 			text-overflow:ellipsis;
 			-webkit-box-orient: vertical; 
 			white-space:nowrap; ">{{data[0].depCityName}}
 			 </text>
 			<!-- 中转机场end -->
 			<!-- 飞行图片组合 -->
 					<view>
 						<image src="../../static/gt.png" style="width: 60rpx; height:70rpx;"  mode=" aspectFit"></image>
 					 	<image src="../../static/f1.png" style="width:80rpx; height:80rpx;"  mode=" aspectFit"></image>
 				 	 <image src="../../static/gt.png"  style=" width:60rpx; height:70rpx;" 	  mode=" aspectFit"></image> 
 				</view>	 
 				<!-- 飞行图片组合end -->
 </view>
 				 <!-- 中转信息end-->
 				 <!-- 降落信息-->
 				 <view class="uni-flex uni-column center"style="flex: 1;"> 
				 	<view> 
				    {{ 	new  Date(parseInt(data[0].localArrTimesStamp)*1000)  .format('mm-dd')}}  
					 </view>
 				 	 {{  data[data.length-1].arrCityName}} 
 				 </view>
 				 <!-- 降落end-->
 			 </view>
 			 <!--机场信息 -->
 			 <!-- 航空公司与总时长-->
 			 <view 
 			 class="uni-flex"
 			 style="-webkit-justify-content: space-between;
 			 justify-content: space-between; border-top: #aaaaaa solid 1rpx;padding:10rpx;"> 
 			  <text style="color: #00aaff;">
 						总时长: {{ (((data[data.length-1].localArrTimesStamp-data[0].localDepTimesStamp)/60)).formatDuration() }}
 			  </text> 
 			  <text 	v-if="data.length>1">中转时长：{{ (((data[data.length-1].localDepTimesStamp -data[0].localArrTimesStamp)/60)).formatDuration() }} </text>
 			   <!-- 航空公司与总时长 end-->
 			 </view>
 			
 			</uni-card>
	 </view>
	 
	 
	 
	 
	 
	 
	 <view v-for="(item ,index) in  data"> 
		 
	 		  <uni-card  > 
				<view
				class="uni-flex center"
				style="-webkit-justify-content: space-between;
				justify-content: space-between; border-bottom: #aaaaaa solid 1rpx;padding:10rpx 10rpx 20rpx 10rpx;"> 
						<view style="text-align: left;">
							<view v-if="data.length>1">
							<view v-if="index==0">
										<view style="font-size: 40rpx;">航程一</view>
							</view>
							<view v-else-if="index==1">
										<view style="font-size: 40rpx;">航程二</view>
							</view> 
							<view v-else>
							<view style="font-size: 40rpx;">航程</view>
							</view>
							</view>
							<view v-else>
							<view style="font-size: 40rpx;">航程</view>
							</view>
						</view>
				
				
					<!-- 飞行日期 -->
					  <view>
					   	{{ 	new  Date(parseInt(item.localDepTimesStamp)*1000)  .format('mm-dd')}}/{{ new  Date(parseInt(item.localArrTimesStamp)*1000)  .format('mm-dd')}}	  
					  </view>   
				  </view>
				  
				  
	 				<view class="uni-flex " >
	 					<!-- 起飞信息 -->
	 					<view class="uni-flex uni-column center" style="flex: 1;">
	 					<!-- 起飞时间 -->
	 					<view style="font-size: 45rpx;">
	 						{{ 	new  Date(parseInt(item.localDepTimesStamp)*1000)  .format('HH:MM')}}
	 					 </view>
	 					 <!-- 起飞时间End -->
	 			 
	 					</view>
	 			 <!-- 起飞信息End --> 
	 					<!-- 飞行时长 --> 
	 				<view 			 class="uni-flex uni-column center" style="width: 200rpx;">  
	 			 <text
	 			 	 			 
	 			 	 			style="color: #00aaff; 
	 			 	 			padding:  10rpx 0rpx; 
	 			 	 			overflow:hidden; 
	 			 	 			text-align: center;
	 			 	 			-webkit-line-clamp:2;  
	 			 	 			text-overflow:ellipsis;
	 			 	 			-webkit-box-orient: vertical; 
	 			 	 			white-space:nowrap; ">
	 			 {{ (((item.localArrTimesStamp-item.localDepTimesStamp)/60)).formatDuration() }} </text>
	 			 </view>
	 					<!--飞行时长end  -->  
	 					<!-- 降落信息 -->
	 					<view class="uni-flex uni-column center" style="flex: 1;">
	 					<!-- 结降落时间 --> 
	 					<view style="font-size: 45rpx;">
	 									{{
	 										new  Date(parseInt(item.localArrTimesStamp)*1000)  .format('HH:MM')
	 										 
	 									}}	
	 					</view>
	 					<!--  结降落时间End-->			
	 			 
	 				</view>
	 					</view>
	 					<!-- 降落信息END -->
	 				<!-- 时间日期End -->
	  
	 				
	 				
	 				
	 			 	<!--机场与起飞降落信息  -->
	 			 <view  class="uni-flex"  style="padding-bottom: 10rpx;" > 
	 				 <!-- 起飞机场信息-->
	 				  <view class="uni-flex uni-column center" style="flex: 1; text-overflow:ellipsis;overflow:hidden;">
	 					   
	 					{{ item.depAirportName}} 
	 				</view>
	 			 <!-- 起飞end-->
	 			 <!-- 中转信息-->
	 			<view class="uni-flex uni-column center" style="margin: 0rpx 10rpx;width: 200rpx;"> 
				
	 	
	 			<!-- 航空公司end -->
	 			<!-- 飞行图片组合 -->
	 					<view>
	 						<image src="../../static/gt.png" style="width: 60rpx; height:70rpx;"  mode=" aspectFit"></image>
	 					 	<image src="../../static/f1.png" style="width:80rpx; height:80rpx;"  mode=" aspectFit"></image>
	 				 	 <image src="../../static/gt.png"  style=" width:60rpx; height:70rpx;" 	  mode=" aspectFit"></image> 
	 				</view>	 
	 				<!-- 飞行图片组合end -->
	 </view>
	 				 <!-- 中转信息end-->
	 				 <!-- 降落信息-->
	 				 <view class="uni-flex uni-column center"style="flex: 1;"> 
	 				 	 {{  item.arrAirportName}} 
	 				 </view>
	 				 <!-- 降落end-->
	 			 </view>
	 			 <!--机场信息 -->
				 
				 
				 
				 <view class="center uni-flex uni-column" style="margin-bottom: 10rpx;">
					 <!-- 航空公司 -->
					 <text   
					 style="color: #00aaff;  
					 overflow:hidden; 
					 text-align: center;
					 -webkit-line-clamp:2;  
					 text-overflow:ellipsis;
					 -webkit-box-orient: vertical; 
					 white-space:nowrap; ">
					 {{ item.carrierName }}  
					  </text>
					  
					  <!-- 航空公司 -->
					  <text   
					  style="color: #00aaff;  
					  overflow:hidden; 
					  text-align: center;
					  -webkit-line-clamp:2;  
					  text-overflow:ellipsis;
					  -webkit-box-orient: vertical; 
					  white-space:nowrap; ">
					  ({{ item.carrierCode }}{{ item.flightNo }}  )
					   </text>
				 </view>
				  
				 
	 			 <!-- 航空公司与总时长-->
	 			 <view 
	 			 class="uni-flex"
	 			 style="-webkit-justify-content: space-between;
	 			 justify-content: space-between; border-top: #aaaaaa solid 1rpx;padding:10rpx;">
	 				
	 				 <view >
	 					  班期：
	 					 <text style="color: #00aaff;">
	 					每周	{{item.localDaysOfOp}}
	 					 </text>
	 					 
	 				 </view>
	 			  <text style="tx">机型:{{ item.generalAircraftCode}} </text>
	 			   <!-- 航空公司与总时长 end-->
	 			 </view>
	 			
	 			</uni-card>
	 	 </view>
	 	 
	 	 
	 
	 
	 
	 
	</scroll-view>
</template>

<script>
	export default {
		onLoad(extra) { 
			
		
		 if(!extra.flightNo){ 
			this.data=JSON.parse(decodeURIComponent(extra.item));
			console.log(JSON.stringify(this.data)) 
			}else{  
				this.flightNo= decodeURIComponent(extra.flightNo)   
				this.date=     decodeURIComponent(extra.date)   
			 	this.loadData()	
			}
			
			
		},
		
		
		
		data() {
			return {
				data:[],
				flightNo:"",
				dataList:[],
				tmpData:[],
				date:""
			}
		},
		methods: {
	loadData(){ 
					var   optData={
						depDate: '',//出发日期
						flightNo: '',// 航班号  
						page: this.pageIndex,  
						limit:this.pageSize
					}      
				optData.depDate=this.date
				 optData.flightNo=this.flightNo
				uni.showLoading({
					title:"加载中"
				})   
					var api =getApp().globalData.API; 
					api.send({
					 url:api.URLS.searchDate,
					 data:optData,
						success:(data)=>{   
						 var data=	data.data; 
						  uni.hideLoading()				
						 if(data.length>0){
							 	 this.processingData(data )
						 }else{ 
							 uni.showModal({
							     title: '无结果',
							     content: '航班不存在，请输入正确航班号(字母+数字)',
							 	showCancel:false,
							     success:   (res)=> {
							         if (res.confirm) {
										uni.navigateBack()
							         } else if (res.cancel) {
							            
							         }
							     }
							 });
						 } 
					
						},error:(data)=>{  
						 uni.hideLoading()  
						 uni.showModal({
						     title: '无结果',
						     content: data,
						 	showCancel:false,
						     success:   (res)=> {
						         if (res.confirm) {
									uni.navigateBack()
						         } else if (res.cancel) { 
						         }
						     }
						 });
					} }
					 ) 
				} ,
		 
				//处理数据 
				processingData(currentLit){     
						var tmp=[]
						var tmpMap=new Map(); 
					 	currentLit.forEach((item,i)=>{    
						if(item.routeType==1){ 
							tmp.push([item])
						 }else{     
							let va =tmpMap.get(item.mainSort)
							if(va){
								tmpMap.delete(item.mainSort) 
								if(	va.childSort>item.childSort){
									tmp.push([item,va])
								}else{
									tmp.push([va,item])
								}
							}else{
							tmpMap.set(item.mainSort,item)
							}   
						 } 
						})   
					 tmp.forEach((item,i)=>{   
					 this.dataList.push(item) 
				 	})
			this.data=this.dataList[0] 
		 	this.tmpData=[]
			 tmpMap.forEach((value, key, self) => {
			 this.tmpData.push(value)
			 });  
		 	},
				  
				
			
		},
	  
	}
</script>

<style>
 .mark {
        width: 10rpx;
        height: 10rpx;
        border: 1px solid #ff0000;
        border-radius: 20px;
        background-color: #8c8c8c;
        opacity: 0.5;
    } 
	.slecet{
		color: #00AAFF;
	}
		.rigth{
			-webkit-justify-content: flex-end;justify-content: flex-end;
		} 
		.center{
			-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;
			}
		.uni-mask-btn{
			width: 100%;
			height: 100rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			text-align: center;
		}
	/* #ifdef H5 */
	.head{
		width: 100%; height: 100rpx; display: flex;
		-webkit-justify-content: space-between;  
		justify-content: space-between;
		position: fixed; top:88rpx; left: 0;
	}
	.fixedContent{
		 display: block;
		position: fixed; top:200rpx;  
		overflow:scroll; height: calc(100% - 200rpx); width: 100%; right: 0; 
	}
	/* #endif */
	/* #ifndef H5 */ 
	.head{
		width: 100%; height: 100rpx; display: flex;
		-webkit-justify-content: space-between; 
		justify-content: space-between;
		position: fixed; top:0rpx; left: 0;
	}
	.fixedContent{
		
		position: fixed; top:70rpx;overflow:scroll;height: calc(100% - 70rpx);right: 0; 	 
	}
	/* #endif */   
	.optrow{
		 font-size: 35rpx;
		padding: 10rpx;
	}
	uni-checkbox .uni-checkbox-input {
	    width: 10px!important;
	    height: 10px!important;
	}
</style>
