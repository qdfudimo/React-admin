import React, { Component, lazy, Suspense } from 'react'
import "./index.less"
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Content } = Layout;
const Homes = lazy(() => import("../HomeIndex/HomeIndex"))
const Icon = lazy(() => import("../Icon/Icon"))
const Editor = lazy(() => import("../components/Editor/Editor"))
const Canvas = lazy(() => import("../components/Canvas/index"))
const Upload = lazy(() => import("../components/Upload/index"))
const Markdown = lazy(() => import("../components/Markdown/Markdown"))
const Digalog = lazy(() => import("../drop/Digalog/Digalog"))
const DrgTable = lazy(() => import("../drop/DrgTable/DrgTable"))
const List = lazy(() => import("../drop/List/List"))
const Magnifying = lazy(() => import("../drop/Magnifying/Magnifying"))
const Bagua = lazy(() => import("../animation/bagua"))
const Cube = lazy(() => import("../animation/cube"))
const Carousel = lazy(() => import("../animation/carousel"))
const Earth = lazy(() => import("../animation/Earth"))
const User = lazy(() => import("../user/User"))
const Role = lazy(() => import("../role/Role"))
const Table = lazy(() => import("../table/Table"))
const Charts = lazy(() => import("../charts/Charts"))
const Twomenu = lazy(() => import("../menus/Twomenu/Twomenu"))
const ThreeMenu = lazy(() => import("../menus/Twomenu/ThreeMenu"))
const NotFound = lazy(() => import("../404.js"))
const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={<div style={{color:"#000",fontSize:"20px",padding:"30px"}}><LoadingOutlined />&nbsp;&nbsp;&nbsp;Loading...</div>}>
            <Component {...props}></Component>
        </Suspense>
    )
}
class Contents extends Component {
    Breadcrumbs = function () {
        let { state } = this.props.location;
        if (state && (typeof (state) == 'string')) {
            document.title = `${state}-React admin`
            if (state === "首页") return ""
            return <Breadcrumb.Item>{state}</Breadcrumb.Item>
        } else if (state && state.length > 0) {
            document.title = `${state[state.length - 1]}-React admin`
            return state.map(item => {
                return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            })
        }
        return ""
    }
    render() {
        return (
            <Content
                style={{ margin: '0 16px', overflow: 'initial', backgroundColor: "transparent" }}
                className="site-layout-background"
            >
                <div>
                <Breadcrumb style={{
                    margin: '15px',
                    fontSize: "16px"
                }} >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    {this.Breadcrumbs()}
                </Breadcrumb>
                <div></div>
                </div>
                <Switch>
                    <Route path="/home" component={SuspenseComponent(Homes)} />
                    <Route path="/icon" component={SuspenseComponent(Icon)} />
                    <Route path="/components" exact component={SuspenseComponent(Canvas)} />
                    <Route path="/components/canvas" component={SuspenseComponent(Canvas)} />
                    <Route path="/components/upload" component={SuspenseComponent(Upload)} />
                    <Route path="/components/editor" component={SuspenseComponent(Editor)} />
                    <Route path="/components/Markdown" component={SuspenseComponent(Markdown)} />
                    <Route path="/drop" exact component={SuspenseComponent(Digalog)} />
                    <Route path="/drop/dialog" component={SuspenseComponent(Digalog)} />
                    <Route path="/drop/table" component={SuspenseComponent(DrgTable)} />
                    <Route path="/drop/list" component={SuspenseComponent(List)} />
                    <Route path="/drop/fangda" component={SuspenseComponent(Magnifying)} />
                    <Route path="/c3" exact component={SuspenseComponent(Bagua)} />
                    <Route path="/c3/bagua" component={SuspenseComponent(Bagua)} />
                    <Route path="/c3/cube" component={SuspenseComponent(Cube)} />
                    <Route path="/c3/carousel" component={SuspenseComponent(Carousel)} />
                    <Route path="/c3/earth" component={SuspenseComponent(Earth)} />
                    <Route path="/user" component={SuspenseComponent(User)} />
                    <Route path="/role" component={SuspenseComponent(Role)} />
                    <Route path="/table" component={SuspenseComponent(Table)} />
                    <Route path="/charts" component={SuspenseComponent(Charts)} />
                    <Route path="/menu" exact component={SuspenseComponent(Twomenu)} />
                    <Route path="/menu/level" exact component={SuspenseComponent(Twomenu)} />
                    <Route path="/menu/level/submenu-1" component={SuspenseComponent(Twomenu)} />
                    <Route path="/menu/level/submenu-2" component={SuspenseComponent(ThreeMenu)} />
                    <Redirect to="/home" from="/" />
                    <Route component={SuspenseComponent(NotFound)} />
                </Switch>
            </Content>
        )
    }
}
export default withRouter(Contents)
