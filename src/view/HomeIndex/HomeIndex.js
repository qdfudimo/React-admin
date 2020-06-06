/*eslint-disable*/
import React, { Component, Fragment } from 'react'
import style from "./home.module.less"
import { Row, Col, Card, Calendar, Progress } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Echarts from "./waterEcharts/waterEcharts";
import TimeTask from "./TimeTask/TimeTask";
import Comment from "./Comment/Comment";
import mahuateng1 from "@/assets/img/mahuateng1.jpg";
import yiyang from "@/assets/img/yiyang.jpg";
import gutianle from "@/assets/img/gutianle.jpg";
import chui from "@/assets/img/chui.jpg";
import mayun from "@/assets/img/mayun.jpg";
// import iconFont from '@/utils/iconfont.js';
const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1865464_x71m37jl97.js"
});

export default class HomeIdenx extends Component {
    state = {
        skill: [{
            name: "React：",
            percent: 100
        },
        {
            name: "js：",
            percent: 80
        }, {
            name: "css：",
            percent: 60
        }, {
            name: "html：",
            percent: 90
        }, {
            name: "vue：",
            percent: 0
        }, {
            name: "angular：",
            percent: 0
        }]
    }
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
    onPanelChange = (value, mode) => {
        // console.log(value, mode);
        console.log("%c欢迎光临", " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")
        console.log("%c只有聪明的人看到", "background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em")
    }
    liSkill = (prop) => {
        return (<li key={prop.name}>
            <div className={style.names}>{prop.name}</div>
            <Progress percent={prop.percent} size="small" className="pro" />
        </li>)
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
                        <Card bordered={false} className="charts echar">
                            <Echarts></Echarts>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8} className="cards">
                        <Card bordered={false} className="charts" title="项目创建计划">
                           <TimeTask />
                        </Card>
                    </Col>
                    <Col span={16} style={{ paddingLeft: "20px" }} className={style.cover}>
                        <div className={style.picture}>
                            <div className={style.jpg}><img src={gutianle} /></div>
                            <div className={style.jpg}><img src={yiyang} /></div>
                            <div className={style.jpg}><img src={mahuateng1} /></div>
                            <div className={style.jpg}><img src={mayun} /></div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ paddingTop: "20px" }}>
                    <Col span={8} className="cards">
                        <Card bordered title="日历">
                            <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
                        </Card>
                    </Col>
                    <Col span={9} style={{ paddingLeft: "20px" }}>
                        <Card bordered={false} title="评论">
                            <Comment />
                        </Card>
                    </Col>
                    <Col span={7} style={{ paddingLeft: "20px" }} className="skill">
                        <Card bordered={false}>
                            <div className={style.imgs}>
                                <img src={chui}></img>
                            </div>
                            <ul className={style.ul}>
                                {
                                    this.state.skill.map(item => {
                                        return this.liSkill(item)
                                    })
                                }
                            </ul>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}