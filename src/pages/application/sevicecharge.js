/* 售后人员的  售后申请表的填写 （引入子组件 Client ） */
import React,{Component} from 'react'
import {Card,Button,Form,Input,Upload,Icon,message,Popconfirm,DatePicker,Radio} from 'antd'
import axios from '../../axios/index'
import './sevicecharge.less'
import data from './dataList'
import {Client} from './detials'

const FormItem = Form.Item;
const TextArea = Input.TextArea;
// const Option = Form.Option;

class SeviceCharge extends Component{
    //初始化数据
    state = ({
        userImg:'',
        visible:false,
        visible1:false,
        data:[
        ],
        fileList:[],
        details:[],
       
    })
    
    componentDidMount() {      
        this.updateDataSource(data.getList);
    }

    //更新数据
    updateDataSource = (newData) => {
        this.setState({  
            data: newData
        });
    }  
    
    //获取组件的数据 传给父组件 
    getChildDatas = (getChildDatas) => {
        console.log(getChildDatas); 
        this.setState({
            details:getChildDatas
        })
    }
   
    //提交申请表
    handleSubmit = ()=>{
        let userInfo = this.props.form.getFieldsValue();
        // console.log(JSON.stringify(userInfo))
        const params={
            urgent:userInfo.urgent,
            name:userInfo.projectName,
            address:userInfo.serviceAddress,
            builder:userInfo.construct,
            linkman:userInfo.relativeName,
            // deptName:userInfo.department,
            dealTime:userInfo.handleTime.getTime() ,
            defectlevel:parseInt(userInfo.defectlevel,0),
            install:parseInt(userInfo.isInstall,0),
            description:userInfo.describe,
            // file:userInfo.serviceAddress,
            dealMethod:userInfo.processMethod,
            details:this.state.details
        }
        console.log(JSON.stringify(params));
        this.props.form.validateFields((err,values)=>{       
            if(!err){
                message.success("good")
                axios.ajax_post('/Application/apply',JSON.stringify(params)
                ).then(res => {
                    // console.log(res)
                   
                })
            }else {
                message.error("请填写必填项！")
            }
        })
    }
    
    
  
    //提交文件
    onSubmitFile = () =>{
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        // console.log(fileList)
        // console.log(formData)
        this.setState({
            uploading: true,
        });
        
        axios.ajax_post('/File/uploadFile',formData
        ).then(res => {
            // console.log(res)
            if(res){
                this.setState({
                    fileList: [],
                    uploading: false,
                    });
                    message.success('upload successfully.');

                this.setState({
                    uploading: false,
                    });
                    message.error('upload failed.');             
            }          
        })
    }

   

      render (){
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        const {getFieldDecorator} = this.props.form;
        const text = '您确定提交吗?'   
        const formItemLayout = {
            width:450,
            marginTop:20,
            marginLeft:80,
            
        }
        return(
            <div > 
                <Card                     
                      title="售后服务费申请表"
                      headStyle={{fontSize:"larger"}}
                      size='small'
                      className="card-wrap"
                >
                    <Form layout="inline"  style={{paddingLeft:10,paddingRight:10}} >    

                            <FormItem label="工程名称" style={formItemLayout} >
                                {
                                    getFieldDecorator('projectName',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'工程名称不能为空'
                                            },
                                        ]
                                    })(
                                        <Input style={{ width: 200}} placeholder="请输入工程名称"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="服务地点" style={{width:500,marginTop:20,marginLeft:80}} >
                                {
                                   getFieldDecorator('serviceAddress',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'服务地点不能为空'
                                        },

                                    ]
                                })(
                                    <Input style={{ width: 200}} placeholder="请输入服务地点"/>
                                )
                                }
                            </FormItem>
                            <FormItem label="施工单位" style={formItemLayout}>
                                {
                                    getFieldDecorator('construct',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'施工单位不能为空'
                                            },
                                        ]
                                    })(
                                        <Input style={{ width: 200}} placeholder="请输入施工单位"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="联系人员" style={{width:500,marginTop:25,marginLeft:80}} >
                                {
                                    getFieldDecorator('relativeName',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'联系人不能为空'
                                            },
                                        ]
                                    })(
                                        <Input style={{ width: 200}} placeholder="请输入用户名"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="责任部门" style={formItemLayout}>
                                {
                                    getFieldDecorator('department',{
                                        initialValue:'',
                                        rules:[
                                            {
                                                required:true,
                                                message:'责任部门不能为空'
                                            },
                                        ]
                                    })(
                                        <Input style={{ width: 200}} placeholder="请输入责任部门"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="处理时间" style={{width:500,marginTop:25,marginLeft:80}} >
                                {
                                    getFieldDecorator('handleTime',{
                                        initialValue:'',
                                        // rules:[
                                        //     {
                                        //         required:true,
                                        //         message:'处理时间不能为空'
                                        //     },
                                        // ]
                                    })(
                                        <DatePicker style={{ width: 200 }} placeholder="请选择时间"/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="是否组装" style={formItemLayout}>
                                {
                                    getFieldDecorator('isInstall',{
                                        initialValue:1,
                                        rules:[
                                            {
                                                required:true,
                                                message:'是否组装不能为空'
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
                            <FormItem label="缺陷级别" style={{width:500,marginTop:25,marginLeft:80}} >
                                {
                                    getFieldDecorator('defectlevel',{
                                        initialValue:1,
                                        // rules:[
                                        //     {
                                        //         required:true,
                                        //         message:'联系人不能为空'
                                        //     },
                                        // ]
                                    })(
                                        <Radio.Group   >
                                        <Radio value={1}>一般缺陷</Radio>
                                        <Radio value={2}>较大缺陷</Radio>     
                                        <Radio value={3}>严重缺陷</Radio>                            
                                    </Radio.Group>   
                                    )
                                }
                            </FormItem>
                            <FormItem label="问题描述" style={formItemLayout}>
                                {
                                    getFieldDecorator('describe',{
                                        initialValue:''
                                    })(
                                        <TextArea
                                            style={{ width: 330}}
                                            autosize={
                                            {
                                                required:true,
                                                minRows:4,maxRows:6
                                            }
                                            }
                                            placeholder = '例如：1.山东环网16标3月7、8日现场开包验收。' 
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem label="处理方法" style={formItemLayout} >
                                {
                                    getFieldDecorator('processMethod',{
                                        initialValue:''
                                    })(
                                        <TextArea
                                             style={{ width: 330}}
                                            autosize={
                                            {
                                                required:true,
                                                minRows:4,maxRows:6
                                            }
                                            }
                                            placeholder="例如：1.现场开包验收买烟一条 500元，吃饭 1000元，送现场监理 2000元，预计35000元。"
                                        />
                                    )
                                }
                            </FormItem>   
                            
                            <Client  getChildDatas = {this.getChildDatas }  />
                            
                            <FormItem label="上传文件" style={formItemLayout} >
                                {
                                    getFieldDecorator('userDirectory',{
                                    })(
                                        <div>
                                        <Upload 
                                            {...props}                                                                                    
                                            supportServerRender={true}
                                            directory>
                                            <Button>
                                                <Icon type="upload" /> 选择文件
                                            </Button>
                                        </Upload>
                                        <Button 
                                            disabled={fileList.length === 0}
                                            loading={uploading}
                                            style={{width:110}} type="primary" onClick={this.onSubmitFile}>
                                            {uploading ? 'Uploading' : '开始上传' }</Button>
                                        </div>                              
                                    )
                                }
                                </FormItem>
                            <FormItem 
                                        label="申请类型"
                                        style={formItemLayout} >
                                       
                                        {
                                            getFieldDecorator('urgent',{
                                                initialValue:1,
                                                rules:[
                                                    {
                                                        required:true,
                                                        message:'申请类型不能为空'
                                                    },
                                                ]
                                            })(
                                                <div>
                                                    <Radio.Group >
                                                        <Radio value={0}>普通业务</Radio>
                                                        <Radio value={1}>紧急业务</Radio>                               
                                                    </Radio.Group>      
                                                    <Popconfirm  placement="bottom" title={text} onConfirm={this.handleSubmit} okText="确定" cancelText="取消">
                                                        <Button
                                                            type="primary" 
                                                            visible={this.state.visible}                                   
                                                            htmlType="submit"
                                                            style={{width:100,textAlign:"center"}}             
                                                        >确认</Button>
                                                    </Popconfirm>
                                                </div>                                
                                            )
                                        }
                                         
                                </FormItem>                      
                        </Form>
                </Card>
                    
            </div>
        )
    }
}
export default Form.create()(SeviceCharge);