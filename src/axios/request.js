import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Request extends Component{

    static request(){
        axios.interceptors.request.use(function (config) {
            let token = this.props.token;
            console.log(token);
            axios.defaults.headers.common['accessToken'] = token;
            if (token) {
                config.withCredentials = true
                config.headers = {
                    accessToken:token
                }    //将token放到请求头发送给服务器
                return config;
                //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
                // config.headers['accessToken'] = Token;
            }}, function (error) {
                // Do something with request error
                return Promise.reject(error);
            })
    }
    
}

const mapStateToProps = (state) =>{
    return{
        token:state.token
    }
}
// http request拦截器 添加一个请求拦截器
export default connect(mapStateToProps)(Request)