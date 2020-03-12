import React from "react";
import LoginPage from "./components/login/loginPage";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/home/home";
import RegistationPage from "./components/login/registationPage";
import { connect } from "react-redux";
import { message } from "antd";

class App extends React.Component {
  render() {
    let isLoggedIn = localStorage.getItem("currentUser") !== null;
    isLoggedIn = isLoggedIn || this.props.state.LoginReducer.logedIn;
    return (
      <Switch>
        {!isLoggedIn ? (
          <Route path="/login" component={LoginPage} />
        ) : (
          ((<Redirect to="/home" />), console.log("asd"))
        )}

        <Route path="/registration" component={RegistationPage} />
        {isLoggedIn ? (
          <Route path="/home" component={HomePage} />
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    );
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};
const WrappedAppComponent = connect(mapStateToProps)(App);
export default WrappedAppComponent;
