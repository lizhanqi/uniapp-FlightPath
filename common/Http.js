 
 
 
/** 网络封装
 * @param {Object} url 
 * @param {Object} pars
 * @param {Object} head
 * @param {Object} success
 * @param {Object} error
 */ 
 function send(request) {
	if (typeof(request.data) == "function" || typeof(request.data) == "undefined") {
		request.data = {}
	}
	if (typeof(request.head) == "function" || typeof(request.head) == "undefined") {
		request.head = {}
	} 
	// console.log("发起请求:" + JSON.stringify(request))   
	uni.request({
		url: request.url,
		method: "POST",
		header: request.head,
		dataType: "json",
		data: request.data,
		success: res => {
			let statusCode= res.statusCode 
			var data = res.data; 
			//console.log(statusCode+"请求结果: " + JSON.stringify(res)); 
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
 
//这种是js
export default {
	send: send, 
}
//这种为vue 使用
module.exports = {
	send: send, 
}
