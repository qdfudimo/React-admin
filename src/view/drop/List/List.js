/*eslint-disable*/
import React, { useState } from 'react'
import style from "./list.module.less";
import TaskCol from "./TaskCol/TaskCol.jsx"
import TaskItem from "./TaskItem/TaskItem.jsx"
import { Card } from 'antd'
function List() {
    const STATUS_TODO = 'STATUS_TODO';
    const STATUS_DOING = 'STATUS_DOING';
    const STATUS_DONE = 'STATUS_DONE';
    const STATUS_CODE = {
        STATUS_TODO: '待处理',
        STATUS_DOING: '进行中',
        STATUS_DONE: '已完成'
    }
    let data = [{
        id: 0,
        status: STATUS_TODO,
        title: '今天你吃饭了嘛？多喝点热水。解渴',
        username: '小明😁',
    }, {
        id: 1,
        status: STATUS_TODO,
        title: '每天敲代码，每天吃稍带你，减减肥',
        username: '小红🙄',
    }, {
        id: 2,
        status: STATUS_TODO,
        title: '学习React',
        username: '(*^_^*)🐷',
    }, {
        id: 3,
        status: STATUS_TODO,
        title: '学习vue',
        username: '小飞侠🎈',
    }, {
        id: 4,
        status: STATUS_TODO,
        title: '学习react hooks',
        username: '小呆呆💚',
    }, {
        id: 5,
        status: STATUS_TODO,
        title: '学习红宝书⛷',
        username: '小叮当🤸‍♀️',
    }]
    const [id, setId] = useState(null)
    const [tasks, setTasks] = useState(data)
    const [match,setMatch] = useState(null)
    const dragStart = (id) => {
        setId(id)
    }
    const drop = (status) => {
        tasks.forEach(item => {
            if(item.id === id) {
                item.status = status
            }
        })
        setTasks([...tasks])
        setId(null)
        setMatch(null)
    }
    const dragEnd =() => {
        setId(null)
    }
    const enter =(status) => {
        setMatch(STATUS_CODE[status])
    }
    const num =(item,id) => {
        let dats = tasks;
        let i;
        dats.forEach((item,index) => {
            if(item.id === id) {
                i =index
            }
        })
        let one = dats.splice(i,1)
        dats.splice(item,0,...one)
        setTasks(dats)
    }

    return (
        <Card title="列表拖拽">
            <div className={style.wrapper}>
                {
                    Object.keys(STATUS_CODE).map(status =>
                        <TaskCol
                            status={status}
                            data={STATUS_CODE}
                            key={status}
                            drop={drop}
                            match={match}
                            enter={enter}
                        >
                            {
                                tasks.filter(k => k.status === status).map(item =>
                                    <TaskItem
                                        key={item.id}
                                        item={item}
                                        idNow={id}
                                        dragStart={dragStart}
                                        dragEnd={dragEnd}
                                        num={num}
                                    />
                                )
                            }
                        </TaskCol>
                    )
                }
            </div>
        </Card>
    )

}

export default List
