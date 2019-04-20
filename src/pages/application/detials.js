import React from "react";
import "antd/dist/antd.css";
import data from "./dataList";
import {Table,Checkbox,Input,Divider,Select,Button,notification,InputNumber,Form} from "antd";
// const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const EditableContext = React.createContext();

// const Units = ['元/车天','元','元/人天','元/天','元/公里','元/基','元/天','元']
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { renderDom, record, ...restProps } = this.props;
 
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        <EditableContext.Consumer>
          {form => {
            this.form = form;
            return renderDom(form, record);
          }}
        </EditableContext.Consumer>
      </td>
    );
  }
}

class Client extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      isRowOpen: false, //当前是否处于编辑状态（有且只有一行可编辑）
      locale: {
        emptyText: "暂无数据"
      },
      data: []
    };

    this.columns = [
      {
        title: "序号",
        width: "10%",
        key: "id",
        dataIndex: 'id',
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("id", {
                
                initialValue: record.id
              })(<span>{record.id}</span >)}
            </FormItem>
          ) : (
            record.id
          );
        }
      },
      {
        title: "费用类型",
        key: "title",
        dataIndex: 'title',
        width: "20%",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "名称不能为空！"
                  }
                ],
                initialValue: record.title
              })(
                <Select style={{ width: 150}}>
                    <Select.Option value="车辆租赁费">车辆租赁费</Select.Option>
                    <Select.Option value="工具燃料费">工具燃料费</Select.Option>
                    <Select.Option value="人工雇佣费">人工雇佣费</Select.Option>
                    <Select.Option value="工具租赁费">工具租赁费</Select.Option>
                    <Select.Option value="损耗费">损耗费</Select.Option>
                    <Select.Option value="服务外包费">服务外包费</Select.Option>
                    <Select.Option value="履约联络费">履约联络费</Select.Option>
                    <Select.Option value="维修费">维修费</Select.Option>
                </Select>
              )}
            </FormItem>
          ) : (
            record.title
            // record.title=='1'?'车辆租赁费':(record.title=='2'?'工具燃料费':(record.title=='3'?'人工雇佣费':(record.title=='4'?'工具租赁费':(record.title=='5'?'损耗费':(record.title=='6'?'服务外包费':(record.title=='7'?'履约联络费':'维修费'))))))
          );
        }
      },
      {
        title: "数量",
        width: "10%",
        key: "number",
        dataIndex: 'number',
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("number", {
                rules: [
                  {
                    required: true,
                    message: "使用数量不能为空！"
                  },
                  {
                    pattern:new RegExp('^\\d+$','g'),
                    message:'必须由数字组成',
                  }
                ],
                initialValue: record.number
              })(<InputNumber min={1} />)}
            </FormItem>
          ) : (
            record.number
          );
        }
      },
      {
        title: "天数",
        width: "10%",
        key: "days",
        dataIndex: 'days',
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("days", {
                rules: [
                  {
                    required: true,
                    message: "使用天数不能为空！"
                  },
                  {
                    pattern:new RegExp('^\\d+$','g'),
                    message:'必须由数字组成',
                  }
                ],
                initialValue: record.days
              })(<InputNumber min={1} />)}
            </FormItem>
          ) : (
            record.days
          );
        }
      },
      {
        title: "核算单价",
        width: "10%",
        key: "price",
        dataIndex: 'price',
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("price", {
                rules: [
                  {
                    required: true,
                    message: "核算单价不能为空！"
                  },
                  {
                    pattern:new RegExp('^\\d+$','g'),
                    message:'必须由数字组成',
                  }
                ],
                initialValue: record.price
              })(<InputNumber min={1} />)}
            </FormItem>
          ) : (
            record.price
          );
        }
      },
      {
        title: "单位",
        key: "unit",
        dataIndex: 'unit',
        width: "10%",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("unit", {   
                initialValue:record.unit
              })(
                <span>{ form.getFieldValue('title')==='车辆租赁费'?'元/车天':(form.getFieldValue('title')==='工具燃料费'?'元':(form.getFieldValue('title')==='人工雇佣费'?'元/人天':(form.getFieldValue('title')==='工具租赁费'?'元/天':(form.getFieldValue('title')==='损耗费'?'元/公里':(form.getFieldValue('title')==='服务外包费'?'元/基':(form.getFieldValue('title')==='履约联络费'?'元/天':'元'))))))}</span>
              )}
            </FormItem>
          ) : (
            record.unit
          );
        }
      },
      {
        title: "小计/元",
        width: "10%",
        key: "total",
        dataIndex: 'total',
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("total", {
                initialValue: record.total
              })(<span>{ form.getFieldValue('number')*form.getFieldValue('days')*form.getFieldValue('price')}</span>)}
            </FormItem>
          ) : (
            record.total
          );
        }
      },
      {
        title: "备注",
        width: "10%",
        key: "description",
        dataIndex: "description",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("description", {
                initialValue: record.description
              })(<Input />)}
            </FormItem>
          ) : (
            record.description
          );
        }
      },
      {
        title: "操作",
        width: "20%",
        renderDom: (form, record) => (
          <span>
            {record.type === "new" && (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => this.addSubmit(form, record)}
                >
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.removeAdd(record)}>
                  取消
                </a>
              </span>
            )}
            {record.type === "edit" && (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => this.editSubmit(form, record)}
                >
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.giveUpUpdata(record)}>
                  取消
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
              </span>
            )}
            {record.type === "view" && (
              <span>
                <a href="javascript:;" onClick={e => this.edit(form, record)}>
                  编辑
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
              </span>
            )}
          </span>
        ),
        width: 150
      }
    ];
  }
  componentDidMount() {
    this.initRowType(data.getData);
  }
  initRowType(data) {
    for (let item of data) {
      item["type"] = "view";
    }
    this.updateDataSource(data);
  }
  //更新数据
  updateDataSource(newData, isAddDisabled) {
    let isRowOpen =
      typeof isAddDisabled == "boolean"
        ? isAddDisabled
        : newData.some(item => item.type === "new" || item.type === "edit");
    this.setState({
      isRowOpen,
      data: newData
    });
    
    let getChildDatas = this.state.data
    console.log(getChildDatas)
    this.props.getChildDatas(getChildDatas);
  }

//   getItemsValue = (form)=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    
//     console.log(form)
//     const values= form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
//     return values;
// }


  //添加新的一行
  addRow = () => {
    let { data } = this.state;
    let newRecord = {
      type: "new",
      budget:1,
      id: data[data.length-1].id + 1,
      title:"",
      number:1,
      days:1,
      unit:"",
      price:1,
      description:'',
      total: "",
    };

    // console.log(newRecord);
    data.push(newRecord);
    this.updateDataSource(data);  
  };

  //确认添加
  addSubmit(form, record) {
    let { data } = this.state;

    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      // values.title = values.title === "1" ? '1' : (values.title === "1" ? '2' :(values.title === "3" ? '3' :(values.title === "4" ? '4' :(values.title === "5" ? '5':(values.title === "6" ? '6' :(values.title === "7" ? '7':'8'))))))
      // values.title = values.title == "1" ? '车辆租赁费' : (values.title == "2" ? '工具燃料费' :(values.title == "3" ? '人工雇佣费' :(values.title == "4" ? '人工雇佣费' :
      // (values.title == "5" ? '损耗费':(values.title == "6" ? '服务外包费':(values.title == "7" ? '履约联络费':'维修费'))))))
      // values.evaluate = values.evaluate == "1" ? true : false;
      // console.log( values.title );
      // console.log(values)
      values.unit= values.title==='车辆租赁费'?'元/车天':(values.title==='工具燃料费'?'元':(values.title==='人工雇佣费'?'元/人天':(values.title==='工具租赁费'?'元/天':(values.title==='损耗费'?'元/公里':(values.title==='服务外包费'?'元/基':(values.title==='履约联络费'?'元/天':'元'))))))
      values.total = values.price*values.days*values.number;
      let updateData = { ...record, ...values };

      // console.log(updateData)
      setTimeout(res => {
        updateData.type = "view";
        data.pop();
        data.push(updateData);
        this.updateDataSource(data);
        notification["success"]({ message: "添加成功！" });
      }, 500);
      // console.log(data)
    });
  }

  edit(form,record) {
    console.log(record.title)
    // record.title = record.title === "1" ? '车辆租赁费' : (record.title === "2" ? '工具燃料费' :(record.title === "3" ? '人工雇佣费' :(record.title === "4" ? '工具租赁费' :
    // (record.title === "5" ? '损耗费':(record.title === "6" ? '服务外包费':(record.title === "7" ? '履约联络费':'维修费'))))))
    // record.title = form.getFieldValue.title
    // console.log(record.title)
    // record.unit= record.title==='1'?'元/车天':(record.title==='2'?'元':(record.title==='3'?'元/人天':(record.title==='4'?'元/天':(record.title==='5'?'元/公里':(record.title==='6'?'元/基':(record.title==='7'?'元/天':'元'))))))
    // record.unit= record.title === "1" ? '车辆租赁费' : (record.title === "2" ? '工具燃料费' :(record.title === "3" ? '人工雇佣费' :(record.title === "4" ? '工具租赁费' :
    // (record.title === "5" ? '损耗费':(record.title === "6" ? '服务外包费':(record.title === "7" ? '履约联络费':'维修费'))))))
    console.log(record.unit)
    console.log(record)
    let { data } = this.state;
    let newData = data.filter(item => {
      if (item.id === record.id) {
        // console.log(record.id+'?'+item.id)
        item.type = "edit";
        return item;
      } else if (item.type !== "new") {
        item.type = "view";
        return item;
      }
    });
    this.updateDataSource(newData, true);
  }

  //确认编辑
  editSubmit(form, record) {
    let { data } = this.state;
    // let userInfo = form.getFieldsValue();
    // console.log(userInfo)
    // console.log(record)
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      // values.title = values.title == "1" ? '车辆租赁费' : (values.title == "2" ? '工具燃料费' :(values.title == "3" ? '人工雇佣费' :(values.title == "4" ? '工具租赁费' :
      // (values.title == "5" ? '损耗费':(values.title == "6" ? '服务外包费':(values.title == "7" ? '履约联络费':'维修费'))))))
      values.unit= values.title==='车辆租赁费'?'元/车天':(values.title==='工具燃料费'?'元':(values.title==='人工雇佣费'?'元/人天':(values.title==='工具租赁费'?'元/天':(values.title==='损耗费'?'元/公里':(values.title==='服务外包费'?'元/基':(values.title==='履约联络费'?'元/天':'元'))))))
      // values.title = values.title === "1" ? 1 : (values.title === "2" ? 2 :(values.title === "3" ? 3 :(values.title === "4" ? 4 :(values.title === "5" ? 5 :(values.title === "6" ? 6 :(values.title === "7" ? 7 :8))))))
      // values.title = values.title === "1" ? '1' : (values.title === "2" ? '2' :(values.title === "3" ? '3' :(values.title === "4" ?'4 ' :(values.title === "5" ? '5' :(values.title === "6" ? '6' :(values.title === "7" ? '7' :'8'))))))
      // values.evaluate = values.evaluate == "1" ? true : false;
      
      values.total = values.price*values.days*values.number;
      // console.log(values.unit)
      let updateData = { ...record, ...values };
      // console.log(updateData);
      setTimeout(res => {
        //将updateData更新到dataSource
        let newData = data.map(item => {
          if (item.id === updateData.id) {
            item = Object.assign({}, updateData);
            item.type = "view";
          }
          return item;
        });
        this.updateDataSource(newData);
        notification["success"]({ message: "修改成功！" });
      });

    });
  }
  //移除增加的行
  removeAdd(record) {
    let { data } = this.state;
    data.pop();
    this.updateDataSource(data);
  }

  //取消更新
  giveUpUpdata(record) {
    let { data } = this.state;
    let editRow = data.find(item => item.id === record.id);
    editRow.type = "view";
    this.updateDataSource(data);
  }
  delete(record) {
    let { data } = this.state;
    // console.log(record);
    setTimeout(res => {
      let index = data.findIndex(item => item.id === record.id);
      data.splice(index, 1);
      for(var i = 0 ; i < data.length ; i ++){
        data[i].id = i + 1;
        console.log(data[i].id)
      }
      this.updateDataSource(data);
      notification["success"]({ message: "删除成功！" });
    });
    
  }
  
  render() {
    const { data, locale, isRowOpen } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    
    const columns = this.columns.map(col => {
      return {
        ...col,
        onCell: record => ({
          ...col,
          record
        })
      };
    });

    const formItemLayout = {
      marginLeft:80,
      marginRight:150,
      marginTop:25
      
    }
    return (
      <div >
        <div style={formItemLayout}>
          
          <p style={{textAlign:"center",marginBottom:0,fontSize:16}}>服务费明细</p>
          <Button
            disabled={isRowOpen}
            onClick={this.addRow}
          >
            + 添加
          </Button>
          <Table
            
            components={components}
            locale={locale}
            bordered
            rowKey={record => {this.rowKey}}
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName="editable-row"
          />
        </div>
      </div>
    );
  }
}

export { EditableCell,Client}