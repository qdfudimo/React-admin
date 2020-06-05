/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import style from "./TimeTask.module.less";
export default class TimeTask extends Component {

    render() {
        return (
            <Fragment>
                <Timeline pending="Recording..." mode="alternate" className="time">
                    <Timeline.Item>项目诞生于2020-6-3</Timeline.Item>
                    <Timeline.Item color="green">网站页面设计</Timeline.Item>
                    <Timeline.Item color="green">菜单、路由完成</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                        <p>等待开发</p>
                        <p>后台接口开发用node</p>
                        <p>部署到阿里云服务器</p>
                    </Timeline.Item>
                    <Timeline.Item color="red">暂无权限控制</Timeline.Item>
                    <Timeline.Item color="green">首页完成</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                        <p>图标</p>
                        <p>富文本</p>
                        <p>Markdown</p>
                        <p>...</p>
                    </Timeline.Item>
                </Timeline>

            </Fragment>
        )
    }
}