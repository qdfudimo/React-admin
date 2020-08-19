/*eslint-disable*/
import React, { Fragment, useRef, useEffect } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import style from "./upload.module.less"
import { FolderOpenOutlined } from '@ant-design/icons';
const componentName = (props) => {
    const img = useRef()
    const input = useRef()
    const username = useSelector(state => state.username)
    const token = useSelector(state => state.token)
    useEffect(() => {
    })
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
            img.current.src = eve.target.result
        }
        upload(rawFile)
    }
    const upload = (file) => {
        const form = new FormData();
        let json_data = {
            username,
            token
        }
        form.append('name',json_data.username);
        form.append('token', json_data.token);
        form.append('file', file);
        let xhr = new XMLHttpRequest();   //创建对象
        xhr.open('POST', '/api/upload', true);
        xhr.send(form)
        xhr.onreadystatechange = function () {
            console.log('state change', xhr);
            //调用 abort 后，state 立即变成了4,并不会变成0
            //增加自定义属性  xhr.uploaded
            if (xhr.readyState == 4) {
                console.log(xhr,44444);
                // var obj = JSON.parse(xhr.responseText);   //返回值
                // console.log(obj);
                // if(obj.fileUrl.length){
                //     //alert('上传成功');
                // }
            }
        }
    }
    const handelClick = () => {
        input.current.click()
    }
    return (
        <Fragment>
            <Card size="small" title="图片上传">
                <input type="file" ref={input} multiple hidden onChange={preview} />
                <div className={style.upload} onClick={handelClick}><FolderOpenOutlined className={style.up} /></div>
                <img ref={img} className={style.img}></img>
            </Card>
        </Fragment >
    )
}
export default componentName