import React, { Fragment } from 'react'
import style from "./carousel.module.less";
import { Card } from 'antd';
function Carousel() {
    return (
        <Fragment>
            <Card size="small" title="纯css 旋转木马">
                <div className={style.father}>
                    <section>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </section>

                </div>
            </Card>
        </Fragment>
    )
}
export default Carousel
