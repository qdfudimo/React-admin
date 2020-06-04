import React from 'react'
import {
    HomeOutlined,
    PieChartOutlined,
    BarsOutlined,
    MenuOutlined,
    QqOutlined,
    UsergroupDeleteOutlined,
    WechatOutlined,
    AndroidOutlined,
    AreaChartOutlined,
    UnderlineOutlined,
    AppstoreOutlined,
    EditOutlined
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
                title: '富文本',
                icon: <EditOutlined />
            },
            {
                path: '/products/goods',
                title: '商品管理',
                icon: <PieChartOutlined />
            },

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
                        icon: <WechatOutlined />
                    },
                    {
                        path: '/menu/level/submenu-2',
                        title: '三级菜单2',
                        icon: <QqOutlined />
                    }
                ]
            }
        ]
    },
];
export  {menuData}
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
