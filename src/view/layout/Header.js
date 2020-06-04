import React, { Component } from 'react'
import "./index.less"
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
export default class header extends Component {
    toggle=() => {
        this.props.toggle()
    }
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#001529" }}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}
            </Header>
        )
    }
}
