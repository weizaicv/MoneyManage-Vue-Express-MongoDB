import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from './router'

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading(){
  loading.close();
}

//请求拦截，设置header
axios.interceptors.request.use(config=>{
  startLoading();
  if(localStorage.eleToken)
    config.headers.Authorization = localStorage.eleToken;
  return config;
},error=>{
  return Promise.reject(error)
})

//请求拦截 401
axios.interceptors.response.use(reponse=>{
  endLoading()
  return reponse;
},error=>{
  endLoading()
  Message.error(error.reponse.data);

  //401是token错误
  const { status } = error.reponse;
  if(status == 401) {
    Message.error('token值无效，重新登录先');
    localStorage.removeItem('eleToken');
    router.push('/login');
  }
  return Promise.reject(error)
})


export default axios;