/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import style from "./upload.module.less"
import { FolderOpenOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import config from "../../../utils/url"
const componentName = (props) => {
    const img = useRef()
    const imgs = useRef()
    const input = useRef()
    const process = useRef()
    const processNumber = useRef()
    const username = useSelector(state => state.username)
    const token = useSelector(state => state.token)
    const [isError, setisError] = useState(true)
    const [isDel, setisDel] = useState(false)
    const [isSeee, setisSeee] = useState(false)
    const [uploadFile, setuploadFile] = useState([])
    useEffect(() => {
        // process.current.style.width="20%";
        // process.current.style.backgroundColor="red";
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
        console.log(e);
        const files = e.target.files;
        const rawFile = files[0]
        const file = new FileReader();
        if(!rawFile) return
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
        form.append('name', json_data.username);
        form.append('token', json_data.token);
        form.append('file', file);
        let xhr = new XMLHttpRequest();   //创建对象
        xhr.upload.onprogress = function (evt) {
            console.log(evt);
            if (evt.total > 0) {
                //evt.loaded上传进度条
                let num = (evt.loaded / evt.total) * 100
                if (num > 0) {
                    process.current.style.opacity = 1;
                    processNumber.current.style.backgroundColor = "#52c41a";
                    processNumber.current.style.width = num + "%";
                }
            }
        }
        xhr.open('POST', '/api/upload', true);
        xhr.send(form)
        xhr.onreadystatechange = function () {
            setisSeee(true)
            //调用 abort 后，state 立即变成了4,并不会变成0
            //增加自定义属性  xhr.uploaded
            if (xhr.readyState == 4 && xhr.status == 200) {
                var obj = JSON.parse(xhr.responseText);   //返回值
                if (obj.data.path) {
                    imgs.current.src = config.baseURL + obj.data.path
                }
                setisError(true)
            } else {
                setisError(false)
            }
        }
    }
    const handelClick = () => {
        input.current.click()
    }
    const goDel = () => {
        setisDel(true)
    }
    const goSucess = () => {
        setisDel(false)
    }
    const handelRemove = () => {
        input.current.value=null;
        console.log(input.current.value);
    }
    return (
        <Fragment>
            <Card size="small" title="图片上传">
                <input type="file" ref={input} multiple hidden onChange={preview} />
                <div className={style.upload} onClick={handelClick}><FolderOpenOutlined className={style.up} /></div>
                <div className={style.img_list}>
                    <div className={style.txt}>
                        <div className={style.name}>图片上传即时预览</div>
                        <img ref={img} className={style.img}></img>
                    </div>
                    <div className={style.txt}>
                        <div className={style.name}>上传成功返回图片路径预览</div>
                        <img ref={imgs} className={style.img}></img>
                        <div className={style.total} onMouseMove={goDel} onMouseOut={goSucess}>
                            <div ref={process} className={style.process}>
                                <span ref={processNumber} className={style.progressNumber}></span>
                            </div>
                            {
                                isDel ? "" : !isSeee ? "" : <span className={style.status}>
                                    {
                                        isError ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                    }
                                </span>
                            }
                            <span className={style["del"] + " " + style[isDel ? "active" : '']}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" onClick={handelRemove} />
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </Fragment >
    )
}
export default componentName