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
            let files = getFile(uploadFile)
            if (files.length == 0) return
            files.forEach(item => {
                console.log(item);
                upload(item)
            })
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
            action: '/api/upload',
            onProgress: e => {
                handleProgress(e, file)
                // processNumber.current.style.backgroundColor = "#52c41a";
            },
            onSuccess: e => {
                input.current.value = null;
                // imgs.current.src = config.baseURL + obj.data.path
                handleSuccess(e, file)
            },
            onError: e => {
                handleError(e, file)
                input.current.value = null;
                // processNumber.current.style.backgroundColor = "#ff4d4f";
            }
        }
        ajax(options)
    }
    const handleProgress = (e, file) => {
        let arr = [...uploadFile];
        arr.forEach(item => {
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
        let arr = [...uploadFile];
        arr.forEach(item => {
            if (item.uid == file.uid) {
                item.status = status
            }
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
                <div className={style.name}>图片上传即时预览</div>
                <div className={style.img_list}>
                    {/* h5即时预览
                         <div className={style.txt}>
                            <div className={style.name}>图片上传即时预览</div>
                            <img ref={img} className={style.img}></img>
                        </div> */}
                    {/* {
                        uploadFile.length > 0 ? uploadFile.map(item => <div key={item.uid} className={style.txt}>
                            <img className={style.img} src={item.url}></img>
                            <div className={style.total} onMouseMove={goDel(item)} onMouseOut={goSucess(item)}>
                                <div ref={process} className={style.process}>
                                    <span ref={processNumber} style={{ 'width':"20%"}} className={style.progressNumber}></span>
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
                        ) : ""
                    } */}
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