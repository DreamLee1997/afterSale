import React,{Component} from 'react'

export default class Info extends Component{
    render (){
        return(
            <div>
                this is info page测试动态路由
                动态路由值是{this.props.match.params.mainId}
            </div>

        )
    }
}