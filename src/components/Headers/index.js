import React,{Component} from 'react'
import { Row,Col,Icon} from 'antd';
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios/index'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class Header extends Component{

    componentWillMount(){
        this.setState({
            userName:"Dream_Lee"
        })
        //通过定时器每隔一秒，获取一下当先的系统时间date
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
        // this.getWeatherAPIData();
    }
/*
    getWeatherAPIData(){
        let city = '杭州'
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            // debugger;
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""/>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
    }

    */

    handleBack (item){
        // let history = this.props.history;
        console.log(this.props.history)
        this.props.history.push('/login/index')
    }


    render (){
        return(
            <div className="header" >
                <Row className="header-top">
                    <Col >
                        <span >欢迎</span>
                        <span className="welcome">{this.state.userName}</span>

                        <Icon type="logout" onClick={(item)=>{this.handleBack(item)}} className="Icon" />
                    </Col>
                </Row>

                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        {this.props.menuName}
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>                       
                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        menuName:state.menuName
    }
}

export default connect(mapStateToProps)(withRouter(Header));