// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'

import rem from './config/rem'

//后端数据请求
import axios from './axios'

//状态管理
import store from './store'
//路由
import router from './router'

// import fetch from 'whatwg-fetch'
// 国际化文件
import i18n from './i18n'
// 表单验证
import validate from './validate'

//mint UI 
import MintUI from 'mint-ui'

//关闭vue提示信息
Vue.config.productionTip = false



//引入vue-source
// Vue.use(vueResource)
//使用vue-swiper插件
Vue.use(VueAwesomeSwiper)

//使用mint-ui
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  created(){

  	this.init();

  },
  once(){
  	console.log('once');
  },
  methods:{
  	init(){

  		this.$http.post('/changeLanguage',{"n_language":"cn","release_machine":"h5"}).then((res)=>{
        if(res.data.code == 0){
          // console.log("已经设置好语言格式。");
        }
  		}).catch((err)=>{
  		})
  	}
  }
})
