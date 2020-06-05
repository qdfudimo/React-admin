import React, { Component } from 'react'
import "./index.less"
import Homes from "../HomeIndex/HomeIndex"
import Icon from "../Icon/Icon"
import Editor from "../components/Editor"
import Markdown from "../components/Markdown"
import Digalog from "../drop/Digalog"
import DrgTable from "../drop/DrgTable"
import User from "../user/User"
import Role from "../role/Role"
import Table from "../table/Table"
import Charts from "../charts/Charts"
import Twomenu from "../menus/Twomenu/Twomenu"
import ThreeMenu from "../menus/Twomenu/ThreeMenu"
import NotFound from "../404.js"
import { withRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
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
                <Breadcrumb style={{
                    margin: '15px',
                    fontSize: "16px"
                }} >
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    {this.Breadcrumbs()}
                </Breadcrumb>

                <Switch>
                    <Route path="/home" component={Homes} />
                    <Route path="/icon" component={Icon} />
                    <Route path="/components" exact component={Editor} />
                    <Route path="/components/editor" component={Editor} />
                    <Route path="/components/Markdown" component={Markdown} />
                    <Route path="/drop" exact component={Digalog} />
                    <Route path="/drop/dialog" component={Digalog} />
                    <Route path="/drop/table" component={DrgTable} />
                    <Route path="/user" component={User} />
                    <Route path="/role" component={Role} />
                    <Route path="/table" component={Table} />
                    <Route path="/charts" component={Charts} />
                    <Route path="/menu" exact component={Twomenu} />
                    <Route path="/menu/level" exact component={Twomenu} />
                    <Route path="/menu/level/submenu-1" component={Twomenu} />
                    <Route path="/menu/level/submenu-2" component={ThreeMenu} />
                    <Redirect to="/home" from="/" />
                    <Route component={NotFound} />
                </Switch>
            </Content>
        )
    }
}
export default withRouter(Contents)
