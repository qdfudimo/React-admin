import React, { Component } from 'react'
import "./index.less"
import { Layout, Breadcrumb, Card } from 'antd';
const { Content } = Layout;
export default class Contents extends Component {
    render() {
        return (
            <Content
                style={{ margin: '0 16px', overflow: 'initial', backgroundColor: "transparent" }}
                className="site-layout-background"
            >
                <Breadcrumb style={{
                    margin: '15px',
                    fontSize: "16px"
                }} >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>图标</Breadcrumb.Item>
                </Breadcrumb>
                <Card title="Card title" bordered={false} style={{ width: "100%" }}>
                    content
                </Card>
            </Content>
        )
    }
}
