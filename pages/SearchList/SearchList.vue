<template>
	<view class="uni-flex uni-column app-bg " style="padding: 30rpx;	;	margin-top: 0rpx;"    >  
	<view >
		
		
	</view>
		<!-- 内容 需要可以滑动--> 
	<scroll-view  @scrolltolower="clickLoadMore()"   :scroll-y="true"    class="fixedContent    "  >  
			<uni-card   v-for=" (item,index) in dataList" @click="clickDataItem(item,index)"   >
				<view>
					
					
					
				</view>
				
				<view>
					
					
					
				</view>
				
				
				
			 	<!--机场与起飞降落信息  -->
			 <view  class="uni-flex"  style="padding-bottom: 10rpx;" > 
				 <!-- 起飞信息-->
				  <view class="uni-flex uni-column center" style="flex: 1;">
					  <view style="font-size: 45rpx;">  
					{{ 	new  Date(parseInt(item[0].localDepTimesStamp)*1000)  .format('HH:MM')}}
					 </view>
				  <view  >  
				     	{{ 	new  Date(parseInt(item[0].localDepTimesStamp)*1000)  .format('mm-dd')}}
				  		</view>
					  <view>
					{{  item[0].depAirportName}}
					</view> 
			  </view>
			 <!-- 起飞end-->
			 <!-- 中转信息-->
			<view class="uni-flex uni-column center" style="margin: 0rpx 10rpx;">
			<view v-if="item.length>1" class="app-border"
			style="color: #00aaff; padding:3rpx 50rpx; 
			border-radius: 50rpx;">中转</view> 
			<view v-if="item.length>1" class="uni-flex center uni-column" style="
			padding:  10rpx 0rpx; width: 200rpx;"> 
			<text  
			style="color: #00aaff; 
			overflow:hidden;
			width: 200rpx;
			-webkit-line-clamp:2;  
			text-overflow:ellipsis;
			-webkit-box-orient: vertical; 
			white-space:nowrap; ">{{item[0].arrAirportName}}
			 </text>
			 <text style="padding: 0rpx;">{{ (((item[item.length-1].localArrTimesStamp-item[0].localDepTimesStamp)/60)).formatDuration() }} </text>
			 
	 
		 </view>
					<view>
						<image src="../../static/gt.png" style="width: 60rpx; height:70rpx;"  mode=" aspectFit"></image>
					 	<image src="../../static/f1.png" style="width:80rpx; height:80rpx;"  mode=" aspectFit"></image>
				 	<image src="../../static/gt.png"  style=" width:60rpx; height:70rpx;"
					  mode=" aspectFit"></image>
									
					</view>	
				
			
				 </view>
				 <!-- 中转信息end-->
				 <!-- 降落信息-->
				 <view class="uni-flex uni-column center"style="flex: 1;">
			  <view style="font-size: 45rpx;">  
				{{
					new  Date(parseInt(item[item.length-1].localArrTimesStamp)*1000)  .format('HH:MM')
					 
				}}	
				 	 </view>
				 	   <view>
					{{
					new  Date(parseInt(item[item.length-1].localArrTimesStamp)*1000)  .format('mm-dd')	
						
					}}
				 	</view>
				 	  <view>
				 	 {{  item[item.length-1].arrAirportName}}
				 	</view> 				  
				 </view>
				 <!-- 降落end-->
			 </view>
			 <!-- -->
			 <!-- 航空公司与总时长-->
			 <view 
			 class="uni-flex"
			 style="-webkit-justify-content: space-between;
			 justify-content: space-between; border-top: #5a5553 solid 1rpx;padding:10rpx;">
				
				 <view v-for="cItem in item">
					  {{cItem.carrierName}} (
					 <text style="color: #999999;">
						 {{cItem.flightNo}}
					 </text>
					 )
				 </view>
			  <text style="">{{ (((item[item.length-1].localArrTimesStamp-item[0].localDepTimesStamp)/60)).formatDuration() }} </text>
			   <!-- 航空公司与总时长 end-->
			 </view>
			
			</uni-card>
			<view  style="display: none;" class="no-data center">
				没有搜索到相关内容</view> 
			<uni-load-more @click="clickLoadMore" :status="status" :icon-size="16" :content-text="contentText" /> 

		 </scroll-view>
	    <!-- 内容 end-->  
	<!-- 顶部条件 需要固定-->
	<view class="app-center-align head"  >  
		<!-- 筛选 -->
		<view @click="popUp" style="padding: 10rpx;    ">
			 <uni-icons type="list" size="20" style="padding:  0rpx;" /> 
		</view>
		 <!-- 筛选end -->  
	  <!-- 靠右侧 display: flex;-->
	 		 <view class="uni-flex  fillWith " 
	 		 style="  display: none;  "  >
	 	<!-- 起飞最早 -->
	 	<view class="uni-flex center" 
	 	style=" padding: 10rpx; ">
	 	<view class="mark" style="margin: 10rpx ;"/>
	 	<text style="padding: 0rpx; color: #00AAFF;" >起飞最早</text>
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
				<view class="optrow" >飞行区域：  
				<!-- 国内国际End --> 
				 <uni-data-checkbox multiple="true" 
				 v-model="regioned" :localdata="region" ></uni-data-checkbox>  
				<!-- 宽窄-->
				<view  class="uni-flex uni-column optrow "> 
				飞机宽度: 
				<uni-data-checkbox multiple="true"  
				v-model="widthTypeCheked" :localdata="widthType" ></uni-data-checkbox> 
				</view>  
				<!-- 宽窄End --> 
				<!-- 直飞经停-->
				<view  class="uni-flex uni-column optrow "> 	
					  是否直飞： 
					 <uni-data-checkbox multiple="true"  
					 v-model="directed" :localdata="direct" ></uni-data-checkbox> 
					</view>  
				   
				<!-- 直飞经停End --> 
				<!-- 同航司-->
							<view  class="uni-flex uni-column optrow "> 	
								 同航司： 
					<uni-data-checkbox multiple="true"  
					v-model="sameCompanyChecked" :localdata="sameCompany" ></uni-data-checkbox> 
					</view> 
				  
				<!-- 同航司End -->
				
				<!-- 宽窄-->
		<!-- 		<view  class="uni-flex  " > 
					<checkbox 		  class="optrow app-checkbox  "  v-for="item in widthType">{{item.name }}</checkbox>	
					 
				</view> -->
				<!-- 宽窄End -->
						
						</view>
						<!-- 类型end -->  
						<!-- 服务类型 -->
						<view class="optrow uni-column " style="
						-webkit-align-items: center;align-items: center; display: none;">
							<text>	服务类型: </text>
							<radio-group class="center" >  
							<radio
							:checked="item.selected"
							 @click="onClickServiceType(item,index)" 
							  class="optrow app-checkbox  " 
							  v-for="(item,index) in serviceType"     >
							 {{item.serviceTypeCn}}</radio> 
						 	</radio-group>  
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
						<view class="uni-flex   optrow center" style="display: none;" >
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
					<view class="uni-flex optrow" style="display:none;"> 
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
							 <view style="margin-right: 40rpx;"> 
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
						<button   style="flex: 1; background-color: #00AAFF; " @click="preBtn(false)" >确定</button>
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
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue'

	export default {
	components: { nTransition,  LbPicker ,uniLoadMore},
 
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
	/* 加载更多 */
	// onReachBottom() {
	// 	// this.status = 'loading';
	// 	// this.status = 'finish';
	// 	// this.status = 'more'; 
	// 			console.log("需要加载更多")
	// 	if (this.status === 'finish') {
	// 		return
	// 	} 
	// 	// this.getList();
	// },
	onPullDownRefresh() {
 
	 uni.stopPullDownRefresh()
	 this.pageIndex=1;
	 this.loadData()
	},
	onLoad(extra) { 
		this.extra=extra
		 // this.extra=decodeURIComponent(extra) 
		var api =getApp().globalData.API; 
		// api.send({
		//  url:api.URLS.serviceType,
		// 	success:(data)=>{
		//   this.serviceType=data.data 
		//   this.serviceType.unshift({ "serviceType":"","selected":true,"serviceTypeCn":"全部"} ); 
		// 	}
		// }) 
		
		// api.send({
		//  url:api.URLS.model,
		// 	success:(data)=>{ 
		// 	 this.aircraftModel=data.data 
		// 	 this.aircraftModel.forEach((item ,index)=>{
		// 		 item.label=item.specificAircraftName 
		// 	 }) 
		// 	}
		// }) 
		
		var api=	getApp().globalData.API;
		uni.showLoading({
			title:"加载中.."
		})
		api.send({
			url:api.URLS.company,
			 success: (res) => { 
				this.allAirlineCompany=res.data 
				this. showAirlines=[]
				 res.data.forEach((item)=>{ 
					 if(item.carrierNameCn){
						this. showAirlines.push({
							name:item.carrierNameCn,
									carrierCode:item.carrierCode,
						})
					 }
				 }) 
				  uni.hideLoading() 
				 },
			  	error: (e) => { 
				uni.hideLoading()
				}
		}) 
		
		
	this.loadData()

	},
		data() {
			return {
					random:"",
			 		regioned:["国内","国外"], 
					widthTypeCheked:[
						"宽",'窄' 
					],
					region: [{
					"text": "国内",
					"value":"国内"
					},
					{
					"text": "国外",
						"value":"国外"
						
					} 
				],
				
			widthType:  [ 
			{
				value: '窄',
				text: '窄体', 
			},
			{
				value: '宽',
				text: '宽体', 
			} 
			 ],
			 directed:[],
				direct:  [
					{
						value: 'USA',
						text: '直飞', 
					},
				  
				 ],
				 sameCompanyChecked:[],
				 sameCompany:  [
				 	{
				 		value: 'USA',
				 		text: '同航司', 
				 	} 
				  ],  
				status: 'contentnomore',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中...',
					contentnomore: '数据加载完毕!'
				},
			allAirlineCompany:[],
			extra:{},
			 index:0,
			 showAirlines:showAirlinesJson,//航空公司
			 popHeight:800, 
			 fast:true, //
			aircraftModel:[],//飞机型号
			timeslot:timeslotJson, //时间段
			startTimeslot:'0-24点',
			endTimeslot:'0-24点',
			aircraftModelName:'选择机型',
			popShowing:false,//当前正在展示弹窗
			serviceType: [],//服务类型
			pageIndex:1,
			pageSize:20,
			dataList:[], 
			tmpData:[],//缓存无法到达目的地的数据
			oldSetting:[],
			serviceTypeIndex:0,
				  transitCity:"请选择中转城市",
				  currentDateType:0,
				 airLineCompany:"",
				 domestic:true, 
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
			}
		},	
		

		methods: {     
			
			onClickServiceType(data,index ){  
				this.serviceTypeIndex=index 
				  this.serviceType.forEach((item,i)=>{
					  if(i!=index){
						  item.selected=false
					  }else{
					    data.selected=true
					  }
				  }) 
			 this.$forceUpdate()
			},
			
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
						 console.log('confirm:', name)
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
					// this.oldSetting=[]
					// this.oldSetting.push(this.region);
					// this.oldSetting.push(this.widthTypeCheked); 
					// this.oldSetting.push(this.directed);
					// this.oldSetting.push(this.sameCompanyChecked);
					// this.oldSetting.push(this.showAirlines);
							 
					console.log(this.popHeight)
					this.popShowing=true;
			        this.$refs['pop'].show(this.popHeight)
			    },
				onClickAirlines(data,index){  
					console.log("点击"+ JSON.stringify(data))
					data.selected=	(!data.selected)
					// this.showAirlines.forEach((item,i)=>{
					// 	if(i!=index){
					// 		console.log("点击"+ i)
					// 		item.selected=false
					// 	}else{
					// 			console.log("点击"+ JSON.stringify(data))
					// 	}
					// })
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
					var optData= {
						page: 1,
						limit: 20,
						dateType:'day',//查询日期类型
						startDate: '2021-04-16',
						endDate: '2021-04-16',
						depType: 2,//出发类型2是城市 
						arrType: 2,//到达类型2是城市
						depName: '',//出发地址代码BJS
						arrName: '',//到达地址代码 
						internationalDomestic:['Domestic','International'],//[]国内国际勾选
						specificAircraftCode :"",//机型319
						carrierCode: '',//航空公司[]S2
						serviceType:"",//服务类型 	JCF
						flightNo:'',//航班号,
						direct:"1",//1直飞
						 noOfStops:"1",//1经停
						 timeSeries: 1,//1拆分 
						 equipmentGroup :"JW",//机型类别 JW 宽体，JN窄体
						localDepTimes: 1,//起飞时间
						localArrTimes: 4,//到时间达
						random: '2021041610285155836675'
					}
					//手机端专用
					optData={
						depDate: '',//出发日期
						flightNo: '',// 航班号 
					    depName: '',//出发地址 
					    arrName: '',//到达地址代码 
						 page: this.pageIndex,  
						limit:this.pageSize
					}   
					
	
				
					//直飞
			if(this.directed.length>0){
				 optData.direct=1
			}
			//同航司
			if(this.sameCompanyChecked.length>0){
				 
				 optData.sameCarrier=1
			}
		// var wh=[]
		// if(this.widthTypeCheked.indexOf('宽') >=0){
		//  wh.push("international")
		// } 
		// if(this.widthTypeCheked.indexOf('窄') >=0){ 
		//   wh.push("Domestic")
		// } 
		//  optData.internationalDomestic=wh
		 
		 
		 var wh=[]
		 if(this.regioned.indexOf('国内') >=0){
		  wh.push("Domestic")
		 } 
		 if(this.regioned.indexOf('国外') >=0){ 
		   wh.push("International")
		 }  
		 
		  optData.internationalDomestic=wh
		  var airlines=[] 
		 this.showAirlines.forEach((item)=>{
				if(item.selected){ 
					airlines.push(item.carrierCode) 
				}  
			}) 
			optData.carrierCode=airlines
				
				optData.random=this.random
				 optData.depDate=this.extra.date    
				 optData.depName=JSON.parse(decodeURIComponent(this.extra.startLocationObj)).cityCode
				optData.arrName=  JSON.parse(decodeURIComponent(this.extra.endLocationObj)).cityCode 
				
				
				
			  if(this.pageIndex==1){
				  this.tmpData=[]
				uni.showLoading({
					title:"加载中"
				}) 
				} 
				this.status = 'loading';
					var api =getApp().globalData.API; 
					api.send({
					 url:api.URLS.searchDate,
					 data:optData,
						success:(data)=>{  
							if(this.pageIndex==1){
							 	uni.stopPullDownRefresh()
								this.dataList=[] 
							} 
							var data=	data.data; 
							if(data.length<this.pageSize){
								console.log("加载完成")
								this.status='contentnomore'
							}else{ 
								this.status='more'
							}
							if(this.pageIndex==1){
							 uni.hideLoading()
							 }
						 this.processingData(data )
						},error:(data)=>{ 
							this.status='finish'
							if(pageIndex==1){
								 	this.stopPullDownRefresh()
								uni.hideLoading()
							 }  
					} }
					 ) 
				} ,
				//时间戳转换方法    time:需要被转换的时间戳数字
				formatDate(time,template) {
				 return  Date(parseInt(time))  .format(template)
				  // var year=date.getFullYear();
				  // var mon = date.getMonth()+1;
				  // var day = date.getDate();
				  return year+'/'+mon+'/'+day;
				},
				//处理数据 
				processingData(currentLit){   
						if(currentLit.length>0){
							this.random =	currentLit[0].random
						}
						console.log("上次结余"+this.tmpData.length) 
						console.log("本次"+currentLit.length)
						currentLit.push.apply(currentLit,this.tmpData) 
						console.log("合计"+currentLit.length) 
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
						console.log(tmp.length+"处理前"+this.dataList.length)
				 	tmp.forEach((item,i)=>{   
							 this.dataList.push(item) 
				 	})
	 
		 	this.tmpData=[]
			 tmpMap.forEach((value, key, self) => {
			 this.tmpData.push(value)
			 });  
				},
				
				//处理数据
				cta(){
					//飞行时间，起飞时间，直飞，分组
				var tmpData=[] //临时转飞的，目的是为了优化速度
				 var directflight=[] //直飞的
					this.dataList.forEach((item,i)=>{  
						var newData={}
						newData.routeType=item.routeType 
						newData.mainSort=item.mainSort    
						 if(item.routeType==1){ 
						  //直飞，直接增加
						 newData.data=[item]  //{航班1},{航班2}  
						 directflight.push(newData)
						 }else{  
							//老信息获取
							 tmpData.forEach((dt,di)=>{
								if( dt.mainSort==item.mainSort&&dt.routeType!=1){
									newData=dt;
									console.log("当前返回"+(di+1)+'/'+tmpData.length )
									return
								} 
							 }) 
							 //如果不存在则创建
							 if( !newData.data){
								newData.data=[]
								tmpData.push(newData)
							 }
							 
							 //推入到数组中
							newData.data.push(item ) 
						 }
						//起飞时间
						// newData.localDepTimesStamp=item.localDepTimesStamp 	 
					})
						//需要对转飞的顺序调整	
					// tmpData.forEach((tmp,t1)=>{ 	 
					// })  
					//console.log(directflight.concat(tmpData).length)
					//	console.log(JSON.stringify(directflight.concat(tmpData)))
					//合并后排序	
				},
					clickLoadMore(){
						console.log("点击加载更多")
						if(this.status=='loading'||this.status=='contentnomore'){
							return
						}
						this.pageIndex++
						this.loadData()
					}, 
					
				clickDataItem(item,index){ 
					
					console.log(JSON.stringify(item))
				this.navigateTo({
					url:"../Details/Details",
					"data":{"item":item}
				})
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
