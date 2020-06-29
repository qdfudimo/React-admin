/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import "./login.less"
import { Form, Input, Button, Checkbox, Modal,message } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { userData } from "../../reducer/Action"
import "@/assets/fonts/iconfont.css"
import imgurl from "@/assets/img/嘻嘻.png"
import { login, register } from '@/api/request'
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            visible: false,
            num: 1
        }
    }
    onFinish = async function (val) {
        if (val.username == "" || val.password == "") return
        const data = {
            userName: val.username,
            passWord: val.password
        }
        const res = await login(data)
        if(res.data.status == 200) {
            this.props.user({ ...val, checked: this.state.checked, isFresh: true, token: res.data.token })
            sessionStorage.setItem('store', JSON.stringify({ ...val, checked: this.state.checked, token: res.data.token }));
            this.props.history.push("/")
            message.success({
                content: <span><span style={{ backgroundColor: "#f5f5f5", color: "rgba(0,0,0,.65)" }}>😘{res.data.msg}🐷</span>&nbsp;&nbsp;&nbsp;Bingo 🎉</span>,
            })
        }else {
            message.success(res.data.msg);
        }

    };
    onChange = function (e) {
        this.setState({
            checked: e.target.checked,
        });
    }
    click = function () {
        this.setState({
            visible: true
        })
    }
    // handel = () => {
    //     this.setState(() => this.state.num + 1)
    //     this.setState(() => this.state.num + 1)
    // }
    render() {
        return (
            <Fragment>
                <Form
                    ref="form"
                    style={{ paddingTop: "40px" }}
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                        username: 'admin111',
                        password: 'admin',
                    }}
                    onFinish={this.onFinish.bind(this)}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                            {
                                required: true,
                                message: '请输入你的大名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码',
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="rember">
                        <Checkbox checked={this.state.checked} onChange={this.onChange.bind(this)}>记住密码</Checkbox><span className="forget">忘记密码</span>
                    </div>
                    <div className="button">
                        <Button type="primary" htmlType="submit">登录</Button>
                    </div>
                    <div className="register">
                        现在去<Link to="/register" className="registers">注册</Link>
                        <span className="iconfont icon-weixin icons" ></span>
                        <span className="iconfont icon-qq icons" ></span>
                        <span className="iconfont icon-weixin1 icons"  onClick={this.click.bind(this)}></span>
                    </div>
                </Form>
                <Modal
                    title="打赏"
                    visible={this.state.visible}
                    footer={[
                        <Button key="back" type="primary" onClick={() => this.setState({ visible: false })}>
                            关闭
                        </Button>
                    ]}
                >
                    <img src={imgurl} className="img" />
                </Modal>
                {/* <Button key="back" type="primary" onClick={this.handel}>
                    关闭
                        </Button> */}
            </Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        user: (data) => { dispatch(userData(data)) }
    }
}
export default connect(null, mapDispatchToProps)(Login)

