import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./menu.less"
import { menuData } from "@/router/router.js"
import { Menu } from 'antd';
const { SubMenu } = Menu;
export default class Menus extends Component {
    menuTag = function deep(menuData) {
        if (menuData && menuData.length > 0) {
            return menuData.map(item => {
                if (item.children && item.children.length > 0) {
                    return (<SubMenu key={item.path} icon={item.icon} title={item.title}>
                        {deep(item.children)}
                    </SubMenu>)
                }
                return (<Menu.Item key={item.path} icon={item.icon}>
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>)
            })
        }
    }
    render() {
        return (
            <Menu
                id="menus"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                {this.menuTag(menuData)}
            </Menu>
        )
    }
}
