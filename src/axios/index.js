/*所有axios方法 调用接口 的封装组件 */
import JsonP from 'jsonp'
import axios from 'axios'

const baseApi = 'http://10.11.35.167:8080/zjsdtt'
export default class Axios{
    //options 传一个大对象
    static jsonp(options){
        //resolve 调用成功；reject 调用失败
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
                //err 失败；response 响应
            },function(err,response) {
                // to-do
                // debugger;
                if(response.status='success'){
                    resolve(response);
                }else {
                    reject(response.message)
                }
            })
        })
    }
    //axios post请求
    static ajax_post(url, params ) {
        
        return new Promise((resolve, reject) => {
            const URL = baseApi + url
            return axios.post(URL, params
            ).then(response => {
                resolve(response);
                // console.log(response.data.result.accessToken)
                return response.data
            }).catch(error => {
                reject(error);
                // 异常处理
            })
        })
    }
    
    //axios get请求
    static ajax_get(url,params ){
        const URL1 = baseApi + url
        // console.log(URL1)
        return new Promise((resolve,reject)=>{
            axios.get(URL1,{params:params}).then((response)=>{
                console.log(response)
                resolve(response);
                return response
            }).catch(error => {
                reject(error);
                // 异常处理
            })
        });
    }
     //axios put请求
    static ajax_put(url, params ) {
        return new Promise((resolve, reject) => {
            const URL2 = baseApi + url
            return axios.put(URL2, params
            ).then(response => {
                resolve(response);
                console.log(response)
                return response
            }).catch(error => {
                reject(error);
                // 异常处理
            })
        })
    }

    static getobj() {
        return axios;
    }
}
