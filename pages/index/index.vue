<template> 
<view style="padding: 0px 100px;">  
<uni-card title="航班筛选"  >
		<view class="uni-flex uni-row" style="padding: 0; margin: 0;" >
		<view style="-webkit-flex: 1;flex: 1;">
			<text style="font-size: 15px;">出发时间</text> 
		</view>		
		<view style="-webkit-flex: 1;flex: 1;">
			<text style="font-size: 15px;">到达时间</text> 
		</view>  
		</view>
	 <radio-group style="margin-top: 0px;"> <radio>机场</radio><radio>城市</radio><radio>省/州</radio><radio>国家</radio><radio>地区</radio></radio-group>

 
 
 <!-- 出发到达信息-->
	<view class="uni-flex uni-row" style="margin-top: 15px;">  
<!-- 出发 -->
<view class="text" style="-webkit-flex: 1;flex: 1;">
	<text >出发地</text>   
	   <input-autocomplete
		style=" padding: 5px 10px;
		border: #007AFF; border-style: solid; border-width: 1px;
		border-radius: 10px;"
   placeholder="请输入出发地"
        highlightColor="#FF0000" 
    ></input-autocomplete>
</view>  
<text style="margin:40px 30px 30px 30px">换</text>
 <!-- 到达-->
<view class="text" style="-webkit-flex: 1;flex: 1;">
		<text>目的地</text>  
	   <input-autocomplete
		style=" padding: 5px 10px;
		border: #007AFF; border-style: solid; border-width: 1px;
		border-radius: 10px;" 
	        class="unit-item__input" 
	        placeholder="请输入目的地"
	        highlightColor="#FF0000" 
	    ></input-autocomplete> 
</view>   
</view>   

		<text>中转方案>></text>
		<view  >
			

		   <radio-group style="margin-top: 15px;"> <radio>机场</radio><radio>城市</radio><radio>省/州</radio><radio>国家</radio><radio>地区</radio></radio-group>
		   	  	<view class="uni-flex uni-row" style="	margin: 15px;">
		   	  				<input-autocomplete  
		   	  				style=" padding: 5px 10px;
		   	  				margin: 0px 15px;
		   	  				-webkit-flex: 1;flex: 1;
		   	  				border: #007AFF; border-style: solid; border-width: 1px;
		   	  				border-radius: 10px;"
		   	  				placeholder="请输入出发城市"
		   	  		     highlightColor="#FF0000" 
		   	  		 ></input-autocomplete>
		   	  		 <checkbox>排除</checkbox>
		   	  	</view> 
		 		 
 		</view>

</uni-card>     
 
		<uni-card>
			<view class="uni-flex uni-row">
		 <view class="uni-flex uni-row" style="margin-top: 30px; -webkit-flex: 1;flex: 1;" >
			 <text>航班公司</text>
			 <input-autocomplete 	style=" padding: 5px 10px;
		   	  				margin: 0px 15px;
		   	  				-webkit-flex: 1;flex: 1;
		   	  				border: #007AFF; border-style: solid; border-width: 1px;
		   	  				border-radius: 10px;"
		   	  				placeholder="请输入出发城市"
		   	  		     highlightColor="#FF0000" /> 
		 </view> 
		 
		 
		 <view class="uni-flex uni-row" style="margin-top: 30px;-webkit-flex: 1;flex: 1;"  >
		 			 <text>服务类型</text>
		 			 <input-autocomplete 	style=" padding: 5px 10px;
		   	  				margin: 0px 15px;
		   	  				-webkit-flex: 1;flex: 1;
		   	  				border: #007AFF; border-style: solid; border-width: 1px;
		   	  				border-radius: 10px;"
		   	  				placeholder="请输入出发城市"
		   	  		     highlightColor="#FF0000" /> 
		 </view> 
		 
		 </view>
		 <view class="uni-flex uni-row" style="margin-top: 30px;">
		 			 <text>&nbsp;机&nbsp;&nbsp; 型&nbsp;&nbsp;        </text>
		 			 <input-autocomplete 	style=" padding: 5px 10px;
		   	  				margin: 0px 15px;
		   	  				-webkit-flex: 1;flex: 1;
		   	  				border: #007AFF; border-style: solid; border-width: 1px;
		   	  				border-radius: 10px;"
		   	  				placeholder="请输入出发城市"
		   	  		     highlightColor="#FF0000" /> 
		 </view> 
		 
		 

 </uni-card>
</view>  
</template> 
<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style> 
	.content {
		display: flex;
		flex-direction: column;
 
		justify-content: center;
	}

	.logo {
		height: 200px;
		width: 200px;
		margin-top: 200px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50px;
	}
text    {
 font-size: 15px;
}
    checkbox{
 font-size: 15px;
}
  radio  {
 font-size: 15px;
}
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
