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
    const [multiple, setMultiple] = useState(false)
    const [isSeee, setisSeee] = useState(false)
    const [uploadFile, setuploadFile] = useState([])
    useEffect(() => {
        console.log(uploadFile);
    }, [uploadFile])
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
    const uploadFiles = (files) => {
        let postFiles = Array.prototype.slice.call(files);
        if (!multiple) { postFiles = postFiles.slice(0, 1) }
        if (postFiles.length === 0) { return; }
        postFiles.forEach(item => {
            handelStart(item)
        });
    }
    const handelStart = (rawFile) => {
        rawFile.uid = Date.now() + 1;
        let file = {
            // status: 'ready',
            name: rawFile.name,
            size: rawFile.size,
            percentage: 0,
            uid: rawFile.uid,
            raw: rawFile
        };
        try {
            file.url = URL.createObjectURL(rawFile);
            console.log(file.url);
          } catch (err) {
            console.error('[Element Error][Upload]', err);
            return;
        }
        setuploadFile([...uploadFile, file])
    }

    const preview = (e) => {
        e.persist()
        const files = e.target.files;
        // uploadFiles(files)
        if (!multiple) {
            const rawFile = files[0]
            if (!rawFile) return
            const file = new FileReader();
            file.readAsDataURL(rawFile)
            file.onload = (eve) => {
                console.log( eve.target.result);
                img.current.src = eve.target.result
            }
        }
        // upload(rawFile)
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
                input.current.value = null;
            } else {
                input.current.value = null;
                processNumber.current.style.backgroundColor = "#ff4d4f";
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
        //为了能上传同一张图片
        input.current.value = null;
    }
    return (
        <Fragment>
            <Card size="small" title="图片上传">
                <input type="file" ref={input} multiple={false} hidden onChange={preview} />
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