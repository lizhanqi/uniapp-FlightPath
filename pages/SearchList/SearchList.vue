<template>
	<view class="uni-flex uni-column app-bg " style="padding: 30rpx;	;	margin-top: 0rpx;"    >  

		<!-- 内容 需要可以滑动-->

	<scroll-view  :scroll-y="true"    class="fixedContent">  
			<view  v-for=" a in 50" style="height: 50rpx;"> 
				<text style="margin-top: 5rpx; height: 50prx;">第{{a}}条模拟数据</text> 
			</view>  
		</scroll-view>
	    <!-- 内容 end-->  
	<!-- 顶部条件 需要固定-->
	<view class="app-center-align head"  >  
		<!-- 筛选 -->
		<view @click="popUp" style="padding: 10rpx;    ">
			 <uni-icons type="list" size="20" style="padding:  0rpx;" /> 
		</view>
		 <!-- 筛选end -->  
	  <!-- 靠右侧 -->
	 		 <view class="uni-flex  fillWith " 
	 		 style="  display: flex;  "  >
	 	<!-- 起飞最早 -->
	 	<view class="uni-flex center" 
	 	style=" padding: 10rpx; ">
	 	<view class="mark" style="margin: 10rpx ;"/>
	 	<text style="padding: 0rpx; color: #007AFF;" >起飞最早</text>
	 	<uni-icons type="arrowdown" 
	 	color="#ff0000" size="10" style="margin:  10rpx;" />  
	 	</view>
	 	 <!-- 起飞最早end -->  
	 	 <!-- 最快 -->
	 	 <view class="uni-flex center  " style="  padding: 10rpx;">
	 	 <view class="mark" style="margin: 10rpx ;"/>
	 	 <text style="padding: 0rpx;">速度最快</text>
	 	 <uni-icons type="arrowdown" size="10" style="margin: 10rpx ;"/>  
	 	 </view>
	 	  <!-- 最快end --> 
	 		 </view>
	 		 <!-- 右侧end-->
	 		</view> 
	  		<!-- 顶部条件end --> 
			<!-- 弹窗内容-->
			<n-transition ref="pop" speed="ease-in-out"  :maskVal="0.5">
				<view class="uni-flex uni-column" style="padding: 0; height: calc(100% - 100rpx);overflow: auto; ">
					<!-- 这里需要修改-----需要滑动 -->
					<scroll-view scroll-y="false" style="padding:30rpx;">
						<view class="optrow" >类型： 
						<!-- 国内国际 -->
						<view  class="uni-flex   "> 
							<checkbox>国内</checkbox>	
							<checkbox style="margin-left: 15rpx;">国际</checkbox>	
						</view> 
						<!-- 国内国际End -->
						
						<!-- 直飞经停-->
						<view  class="uni-flex  "> 
							<checkbox>直飞</checkbox>	
							<checkbox style="margin-left: 15rpx;">经停</checkbox>	
						</view> 
						<!-- 直飞经停End -->
						<!-- 宽窄-->
						<view  class="uni-flex  "> 
							<checkbox>宽体</checkbox>	
							<checkbox style="margin-left: 15rpx;">窄体</checkbox>	
						</view> 
						<!-- 宽窄End -->
						</view>
						<!-- 类型end -->
						
						
						<!-- 服务类型 -->
						<view class="optrow uni-column " style="-webkit-align-items: center;align-items: center;">
							<text>	服务类型: </text>
							<view class="center"> 
							 <label>
							<checkbox  
							  color="#ff5500"
							  class="optrow app-checkbox  " 
							  v-for="item in serviceType"     >
							 {{item.serviceTypeCn}}</checkbox>
							 	</label>
						 	</view>  
						</view>
						<!-- 服务类型End -->
						
					 	<!-- 查询类型 -->     
						<!-- style="display: flex; flex-direction: row; justify-content: flex-start;
						align-items: flex-start; flex-wrap: wrap;" -->
						<view  class="uni-flex optrow" style="display: none; ">   
							<text style="padding-top: 8rpx; padding-right: 10rpx;">查询类型:</text>
							<radio-group style="width: auto;"  @change="radioDateTypeChange" v-for="(item, index) in dateTypeItems" :key="item.value"> 
						 	<radio   style=" margin:  5rpx ; "
										 :value="item.value" :checked="index === currentDateType">
										 {{item.name}} 
							  </radio>  
							</radio-group>
						</view>
					 <!-- 查询类型end --> 
						
						<!-- 机型类型 -->
						<view class="uni-flex   optrow center" >
						 机型: 
				 		 <lb-picker style="flex:1; -webkit-flex: 1;
						  margin: 0rpx 60rpx 0rpx 30rpx  ;" 
						  @confirm="pickConfirm"    :list="aircraftModel"
						     :dataset="{ name: 'aircraftModelName' }"
						 >
						 <view style="flex: 1;-webkit-flex: 1;width: 100%;
						 padding: 0rpx 10rpx ; margin-right :40rpx  ; 
						 "class="app-border">{{aircraftModelName}}</view>
						 </lb-picker>  
				<!--  	 <picker style="flex: 1;-webkit-flex: 1; width: 100%; margin-left: 10rpx;"
						   @change="bindPickerChange" :value="index" :range="aircraftModel"
							range-key="specificAircraftName">
						 		<view   style="flex:1; -webkit-flex: 1; 
								padding: 0rpx 10rpx ; margin-right :40rpx  ;  
						 	  "class="app-border">{{aircraftModel[index].specificAircraftName}}</view>
						 </picker>  -->
						</view>
						<!-- 机型End --> 
					<!-- 起飞与到达时间 -->
					<view class="uni-flex optrow"> 
					<view style="flex: 1; font-size: 35rpx;">	起飞时间：
					<lb-picker @confirm="pickConfirm"    :list="timeslot"
					    :dataset="{ name: 'startTimeslot' }"
					><view style="flex: 1;-webkit-flex: 1;
					padding: 0rpx 10rpx ; margin-right :40rpx  ; 
					"class="app-border">{{startTimeslot}}</view>
					</lb-picker> 
					</view>
					
				 	<view style="flex: 1; font-size: 35rpx;  ">	落地时间：
					<lb-picker @confirm="pickConfirm"    :list="timeslot"
					    :dataset="{ name: 'endTimeslot' }"
					>
					<view style="flex: 1;-webkit-flex: 1;
					padding: 0rpx 10rpx ; margin-right :40rpx  ; 
					"class="app-border">{{endTimeslot}}</view>
					</lb-picker> 
					</view>
					</view>
						<!-- 起飞与到达时间End -->
					
						<view style="width: 100% ;display: none;   "  class="uni-flex optrow " @click="transitCityChange">
							 中转城市: 
							<text  style="border: #576B95 1px solid;flex: 1;-webkit-flex: 1; 
							padding: 0rpx 15rpx ; margin-right :50rpx  ; border-radius:5px;   ">{{transitCity}}</text>
						</view>   
						
						
						<!-- 航司-->
								<view class="uni-flex  optrow" 
								style="display:inline-flex;flex-wrap:wrap"
							 >
								航司：
							 <view> 
						 	<text v-bind:class=" item.selected?'app-theme-btn':'app-unchecked-btn' "  
							  v-for="(item,index) in showAirlines" @click="onClickAirlines(item,index)"    >
						 {{item.name}}</text>  
						<!-- <checkbox  		v-for="item in showAirlines">
								{{item.name}}
							</checkbox> --> 
								</view> 
							</view> 
							<!-- 航司End -->
					</scroll-view>
				</view>  
					<!-- button 需要固定 -->
					<view class="uni-flex uni-mask-btn" style="padding: 15rpx;"  >
						<button   style="flex: 1;  " @click="preBtn(false)" >确定</button>
						<button type="warn" style="flex: 1; margin: 0rpx 30rpx;"@click="preBtn(true)"  >取消</button>
					</view> 
			</n-transition> 
				<!-- 弹窗end -->
			  	</view> 

</template>

<script>
	import nTransition from '@/components/n-transition/n-transition.vue'
	import showAirlinesJson from "@/static/json/ShowAirlines.json"
	import timeslotJson from "@/static/json/time-slot.json"
	import LbPicker from '@/components/lb-picker'
	export default {
	components: { nTransition,  LbPicker },
 
	onBackPress(options) {
			console.log("返回"+options)
	    // return true 表示禁止默认返回
		 uni.showToast({title:"返回"})
		if(this.popShowing){
			this.popShowing=false; 
			this.$refs['pop'].hide() 
			return true;
		}
	
	},
	onLoad() {
		
		var api =getApp().globalData.API; 
		api.send({
		 url:api.URLS.serviceType,
			success:(data)=>{
			this.serviceType=data.data 
			}
		}) 
		
		api.send({
		 url:api.URLS.model,
			success:(data)=>{ 
			 this.aircraftModel=data.data 
			 this.aircraftModel.forEach((item ,index)=>{
				 item.label=item.specificAircraftName 
			 }) 
			}
		}) 
	uni.getSystemInfo({
	　　success: (res) =>{ // res - 各种参数
			// console.log(res.windowWidth/750)
			this.popHeight=	res.windowHeight   
	// 　　 console.log("屏幕的宽度 "+	this.popHeight); // 屏幕的宽度  
	/* 　　    let info = uni.createSelectorQuery().select(".类名");
	　　　  　info.boundingClientRect(function(data) { //data - 各种参数
	　　　  　console.log("bbb"+data.width)  // 获取元素宽度
	　　    }).exec() */
	       }
	});
	},
		data() {
			return {
				index:0,
			 showAirlines:showAirlinesJson,
			 popHeight:800,
			 fast:true, 
			aircraftModel:[],
			timeslot:timeslotJson, 
			startTimeslot:'0-24点',
			endTimeslot:'0-24点',
			aircraftModelName:'选择机型',
			popShowing:false,
			serviceType: [],
				  transitCity:"请选择中转城市",
				  currentDateType:0,
				 airLineCompany:"",
				  dateTypeItems: [{
				  		value: 'USA',
				  		name: '日', 
				  	},
				  	{
				  		value: 'CHN',
				  		name: '月', 
				  	},
				  	{
				  		value: 'BRA',
				  		name: '年'
				  	}],
					aircraftType:  [{
				  		value: 'USA',
				  		name: '窄体', 
				  	},
				  	{
				  		value: 'CHN',
				  		name: '宽体', 
				  	} 
				  	 ],
					 
			}
		},	
		methods: {
			onPreAirLineCompany(){
				var key="onPreAirLineCompany"
				uni.$once(key,(data)=>{ 
					console.log(JSON.stringify(data))
					if(data.carrierNameCn){
						this.airLineCompany=data.carrierNameCn
					}else{
						this.airLineCompany=data.carrierName 	
					} 
				   })
				 this.navigateTo({
					url:"../AirlineCompany/AirlineCompany", 
					data:{"title":"航空公司","callBackTag":key}
				})
			}, 
			preBtn(isCancel){
				   this.$refs['pop'].hide()
					if(isCancel){
						
					}else{
						this.loadData()
					}
			},
			/**日期类型
			 * @param {Object} evt
			 */
			radioDateTypeChange(evt) {
				console.log("点击"+JSON.stringify(evt))
				for (let i = 0; i < this.dateTypeItems.length; i++) {
					if (this.dateTypeItems[i].value === evt.detail.value) {
						this.currentDateType = i;
						break;
					}
				}
			},
			pickConfirm(e){ 
				      if (e) {
				        const name = e.dataset.name
				        const label = e.item.label
						 console.log('confirm::', name)
						if(name=='endTimeslot'){
							this.endTimeslot=label 	
						}	else if(name=='startTimeslot'){
							 this.startTimeslot=label 	
						}else if(name=='aircraftModelName'){
							 this.aircraftModelName=label 	
						} 
				      }
			},
			/**
			 * 弹窗
			 */
			    popUp () {
					console.log(this.popHeight)
					this.popShowing=true;
			        this.$refs['pop'].show(this.popHeight)
			    },
				onClickAirlines(data,index){
					console.log("点击"+index+JSON.stringify(data))
					data.selected=	(!data.selected)
					this.showAirlines.forEach((item,i)=>{
						if(i!=index){
							console.log("点击"+ i)
							item.selected=false
						}else{
								console.log("点击"+ JSON.stringify(data))
						}
					})
					this.$forceUpdate()
				},
				transitCityChange(){
					var key="transitCityChange"
					uni.$once(key,(data)=>{ 
						if(data.cityNameCn){
							this.transitCity=data.cityNameCn
						}else{
							this.transitCity=data.cityName 	
						} 
					   })
					 this.navigateTo({
						url:"../AirportSelection/AirportSelection", 
						data:{"title":"中转城市","callBackTag":key}
					})
				},	
				loadData(){
					var api =getApp().globalData.API; 
					var optData= {
						dateType:""  ,
						timeSeries:  "",
						startDate: "" , 
						endDate:  "",
						depType: "" ,
						depName: "" ,
						arrType: "" ,
						arrName: "" ,
						internationalDomestic:  "",
						transitType:""  ,
						transitName:""  ,
						carrierCode: "" ,
						specificAircraftCode:""  ,
						serviceType:""  ,
						flightNo:""  ,
						direct:""  ,
						noOfStops:""  ,
						equipmentGroup:""  ,
						localDepTimes:""  ,
						localArrTimes:"" ,
					}
					api.send({
					 url:api.URLS.searchDate,
					 data:optData,
						success:(data)=>{
						console.log("搜索结果"+data.data.length)
						},error:(data)=>{ 
						console.log(data)
						uni.showToast({title:data})
					} }
					 ) 
				} 
			
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
		color: #007AFF;
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
		position: fixed; top:200rpx;overflow:scroll;height:100%; 
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
		position: fixed; top:100rpx;overflow:scroll;height:100%; 
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
