import React, { Component } from 'react'
import "./index.less"
import Menu from './Menu/Menu.js'
import { Layout} from 'antd';
const { Sider } = Layout;
export default class Asider extends Component {
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                // left: 0,
            }}>
                <div className="logo"></div>
                <Menu/>
            </Sider>
        )
    }
}
