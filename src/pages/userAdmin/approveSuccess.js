import React from 'react';
import {Card, Table,Button,Form} from 'antd'
import axios from '../../axios/index';

// const FormItem = Form.Item;
// const Option = Select.Option;
class ApprovalSuccess extends React.Component {
    state = {
        dataSource2: [],

    }

    componentDidMount() {
        this.request();//初始化调用数据
    }

     //动态获取数据
     request = () => {
        // let _this = this;
        axios.ajax_get('/Application/checkApplication?step=3').then(res => {
           
           
            if (res.data.code === 200) {
                
                res.data.rows.map((item,index)=>{
                    item.key = index
                });
                console.log( res.data.rows)
                // res.data.rows.filter()

                
                this.setState({//页面刷新,不保留选中字段
                    dataSource2: res.data.rows,
                    // selectedRowKeys:[],
                    // selectedRows:null,
                });              
            }
        })
    };
    handleSearch = () =>{

    }

    render() {
        // const text = '确定指定此人为该用户的的上级领导吗?';
        // const {getFieldDecorator} = this.props.form;
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
                        <Button title="详细信息" value={ JSON.stringify(item) } icon="search"  theme="twoTone"  size='small' onClick={(item)=> {this.handleSearch(item.target.value)} }></Button>
                    </div>
                )
            }
        },

       ]
        return (
            
            <div>
                <Card title="审批成功" style={{margin: '10px 0'}}>
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
export default Form.create()(ApprovalSuccess);
