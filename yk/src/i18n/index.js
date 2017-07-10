
import Vue from 'vue'

import VueI18n from 'vue-i18n'

import {getStore} from '@/config/util'


Vue.use(VueI18n)



// console.log(navigator.language);
let defaultLang;


//从浏览器storage读取语言记录，如果没有记录，则设置与浏览器相同的语言

let historyLang = getStore('lang');

if(historyLang){
	defaultLang = historyLang;
}else{
	defaultLang = navigator.language.substring(0,2);
}

// defaultLang = 'zh'

const i18n = new VueI18n({
	locale: defaultLang,//默认语言
	messages: {
	 zh:{
	 	hello:'你好',
	 	footTitle:['现货交易','采购供应','资讯行情','个人中心'],

	 },
	 en: {
	   hello: 'hello',
	   footTitle:['Trading','Demand','Information','Me']
	 },
	}
})

export default i18n


