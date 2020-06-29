/*eslint-disable*/
import React, { Component } from 'react'
import "./register.less"
import "@/assets/fonts/iconfont.css"
export default class Register extends Component {
    click = function () {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="txt">
                想啥了，还要👇注册，点它
                <div className="iconfont icon-xiaolian icons" onClick={this.click.bind(this)}></div>
            </div>
        )
    }
}
