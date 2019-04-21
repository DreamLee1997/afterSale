/*审批管理人员主页面 */
import React,{Component} from 'react'
import { Row,Col } from 'antd';
import Header from './../components/Headers/index'
import Footer from './../components/Footer/index'
import NavLeft from './../components/NavLeft/userAdminNav'
import './../style/common.less'

export default class UserAdmin extends Component{
    render (){
        return(
            <Row className="container">
                <Col span="4" className="nav-left" >
                    <NavLeft />
                </Col>
                <Col span="20" className="main">
                    <Header />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}