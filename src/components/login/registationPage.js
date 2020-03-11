import React from "react";
import { Form, Input, Checkbox, Button, message, Upload } from "antd";
import { Link } from "react-router-dom";

import { Typography } from "antd";
import "./loginPage.css";

import "firebase/auth";
import { connect } from "react-redux";
import {
  registrationLoadData,
  registrationLoadingImg,
  registrationLoadedImg
} from "../../store/registration/action";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const { Title, Text } = Typography;
class RegistationPage extends React.Component {
  onFinish = values => {
    const { dispatch } = this.props;

    dispatch(
      registrationLoadData(
        { ...values, avatar: this.props.avatarImg },
        this.props.history
      )
    );
  };

  handleChange = info => {
    const { dispatch } = this.props;
    if (info.file.status === "uploading") {
      dispatch(registrationLoadingImg(true));
      return;
    }

    if (info.file.status === "done") {
      // callback с примера анта
      getBase64(info.file.originFileObj, imageUrl => {
        dispatch(registrationLoadingImg(false));
        dispatch(registrationLoadedImg(imageUrl));
      });
    }
  };

  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const uploadButton = (
      <div>
        {this.props.imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
            name="registration-form"
            initialValues={{
              remember: true
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            className="login-form"
            {...layout}
          >
            <h2>Registration</h2>
            <Form.Item
              label="E-mail"
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Pass"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="avatar"
              label="Avatar IMG"
              rules={[
                {
                  required: true,
                  message: "Please add avatar!"
                }
              ]}
            >
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                //  картинка обрбатывается с примера анта
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {this.props.avatarImg ? (
                  <img
                    src={this.props.avatarImg}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <div>
                <Checkbox>
                  I have read the <Link to={"/agreement"}>agreement</Link>
                </Checkbox>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    registration: state.registeredReducer.newRegisteredUser,
    imgLoading: state.registeredReducer.imgLoading,
    avatarImg: state.registeredReducer.avatarImg
  };
};
const WrappedRegistationComponent = connect(mapStateToProps)(RegistationPage);
export default WrappedRegistationComponent;
