import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import "./home.css";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";

import ProfileInfo from "./modal";
import { currentUserSignOut } from "../../store/home/actions";
import Graphs from "./content/graphs";

const { Text } = Typography;
const { Header, Sider, Content } = Layout;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      navbarMod: false
    };
  }
  toggle = () => {
    const { navbarMod } = this.state;
    this.setState({ navbarMod: !navbarMod });
  };
  handleSignOut = () => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch(currentUserSignOut(this.props.history));
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { navbarMod } = this.state;

    const avatar = JSON.parse(localStorage.getItem("currentUser")).photoURL;
    const nickname = JSON.parse(localStorage.getItem("currentUser"))
      .displayName;

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={navbarMod}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              navbarMod ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
            <div className="header_profile">
              <span>
                <Text strong>
                  <Text type="secondary">Hi, </Text> {nickname}{" "}
                </Text>
              </span>
              <Avatar
                className="avatar"
                onClick={() => this.setState({ visible: true })}
                // shape="square"
                size="large"
                src={avatar}
              />
              <ProfileInfo
                state={this.state}
                handleSignOut={this.handleSignOut}
                handleCancel={this.handleCancel}
              />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Graphs />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    navbarMod: state.homeReducer.navbarMod
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(HomePage);
export default WrappedHomeComponent;
