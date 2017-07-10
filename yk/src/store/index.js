import vue from 'vue'
import vuex from 'vuex'

import * as types from '@/store/types'

import {getCookie,setCookie,getStore,setStore} from '@/config/util'


import axios from '@/fetch/api'

// console.log(axios.test());

vue.use(vuex)



let store = new vuex.Store({
	state:{
		count:110,
		user:{},
		login:false,//登录信息
		personalAuthen:false,
		companyAuthen:false,

		msgCount:0,//未读消息总数

	},
	getters:{
		getMsg(state){
			return state.msgCount;
		},
		//获取存储的信息
		getInfoBy(val){
			return getStore(val);
		},
		// getInfo(val){
		// 	return getStore(val);
		// },
		getVip(state){
			// return getStore('vip');
			return getCookie('vip')
		},
		getCount(state){
			return state.count
		},
		getUser(state){
			return state.user;
		},
		getCookie(state,val){
			return getCookie('vip_member');
		}
	},
	actions:{
		//检查实名认证
		checkAuthen(state,id){

			axios.test('/querygrsmrz',{vip:id}).then((res)=>{
				let obj = res.response;
				if(obj.state){
					setCookie('personalAuthen',1);//标记实名认证，表示通过
					setCookie("personAuthenState",obj.state);//标记认证状态。
				}
			});
			axios.test('/queryqysmrz',{vip:id}).then((res)=>{

				let obj = res.response;
				if(obj.state){
					setCookie('companyAuthen',obj.state);//标记企业认证 0：驳回，1，审核中，2，OK，通过
					setCookie("companyAuthenState",obj.state);//标记认证状态。
				}

			});

		},
		queryUserInfo(state,vip){
			axios.test('/GetInfoByvip',{vip:vip}).then((res)=>{
				let user = res.response.user;
				for(let val in user){
					setCookie(val,user[val])
				}

			});
		},
	},

	mutations:{
		//退出登录
		[types.LOGOUT](state,val){


			let keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
			if(keys){
				for(let i = 0;i<keys.length;i++){
					// console.log(keys[i]);
					document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
				}
			}



		},
		[types.EACHALL](state,val){
			let keys = document.cookie.match(/[^ =;]+(?=\=)/g); 
			if(keys){
				for(let i = 0;i<keys.length;i++){
					// console.log(keys[i]);
					document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
				}
			}


		},
		getInfoBy(state,val){
			return getStore(val);
		},
		//获取信息
		getInfo(state,val){
			return getCookie(val);
		},
		//设置个人认证状态
		setPersonalAuthen(state,val){
			state.personalAuthen = val;
		},
		setCompanyAuthen(state,val){
			state.companyAuthen = val;
		},
		//保存用户信息
		setUser(state,loginUser){
			//state.user = loginUser;
			//console.log(loginUser);
			// state.login = true;
			// let validity = 30;//设置登录时效
			// let now = new Date();
			// now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
			// document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
			// document.cookie = "SID=CeRxBZalHSiKuGI49DL2DhXMrOakCzQNcJFg" + ";expires=" + now.toGMTString();

			store.dispatch("queryUserInfo",loginUser['vip']);
			for(let val in loginUser){
				setCookie(val,loginUser[val])
				// setStore(val,loginUser[val])
			}

			//实名验证
			store.dispatch('checkAuthen',loginUser['vip']);
		},
		//更新实名认证状态
		updateAuthenState(state,vip){
			//实名验证
			store.dispatch('checkAuthen',vip);
		},
		setAuthen(state,authenInfo){

		},
		decrement(state,price){
			state.count++
		},
		increment(state,price){
			state.count--
		},
		//设置未读消息数量
		setMsgCount(state,val){
			state.msgCount = val;
		},
		//标记未读消息-1
		readMsg(state){
			if(state.msgCount>0){
				state.msgCount--
			}
		}
		
	}
})


export default store