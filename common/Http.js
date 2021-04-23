/**
 * @param {Object} min
 * @param {Object} max
 * 获取随机数
 */
function getRandomInt(min, max) {
	// 以下函数返回 min（包含）～ max（包含）之间的数字：
	return Math.floor(Math.random() * (max - min + 1)) + min
	//  函数返回 min（包含）～ max（不包含）之间的数字
	//  this.data = Math.floor(Math.random() * (max - min) ) + min;
}
// import md5 from 'js-md5';
 
 
/** 网络封装
 * @param {Object} url 
 * @param {Object} pars
 * @param {Object} head
 * @param {Object} success
 * @param {Object} error
 */
var prox='http://47.93.190.246:4040?src=';
const signature = "oUWKYeqCEojOvbmsynvWTctJSAVeoMZv";
function send(request) {
	if (typeof(request.data) == "function" || typeof(request.data) == "undefined") {
		request.data = {}
	}
	if (typeof(request.head) == "function" || typeof(request.head) == "undefined") {
		request.head = {}
	}
	// var timestamp = new Date().getTime() / 1000
	// timestamp = Math.round(timestamp).toString()
	// var rint = getRandomInt(100000, 999999).toString()
	// request.head["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8"
	// request.head["nonce"] = rint
	// request.head["timestamp"] = timestamp
	// request.head["Signature"] = md5(timestamp + rint + signature) 
	// uni.getNetworkType({
	// 	success: (res) => { 
	// 	   if(res.networkType == 'none')uni.showToast({title:'无法连接网络' , icon:"none"});
	// 	}
	// });    
		//console.log('运行环境'+process.env.NODE_ENV)
		//console.log('运行平台'+uni.getSystemInfoSync().platform)
		if(process.env.NODE_ENV !== 'development'){
			// console.log('正式环境')
		}else{
			// console.log('开发环境')
		}
	// #ifndef APP-PLUS  
		if(this.prox&&process.env.NODE_ENV !== 'development'){ 
			request.url=this.prox+request.url
		}else{
			// this.prox='http://ccd.lizhanqi.top?src=';  
		} 
	//   #endif    
	console.log("发起请求:" + JSON.stringify(request))   
	uni.request({
		url: request.url,
		method: "POST",
		header: request.head,
		dataType: "json",
		data: request.data,
		success: res => {
			let statusCode= res.statusCode 
			var data = res.data; 
			// console.log(statusCode+"请求结果: " + JSON.stringify(res)); 
			if (data.code == 200 || data.Code == 200|| data.Code == 1|| data.code == 1|| data.code == 0|| data.Code == 0) {
				request.success(data,res);
			} else {
				let msg = "";
				if (data['msg']) {
					msg = data['msg'] 
				} else if (data['Msg']) {
					msg = data['Msg']
				} else { 
				 	msg = '服务器返回错误'
					if(statusCode=='404'){
						msg="404:请求地址不存在"
					}else if(statusCode=='501'||statusCode=='502'||
						statusCode=='503'|| statusCode=='504'){
						msg=statusCode+":连接服务器异常"
					} 
				}
				let errorDetails={}
				errorDetails.data=msg
				errorDetails.res=res 
				if (request.error) { 
					if(data.code){
					 errorDetails.code=data.code  
					 }else if(data.Code){
					 errorDetails.code=data.Code  
					 } 
					 request.error(msg,errorDetails) 
				} else{
					uni.showToast({title:msg,icon:"none"})
				} 
			}
		},
		fail: (data, code) => { 
			console.log(  "请求出错: "  + JSON.stringify(data)); 
			let errorDetails={}
			errorDetails.data=data
			errorDetails.code=code 
			if (request.error) {
				request.error(data, errorDetails);
			}
		},
		complete: () => {
			if (request.complete) {
				request.complete()
			}
		}
	});
}

function	setProxy(proxyIP){
	console.log('HTPT设置代理'+proxyIP)
	 this.prox=proxyIP
 }

//这种是js
export default {
	send: send,
	setProxy:setProxy,
}
//这种为vue 使用
module.exports = {
	send: send,
 	setProxy:setProxy,
	
}
