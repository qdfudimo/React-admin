import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { message } from 'antd';
export default function (Componets) {
    class AutherCreate extends Component {
        UNSAFE_componentWillMount() {
            if(!this.props.isLogin) {
                message.warning('你还没有登录，淘气鬼，让我把你送回去吧！');
                this.props.history.push("/login")
            }
        }
        UNSAFE_componentWillUpdate(nextprops) {
            if(!nextprops.isLogin) {
                this.props.history.push("/")
            }
        }
        render() {
            return (
                <Componets {...this.props}></Componets>
            )
        }
    }
    const mapStateToProps = function (state) {
        return {
            isLogin: state.isLogin
        }
    }
    return withRouter(connect(mapStateToProps, null)(AutherCreate))
}
