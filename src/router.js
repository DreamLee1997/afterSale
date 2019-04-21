/* 封装所有路由组件 */
import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin'
import UserAdmin from './role/userAdmin'
import User from './role/user'
import Login from './pages/login/index'
import Register from './pages/register/index'
import ForgetPwd from './pages/forgetPwd/index'
import NoMatch from './pages/noMatch/index'
import SeviceCharge from './pages/application/sevicecharge'
import UserManager from './pages/userManager/userManager'
import ApplySuccess from './pages/application/applySuccess'
import adminWatchApplication from './pages/admin/watchApplication'
import ApprovalSuccess from './pages/admin/approveSuccess'
import ApprovalWaiting from './pages/admin/approvalWaiting'
import ApprovalFailure from './pages/admin/approvalFailure'
import ApprovalWaiting1 from './pages/userAdmin/approvalWaiting'
import ApprovalFinsh from './pages/userAdmin/approvalFinsh'

import userAdminWatchApplication from './pages/userAdmin/watchApplication'

//一下引入的组件是自己练习的小demo
import Buttons from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Messages from './pages/ui/messages'


export default class IRouter extends Component{
    render (){
        return(
            <div>
                <HashRouter>
                    <App>
                        <Route exact path='/' render={()=>(<Redirect to='/login/index' />)} />
                        <Route exact  path="/login/index" component={Login} />
                        <Route  path="/register/index" component={Register}/>
                        <Route  path="/forgetPwd/index" component={ForgetPwd}/>
                        
                        <Route  path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/home" component={Messages} ></Route>
                                    <Route path="/admin/userManage" component={UserManager}></Route>
                                    <Route path="/admin/approvalManage/watch" component={adminWatchApplication}></Route>
                                    <Route path="/admin/approvalManage/waiting" component={ApprovalWaiting}></Route>
                                    <Route path="/admin/approvalManage/success" component={ApprovalSuccess}></Route>
                                    <Route path="/admin/approvalManage/failure" component={ApprovalFailure}></Route>
                                    <Route path="/admin/capitalManage" component={Messages}></Route>

                                    <Route  component={NoMatch}></Route>
                                </Switch>
                            </Admin>
                        } />
                        <Route  path="/userAdmin" render={()=>
                            <UserAdmin>
                                <Switch>
                                    <Route path="/userAdmin/home" component={Modals}></Route>
                                    <Route path="/userAdmin/watchApplication" component={userAdminWatchApplication}></Route>
                                    <Route path="/userAdmin/approveCharge/finsh" component={ApprovalFinsh}></Route>
                                    <Route path="/userAdmin/approveCharge/waiting" component={ApprovalWaiting1}></Route>
                                    <Route path="/userAdmin/approveTrip/finsh" component={Loadings}></Route>
                                    <Route path="/userAdmin/approveTrip/waiting" component={Loadings}></Route>

                                    <Route  component={NoMatch}></Route>
                                </Switch>
                            </UserAdmin>
                        } />
                        <Route  path="/user" render={()=>
                            <User>
                                <Switch>
                                    <Route path="/user/home" component={Buttons}></Route>
                                    <Route path="/user/application/charge" component={SeviceCharge}></Route>
                                    <Route path="/user/application/trip" component={Buttons}></Route>                               
                                    <Route path="/user/applicationResult" component={ApplySuccess}></Route>
                                    <Route path="/user/ui/messages" component={Messages}></Route>
                                    <Route  component={NoMatch}></Route>
                                </Switch>
                            </User>
                        } />                   
                    </App>
                </HashRouter>
            </div>
        )
    }
}