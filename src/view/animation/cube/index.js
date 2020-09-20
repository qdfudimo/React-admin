import React, { Fragment } from 'react'
import style from "./cube.module.less";
import { Card } from 'antd';
function Cube() {
    return (
        <Fragment>
            <Card title="纯css 正方形">
                <div className={style.father}>
                    <div>第一面盒子</div>
                    <div>第二面盒子</div>
                    <div>第三面盒子</div>
                    <div>第四面盒子</div>
                    <div>第五面盒子</div>
                    <div>第六面盒子</div>
                </div>
            </Card>
        </Fragment>
    )
}
export default Cube