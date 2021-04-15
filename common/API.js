 
/**Post
 * type:请求类型
 * url:地址
 * pars:参数
 * success:成功回调
 * error:失败回调
 */ 
import http from "@/common/Http.js"; 
var baseUrl = "https://test.jinyuhangxin.com";
//getcity /searchDate  1机场2城市  dateType 1 出发到达类型2
var URLS = { 
	getCity: '/api/Setting/getCity' ,//城市
	serviceType:'/api/Setting/getCarrierServiceType',//飞机类型
	company:'/api/Setting/getCarrierName',//航空公司
	model:"/api/Setting/getCarrierAircraftType",
	searchDate:"/api/flight/searchDate",
	login:"/api/user/login",
	loginOut:" /api/user/logout"
	// 获取机型 /api/Setting/getCarrierAircraftType
} 


/**
 *使用示例：
 * api.send({ 	url: url,
 *					success: (res) => { 	},
 *					error: (e) => {}
 *				}) 
 * @param {Object} requst
 */	
function send(request) {
	if (request.url.startsWith("/")) {
		request.url = baseUrl + 	request.url
	} 
 return http.send(request) 
}

//这种是js
export default {
	send: send,  
	URLS:URLS, 
}
//这种为vue 使用
module.exports = { 
	send: send, 
	URLS:URLS, 
}
