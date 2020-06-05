import React, { Component } from 'react'
import "./header.less"
import { Layout, Avatar, Dropdown, Menu,message } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import pig from "../../../assets/img/huaji.jpg"
const { Header } = Layout;

export default class header extends Component {
    toggle = () => {
        this.props.toggle()
    }
    onClick= () => {
        // console.log(1111);
        message.info("你是个猪猪哦");
    }
    menu = (
        <Menu>
            <Menu.ItemGroup key="g1" title="个人中心">
                <Menu.Item key="1" onClick={this.onClick}>用户信息</Menu.Item>
                <Menu.Item key="2">用户头像</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="g2" title="设置">
                <Menu.Item key="3">想设置啥</Menu.Item>
                <Menu.Item key="4">还想动啥</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
    render() {
        return (
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor: "#001529" }}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })}

                <Dropdown overlay={this.menu}>
                    <Avatar src={pig} />
                </Dropdown>
            </Header>
        )
    }
}
