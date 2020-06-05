/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import style from "./home.module.less"
import { Row, Col, Card } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Echarts from "./waterEcharts/waterEcharts";
import TimeTask from "./TimeTask/TimeTask";
import mahuateng from "@/assets/img/mahuateng.jpg";
import mayun from "@/assets/img/mayun.jpg";
// import iconFont from '@/utils/iconfont.js';
const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1865464_x71m37jl97.js"
});
export default class HomeIdenx extends Component {
    card = (val) => {
        return (<Col span={12}>
            <Card bordered={false} >
                <div className={style.icons}>
                    <IconFont type={val.type} />
                </div>
                <div className={style.content}>
                    <i>{val.name}</i>
                    <p>{val.num}</p>
                </div>
            </Card>
        </Col>)
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col span={8} className="cards">
                        <Row gutter={18}>
                            {this.card({ name: "点赞", type: "icon-dianzan", num: "1284" })}
                            {this.card({ name: "留言", type: "icon-liuyan", num: "1" })}
                        </Row>
                        <Row gutter={18} style={{ paddingTop: "20px" }}>
                            {this.card({ name: "访问", type: "icon-yonghu", num: "12784" })}
                            {this.card({ name: "收藏", type: "icon-collect", num: "123" })}
                        </Row>
                    </Col>
                    <Col span={16} style={{ paddingLeft: "20px" }} >
                        <Card bordered={false} className="charts">
                            <Echarts />
                        </Card>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8} className="cards">
                        <Card bordered={false} className="charts" title="项目创建计划">
                            <TimeTask />
                        </Card>
                    </Col>
                    <Col span={8} style={{ paddingLeft: "20px" }} >
                        <Card bordered={false} className="charts img">
                            <img src={mahuateng} className="mahuateng"/>
                        </Card>
                    </Col>
                    <Col span={8} style={{ paddingLeft: "20px" }} >
                        <Card bordered={false} className="charts img">
                        <img src={mayun} className="mahuateng"/>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}