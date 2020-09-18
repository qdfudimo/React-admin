/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import Upload from "./Upload"
const componentName = (props) => {
    // let {multiple,data,headers,action,limit,onProgress,onSuccess,onError} = props
    const username = useSelector(state => state.username)
    const token = useSelector(state => state.token)
    let prop = {
        data: {
            username, token
        },
        action: '/api/upload',
        onError: (val) => {
            console.log(val);
        }
    }
    return (
        <Fragment>
            <Card size="small" title="图片上传">
                <Upload {...prop} />
            </Card>
        </Fragment >
    )
}
export default componentName