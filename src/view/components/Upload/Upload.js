/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import style from "./upload.module.less"
import { FolderOpenOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import config from "../../../utils/url"
import ajax from "./ajax"
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
    const [multiple, setMultiple] = useState(true)
    const [isSeee, setisSeee] = useState(false)
    const [uploadFile, setuploadFile] = useState([])
    useEffect(() => {
        if (uploadFile.length > 0) {
            console.log(uploadFile);
            let files = getFile(uploadFile)
            console.log(files);
            if (files.length == 0) return
            upload(files)
        }
    }, [uploadFile])
    const uploadFiles = (files) => {
        // if (limit && files.length + uploadFile.length > limit) {
        //     //填写限制函数 逻辑
        // }
        let postFiles = Array.prototype.slice.call(files);
        if (!multiple) { postFiles = postFiles.slice(0, 1) }
        if (postFiles.length === 0) { return; }
        let fileArr = []
        postFiles.forEach(item => {
            fileArr.push(handelStart(item))
        });
        setuploadFile([...uploadFile, ...fileArr])
    }
    const handelStart = (rawFile) => {
        rawFile.uid = Date.now() + 1;
        let file = {
            status: 'ready',
            name: rawFile.name,
            size: rawFile.size,
            percentage: 0,
            uid: rawFile.uid,
            raw: rawFile
        };
        try {
            file.url = URL.createObjectURL(rawFile);
        } catch (err) {
            console.error('[Element Error][Upload]', err);
            return;
        }
        return file
    }
    const getFile = (rawFile) => {
        return rawFile.filter(item => {
            return item.status == "ready"
        })
    }
    const preview = (e) => {
        e.persist()
        const files = e.target.files;
        if (!files) return
        uploadFiles(files)
    }
    const upload = (file) => {
        let json_data = {
            username,
            token
        }
        let options = {
            headers: {},
            // withCredentials
            file,
            data: json_data,
            // filename: "file",
            action: '/api/upload',
            onProgress: e => {
                setisSeee(true)
                process.current.style.opacity = 1;
                processNumber.current.style.backgroundColor = "#52c41a";
                processNumber.current.style.width = e.percent + "%";
            },
            onSuccess: e => {
                input.current.value = null;
                // imgs.current.src = config.baseURL + obj.data.path
                // console.log(e);
                changeStstus(uploadFile, "success")
                setisError(true)
            },
            onError: e => {
                changeStstus(uploadFile, "error")
                input.current.value = null;
                processNumber.current.style.backgroundColor = "#ff4d4f";
                setisError(false)
            }
        }
        ajax(options)
    }
    const changeStstus = (file, status) => {
        let arr = [...file];
        arr.forEach(item => {
            item.status = status
        })
        setuploadFile([...arr])
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
                <input type="file" ref={input} name="file" multiple={multiple} hidden onChange={preview} />
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