import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component{
    render (){
        return(

                <div>
                    <ul>
                        <li>
                            <Link to="/main">Home2</Link>
                        </li>
                        <li>
                            <Link to="/about">About2</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics2</Link>
                        </li>
                        <li>
                            <Link to="/dream_lee">dream_lee</Link>
                        </li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>

        )
    }
}