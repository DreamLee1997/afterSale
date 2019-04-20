import React,{Component} from 'react'
import { Form,Input,Button,message,Icon,Checkbox} from 'antd'
import { connect } from 'react-redux'
import { getToken } from './../../redux/action/index'
// import Register from './../register/index'
import './index.less'
import axios1 from './../../axios/index'
// import axios from 'axios'
const FormItem = Form.Item;
// var storage=window.localStorage;
class Login extends Component{
    
    handleSubmit = () =>{
        let history = this.props.history;
        // console.log(history)
        //getFieldsValue是object对象，form的一个方法，用于获取表单下所有的值
        let userInfo = this.props.form.getFieldsValue();
        //validateFields方法是校验信息是否符合要求，校验下是一个循环，用()=>
        // console.log(userInfo);
        const params={
            phone:userInfo.userTel,
            password:userInfo.userPwd,
        }
        this.props.form.validateFields((err,values)=>{
            if(!err){
                // console.log(111);
                // const data = JSON.parse(info)
                axios1.ajax_post('/User/login',params
                ).then(res => {
                    // console.log()
                    if(res.data.code === 201){                     
                        // console.log(res.data.result.accessToken)                       
                         //2、通过connect连接后 获取dispatch
                        const {dispatch} = this.props;
                        //3、出发ruducer
                        const token1 = dispatch(getToken(res.data.result.accessToken))           
                        const axios = axios1.getobj()                      
               
                        axios.interceptors.request.use(function (config) {
                            axios.defaults.headers.common['accessToken'] = token1.token;
                            if (token1) {
                                config.withCredentials = true
                                config.headers = {
                                    accessToken:token1.token,
                                    'Content-Type':'application/json'
                                }    //将token放到请求头发送给服务器
                                return config;
                                //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
                                // config.headers['accessToken'] = Token;
                            }}, function (error) {
                                // Do something with request error
                                return Promise.reject(error);
                        })

                        message.success(`${userInfo.userName}恭喜你，登陆成功!当前密码为：${userInfo.userPwd}`)
                        if(res.data.result.roleId === 1){
                            history.push('/admin')
                        }
                        else if(res.data.result.roleId === 2){
                            history.push('/userAdmin')
                        }else{history.push('/user')}
                    }
                    
                })
            }else {
                message.error("登录失败")
            }
        })
    }

    render (){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="divForm">
                    <Form layout="horizontal" className="login-form" style={{width:350}} >
                        <FormItem className="title-form">
                            <h1  align="center" className="title">盛达售后申请平台</h1>
                        </FormItem>
                        <FormItem >
                            {
                                getFieldDecorator('userTel',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'手机号不能为空'
                                        },
                                        {
                                            min:11,
                                            max:11,
                                            message:'手机号码为11位数字组成'
                                        },
                                        {
                                            pattern:new RegExp('^\\d+$','g'),
                                            message:'手机号码为11位数字组成',
                                        }

                                    ]
                                })(
                                    <Input

                                        size="large"
                                        prefix={<Icon type="phone"/>} placeholder="请输入您的手机号"/>
                                )
                            }
                        </FormItem>

                        <FormItem>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户密码不能为空'
                                        },

                                    ]
                                })(
                                    <Input
                                        size="large"
                                        type="password"
                                        prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
                                )
                            }

                        </FormItem>
                        <FormItem className="remember-form">
                            {
                                getFieldDecorator('remember',{
                                    valuePropName:'checked',
                                    initialValue:true
                                })(
                                    <Checkbox  style={{color:'#999999'}} >记住密码</Checkbox>
                                )
                            }
                            <a href="#/forgetPwd/index" style={{float:'right',color:'#999999'}} className="forget-form">忘记密码</a>

                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{width:350}}
                                    onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                        <FormItem className="register-form">
                            <a  href="#/register/index"  className="register" align="center">立即注册</a>
                        </FormItem>
                    </Form>

            </div>
        );
    }
}



//关键，一定要通过Form.create()创建表单，将组件传递进去，这样才能识别 getFieldDecorator
export default connect()(Form.create()(Login));