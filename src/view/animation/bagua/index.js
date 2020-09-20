import React, { Fragment } from 'react'
import style from "./bagua.module.less";
import { Card } from 'antd';
function Bagua() {
    return (
        <Fragment>
            <Card title="太极图 阴阳鱼" style={{backgroundColor:"transparent"}}>
                <div className={style.squre}></div>
            </Card>
        </Fragment>
    )
}
export default Bagua
