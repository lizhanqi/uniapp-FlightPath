<template>
<!-- 背景 -->
	<view    class="uni-flex uni-column app-bg"  >  
		 <view  class="app-card" style="height: 100%;  ">
			 <text style="font-size: 40rpx; ">{{decodeURIComponent(this.extra.title)}}</text>
			 <!-- 搜索框-->
			 <view class="uni-flex uni-row" style="border-bottom: #007AFF solid 1rpx;  padding:  5rpx;" > 
				<uni-icons type="search" size="20"></uni-icons>
				<input placeholder="城市名/英文名/拼音"
				 style="margin-left: 5rpx; width: 100%;" @input="inputChange"></rich-text>
			 </view>
			 <!-- 搜索框END--> 
			 <!-- 搜索内容-->
			 <view   v-if="inSearch" >
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
			 <view   >  
	 
		<!-- <text>历史搜索</text> -->
		<!-- <view>
			<block   style="display:flex;flex-wrap:wrap" v-for="a in 10" >
				  <button style="margin-top: 25rpx; margin-left: 25rpx; display: inline-flex;  " >btn{{a}}</button>
			</block>
		</view> -->

		
			 
		<text style="font-size: 40rpx; padding-top: 125rpx;">国内热门</text>
		<view>
							
		</view>
			 <text style="font-size: 40rpx; padding-top: 125rpx;">国外热门</text>
			 
			 <view>
			 					
			 </view>

			 </view>
			 		<!--常用end  -->
		 </view>
	</view>
</template> 
<script>
	export default {
		onLoad(extra) { 
				this.extra=extra;
				console.log(extra) 
				var api=	getApp().globalData.API;
				uni.showLoading({
					title:"加载中.."
				})
				api.send({
					url:api.URLS.getCity,
					 success: (res) => { 
						 this.allCity = res.data
						 console.log("共计"+Object.keys(this.allCity).length) 
						 uni.hideLoading() 
						 },
					  	error: (e) => {
						 	console.log("日志E"+e )
						uni.hideLoading()
						}
				})
				
		},
		data() {
			return {
				domestic:{},
				abroad:{},
				allCity:[],
				matchCity:[],
				inSearch:false,
				extra:{}
				
			}
		},
		methods: {
				inputChange(e){
					var intputText=e.detail.value; 
					if(Object.keys(intputText).length >0){
						this.inSearch=true;
						this.matchInput(intputText)
					}else{
							this.inSearch=false;
					} 
				},
			
				matchInput(text){  
					var list=[];
						var key =text .toLocaleUpperCase ();
						uni.showLoading({
							title:"匹配中"
						})
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
				 uni.hideLoading()
						 // console.log("匹配完毕"+Object.keys(list).length)
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
