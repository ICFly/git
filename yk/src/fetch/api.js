import axios from 'axios'


export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
              console.log(error)
               reject(error)
            })
    })
}


export default {
  // 获取我的页面的后台数据
  test(api,params) {
    return fetch(api,params);
  }
}