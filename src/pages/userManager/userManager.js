/* 系统管理员下 管理人员的组件 */
import React from 'react';
import {Card, Table, Modal,Button,Form,Popconfirm,Select,Input} from 'antd'
import axios from './../../axios/index';
import EditAdmin from './../admin/EditAdmin'
import EditUserAdmin from './../userAdmin/editUserAdmin'
import EditUser from './../user/editUser'
const FormItem = Form.Item;
const Option = Select.Option;
class UserManager extends React.Component {
    
    state = {
        dataSource2: [],
        visible:false,
        visible1:false,
        visible2:false,
        visible3:false,
        infoAdmin:{
            userName:'',
            userState:'',
            userId:0,
            roleName:'',
            userPhone:'',
            lowerLimit:0,
            upperLimit:1000,
            email:''
        },
        infoUserAdmin:{
            userName:'',
            userState:'',
            userId:0,
            roleName:'',
            userPhone:'',
            lowerLimit:0,
            upperLimit:1000,
            email:''
        },
        infoUser:{
            id:0,
            userState:'',
            userName:'',
            roleName:'',
            userPhone:'',
            email:''
        },
    };

    componentDidMount() {
        this.request();//初始化调用数据
    }

    //动态获取数据
    request = () => {
        // let _this = this;
        axios.ajax_get('/User/getUsersByCons').then(res => {
            if (res.data.code === 200) {
                
                res.data.rows.map((item,index)=>{
                    item.key = index
                });
                // console.log( res.data.rows)
                this.setState({//页面刷新,不保留选中字段
                    dataSource2: res.data.rows,
                    // selectedRowKeys:[],
                    // selectedRows:null,
                });              
            }
        })
    };

    //点击编辑按钮加载修改用户信息的model
    handleEdit = ((value1) => {
        // console.log(JSON.parse(value))

        var value = JSON.parse(value1);
        console.log(value)
        var userState1 = (value.state === 1)?'已通过注册':((value.state === 0)?'待通过注册':'已离职')

        // console.log()
        //系统管理人员
        if(value.role === 1){          
            this.setState({
                visible3:true,
                infoAdmin:{
                    userName:value.userName,
                    userState:userState1,
                    userId:value.id,
                    roleName:value.roleDetail.roleName,
                    userPhone:value.phone,       
                    email:value.email
                },
            })
        }
        //管理人员
        else if(value.role === 2){
            this.setState({
                visible1:true,
                infoUserAdmin:{
                    userName:value.userName,
                    userState:userState1,
                    userId:value.id,
                    roleName:value.roleDetail.roleName,
                    userPhone:value.phone,
                    lowerLimit:value.userGrade.lowerLimit,
                    upperLimit:value.userGrade.upperLimit,
                    email:value.email
                },
            })

            
        }
        //普通售后人员
        else{
            this.setState({
                visible2:true,
                infoUser:{
                    userName:value.userName,
                    userState:userState1,
                    userId:value.id,
                    roleName:value.roleDetail.roleName,
                    userPhone:value.phone,
                    email:value.email
                },
            })       
        }
    })

    //指定上级领导
    handleAssign = (value1) =>{
        alert("指定上级领导，未完待续。。。")
        this.setState({
            visible:true
        })

        // console.log(value1)
    }

    //取消“指定上级领导”modal框
    onCancel = () =>{
        this.setState({
            visible:false
        })
        // console.log(this.props.status)
    }

    /*获取子组件 EditAdmin EditUserAdmin EditUser传递过来的值*/
    changeStatus = (status) =>{
        this.setState({
        visible1:status,
        visible2:status,
        visible3:status
        })
        this.request();
    }

    //搜索用户
    handleSearch = () =>{
        let searchName = this.props.form.getFieldsValue().searchName;
            // console.log(searchName)
            axios.ajax_get(`/User/getUsersByCons?userName=${String(searchName)}`).then(res => {      
                if (res.data.code === 200) {   
                    console.log(res)
                    res.data.rows.map((item,index)=>{
                        item.key = index
                    }); 
                    this.setState({//页面刷新,不保留选中字段
                        dataSource2: res.data.rows
                        // selectedRowKeys:[],
                        // selectedRows:null,
                    });              
                }
            })
    }

  
    render() {
        const text = '确定指定此人为该用户的的上级领导吗?';
        const {getFieldDecorator} = this.props.form;
        const columns = [
             /*title:'id',       展示表头显示内容显示id
            dataIndex:'id'    返回的索引值
             */
            {
                title: '用户ID',
                dataIndex: 'id'
            },
            {
                title: '联系方式',
                dataIndex: 'phone'
            },
            {
                title: '用户姓名',
                dataIndex: 'userName'
            },
            {
                title: '角色',
                dataIndex: 'role',
                render(state){
                    let config = {
                        '1':'系统管理员',
                        '2':'管理人员',
                        '3':'售后人员',
                    };
                    return config[state];
                }
            },
            {
                title: '最低额度',
                dataIndex: 'userGrade.lowerLimit'
            },
            {
                title: '最高额度',
                dataIndex: 'userGrade.upperLimit'
            },
            {
                title: '部门',
                dataIndex: 'department'
            },
            {
                title: '用户状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '0':'注册待通过',
                        '1':'注册已通过',
                        '-1':'已离职',
                    };
                    return config[state];
                }
            },
            {
                title: '操作',
                dataIndex: 'time',
                //注意使用箭头函数 否则会找不到下面的this
                render:(text,item, index)=>{
                    // console.log(text, item, index)
                    return (
                        <div>
                            <Button title="编辑信息" value={ JSON.stringify(item) } icon="edit"  theme="twoTone"  size='small' onClick={(item)=> {this.handleEdit(item.target.value)} }></Button>
                            <Button title="指定上级领导" value={ JSON.stringify(item) } icon="team" background-color='red' size='small'  onClick={(item)=> {this.handleAssign(item.target.value)} }></Button>
                        </div>
                    )
                }
            },
           
        ];
        // const information= this.props.form.getFieldsValue();
        return (
            
            <div>
                <Form>
                    <FormItem >
                        {
                            getFieldDecorator('searchName',{
                                initialValue:'',
                              
                            })(
                                <div  style={{float:'right'}}>
                                    <Input placeholder='根据用户名模糊搜索' style={{ height:33, width: 200}}/>
                                    <Button type="primary" icon="search" onClick={this.handleSearch}>搜索</Button>
                                </div>                              
                            )
                        }
                    </FormItem>
                </Form>
                <Card title="用户管理" style={{margin: '10px 0'}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}       
                    />
                </Card>
                <EditAdmin
                    visible={this.state.visible3}
                    entray={this.state.infoAdmin}
                    status={this.changeStatus}
                />
                
                <EditUserAdmin
                    visible={this.state.visible1}
                    entray={this.state.infoUserAdmin}
                    status={this.changeStatus}
                />
                 <EditUser
                    visible={this.state.visible2}
                    entray={this.state.infoUser}
                    status={this.changeStatus}
                />

            <Modal
                mask={true}
                width={900}
                height={600}
                title="指定上级领导"
                visible={this.state.visible}
                onCancel={this.onCancel}
                footer={null}
            >
                <Form layout="inline" labelcol={{ span: 4 ,marginLeft:30}}  >                    
                    <FormItem label="上级负责人" style={{width:400,marginTop:25}}>
                        {
                            getFieldDecorator('userAdminState',{
                                initialValue:'',
                                rules:[
                                    {
                                        required:true,
                                        message:'用户的上级领导不能为空'
                                    },
                                    
                                ]
                            })(
                                <Select 
                                    
                                    size={this.props.size}
                                    style={{ width: 250}}
                                    onChange={this.handleCurrencyChange}
                                >
                                    <Option value="1">通过注册</Option>
                                    <Option value="0">注册未通过</Option>
                                    <Option value="-1">已离职</Option>

                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem  wrapperCol={{ span: 24 }}style={{marginTop:50}}>
                    <Popconfirm placement="bottom" title={text} onConfirm={this.onConfirm} okText="确定" cancelText="取消">
                        <Button type="primary"                                    
                                htmlType="submit"
                                style={{width:100,marginLeft:350}}
                        >确认</Button>
                    </Popconfirm>
                    </FormItem>
                </Form>
            </Modal>


            </div>
        );
    }
}
export default Form.create()(UserManager);
