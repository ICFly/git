

import Vue from 'vue'

import veeValidate,{Validator} from 'vee-validate'

import language from 'vee-validate/dist/locale/zh_CN';

const dictionary = {
    zh_CN: {
        messages: {
            required: (field) => '请输入'+field,
            email:(field) => '请输入正确邮箱'
        }
    }
};

Validator.addLocale(language);

Validator.updateDictionary(dictionary);


//更改中文提示

const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};



Vue.use(veeValidate,config)
