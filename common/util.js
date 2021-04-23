   
const util = {  
	/**
	 * 存储历史数据
	 * val [string | object]需要存储的内容
	 */
	setHistory(val) {
		let searchHistory = uni.getStorageSync('search:history');
		if (!searchHistory) searchHistory = [];
		let serachData = {};
			serachData = val
		// if (typeof(val) === 'string') {
		// 	serachData = { 
		// 	name: val, 
		// 	};
		// } else {
		// 	serachData = val
		// }
	  console.log('存储： '+JSON.stringify(serachData));
	
		// 判断数组是否存在，如果存在，那么将放到最前面
		for (var i = 0; i < searchHistory.length; i++) {
			if (searchHistory[i].name === serachData.name) {
				searchHistory.splice(i, 1);
				break;
			}
		}
		searchHistory.unshift(serachData);
		console.log('存储： '+JSON.stringify(serachData)); 
		uni.setStorage({
			key: 'search:history',
			data: searchHistory,
			success: function() {
			  console.log('存储：success'+JSON.stringify(searchHistory));
			}
		});
	},
	getHistory() { 
	return	uni.getStorageSync('search:history');
	},
	removeHistory() {
		uni.removeStorage({
			key: 'search:history',
			success: function(res) {
				console.log('success');
			}
		});
		return []
	} 
} 
export default util;
