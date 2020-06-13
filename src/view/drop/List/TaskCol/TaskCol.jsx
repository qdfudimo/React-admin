import React, { Fragment } from 'react'
import style from "./TaskCol.module.less";
function TaskCol(props) {
    const { status, data, match } = props
    const dragEnter = (e) => {
        e.preventDefault();
        if(props.enter) {
            props.enter(status)
        }
    }
    const drop = (e) => {
        e.preventDefault();
        props.drop(status)
    }
    const dragLeave = (e) => {
        e.preventDefault();
    }
    return (
        <Fragment>
            <div
                className={style.col}
                onDragOver={dragEnter}
                //ondragover - 被拖动的对象在另一对象容器范围内拖动时触发此事件 可以设置进入容器的样式
                onDrop={drop}
                //ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
                onDragEnter={dragEnter}
                //ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
                onDragLeave={dragLeave}
                //ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
            >
                <header className={style.header}>
                    {data[status]}
                </header>
                <main
                    className={style["mains"] + " " + style[match === data[status] ? "active" : '']}
                >
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
}

export default TaskCol