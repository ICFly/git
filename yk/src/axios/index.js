import vue from 'vue'
import axios from 'axios'

import {apiUrl} from '@/config/apiUrl'

vue.prototype.$http = axios
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.create({
// 	transformRequest:function(data){

// 		console.log(data);

// 	}

// })
//发送请求之前，把参数格式化。
axios.defaults.transformRequest = function(data){
	let params = new FormData();
	for(let key in data){
		// console.log(i+"===="+data[i])
		params.append(key,data[key]);
	}
	return params;
}
//http://120.76.112.141:8080/zswjk/queryTender?pageNo=1

axios.defaults.baseURL = apiUrl;




