/*若组件 不存在 则显示 404 No Found!!*/
import React,{Component} from 'react'
export default class NoMatch extends Component{
    render (){
        return(
            <div style={{textAlign: 'center',fontSize:'24'}}>
                404 No Found!!
            </div>
        )
    }
}