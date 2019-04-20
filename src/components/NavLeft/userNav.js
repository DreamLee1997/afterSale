import React,{Component} from 'react'
import { Menu} from 'antd';
import MenuConfig from '../../config/menuUser'
import './index.less'
import {connect} from 'react-redux'
import{switchMenu} from './../../redux/action/index'
import {NavLink} from 'react-router-dom'

const SubMenu = Menu.SubMenu;

class NavLeft extends Component{


    state = {
        currentKey:''
    }
    handleClick = ({item,key}) =>{
        //2、通过connect连接后 获取dispatch
        const {dispatch} = this.props;
        //3、出发ruducer
        dispatch(switchMenu(item.props.title))
        // console.log(item);
        this.setState({
            currentKey:key
        })
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        //提取/admin等路径
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState ({
            currentKey,
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                            <NavLink to={item.key}>{item.title}</NavLink>
                    </Menu.Item>
        })
    }
    render (){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>售后申请平台</h1>
                </div>
                <Menu 
                    onClick = {this.handleClick}
                    theme="dark">
                    { this.state.menuTreeNode }
                </Menu>

            </div>
        )
    }
}


export default connect()(NavLeft);