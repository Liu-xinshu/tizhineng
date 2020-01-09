import fetch from 'dva/fetch';
import {message} from 'antd';
import {getItem} from '@/utils/cookies';
//格式化请求参数
function formateParams(data){
    return Object.entries(data).map(item=>`${item[0]}=${item[1]}`).join('&')
}
class Request {
    constructor(options = {
      baseUrl: '',
      timeout:null
    }){
        this.baseUrl = options.baseUrl;
        this.timeout = options.timeout;
    }
    //超时失败
    getTimeout(){
      return new Promise((resolve,reject)=>{
          setTimeout(()=>{
              reject(new Error('请求超时'));
          },this.timeout)
      })
    }
    getHttp(){
      if(window.fetch){
        return fetch;
      }
      return new XMLHttpRequest();
    }
    async create(url,data,headers={},method){
        //基本参数
       let options = {
          method,
          headers:{
            ...headers,
            'api-request':'yes',
            'authorization':localStorage.getItem('data')? JSON.parse(localStorage.data).token : null,
            'cache-control':'max-age=2000000',
            'Pragma':'max-age=2000000'
          }
       };
       
       //判断是get请求还是post请求
       if(method === 'GET'){
          options.headers['content-type'] = 'application/x-www-form-urlencoded';
       }else{
          //判断是不是Formdata参数
          if(!(data instanceof FormData)){
              options.body = JSON.stringify(data);
              options.headers['content-type'] = 'application/json';
          }else{
              options.body = data;
          }
       }
       //创建fetch对象
       const fetch = this.getHttp();
       //创建终止fetch对象
       const controller = new AbortController()
       const signal = controller.signal;
       //在fetch请求参数中添加终止属性
       options.signal = signal;
       //超时先执行还是fetch先执行
       try{
          let res = null;
          if(this.timeout){
             res = await Promise.race([this.getTimeout(),fetch(this.baseUrl+url,options)])
          }else{
             res = await fetch(this.baseUrl+url,options);
          }
          if(res.ok || res.status === 304){
            if(this.responseType === 'json'){
              return Promise.resolve(res.json());
            }else{
              return Promise.resolve(res.blob());
            }
          }
          //判断公共状态码
          let errordata = await res.json();
          switch(res.status){
              case 401:
                message.warning('该用户没用登陆请重新登陆',2,()=>{
                    window.history.pushState({},'/login');
                });
              break;
              case 400:
                  message.warning(errordata.msg,2);
              break;
              case 404:
                message.warning('该接口找不到',2);
              break;
              default :
                message.warning(errordata.msg,2)
          }
          return Promise.reject(errordata);
       }catch(error){ //超时错误promise状态改变成失败
          //终止fetch
          controller.abort();
          //提示报错
          message.warning(error.message,2);
          return Promise.reject({
            code:0,
            msg: "请求超时"
          });
       }
    }
    get(url,params={},headers){
        url = url += (Object.keys(params).length ? `?${formateParams(params)}` : '');
        this.responseType = 'json';
        return this.create(url,null,headers,'GET');
    }
    post(url,data,headers){
        this.responseType = data.responseType ? data.responseType : 'json';
        data.responseType = this.responseType;
        delete data.responseType;
        return this.create(url,data,headers,'POST');
    }
}

//实例对象
const request = new Request({
  baseUrl:process.env.NODE_ENV === 'development' ? '/api' : '',
  timeout:8000
})

export default request;

