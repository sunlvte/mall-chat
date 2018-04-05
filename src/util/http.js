import  axios from "axios"
import qs from 'qs';
const Message = require('element-ui').Message;
const loading = require('element-ui').Loading;
let loadingInstance= null;

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.loading = true;

axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method === 'post'){
    config.data = qs.stringify(config.data);
  }
  if (config.loading) {
    loadingInstance = loading.service({body: true, lock: true, fullscreen: true, background: 'transparent'});
  }
  return config;
},(error) =>{
  Message({
    showClose: true,
    message:  '错误的传参',
    type: 'error'
  });
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
  loadingInstance&& loadingInstance.close();
  if(!res.data.success){
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  Message({
    showClose: true,
    message:  '网络异常',
    type: 'error'
  });
  return Promise.reject(error);
});


const fetch = (url, data) => {
  return new Promise( (resolve, reject) => {
    axios.post(url, data)
      .then( res =>{
        resolve(res);
      }, err => {
        reject(err);
      })
      .catch( e => {
        reject(e);
      })

  })
}
module.exports = fetch;
