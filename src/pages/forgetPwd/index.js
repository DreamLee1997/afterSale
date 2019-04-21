/* 忘记密码的功 能暂时还未完善 先把必要功能做很好 最后晚上细节 */
import React,{Component} from 'react'
import {Button,Form,Input,Icon,message} from 'antd'

const FormItem = Form.Item;

class ForgetPwd extends Component{

    handleSubmit = ()=>{
        let history = this.props.history;
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(userInfo.userPwd === userInfo.userRPwd){
                    message.success(`${userInfo.userName}恭喜你，成功找回密码!当前密码为：${userInfo.userPwd}`)
                    history.push('/admin')
                }else {
                    message.error("两次密码输入不一致")
                }
            }
        })
    }

    handleSent = () =>{
        message.success("发送成功")

    }

    render (){
        const {getFieldDecorator} = this.props.form;
        const  formItemLayout = {
            wrapperCol:{
                xs:24,
                sm:24
            }
        }
        return(
            <div className="register-wrap">
                <Form layout="horizontal"  style={{width:350}}>
                    <FormItem className="title-form">
                        <h1  align="center" className="title">盛达售后申请平台</h1>
                    </FormItem>
                    <FormItem {...formItemLayout}>
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
                    <FormItem {...formItemLayout}  >
                        {
                            getFieldDecorator('validate',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户验证码不能为空'
                                    },
                                    {
                                        pattern:new RegExp('^\\d+$','g'),
                                        message:'验证码为数字组成',
                                    }
                                ]
                            })(
                                <Input
                                    style={{width:200}}
                                    placeholder="请输入验证码"/>
                            )
                        }
                        <Button htmlType="submit"

                                style={{width:130,marginLeft:20}}
                                onClick={this.handleSent}
                        >发送短信验证</Button>
                    </FormItem>
                    <FormItem {...formItemLayout}>
                        {
                            getFieldDecorator('userPwd',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户密码不能为空'
                                    },
                                    {
                                        min:8,
                                        message:'长度至少为8'
                                    },

                                ]
                            })(
                                <Input
                                    size="large"
                                    type="password"
                                    prefix={<Icon type="lock"/>} placeholder="请输入您的新密码"/>
                            )
                        }

                    </FormItem>
                    <FormItem {...formItemLayout}>
                        {
                            getFieldDecorator('userRPwd',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户密码不能为空'
                                    },
                                    {
                                        min:8,
                                        message:'长度至少为8'
                                    },

                                ]
                            })(
                                <Input
                                    size="large"
                                    type="password"
                                    prefix={<Icon type="lock"/>} placeholder="确认您的新密码"/>
                            )
                        }
                    </FormItem>
                    <FormItem  {...formItemLayout}>
                        <Button type="primary"
                                size="large"
                                htmlType="submit"
                                style={{width:350}}
                                onClick={this.handleSubmit}
                        >登录</Button>
                    </FormItem>
                    <FormItem >
                        <a  href="#/login/index"  className="register" style={{color:'#999999'}}>使用已有账户登录</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(ForgetPwd);