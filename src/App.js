import React, { Component } from 'react'
import { connect } from "react-redux"
import { userData } from "./reducer/Action"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginRegister from "./view/login/index"
import NotFound from "./view/404"
import Layouts from "./view/layout/index"
import Author from "./components//author"
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
          <Route path="/" exact render={Author(Layouts)} />
          <Route path="/login" component={LoginRegister} />
          <Route path="/register" component={LoginRegister} />
          <Route component={NotFound}/>
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

