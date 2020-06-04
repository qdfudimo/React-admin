/*eslint-disable*/
import React, { Component } from 'react'
import "./login.less"
import { Route, Switch } from "react-router-dom";
import Login from "./login"
import Register from "../Register/Register"
export default class Logins extends Component {
    render() {
        return (
            <div className="login">
                <div className="min">
                    <h3>用户登录<span className="iconfont icon-xiaolian smile"></span></h3>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/Register" component={Register} />
                    </Switch>
                </div>
            </div>
        )
    }
}

