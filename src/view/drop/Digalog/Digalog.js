/*eslint-disable*/
import React, { Fragment, useState } from 'react'
import style from "./Digalog.module.less"
import { Modal, Button } from 'antd';
function Digalog() {
    const [visible, setVisible] = useState(false)
    let drag;
    let moveHeader;
    let clienX;
    let clienY;
    let showModal = () => {
        setVisible(true)
    }
    let handleOk = e => {
        setVisible(false)
    }
    let handleCancel = e => {
        setVisible(false)
    }
    const getStyle = (function () {
        if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr]
        } else {
            return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
    })()
    let onMouseDown = e => {
        if (!drag) {
            drag = document.querySelector(".ant-modal");
            moveHeader = drag.querySelector(".ant-modal-header")
        }
        if (!clienX) {
            clienX = document.body.clientWidth;
            clienY = document.body.clientHeight;
        }
        //获取鼠标按下时的坐标位置
        const disX = e.clientX - moveHeader.offsetLeft
        const disY = e.clientY - moveHeader.offsetTop
        //整个模态框的宽度和高度
        const dragDomWidth = drag.offsetWidth
        const dragDomHeight = drag.offsetHeight
        //模态框左右移动最大距离
        const minDragDomLeft = drag.offsetLeft
        const maxDragDomLeft = clienX - dragDomWidth - drag.offsetLeft
        //模态框上下移动最大距离
        const minDragDomTop = drag.offsetTop
        const maxDragDomTop = clienY - dragDomHeight - drag.offsetTop
        console.log(minDragDomTop, maxDragDomTop, "maxDragDomTop");
        let styL = getStyle(drag, 'left')
        let styT = getStyle(drag, 'top')
        //模态框的left和top值有可能是百分比和带px要转换为数字
        if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
        } else {
            styL = +styL.replace(/\px/g, '')
            styT = +styT.replace(/\px/g, '')
        }
        document.onmousemove = (e) => {
            //鼠标移动时候的距离
            let left = e.clientX - disX
            let top = e.clientY - disY
            // console.log(left,top);
            if (-left > minDragDomLeft) {
                //如果移动距离大于最小移动距离，就让它等于
                left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft
            }
            if (-top > minDragDomTop) {
                //如果移动距离大于最小移动距离，就让它等于
                top = -minDragDomTop
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop
            }
            drag.style.left = `${left + styL}px`
            drag.style.top = `${top + styT}px`
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    return (
        <Fragment>
            <Button type="primary" onClick={showModal} style={{ marginTop: "20px", marginLeft: "20px" }}>
                Open Modal
            </Button>
            <Modal
                title={
                    <div
                        className="drag_title"
                        onMouseDown={onMouseDown}
                    >
                        模态框拖拽
                    </div>
                }
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                // closable={false}
                wrapClassName="move"
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </Fragment>
    )
}
export default Digalog