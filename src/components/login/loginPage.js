import React from "react";
import "antd/dist/antd.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { Link } from "react-router-dom";

import "./loginPage.css";

import { connect } from "react-redux";
import { loginLoadData } from "../../store/login/actions";

const { Title, Text } = Typography;
class LoginForm extends React.Component {
  onFinish = values => {
    const { dispatch } = this.props;
    dispatch(loginLoadData(values, this.props.history));
  };
  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <div className="flex">
        <div className="flex right-side flex-align">
          <div className="right-side-content ">
            <Title style={{ color: "white" }}>Welcome to WARPER!</Title>
            <Text style={{ color: "white" }}>
              The ultimate React and Ant.design admin theme framework for view
              store statistics.
            </Text>
          </div>
        </div>

        <div className="flex flex-align">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={this.onFinish}
          >
            <Title level={3}>Login Account</Title>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 20,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className="login-form-forgot" to="/forgot_password">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to={"/registration"}>register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loginData: state.thunkLogin,
    logedIn: state.LoginReducer.logedIn
  };
};
const WrappedLoginComponent = connect(mapStateToProps)(LoginForm);
export default WrappedLoginComponent;
