/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
// import { Card, Button, message } from 'antd';
import style from "./upload.module.less"
import { FolderOpenOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import config from "../../../utils/url"
import PropTypes from 'prop-types';
import ajax from "./ajax"
const componentName = (props) => {
    let { multiple, data, headers, action, limit, onProgress, onSuccess, onError, onExceed } = props
    const input = useRef()
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
        if (limit && files.length + uploadFile.length > limit) {
            //填写限制函数 逻辑
            onExceed && onExceed(files, uploadFile)
        }
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
        let options = {
            headers,
            // withCredentials
            file,
            data: data,
            action,
            onProgress: e => {
                handleProgress(e, file)
                onProgress(e, file,uploadFile)
            },
            onSuccess: e => {
                input.current.value = null;
                handleSuccess(e, file)
                onSuccess(e, file,uploadFile)
            },
            onError: e => {
                input.current.value = null;
                handleError(e, file)
                onError(e, file,uploadFile)
            }
        }
        ajax(options)
    }
    const handleProgress = (e, file) => {
        let arr = [...uploadFile]
        arr.forEach(item => {
            if (item.status == "ready") {
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
            <input type="file" ref={input} name="file" multiple={multiple} hidden onChange={preview} />
            <div className={style.upload} onClick={handelClick}><FolderOpenOutlined className={style.up} /></div>
            <div className={style.name}>图片上传即时预览</div>
            <div className={style.img_list}>
                {
                    uploadFile.length > 0 ? uploadFile.map((item, i) => {
                        return (<div key={item.uid} className={style.txt}>
                            <img className={style.img} src={item.url}></img>
                            <div className={style.total} onMouseMove={() => { goDel(item) }} onMouseOut={() => { goSucess(item) }}>
                                <div className={style.process}>
                                    <span style={{ 'width': item.percentage + "%", "backgroundColor": item.percentage > 70 && item.status != "fail" ? "#52c41a" : "#ff4d4f" }} className={style.progressNumber}></span>
                                </div>
                                {
                                    item.status == "uploading" || activeLink == item.uid ? "" : <span className={style.status}>
                                        {
                                            item.status == "success" ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                        }
                                    </span>
                                }
                                <span className={style["del"] + " " + style[activeLink == item.uid ? "active" : '']}>
                                    <DeleteTwoTone twoToneColor="#ff4d4f" onClick={handelRemove} />
                                </span>
                            </div>
                        </div>)
                    }) : ""
                }
            </div>
        </Fragment >
    )
}
function noop() {

}
componentName.defaultProps = {
    multiple: false,
    data: {},
    headers: {},
    action: "",
    limit: 1,
    onProgress: noop,
    onSuccess: noop,
    onError: noop,
    onExceed: noop,
};

componentName.propTypes = {
    multiple: PropTypes.bool,
    data: PropTypes.object,
    headers: PropTypes.object,
    limit: PropTypes.number,
    action: PropTypes.string,
    onProgress: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onExceed: PropTypes.func,
};
export default componentName