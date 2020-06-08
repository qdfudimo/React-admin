import React from 'react'
import {
    HomeOutlined,
    HighlightOutlined,
    BarsOutlined,
    MenuOutlined,
    QqOutlined,
    UsergroupDeleteOutlined,
    WechatOutlined,
    AndroidOutlined,
    AreaChartOutlined,
    UnderlineOutlined,
    AppstoreOutlined,
    EditOutlined,
    AppstoreAddOutlined,
    DragOutlined,
    PlusSquareOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
const menuData = [
    {
        path: '/home',
        title: '首页',
        icon: <HomeOutlined />
    },
    {
        path: '/icon',
        title: '图标',
        icon: <UnderlineOutlined />
    },
    {
        path: '/components',
        title: '常用组件',
        icon: <AppstoreOutlined />,
        children: [
            {
                path: '/components/editor',
                title: '富文本编辑器',
                cont: ['常用组件','富文本编辑器'],
                icon: <EditOutlined />
            },
            {
                path: '/components/Markdown',
                title: 'Markdown',
                cont: ['常用组件','Markdown'],
                icon: <HighlightOutlined />
            },

        ]
    },
    {
        path: '/drop',
        title: '拖拽 移动',
        icon: <AppstoreAddOutlined />,
        children: [
            {
                path: '/drop/dialog',
                title: '模态框拖拽',
                cont: ['拖拽 移动','模态框拖拽'],
                icon: <DragOutlined />
            },
            {
                path: '/drop/table',
                title: '表格拖拽',
                cont: ['拖拽 移动','表格拖拽'],
                icon: <PlusSquareOutlined />
            }
        ]
    },
    {
        path: '/user',
        title: '用户管理',
        icon: <UsergroupDeleteOutlined />,
    },
    {
        path: '/role',
        title: '角色管理',
        icon: <AndroidOutlined />,
    },
    {
        path: '/table',
        title: '表格',
        icon: <OrderedListOutlined />,
    },
    {
        path: '/charts',
        title: '图表',
        icon: <AreaChartOutlined />,
    },
    {
        path: '/menu',
        title: '多级菜单',
        icon: <BarsOutlined />,
        children: [
            {
                path: '/menu/level',
                title: '二级菜单',
                icon: <MenuOutlined />,
                children: [
                    {
                        path: '/menu/level/submenu-1',
                        title: '三级菜单1',
                        cont: ['多级菜单','二级菜单',"三级菜单1"],
                        icon: <WechatOutlined />
                    },
                    {
                        path: '/menu/level/submenu-2',
                        title: '三级菜单2',
                        cont: ['多级菜单','二级菜单',"三级菜单2"],
                        icon: <QqOutlined />
                    }
                ]
            }
        ]
    },
];
export { menuData }
// import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import withLoadable from './loadable'
// const Login = withLoadable(() => import("../view/login"))
// const NotFound = withLoadable(() => import("../view/404"))
// const router = function () {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/login" component={Login} />
//                 <Route component={NotFound} />
//             </Switch>
//         </Router>
//     )
// }
// export {
//     router
// }