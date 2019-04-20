import React,{Component} from 'react'
import {Card,Button,Modal} from 'antd'
import './ui.less'
export default class Modals extends Component{

    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }

    handleOpen = (type) =>{
        this.setState ({
        //多个变量时，用中括号包起来，表示传入多个变量。
        [type]:true
        })
    }

    handleConfirm = (type) =>{
        Modal[type]({
            title:'确认？',
            content:'你确定你学会了react了吗？',
            onOK(){
                console.log('OK')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }

    render (){
        return(
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20xp像素</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={()=>{
                        this.setState({
                            showModal1:false
                        })
                    }}
                >
                    <p>这是一个基础模态框</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="下一步"
                    cancelText="算了"
                    onCancel={()=>{
                        this.setState({
                            showModal2:false
                        })
                    }}
                >
                    <p>这是一个自定义页脚的模态框</p>
                </Modal>
                <Modal
                    title="React"
                    style={{top:20}}
                    visible={this.state.showModal3}
                    onCancel={()=>{
                        this.setState({
                            showModal3:false
                        })
                    }}
                >
                    <p>这是一个距离顶部20px的模态框</p>
                </Modal>
                <Modal
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={()=>{
                        this.setState({
                            showModal4:false
                        })
                    }}
                >
                    <p>这是一个上下水平垂直居中的模态框</p>
                </Modal>
            </div>
        )
    }
}