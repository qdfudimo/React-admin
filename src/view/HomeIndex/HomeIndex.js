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
    scriptUrl: "//at.alicdn.com/t/font_1865464_x0m73b29nk.js"
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
            name: "Nginx：",
            percent: 30
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
            <Card bordered={false} className="left">
                <div className="icons">
                    <IconFont type={val.type} />
                </div>
                <div className="content">
                    <i>{val.name}</i>
                    <p>{val.num}</p>
                </div>
            </Card>
        </Col>)
    }
    onSelect = (value) => {
        // console.log(value);
        console.log(`%c                                                                            
                                                                            
                                                                            
                               %c FBI WARNING %c                                
                                                                            
                                                                            
%c        Federal Law provides severe civil and criminal penalties for        
        the unauthorized reproduction,distribution, or exhibition of        
         copyrighted motion pictures (Title 17, United States Code,         
        Sections 501 and 508). The Federal Bureau of Investigation          
         investigates allegations of criminal copyright infringement        
                 (Title 17, United States Code, Section 506).               
                                                                            
                                                                            
                                                                            
`,
'background: #000; font-size: 18px; font-family: monospace',
'background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff',
'background: #000; font-size: 18px; font-family: monospace',
'background: #000; font-size: 18px; font-family: monospace; color: #ddd; text-shadow:0 0 2px #fff'
)
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
                            <Calendar fullscreen={false}   onSelect={this.onSelect} />
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