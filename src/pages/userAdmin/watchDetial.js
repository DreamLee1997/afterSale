/* 审批管理员的 查看待审批申请的功能组件（包括下载文件及提交审批） */
import React from 'react';
import {Table,Button,Form,Modal,Radio,Popconfirm,message, Icon} from 'antd'
import axios from '../../axios/index';
const FormItem = Form.Item;
// const Option = Select.Option;
class WatchDetial extends React.Component {
    
    state = {
        dataSource2: [],
        priceDetial:[]
    }

    //modal取消按钮，改变status状态
    onCancel = () =>{
        let status = false;
        this.props.status(status);
    }

     //点击提交按钮 调用接口
     onConfirm = () => {
        //getFieldsValue是object对象，form的一个方法，用于获取表单下所有的值
        let isapproval = this.props.form.getFieldsValue().isapproval;
        const formData ={id:this.props.id}
        console.log(JSON.stringify(formData))
        // console.log(isapproval)
        // console.log(this.props.id)
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(isapproval === 1){
                    axios.ajax_put(`/Application/approval/${this.props.id}`
                    ).then(res => {
                        if(res.data.code === 200){
                            console.log(222)
                            let status = false;
                            this.props.status(status);
                            message.success('恭喜你，完成审批!')
                        }       
                    })
                }else if(isapproval === 0){
                    axios.ajax_put(`/Application/returnApplication/${this.props.id}`
                    ).then(res => {
                        if(res.data.code === 200){
                            console.log(222)
                            let status = false;
                            this.props.status(status);
                            message.success('恭喜你，完成审批!')
                        }       
                    })
                }
            }else {
                message.error("审批失败！")
            }
        })
    }

    //下载文件
    getFields = () =>{
        alert("下载文件！未完待续。。。")
        axios.ajax_get('/File/downloadFile/').then(res => {          
            if(res.data.code === 200) { 
                res.data.rows.map((item,index)=>{
                    return item.key = index
                });
                console.log(res.data.rows)
                // res.data.rows.filter()               
                this.setState({//页面刷新,不保留选中字段
                    dataSource2: res.data.rows,
                    // selectedRowKeys:[],
                    // selectedRows:null,

                });              
            }
        })
    }

    render() {
        const text = '确定指定此人为该用户的的上级领导吗?';
        const {getFieldDecorator} = this.props.form;
        const { visible,entray } = this.props;
        const columns=[
        {
            title: '金额类型',
            dataIndex: 'budget',
            render(state){
                let config = {
                    '0':'实际金额',
                    '1':'预算金额',                   
                };
                return config[state];
            }
        },
        {
            title: '费用名称',
            dataIndex: 'title'
        },
        {
            title: '数量',
            dataIndex: 'number'
        },
        {
            title: '天数',
            dataIndex: 'days'
        },
        {
            title: '核算单价',
            dataIndex: 'price'
        },
        {
            title: '单位',
            dataIndex: 'unit'
        },
        {
            title: '小计/元',
            dataIndex: 'total',
        },
        {
            title: '备注',
            dataIndex: 'description'
        },
       ]
       
        console.log(this.props.entray)
        
       
        return (
            
            <div>
                
                <Modal
                    mask={true}
                    width={900}
                    height={600}
                    title="费用明细"
                    visible={visible}
                    onCancel={this.onCancel}
                    footer={null}
                >
                    
                    <Table
                        columns={columns}
                        dataSource={entray}
                        pagination={false}       
                    />

                    <Form layout="inline"  style={{marginTop:20}} >     
                        <FormItem style={{marginLeft:16}}>
                            {
                                getFieldDecorator('getFiles',{
                                    initialValue:1,
                                })(
                                    <div>
                                        <Icon type="download" />
                                        <a onClick={this.getFields}>下载文件</a> 
                                    </div>                                     
                                )
                            }
                        </FormItem>              
                        <FormItem label="是否通过审批" style={{marginLeft:30}} >
                            {
                                getFieldDecorator('isapproval',{
                                    initialValue:1,
                                    rules:[
                                        {
                                            required:true,
                                            message:'是否通过审批不能为空'
                                        },
                                    ]
                                })(
                                    <Radio.Group >
                                        <Radio value={1}>是</Radio>
                                        <Radio value={0}>否</Radio>                               
                                    </Radio.Group>                                      
                                )
                            }
                        </FormItem> 
                        <FormItem style={{marginLeft:200}}>
                            <Popconfirm placement="bottom" title={text} onConfirm={this.onConfirm} okText="确定" cancelText="取消">
                                <Button type="primary"                                    
                                        htmlType="submit"
                                        style={{width:100}}
                                >确认</Button>
                            </Popconfirm>
                        </FormItem>
                    </Form>
                   
                </Modal>    
            </div>
        );
    }
}
export default Form.create()(WatchDetial);
