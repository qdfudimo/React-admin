/*eslint-disable*/
import React, { Fragment ,useState} from 'react'
import style from "./TaskItem.module.less";
function TaskItem(props) {
    let { item, idNow } = props
    let { title, username, id } = item
    const [nowTime,setNowTime] = useState(0)
    const [startY,setStartY] = useState(0)
    // const [endY,setEndY] = useState(0)
    const [moveY,setMoveY] = useState(0)
    const dragStart = (e) => {
        e.persist()
        setStartY(e.clientY)
        props.dragStart(id)
    }
    const dragEnd = (e) => {
        e.preventDefault();
        props.dragEnd()
    }
    const drop = (e) => {
        e.preventDefault();
        e.persist()
        e.persist()
        setMoveY(e.clientY-startY)
        let num = Math.floor(moveY/80)
        props.num(num,id)
        setStartY(0)
        setMoveY(0)
    }
    const darg = (e) => {
        e.preventDefault();
        if(Date.now() - nowTime < 500) return
        setNowTime(Date.now())
        e.persist()
        setMoveY(e.clientY-startY)
        let num = Math.round(moveY/80)
        props.num(num,id)
    }
    return (
        <Fragment>
            <div
                className={style["list"] + " " + style[ idNow == id?"active":''] }
                draggable="true"
                onDragStart={dragStart}
                //ondragstart - 用户开始拖动元素时触发
                onDragEnd={dragEnd}
                //onDragEnd用户完成元素拖动后触发
                onDrop={drop}
                //onDrop 释放鼠标键时触发此事件
                onDrag={darg}
                //onDrag元素正在拖动时触发
            >
                <header className={style.header}>
                    {username}
                </header>
                <main className={style.main}>
                    {title}
                </main>
            </div>
        </Fragment>
    )
}

export default TaskItem