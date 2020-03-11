import React from "react";
import { Layout, Menu } from "antd";
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
import { changeNavbarMod } from "../../store/home/actions";

const { Header, Sider, Content } = Layout;
class HomePage extends React.Component {
  toggle = () => {
    const { navbarMod, dispatch } = this.props;
    dispatch(changeNavbarMod(!navbarMod));
  };
  render() {
    const { navbarMod } = this.props;
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
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            Content
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
