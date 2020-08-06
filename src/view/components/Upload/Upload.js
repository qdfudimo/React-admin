/*eslint-disable*/
import React, { Fragment, useRef } from 'react'
import { Card, Button, message } from 'antd';
import style from "./upload.module.less"
const componentName = () => {
    const img = useRef()
    const input = useRef()
    const dragOver = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const files = e.dataTransfer.files
        console.log(e);
        if (files.length !== 1) {
            message.error('仅支持上传一张图片')
            return
        }
        const rawFile = files[0] // 文件信息
        const file = new FileReader();
        file.readAsDataURL(rawFile);
        file.onload = e => {
            img.current.src = e.target.result;
        }
        e.stopPropagation()
        e.preventDefault()
    }
    const drop = (e) => {
        e.preventDefault();
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'copy'
    }
    const preview = (e) => {
        e.persist()
        const files = e.target.files;
        const rawFile = files[0]
        const file = new FileReader();
        file.readAsDataURL(rawFile)
        file.onload = (eve) => {
            console.log(eve);
            img.current.src = eve.target.result
        }
    }
    const handelClick = () => {
        input.current.click()
    }
    return (
        <Fragment>
            <Card size="small" title="图片上传">
                <input type="file" ref={input} multiple hidden onChange={preview} />
                <button onClick={handelClick}>上传</button>
                <img ref={img} className={style.img}></img>
            </Card>
        </Fragment >
    )
}
export default componentName