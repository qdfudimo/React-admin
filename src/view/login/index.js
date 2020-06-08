/*eslint-disable*/
import React, { Component } from 'react'
import style from "./login.module.less"
import { Route, Switch } from "react-router-dom";
import Login from "./login"
import Register from "../Register/Register"
export default class Logins extends Component {
    UNSAFE_componentWillMount() {
        document.title = `login-React admin`
    }
    render() {
        return (
            <div className={style.login}>
                <div className={style.min}>
                    <h3>用户登录<span className="iconfont icon-xiaolian" className={style.smile}></span></h3>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/Register" component={Register} />
                    </Switch>
                </div>
            </div>
        )
    }
}

