/*eslint-disable*/
import React, { Fragment, useRef ,useEffect} from 'react'
import { Card, Button, message } from 'antd';
import { connect } from "react-redux"
import style from "./upload.module.less"
import { FolderOpenOutlined } from '@ant-design/icons';
const componentName = (props) => {
    const img = useRef()
    const input = useRef()
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
    }
    const upload = (file) => {
        const formData = new FormData();
        // formData.append('name', JSON.stringify(json_data.name));
        // formData.append('singer', JSON.stringify(json_data.singer));
        // formData.append('sing_type', JSON.stringify(json_data.sing_type));
        formData.append('file', file);
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
const mapStateToProps = (state) => {
    return {
        username: state.username,
        token: state.token
    }
}
export default connect(mapStateToProps, null)(componentName)