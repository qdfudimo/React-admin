import React, { Fragment } from 'react'
import { Table, Tag, Space, Card, Button} from 'antd';
function User() {
    const columns = [
        {
            title: '序号',
            width: '80',
            render:(text,record,index)=> `${index+1}`,
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
            title: 'Drag',
            key: 'drag',
            width:"100",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" style={{color:"#40a9ff"}} onClick={()=>handel(record)}>Invite {record.name}</Button>
                    <Button type="link" style={{color:"#ff7875"}}>Delete</Button>
                </Space>
            ),
        }
    ];
    let handel = (e) => {
        console.log(e);
        
    }
    const data = [
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
    ];


    return (
        <Fragment>
            <Card title="用户管理">
                <Table columns={columns}  bordered pagination={false} dataSource={data} />
            </Card>
        </Fragment>
    )
}

export default User