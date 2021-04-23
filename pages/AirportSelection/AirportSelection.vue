<template>
<!-- 背景 -->
	<view    class="uni-flex uni-column app-bg"  >  
		 <view  class="app-card " style="height: 100%;  ">
			 <text style="font-size: 40rpx; ">{{decodeURIComponent(this.extra.title)}}</text>
			 <!-- 搜索框-->
			 <view class="uni-flex uni-row app-center-align"  
			 style="border-bottom: #00AAFF solid 1rpx; 
			  padding:  5rpx; -webkit-align-items: center;align-items: center;"  > 
				<uni-icons type="search" size="20"></uni-icons>
				<input   placeholder="城市名/英文名/拼音"
				 style="margin-left: 5rpx; width: 100%;" @input="inputChange"></rich-text>
			 </view>
			 <!-- 搜索框END--> 
			 <!-- 搜索内容-->
			 <view   >
			 	<block   style="display:inline-flex;flex-wrap:wrap" v-for="(item, index) in matchCity" :key="index" >
			   <text style="margin-top: 25rpx; 
				padding: 5rpx 15rpx;
					border-radius:5px;
			    color: #ffffff;
				background-color: rgba(0, 170, 255, 0.8);
			   margin-left: 25rpx; display: inline-flex; 
			   "  @click="onItem(item)">{{item.cityNameCn?item.cityNameCn: item.cityName   }}   </text>
				</block>
			 </view>
			<view> 
	 </view>
			 <!-- 搜索内容End-->
			 <!-- 常用内容-->
		  <view class="   ">   
		<!-- <text>历史搜索</text> -->
		<!-- <view>
			<block   style="display:flex;flex-wrap:wrap" v-for="a in 10" >
				  <button style="margin-top: 25rpx; margin-left: 25rpx; display: inline-flex;  " >btn{{a}}</button>
			</block>
		</view> -->  
		<text style="font-size: 40rpx; margin-top: 125rpx;">热门城市</text>
		<view> 
		<block   style="display:inline-flex;flex-wrap:wrap" v-for="(item, index) in hot[0]" 
		  >
		<text style="margin-top: 25rpx; 
					padding: 5rpx 15rpx;
					border-radius:5px;
					color: #ffffff;
					background-color: rgba(0, 170, 255, 0.8);
		margin-left: 25rpx; display: inline-flex; 
		"  @click="onHotItem(item)">{{ item  }}   </text>
	  </block>
	  </view>
		<view> 				
		</view>
			 <text style="font-size: 40rpx; padding-top: 125rpx; display: none;">国外热门</text>
			 
			 <view>
			 					
			 </view>
				
			 </view>
			 		<!--常用end  -->
		 </view>
	</view>
</template> 
<script> 
		import hotJson from "@/static/json/hotspot.json"
	export default {
		onLoad(extra) { 
				this.extra=extra; 
				this.loadData()
		},
		data() {
			return {
				domestic:{},
				abroad:{},
				allCity:[],
				matchCity:[],
				hot:[],
				inSearch:false,
				extra:{}
				
			}
		},
		methods: {
			loadData(){
				console.log(this.extra)
								var api=	getApp().globalData.API;
								console.log(getApp().globalData.allCitys.length)
								if(getApp().globalData.allCitys.length==0){ 
								uni.showLoading({
									title:"加载中.."
								}) 
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
											this.hot=hotJson
										 uni.hideLoading() 
										 },
									  	error: (e) => { 
											uni.hideLoading()
										uni.showModal({
										    title: '数据加载失败',
										    content:e, 
											cancelText:"退出",
											confirmText:"重试", 
										    success:   (res)=> {
										        if (res.confirm) {
														this.loadData()		
										        } else if (res.cancel) {
										           			uni.navigateBack()
										        }
										    }
										}); 
										}
								})
								
				}else{
							 	 this.allCity=getApp().globalData.allCitys;
								 this.hot=hotJson
				}						
			},
				inputChange(e){
					var intputText=e.detail.value; 
					if(Object.keys(intputText).length >0){
						this.inSearch=true;
						this.matchInput(intputText)
					}else{
						this.matchCity=[]
							this.inSearch=false;
					} 
				},
				onHotItem(item){ 
					this.allCity.forEach((d,i)=>{
						if(d.cityNameCn==item){
						 this.onItem(d)
						 return
						}
					})
				},
				matchInput(text){  
					var list=[];
					var key =text .toLocaleUpperCase (); 
					this.allCity.forEach(( item, index) => {
						// "cityCode":"ZYI",
						//  "cityName":"Zunyi",
						//  "cityNameCn":"遵义",
						//  "cityNamePinyin":"zunyi",
						//  "cityNamePinyinShort":"ZY" 
						try
						   { 
								 var cityCode=	item.cityCode ;
								 var cityName=	item.cityName ;
								 var cityNameCn=	item.cityNameCn ;
								 var cityNamePinyin=	item.cityNamePinyin ;
								 var cityNamePinyinShort=	item.cityNamePinyinShort ;
								 
								  if(   this.isMatch(cityCode,key)||
								   this.isMatch(cityName,key)|| 
								  this.isMatch(cityNameCn,key)|| 
								  	  this.isMatch(cityNamePinyin,key)|| 
								  this.isMatch(cityNamePinyinShort,key) ) {
								 list.push(item)
							 } 
				  }	catch(err) {   } 
				 })
				 this.matchCity=list;
				 this.matchCity.reverse() 
				 console.log(text+"结果："+JSON.stringify(this.matchCity))
				},
				isMatch(source,key ){
				if(source==null){
				   return false
				 } 
			  return source.toLocaleUpperCase().search(key.toLocaleUpperCase()) != -1
		 	},
			onItem(item){ 	 
			 uni.$emit( decodeURIComponent(this.extra.callBackTag) , item)
			 uni.navigateBack(); 
			} 
			 
		}
	}
</script> 
<style>

</style>
