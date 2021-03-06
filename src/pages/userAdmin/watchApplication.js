/*审批管理人员 查看申请*/ 
import React from 'react';
import {Card, Table, Button,Form,Input, message,Modal} from 'antd'
import axios from '../../axios/index';
const FormItem = Form.Item;

class WatchApplication extends React.Component {
    state = {
        dataSource2: [],
        dataSource1:[],
        visible:false,
        budgetTotal:0,
        actualTotal:0,
    }

    componentDidMount() {
        this.request();//初始化调用数据
    }

     //动态获取数据
     request = () => {
        //let _this = this;
        axios.ajax_get('/Application/checkApplication').then(res => {          
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
    };

    //按关键词搜索申请单
    handleSearch = () =>{
        let search = this.props.form.getFieldsValue();
        // console.log(search)
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
           
            axios.ajax_get('/Application/checkApplication',params).then(res => {      
                if (res.data.code === 200) {   
                    // console.log(res)
                    res.data.rows.map((item,index)=>{
                       return  item.key = index
                    }); 
                    this.setState({//页面刷新,不保留选中字段
                        dataSource2: res.data.rows
                        // selectedRowKeys:[],
                        // selectedRows:null,
                    });              
                }
            })
    }

    //查看详细信息
    handleDetial = (value) =>{
        console.log(JSON.parse(value).details)
        
        this.setState({
            dataSource1:JSON.parse(value).details ,
            visible:true,
            budgetTotal:JSON.parse(value).budgetTotal,
            actualTotal:JSON.parse(value).actualTotal,
        })
    }
    //取消查看详细售后服务费的modal框
    onCancel = () =>{
        this.setState({
            visible:false,
        })
    }

    render() {
        const detailColumns=[
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
            title: '缺陷等级',
            dataIndex: 'defectLevel',
            render(state){
                let config = {
                    '1':'一般缺陷',
                    '2':'较大缺陷',                   
                    '3':'严重缺陷',                   
                };
                return config[state];
            }
        },
        {
            title: '是否组装',
            dataIndex: 'install',
            render(state){
                let config = {
                    '0':'未组装',
                    '1':'组装',                   
                };
                return config[state];
            }
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
                <Modal
                    mask={true}
                    width={900}
                    height={600}
                    title="费用明细"
                    visible={this.state.visible}
                    onCancel={this.onCancel}
                    footer={null}
                >
                    
                    <Table
                        columns={detailColumns}
                        dataSource={this.state.dataSource1}
                        pagination={false}       
                    />
                    <div style={{marginTop:15}}>
                        <span style={{marginLeft:16,marginRight:30}}>预算总金额：{this.state.budgetTotal}</span>
                        <span >实际总金额：{this.state.actualTotal}</span>
                    </div>
                    
                </Modal>
                  
            </div>
        );
    }
}
export default Form.create()(WatchApplication);
