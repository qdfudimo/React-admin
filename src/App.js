/*eslint-disable*/
import React, { Component, lazy, Suspense } from 'react'
import { connect } from "react-redux"
import { userData } from "./reducer/Action"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Layouts from "./view/layout/index"
import Author from "./components/author"
const Layouts = lazy(() => import("./view/layout/index"))
const NotFound = lazy(() => import("./view/404"))
const LoginRegister = lazy(() => import("./view/login/index"))
const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props}></Component>
    </Suspense>
  )
}
class App extends Component {
  UNSAFE_componentWillMount() {
    if (!this.props.isFresh) {
      let data = sessionStorage.getItem("store") ? JSON.parse(sessionStorage.getItem("store")) : null
      if (data) {
        this.props.user(data)
      }
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={SuspenseComponent(LoginRegister)} />
          <Route path="/register" component={SuspenseComponent(LoginRegister)} />
          <Author path="/" component={SuspenseComponent(Layouts)}></Author>
          {/* 这里不能加exact，会导致子路由匹配不到 */}
          <Route component={SuspenseComponent(NotFound)} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFresh: state.isFresh
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    user: (data) => { dispatch(userData(data)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

