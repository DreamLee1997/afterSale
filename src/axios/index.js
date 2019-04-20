// import React,{Component} from 'react'
import JsonP from 'jsonp'
import axios from 'axios'
console.log(122324)
// import axiosrequest from './request'
// import {Modal} from 'antd'
// var storage=window.localStorage;
// axiosrequest.request()
// http request拦截器 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//     let token = this.props.token;
//     console.log(token);
//     axios.defaults.headers.common['accessToken'] = token;
//     if (token) {
//         config.withCredentials = true
//         config.headers = {
//             accessToken:token
//         }    //将token放到请求头发送给服务器
//         return config;
//         //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//         // config.headers['accessToken'] = Token;
//     }}, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
// })


// // 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });
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
