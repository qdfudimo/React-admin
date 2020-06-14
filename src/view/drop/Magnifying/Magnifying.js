/*eslint-disable*/
import React, { Fragment, useState,useRef } from 'react'
import style from "./Magnifying.module.less";
import { Card } from 'antd'
import s3 from "../../../assets/img/s3.png";
import bigs from "../../../assets/img/big.jpg";
function Magnifying() {
    const [display,setDisplay] = useState("none")
    const preview = useRef()
    const mask = useRef()
    const big = useRef()
    const mousemove = (e) => {
        e.persist()
        // (1). 先计算出鼠标在盒子内的坐标
        var x = e.clientX - preview.current.offsetLeft-216; 
        //preview.current.offsetLeft没有包括导航栏
        var y = e.clientY - preview.current.offsetTop;
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - mask.current.offsetWidth / 2;
        var maskY = y - mask.current.offsetHeight / 2;
        var maskMax = preview.current.offsetWidth -mask.current.offsetWidth; 
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.current.style.left = maskX + 'px';
        mask.current.style.top = maskY + 'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        var bigMax = bigIMg.offsetWidth - big.current.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    }
    const mouseover = () => {
        setDisplay("block")
    }
    const mouseout = () => {
        setDisplay("none")
    }
    return (
        <Fragment>
            <Card title="放大镜">
                <div
                ref={preview} 
                className={style.preview_img} 
                onMouseMove={mousemove} 
                onMouseOver={mouseover}
                onMouseOut={mouseout}
                >
                    <img src={s3} />
                    <div ref={mask} className={style.mask} style={{display:display}}></div>
                    <div ref={big} className={style.big} style={{display:display}}>
                        <img src={bigs} className="bigImg" />
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default Magnifying