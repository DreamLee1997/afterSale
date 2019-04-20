import React,{Component} from 'react'
import {Button,Card,message} from 'antd'
import './ui.less'
export default class Messages extends Component{
    showMessage = (type) =>{
        message[type]("恭喜你，你成功啦！")
    }
    render (){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.showMessage('success')}> Success</Button>
                    <Button type="primary" onClick={()=>this.showMessage('info')}> Info</Button>
                    <Button type="primary" onClick={()=>this.showMessage('warning')}> Warning</Button>
                    <Button type="primary" onClick={()=>this.showMessage('error')}> Error</Button>
                    <Button type="primary" onClick={()=>this.showMessage('loading')}> Loading</Button>
                </Card>
            </div>
        )
    }
}