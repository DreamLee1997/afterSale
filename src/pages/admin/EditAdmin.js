/* 编辑 系统管理员 的信息 */
import React from 'react';
import {Modal,Input,Select, Button,message,Form,Popconfirm} from 'antd'
import axios from '../../axios/index';

const FormItem = Form.Item;

class EditAdmin extends React.Component {
    
    //点击提交按钮 调用接口
    onConfirm = () => {
        //getFieldsValue是object对象，form的一个方法，用于获取表单下所有的值
        let userInfo = this.props.form.getFieldsValue();
        let NumRole = (userInfo.adminRole==="系统管理人员")? 1:((userInfo.adminRole==="管理人员")? 2:3)
        let NumState = (userInfo.userState==="通过注册")? 1:((userInfo.userState==="注册未通过")? 0:-1)
        // console.log(NumRole)
        // console.log(userInfo)
        const formData = {
            id:userInfo.adminId,
            role:NumRole,
            state:NumState ,
            email:userInfo.adminEmail
        }
        // console.log(formData)
        axios.ajax_put('/User/updateUser',formData
        ).then(res => {
            if(res.data.code === 200){
                // console.log(333)
                this.props.status(false)
                message.success('恭喜你，修改信息成功!')
            }       
        }) 

        // message.info('Clicked on Yes.');
    }

    onCancel = () =>{
        let status = false;
        this.props.status(status);
        // console.log(this.props.status)
    }
    
    render() {
        const text = '确定要修改此用户的信息吗?';
        const { visible, entray} = this.props;
        const {getFieldDecorator} = this.props.form;
        return ( 
                <Modal
                mask={true}
                width={900}
                height={600}
                title="编辑用户信息"
                visible={visible}
                onCancel={this.onCancel}
                onClick
                footer={null}
                >
                <Form layout="inline" labelcol={{ span: 4 ,marginLeft:30}}  >                    
                    <FormItem label="用户名称" style={{width:400,marginTop:20}} >
                        {
                            getFieldDecorator('adminName',{
                            initialValue:entray.userName,
                            rules:[
                                {
                                    required:true,
                                    message:'用户名不能为空'
                                },
                                {
                                    max:10,
                                    message:'长度不能超过10'
                                },
                            ]
                        })(
                            <Input  style={{ width: 250}} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label="用户ID" style={{width:400,marginTop:20}} >
                        {
                            getFieldDecorator('adminId',{
                            initialValue:entray.userId,
                            rules:[
                                {
                                    required:true,
                                    message:'用户ID不能为空'
                                },
                                
                            ]
                        })(
                            <Input  style={{ width: 250}} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label="联系方式" style={{width:400,marginTop:25}}>
                        {
                            getFieldDecorator('adminPhone',{
                                initialValue:entray.userPhone,
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
                                <Input  style={{ width: 250}} disabled/>
                            )
                        }
                    </FormItem>
                    <FormItem label="角色定位" style={{width:400,marginTop:25}} >
                        {
                            getFieldDecorator('adminRole',{
                                initialValue:entray.roleName,
                                rules:[
                                    {
                                        required:true,
                                        message:'角色不能为空'
                                    },                               
                                ]
                            })(
                    
                                <Select 
                                disabled
                                    size={this.props.size}
                                    style={{ width: 250}}
                                    onChange={this.handleCurrencyChange}
                                >
                                    <option value="管理人员">管理人员</option>
                                    <option value="售后人员">售后人员</option>
                                    <option value="系统管理人员">系统管理人员</option>
                                </Select>                                
                            )
                        }
                    </FormItem>
                    
                    <FormItem label="所属部门" style={{width:400,marginTop:25}}>
                        {
                            getFieldDecorator('adminEmail',{
                                initialValue:entray.email,
                                rules:[
                                                                    
                                ]
                            })(
                                <Input disabled style={{ width: 250}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="用户状态" style={{width:400,marginTop:25}}>
                        {
                            getFieldDecorator('adminState',{
                                initialValue:entray.userState,
                                rules:[
                                    {
                                        required:true,
                                        message:'用户状态不能为空'
                                    },
                                    
                                ]
                            })(
                                <Select 
                                disabled
                                    size={this.props.size}
                                    style={{ width: 250}}
                                    onChange={this.handleCurrencyChange}
                                >
                                    <option value="1">通过注册</option>
                                    <option value="0">注册未通过</option>
                                    <option value="-1">已离职</option>

                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem  wrapperCol={{ span: 24 }}style={{marginTop:50}}>
                    <Popconfirm  placement="bottom" title={text} onConfirm={this.onConfirm} okText="确定" cancelText="取消">
                        <Button  
                                disabled
                                type="primary"                                    
                                htmlType="submit"
                                style={{width:100,marginLeft:350}}
                        >确认</Button>
                    </Popconfirm>
                    </FormItem>
                </Form>
            </Modal>          
        );
    }
}
export default Form.create()(EditAdmin);