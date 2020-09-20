import React, { Fragment, useEffect, useState } from 'react'
import { Table, Tag, Space, Card, Button } from 'antd';
import {
    AimOutlined
} from '@ant-design/icons';
import Sortable from "sortablejs"
function DragTable() {
    const columns = [
        {
            title: '序号',
            width: '80',
            dataIndex: 'key',
            key:"key",
            render: (key) => <span>{key}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" style={{ color: "#40a9ff" }} onClick={() => handel(record)}>Invite {record.name}</Button>
                    <Button type="link" style={{ color: "#ff7875" }}>Delete</Button>
                </Space>
            ),
        },
        {
            title: 'Drag',
            key: 'drag',
            align: "center",
            render: () => (
                <span><AimOutlined style={{ fontSize: "24px" }} /></span>
            ),
        },
    ];
    let handel = (e) => {
        console.log(e);

    }
    // const data = ;
    const [data, setData] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '4',
            name: 'yuehan',
            age: 11,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '5',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
        {
            key: '6',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ])
    const [oldList] = useState(data.slice())
    useEffect(() => {
        sort()
    })
    let sort = () => {
        let sortTable = document.querySelector(".sortTable")
        let el = sortTable.querySelector(".ant-table-content table>.ant-table-tbody")
        new Sortable(el, {
            ghostClass: 'sortable-ghost', // 拖拽时候颜色,
            setData: function (dataTransfer) {
                dataTransfer.setData('Text', '')
            },
            onEnd: evt => {
                // evt.oldIndex 拖拽前的索引
                // evt.newIndex 拖拽后的索引
                const target = data.splice(evt.oldIndex, 1)[0]
                data.splice(evt.newIndex, 0, target)
                setData([...data])
            }
        })
    }
    return (
        <Fragment>
            <Card title="表格拖拽">
                <Table columns={columns} bordered pagination={false} dataSource={data} className="sortTable" />
                <div style={{ paddingTop: "30px" }}>
                    <p>拖拽前排序：{oldList.map(i => i.key).join(",")}</p>
                    <p>拖拽后排序：{data.map(i => i.key).join(",")}</p>
                </div>
            </Card>
        </Fragment>
    )
}

export default DragTable