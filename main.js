 
import '@/static/pc.js' 
import Vue from 'vue'
import App from './App'
import LbPicker from '@/components/lb-picker'
Vue.component("lb-picker", LbPicker)
Vue.config.productionTip = true

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

import uConver from "@/common/urlConver.js";
/**参数拼接
 * @param {Object} url
 * @param {Object} parameter
 * @param {Object} key
 */
function  assemble(url,parameter,key){
	 // console.log('前往'+parameter) 
	let up = uConver.obj2url({paramObj:parameter,key:key})

	let tmpURL=url
	 // console.log('前往'+up)
	if(up.length>0){
		tmpURL+='?'
		tmpURL+=up
	} 
	// console.log(tmpURL)
	if(!tmpURL.startsWith('/')&&!tmpURL.startsWith('../')){
		tmpURL='/'+tmpURL
	}
	 // console.log('前往'+tmpURL)
	return tmpURL;
}
 
 Vue.prototype.redirectTo =function ({url,data,key}){
	  if(typeof url!='string'){
		  uni.showToast({
		  	title:"页面不存在:"+url,
		  	icon:"none"
		  })
		  return 
		  }
 	let tm= assemble(url,data,key)
 	uni.redirectTo({
 		url:tm,
 		complete() { 
 		},success() { 
 		},fail(e) {
 			console.log(JSON.stringify(e))
 			uni.showToast({
 				title:"页面不存在:"+tm,
 				icon:"none"
 			})
 		}
 	})
 }
 Vue.prototype.reLaunch =function ({url,data,key}){
	 if(typeof url!='string'){
	 		  uni.showToast({
	 		  	title:"页面不存在:"+url,
	 		  	icon:"none"
	 		  })
	 		  return 
	 		  }
	let tm= assemble(url,data,key)
	uni.reLaunch({
		url:tm,
		complete() { 
		},success() { 
		},fail(e) {
			console.log(JSON.stringify(e))
			uni.showToast({
				title:"页面不存在:"+tm,
				icon:"none"
			})
		}
	})
}
  Vue.prototype.navigateTo=function ({url,data,key}){
	  if(typeof url!='string'){
		  uni.showToast({
		  	title:"页面不存在:"+url,
		  	icon:"none"
		  })
		  return 
		  }
	let tm= assemble(url,data,key)
	uni.navigateTo({
		url:tm,
		complete() { 
		},success() { 
		},fail(e) { 
			uni.showToast({
				title:"页面不存在:"+tm,
				icon:"none"
			})
		}
	})
}
	
  Vue.prototype.$getCurrentPageName=function(){
	let pages = getCurrentPages();
	let route = pages[pages.length - 1].route;
	return route
}
Date.prototype.format = function(fmt) {
	let ret;
	const opt = {
		"Y+": this.getFullYear().toString(), // 年
		"m+": (this.getMonth() + 1).toString(), // 月
		"d+": this.getDate().toString(), // 日
		"H+": this.getHours().toString(), // 时
		"M+": this.getMinutes().toString(), // 分
		"S+": this.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
String.prototype.formatDuration = function() { 
	let txt='--'
	if (typeof this === 'undefined' || this == null || this === '') {
	return txt
	 }
	try{
		var  sum =parseInt(this);
 	  txt=  sum.formatDuration();
	}catch(e){
	 
	}
return txt 

}
/*
分钟转换小时与天
*/
Number.prototype.formatDuration = function() {
	var  sum =parseInt(this);
		var m= sum%60;
	var h  = (sum-m)/60;

	var d =0
	let oneday=60*24;
	if(h>=24){ 
	  d = (sum-(sum%oneday))/oneday; 
	}  
	if(d>0){
	 sum =sum%oneday
	 if(sum>0){
		var  hm= sum.formatDuration()
		 
		return d+'天'+hm
	}
	 return d+'天' 
	}else{ 
		if(h>0){
			return	h+'时'+m+'分'
		}
	return	 m+'分'
	}  
}