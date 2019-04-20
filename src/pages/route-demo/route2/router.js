import React,{Component} from 'react'
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import Main from './Main'
import About from './../route1/about'
import Topic from './../route1/topic'
import Home from './home'
export default class IRouter extends Component{
    render (){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route  path="/main" render={() =>
                            <Main>
                                <Route path="/main/a" component={About}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                    </Switch>
                </Home>
            </Router>
        )
    }
}