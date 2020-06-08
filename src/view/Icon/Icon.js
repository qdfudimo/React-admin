/*eslint-disable*/
import React, { Fragment } from 'react';
import style from './Icon.module.less';
import { Card, Tooltip, message } from 'antd';
import iconData from "./iconDta";
import copy from 'copy-to-clipboard';
const Icons = () => {
    const copys = (txt) => {
        copy(txt) ? message.success({
            content: <span><span style={{ backgroundColor: "#f5f5f5", color: "rgba(0,0,0,.65)" }}>😃{txt}🐷</span>&nbsp;&nbsp;&nbsp;Bingo 🎉</span>,
        }) : message.error({
            content: <span><span style={{ backgroundColor: "#f5f5f5", color: "rgba(255,0,0,.65)" }}>🤢复制失败😡</span>&nbsp;&nbsp;&nbsp;Boom 👥</span>,
        });
    }
    return (
        <Fragment>
            <div className={style.title}>
                <a href="https://ant.design/components/icon-cn/" target="_blank" rel="noopener noreferrer">🐷UI组件参考 Antd组件库</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/icon.html" target="_blank" rel="noopener noreferrer">Svg组件使用参考花裤衩大神的vue-element-admin</a>
            </div>
            <Card style={{ paddingTop: "10px", marginTop: "20px" }}>
                <div className="icons-list">
                    <ul>
                        {iconData.map(item => {
                            return (<li key={item.name} onClick={() => copys(`<${item.name} />`)}>
                                <Tooltip title={`<${item.name} />`}>
                                    {item.group}
                                </Tooltip>
                                <span>{item.name}</span>
                            </li>)
                        })}
                    </ul>
                </div>
            </Card>
        </Fragment>
    )
}
export default Icons
