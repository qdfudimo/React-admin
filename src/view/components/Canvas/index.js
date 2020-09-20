/*eslint-disable*/
import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Card, Button, message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
const canvans = (props) => {
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
            <Card title="图片上传">
            </Card>
        </Fragment >
    )
}
export default canvans