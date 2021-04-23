<template> 
	<view class="uni-flex uni-column app-bg " style="padding: 30rpx;	;	margin-top: 0rpx;"    >  
 	
		<!-- 内容 需要可以滑动--> 
	<scroll-view   @scrolltolower ="loadData()"  :scroll-y="true"    class="fixedContent    "  >   
			<uni-card   v-for=" (item,index) in dataList" @click="clickDataItem(item,index)"   >
				<view class="uni-flex" >
					<!-- 起飞信息 -->
					<view class="uni-flex uni-column center" style="flex: 1;">
					<!-- 起飞时间 -->
					<view style="font-size: 45rpx;">
						{{ 	new  Date(parseInt(item[0].localDepTimesStamp)*1000)  .format('HH:MM')}}
					 </view>
					 <!-- 起飞时间End -->
					<!-- 起飞日期 -->
					<view style="display: none;" >
					   	{{ 	new  Date(parseInt(item[0].localDepTimesStamp)*1000)  .format('mm-dd')}}
					</view> 
					<!-- 起飞日期end -->
					</view>
			 <!-- 起飞信息End --> 
					<!-- 中转时间 --> 
				<view 			 class="uni-flex uni-column center" style="width: 200rpx;">  
					<view  v-if="item.length>1"class="app-border center"
					style="color: #00aaff; padding:3rpx 50rpx; 
					border-radius: 50rpx;">中转</view>
					<view  v-if="item.length>1" style="margin-top: 20rpx;">
					{{ (((item[item.length-1].localArrTimesStamp-item[0].localDepTimesStamp)/60)).formatDuration() }} </view>
					</view>
					<!--中转时间end  -->  
					<!-- 降落信息 -->
					<view class="uni-flex uni-column center" style="flex: 1;">
					<!-- 结降落时间 -->
					
					<view style="font-size: 45rpx;">
									{{
										new  Date(parseInt(item[item.length-1].localArrTimesStamp)*1000)  .format('HH:MM')
										 
									}}	
					</view>
					<!--  结降落时间End-->			
					 <!-- 降落日期-->
									 	<view style="display: none;" >
										{{
										new  Date(parseInt(item[item.length-1].localArrTimesStamp)*1000)  .format('mm-dd')	
											
										}}
									 	</view>
					 <!-- 降落日期End-->
				</view>
					</view>
					<!-- 降落信息END -->
				<!-- 时间日期End -->
 
				
				
				
			 	<!--机场与起飞降落信息  -->
			 <view  class="uni-flex"  style="padding-bottom: 10rpx;" > 
				 <!-- 起飞机场信息-->
				  <view class="uni-flex uni-column center" style="flex: 1; text-overflow:ellipsis;overflow:hidden;">
					   
					{{  item[0].depAirportName}} 
				</view>
			 <!-- 起飞end-->
			 <!-- 中转信息-->
			<view class="uni-flex uni-column center" style="margin: 0rpx 10rpx;width: 200rpx;"> 
			<!-- 中转机场 -->
			<text  
			v-if="item.length>1"		
			style="color: #00aaff; 
			width: 200rpx;
			padding:  10rpx 0rpx; 
			overflow:hidden; 
			text-align: center;
			-webkit-line-clamp:2;  
			text-overflow:ellipsis;
			-webkit-box-orient: vertical; 
			white-space:nowrap; ">{{item[0].arrAirportName}}
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
				 	 {{  item[item.length-1].arrAirportName}} 
				 </view>
				 <!-- 降落end-->
			 </view>
			 <!--机场信息 -->
			 <!-- 航空公司与总时长-->
			 <view 
			 class="uni-flex"
			 style="-webkit-justify-content: space-between;
			 justify-content: space-between; border-top: #aaaaaa solid 1rpx;padding:10rpx;"> 
				 <view v-for="cItem in item">
					  {{cItem.carrierName}} (
					 <text style="color: #999999;">
						  {{cItem.carrierCode}}{{cItem.flightNo}}
					 </text>
					 )
				 </view>
			  <text style="">{{ (((item[item.length-1].localArrTimesStamp-item[0].localDepTimesStamp)/60)).formatDuration() }} </text>
			   <!-- 航空公司与总时长 end-->
			 </view>
			
			</uni-card>
			<view  style="display: none;" class="no-data center">
				没有搜索到相关内容</view> 
			<uni-load-more   :status="status" :icon-size="16" :content-text="contentText" /> 

		 </scroll-view>
	    <!-- 内容 end-->  
	<!-- 顶部条件 需要固定-->
	<view class="center head uni-flex"   >   
			<chenmushan-week-calendar  :defaultDate="defaultDate" style="width: 640rpx; 
		 
			  height:120rpx;    	 "
			@changeDate="changeDate"   /> 
			<view  class="uni-column  " @click="popUp()"
			style=" height: 120rpx; display: flex; flex: 1;		padding-top: 15rpx; text-align: center;   align-items: center; ">
				<image 
				 src="../../static/more.png" 
				style="height: 40rpx; width:40rpx; margin-top:15rpx;  " />
				<text  style=" ">选项</text>
			</view> 
	 
		<!-- 筛选 -->
<!-- 		<view @click="popUp" class="center uni-flex uni-column" style="padding: 10rpx ;     ">
			 <uni-icons type="list" size="20" style="padding:  0rpx;" /> 
			 <text style="margin-top: -25rpx;">筛选</text>
		</view> -->
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
			<n-transition ref="popSheet"   :maskVal="0.5">
				<view class="uni-flex uni-column" style="padding: 0;  
				height: calc(100% - 100rpx);overflow: auto; ">
					<!-- 这里需要修改-----需要滑动 -->
			 <view    style="padding:30rpx;">
				 
				<view class="optrow" >
					 <view  class="optrow "> 
							飞行区域：
				 <uni-data-checkbox multiple 
				 mode="button" selectedColor="#00aaff"
				 v-model="regioned" :localdata="region" ></uni-data-checkbox>  
				 </view>  
				 
				<!-- 宽窄-->
				<view  class="optrow "> 
				飞机机型 
				<uni-data-checkbox multiple  
 mode="button" selectedColor="#00aaff"
				v-model="widthTypeCheked" :localdata="widthType" ></uni-data-checkbox> 
				</view>  
				<!-- 宽窄End --> 
				<!-- 直飞经停-->
				<view  class=" optrow "> 	
					  直飞经停： 
					 <uni-data-checkbox multiple
					   mode="button" selectedColor="#00aaff"
					 v-model="directed" :localdata="direct" ></uni-data-checkbox> 
				 </view>  
				   
				<!-- 直飞经停End --> 
				<!-- 同航司-->
				 	<view  class="uni-flex uni-column optrow "> 	
				   中转类型： 
					<uni-data-checkbox multiple 
					 mode="button" selectedColor="#00aaff"
					v-model="sameCompanyChecked" :localdata="sameCompany" ></uni-data-checkbox> 
					</view>  
				<!-- 同航司End --> 
					
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
						<!-- 机型类型 -->
				<!-- 		<view class="uni-flex   optrow center" style="display: none;" >
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
						 </picker> 
						</view> -->
						<!-- 机型End --> 
					<!-- 起飞与到达时间 -->
				<!-- 	<view class="uni-flex optrow" style="display:none;"> 
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
					</view> -->
						<!-- 起飞与到达时间End --> 
	<!-- 					<view style="width: 100% ;display: none;   "  class="uni-flex optrow " @click="transitCityChange">
							 中转城市: 
							<text  style="border: #576B95 1px solid;flex: 1;-webkit-flex: 1; 
							padding: 0rpx 15rpx ; margin-right :50rpx  ; border-radius:5px;   ">{{transitCity}}</text>
						</view>     -->
						<!-- 航司-->
								<view class="   optrow"   >
								航司：
							 <view style="margin-right: 40rpx;" > 
						 	<text v-bind:class=" item.selected?'app-theme-btn':'app-unchecked-btn' "  
							  v-for="(item,index) in showAirlines" @click="onClickAirlines(item,index)"    >
						 {{item.name}}</text>   
								</view> 
							</view> 
							<!-- 航司End -->
					</view>
				 </view>
				</view>  
					<!-- button 需要固定 -->
					<view class="uni-flex uni-mask-btn" style="padding: 15rpx;-webkit-justify-content: space-between;
				justify-content: space-between;"  >
						<button   style=" width: 300rpx;ackground-color: #00AAFF; 
						font-size: 40rpx; " @tap="preBtn(false)" >确定</button>
						<button  type="warn" style="  width: 300rpx;
						   margin: 0rpx 30rpx; font-size: 40rpx;"@tap="preBtn(true)"  >
						   取消</button>
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
	    // return true 表示禁止默认返回 
		if(this.popShowing){
			this.preBtn(true)
			return true;
		} 
	}, 
 
	onLoad(extra) {   
		this.extra=extra
		if(extra.date){
			console.log();
			this.defaultDate=new Date(extra.date).getTime()
		}   
		console.log("当前时间----------"+this.defaultDate)
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
		api.send({
			url:api.URLS.company,
			 success: (res) => { 
				this.allAirlineCompany=res.data 
				this. showAirlines=[]
				 res.data.forEach((item)=>{ 
					 if(item.carrierNameCn&&this.isChinese(item.carrierNameCn)&&item.carrierNamePinyin){
						this. showAirlines.push({
						 name:item.carrierNameCn,
						 carrierCode:item.carrierCode,
						})
					 }
				 })  
				 // console.log("过滤前"+res.data.length+"过滤后"+	this. showAirlines.length)
				 },
			  	error: (e) => { 
			 
				}
		}) 
		
		
	this.loadData()

	},
		data() {
			return {
				defaultDate:0,
					random:"",
			 		regioned:[ ], 
					widthTypeCheked:[
					 
					],
					region: [{
					"text": "国内",
					"value":"国内"
					},
					{
					"text": "国际",
						"value":"国际"
						
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
			 directed:['直飞'],
				direct:  [
			{
				value: '直飞',
				text: '直飞', 
			},
							  {
							  	value: '经停',
							  	text: '经停', 
							  },
							  				  
				 ],
				 sameCompanyChecked:['同航司中转'],
				 sameCompany:  [
				{
					value: '同航司中转',
					text: '同航司中转', 
				} , 	{
				 		value: '跨航司中转',
				 		text: '跨航司中转', 
				 	} 
				  ],  
				status: 'more',
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
			}
		},	
		

		methods: {     
			  isChinese(source){
				var regex = /^[\u4E00-\u9FA5]+$/;
				return regex.test(source);
			},
		 
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
					// console.log(JSON.stringify(data))
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
				    this.$refs.popSheet .hide() 
					if(isCancel){
						this.regioned=this.oldSetting[0]
						this.widthTypeCheked=this.oldSetting[1]
						this.directed=this.oldSetting[2]
						this.sameCompanyChecked=this.oldSetting[3] 
						this.showAirlines=this.oldSetting[4]  
					}else{
						this.freshData()
					}
					this.popShowing=false
			},
			/**日期类型
			 * @param {Object} evt
			 */
			radioDateTypeChange(evt) { 
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
					  this.oldSetting=[]
					  this.oldSetting.push(this.regioned);
					  this.oldSetting.push(this.widthTypeCheked); 
					  this.oldSetting.push(this.directed);
					  this.oldSetting.push(this.sameCompanyChecked); 
					  this.oldSetting.push(JSON.parse(JSON.stringify(this.showAirlines))); 
					  this.popShowing=true;  
					 this.$refs['popSheet'].show( )
			    },
				onClickAirlines(data,index){  
					data.selected=	(!data.selected) 
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
					if(this.status=='contentnomore'||this.status=='loading'){
						return
					}  
					var   	optData={
						depDate: '',//出发日期
						// flightNo: '',// 航班号 
					    depName: '',//出发地址 
					    arrName: '',//到达地址代码 
						 page: this.pageIndex,  
						limit:this.pageSize
					}    
			 //直飞
			if(this.directed.indexOf('直飞')>=0){
				 optData.direct=1
			}
			//同航司
			if(this.sameCompanyChecked.indexOf('同航司中转') >=0){
				 optData.sameCarrier=1
			}
		// equipmentGroup :"JW",//机型类别 JW 宽体，JN窄体
		var wh=[]
		if(this.widthTypeCheked.indexOf('宽') >=0){
		 wh.push("JW")
		} 
		if(this.widthTypeCheked.indexOf('窄') >=0){ 
		  wh.push("JN")
		} 
		if(wh.length>0){
			  optData.equipmentGroup=wh
		}
	 
		 var di=[]
		 if(this.regioned.indexOf('国内') >=0){
		  di.push("Domestic")
		 } 
		 if(this.regioned.indexOf('国际') >=0){ 
		   di.push("International")
		 }   
	 	if(di.length>0){ 
			  optData.internationalDomestic=di
	    }
		  var airlines=[] 
		  this.showAirlines.forEach((item)=>{
				if(item.selected==true){ 
					airlines.push(item.carrierCode) 
				}  
			}) 
				if(airlines.length>0){ 
				 optData.carrierCode=airlines
				}  
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
				var 	nowDay=this.extra.date ;
					api.send({
					 url:api.URLS.searchDate,
					 data:optData,
						success:(data)=>{  
						
							if(this.pageIndex==1){
							 	uni.stopPullDownRefresh() 
								uni.hideLoading()
								this.dataList=[] 
							} 
							if(	nowDay!=this.extra.date ){
								console.log("数据与当前所选不一致进行舍弃数据")
								return
							}
							
							var data=	data.data; 
							if(data.length<this.pageSize){ 
								this.status='contentnomore'
							}else{ 
								this.pageIndex++
								this.status='more'
							}   
						 this.processingData(data )
						},error:(data)=>{ 
							this.status='contentnomore'
					
							if(this.pageIndex==1){
							uni.hideLoading()
							uni.stopPullDownRefresh() 
							 }
							   uni.showToast({
							   	icon:"none",
							   	title: data
							   })
					} }
					 ) 
				} , 
				//处理数据 
				processingData(currentLit){   
						if(currentLit.length>0){
							this.random =	currentLit[0].random
						}
						// console.log("上次结余"+this.tmpData.length) 
						// console.log("本次"+currentLit.length)
						currentLit.push.apply(currentLit,this.tmpData) 
						// console.log("合计"+currentLit.length) 
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
						// console.log(tmp.length+"处理前"+this.dataList.length)
				 	tmp.forEach((item,i)=>{   
							 this.dataList.push(item) 
				 	})
	 
		 	this.tmpData=[]
			 tmpMap.forEach((value, key, self) => {
			 this.tmpData.push(value)
			 });  
		 	}, 
				 
				 
				clickDataItem(item,index){  
				this.navigateTo({
					url:"../Details/Details",
					"data":{"item":item}
				})
				},
				freshData(){
					this.dataList=[]
					this.tmpData=[]
					this.pageIndex=1;
					this.status='more'
					this.random=''
					this.loadData()
				},
				changeDate(dt){
					this.extra.date=new Date(dt.timeSpan).format("YYYY-mm-dd") 
					 console.log("手动更改日期"+this.extra.date)
					this.freshData()
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
		width: 100%; height:120rpx; display: flex;
/* 		-webkit-justify-content: space-between;  
		justify-content: space-between; */
	 
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
		
		position: fixed; top:120rpx;overflow:scroll;height: calc(100% - 120rpx);right: 0; 	 
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
