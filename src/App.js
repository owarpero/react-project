import React from "react";
import LoginPage from "./components/login/loginPage";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/home/home";
import RegistationPage from "./components/login/registationPage";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistationPage} />
        {//this.props.state.LoginReducer.logedIn
        true ? (
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
