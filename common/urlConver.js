// function filter(str) { // 特殊字符转义
//   str += ''; // 隐式转换
//   str = str.replace(/%/g, '%25');
//   str = str.replace(/\+/g, '%2B');
//   str = str.replace(/ /g, '%20');
//   str = str.replace(/\//g, '%2F');
//   str = str.replace(/\?/g, '%3F');
//   str = str.replace(/&/g, '%26');
//   str = str.replace(/\=/g, '%3D');
//   str = str.replace(/#/g, '%23');
//   return str;
// }

function obj2url({paramObj,key} ) {
  
	if( typeof paramObj =='string' || 	 typeof paramObj =="boolean" ||   typeof paramObj=='number' ||
	paramObj instanceof String||paramObj instanceof Number||paramObj instanceof Boolean){ 
		return key +'='+encodeURIComponent(paramObj);
	}    
	if(key){ 
	return key +'='+encodeURIComponent(JSON.stringify(paramObj));
	} 
  const sdata = [];
  
  for (let attr in paramObj) {
	 	let value= paramObj[attr]
		if(value==null){
				value=''
		} 
		 if(typeof value =='object'){
		 value =JSON.stringify(value)
		}
		// console.log(	attr+'--'+encodeURIComponent(value)) 
		sdata.push(`${attr}=${encodeURIComponent(value)}`); 
  } 
  
    return sdata.join('&');
 //  if(sdata.length>0){  
 //  }else{
	//   if(paramObj==null){ 
	//   }
	// 	console.log(paramObj==null)
	//    console.log('--------------obj--------------------'+paramObj instanceof object)
	//     return ''
 //  }

};

export default{
	obj2url:obj2url
}