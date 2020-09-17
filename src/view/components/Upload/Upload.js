/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import style from "./upload.module.less"
import { FolderOpenOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import config from "../../../utils/url"
import ajax from "./ajax"
const componentName = (props) => {
    const input = useRef()
    const username = useSelector(state => state.username)
    const token = useSelector(state => state.token)
    const [isDel, setisDel] = useState(false)
    const [multiple, setMultiple] = useState(true)
    const [uploadFile, setuploadFile] = useState([])
    const [activeLink, setactiveLink] = useState(null)
    let index = 1;
    useEffect(() => {
        if (uploadFile.length > 0) {
            getFile(uploadFile).forEach(item => {
                upload(item)
            })
        }
    }, [uploadFile])
    const getFile = (rawFile) => {
        return rawFile.filter(item => {
            console.log(item.status);
            return item.status == "ready"
        })
    }
    const preview = (e) => {
        e.persist()
        const files = e.target.files;
        if (!files) return
        uploadFiles(files)
    }
    const uploadFiles = (files) => {
        // if (limit && files.length + uploadFile.length > limit) {
        //     //填写限制函数 逻辑
        // }
        let postFiles = Array.prototype.slice.call(files);
        if (!multiple) { postFiles = postFiles.slice(0, 1) }
        if (postFiles.length === 0) { return; }
        let arr = []
        postFiles.forEach(item => {
            arr.push(handelStart(item))
        });
        setuploadFile([...uploadFile, ...arr])
    }
    const handelStart = (rawFile) => {
        rawFile.uid = Date.now() + index++;
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
            action: '/api/upload',
            onProgress: e => {
                handleProgress(e, file)
            },
            onSuccess: e => {
                input.current.value = null;
                handleSuccess(e, file)
            },
            onError: e => {
                input.current.value = null;
                handleError(e, file)
            }
        }
        ajax(options)
    }
    const handleProgress = (e, file) => {
        let arr = [...uploadFile]
        arr.forEach(item => {
            if(item.status == "ready") {
                item.status = "loading"
            }
            if (item.uid == file.uid) {
                item.status = "uploading"
                item.percentage = e.percent
            }
        })
        setuploadFile([...arr])
    }
    const handleSuccess = (e, file) => {
        changeStatus(file, "success")
    }
    const handleError = (e, file) => {
        changeStatus(file, "fail")
    }
    const changeStatus = (file, status) => {
        let arr = [...uploadFile]
        arr.forEach(item => {
            if (item.uid == file.uid) {
                item.status = status
            }
        })
        setuploadFile([...arr])
    }
    const handelClick = () => {
        input.current.value = null;
        input.current.click()
    }
    const goDel = (val) => {
        uploadFile.forEach(item => {
            if (item.uid == val.uid) {
               setactiveLink(item.uid)
            }
        })
    }
    const goSucess = () => {
        // console.log(item); activeLink
        setactiveLink(null)
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
                <div className={style.name}>图片上传即时预览</div>
                <div className={style.img_list}>
                    {
                        uploadFile.length > 0 ? uploadFile.map((item,i )=> {
                            return (<div key={item.uid} className={style.txt}>
                                <img className={style.img} src={item.url}></img>
                                <div className={style.total} onMouseMove={() => { goDel(item) }} onMouseOut={() => { goSucess(item) }}>
                                    <div className={style.process}>
                                        <span style={{ 'width': item.percentage + "%", "backgroundColor": item.percentage > 70 && item.status != "fail" ? "#52c41a" : "#ff4d4f" }} className={style.progressNumber}></span>
                                    </div>
                                    {
                                        item.status == "uploading"||activeLink== item.uid ? "" : <span className={style.status}>
                                            {
                                                item.status == "success" ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                            }
                                        </span>
                                    }
                                    <span className={style["del"] + " " + style[activeLink== item.uid ? "active" : '']}>
                                        <DeleteTwoTone twoToneColor="#ff4d4f" onClick={handelRemove} />
                                    </span>
                                </div>
                            </div>)
                        }) : ""
                    }
                </div>
            </Card>
        </Fragment >
    )
}
// Scroll.defaultProps = {
//     direction: "vertical",
//     click: true,
//     refresh: true,
//     onScroll:null,
//     pullUpLoading: false,
//     pullDownLoading: false,
//     pullUp: null,
//     pullDown: null,
//     bounceTop: true,
//     bounceBottom: true
//   };

//   Scroll.propTypes = {
//     direction: PropTypes.oneOf(['vertical', 'horizental']),
//     refresh: PropTypes.bool,
//     onScroll: PropTypes.func,
//     pullUp: PropTypes.func,
//     pullDown: PropTypes.func,
//     pullUpLoading: PropTypes.bool,
//     pullDownLoading: PropTypes.bool,
//     bounceTop: PropTypes.bool,//是否支持向上吸顶
//     bounceBottom: PropTypes.bool//是否支持向下吸顶
//   };
export default componentName