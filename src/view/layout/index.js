import React, { Component } from 'react'
import Asider from "./Sider.js"
import Header from "./header/Header.js"
import Content from "./Content.js"
import "./index.less"
import { Layout } from 'antd';
const { Footer } = Layout;
export default class layouts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout>
                <Asider collapsed={this.state.collapsed} />
                <Layout className="site-layout">
                    <Header collapsed={this.state.collapsed} toggle={this.toggle} />
                    <Content />
                    <Footer style={{ textAlign: 'center',color:"#000" }}>这是沭阳人民的骄傲！</Footer>
                </Layout>
            </Layout >
        )
    }
}
