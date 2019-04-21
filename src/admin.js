/* 系统管理员主页面 */
import React,{Component} from 'react'
import { Row,Col } from 'antd';
import Header from './components/Headers/index'
import Footer from './components/Footer/index'
import NavLeft from './components/NavLeft/adminNav'
import './style/common.less'
// import Home from './pages/home'
// import Row from './components/NavLeft/index'
export default class Admin extends Component{
    render (){
        return(
           <Row className="container">
               <Col span="4" className="nav-left" >
                   <NavLeft />
               </Col>
               <Col span="20" className="main">
                   <Header />
                   <Row className="content">
                       {/*<Home />*/}
                       {this.props.children}
                   </Row>
                   <Footer />
               </Col>
           </Row>
        )
    }
}