/* 审批管理人员 审批完成 组件 */
import React from 'react';
import {Card, Table, Button,Form,Input, message} from 'antd'
import axios from '../../axios/index';
const FormItem = Form.Item;

class ApprovalFinsh extends React.Component {
    state = {
        dataSource2: [],

    }

    componentDidMount() {
        this.request();//初始化调用数据
    }

     //动态获取数据
     request = () => {
        // let _this = this;
        axios.ajax_get('/Application/checkApplication').then(res => {
           
           
            if (res.data.code === 200) {
                var dataSource1 = res.data.rows.filter(item => { return item.step===2||item.step ===3  })   
                // console.log(dataSource1)
                this.setState({//页面刷新,不保留选中字段
                    dataSource2: dataSource1
                    // selectedRowKeys:[],
                    // selectedRows:null,
                });              
            }
        })
    };
    //搜索用户
    handleSearch = () =>{
        let search = this.props.form.getFieldsValue();
        console.log(search)
            var params
            if(search.searchName===''&& search.budgetTotalUpper===''&& search.budgetTotalLower==='') {
                message.error("请输入搜索信息！")
            }
            else if(search.searchName===''&&search.budgetTotalUpper===''){
                params = {
                    budgetTotalUpper:parseInt(search.budgetTotalLower,0)
                }
            }else if(search.searchName===''&&search.budgetTotalLower===''){
                params = {
                    budgetTotalUpper:parseInt(search.budgetTotalUpper,0)
                }
            }else if(search.searchName===''){
                params = {
                    budgetTotalLower:parseInt(search.budgetTotalLower,0),
                    budgetTotalUpper:parseInt(search.budgetTotalUpper,0)
                }
            }else if(search.budgetTotalUpper===''&& search.budgetTotalLower===''){
                params = {
                    name:search.searchName,
                }
            }else if(search.budgetTotalLower===''){
                params = {
                    name:search.searchName,
                    budgetTotalUpper:parseInt(search.budgetTotalUpper,0)
                }
            }else if(search.budgetTotalUpper===''){
                params = {
                    budgetTotalLower:parseInt(search.budgetTotalLower,0),
                    name:search.searchName,
                }
            }else{
                params = {
                    budgetTotalLower:parseInt(search.budgetTotalLower,0),
                    name:search.searchName,
                    budgetTotalUpper:parseInt(search.budgetTotalUpper,0)
                }
            }
           
            console.log(params)
            axios.ajax_get('/Application/checkApplication',params).then(res => {      
                if (res.data.code === 200) {   
                    // console.log(res)
                    var dataSource1 = res.data.rows.filter(item => {
                        return item.step===2||item.step ===3
                    })   
                    console.log(dataSource1)
                    // res.data.rows.map((item,index)=>{
                    //     item.key = index
                    // }); 
                    this.setState({//页面刷新,不保留选中字段
                        dataSource2: dataSource1
                        // selectedRowKeys:[],
                        // selectedRows:null,
                    });              
                }
            })
    }

    render() {
        //  const text = '确定指定此人为该用户的的上级领导吗?';
        const {getFieldDecorator} = this.props.form;
        const columns=[
        {
            title: '申请类型',
            dataIndex: 'urgent',
            render(state){
                let config = {
                    '0':'普通申请',
                    '1':'紧急申请',                   
                };
                return config[state];
            }
        },
        {
            title: '工程名称',
            dataIndex: 'name'
        },
        {
            title: '施工单位',
            dataIndex: 'address'
        },
        {
            title: '预算总金额',
            dataIndex: 'budgetTotal'
        },
        {
            title: '实际总金额',
            dataIndex: 'actualTotal'
        },
        {
            title: '申请状态',
            dataIndex: 'step',
            render(state){
                let config = {
                    '0':'未提交',
                    '1':'已提交待审批',
                    '2':'审批未通过',
                    '3':'审批通过',
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
                        <Button title="详细信息" value={ JSON.stringify(item) } icon="search"  theme="twoTone"  size='small' onClick={(item)=> {this.handleDetial(item.target.value)} }></Button>
                    </div>
                )
            }
        },

       ]
        return (
            
            <div>
                <Card  >
                    <Form layout="inline" >
                    <FormItem label="工程名称"  style={{marginLeft:5}}>
                            {
                                getFieldDecorator('searchName',{
                                    initialValue:'',
                                
                                })(
                                    <div style={{padding:0,margin:0}} >
                                        <Input placeholder='根据工程名称模糊搜索'style={{width: 170}} />
                                    </div>                              
                                )
                            }
                        </FormItem>  
                        <FormItem style={{marginRight:3}} label="预算金额">
                            {
                                getFieldDecorator('budgetTotalLower',{
                                    initialValue:'',
                                
                                })(
                                    <Input placeholder='预算总价下限'style={{width: 110}} />
                                )
                            }
                        </FormItem>  
                        <FormItem >
                            {
                                getFieldDecorator('budgetTotalUpper',{
                                    initialValue:'',
                                
                                })(                                   
                                    <Input placeholder='预算总价上限'style={{width: 110}} />                          
                                )
                            }
                        </FormItem>  
                        <Button type="primary" icon="search" onClick={this.handleSearch} style={{margin:3}}>搜索</Button>
                    </Form>
                </Card>
                <Card title="售后申请单" style={{margin: '10px 0'}}>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}       
                    />
                </Card>
                  
            </div>
        );
    }
}
export default Form.create()(ApprovalFinsh);
