import React from "react";
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Button,
  Card,
  DatePicker,
  Drawer
} from "antd";
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

import {
  currentUserSignOut,
  dataTrackingChanged
} from "../../store/home/actions";
import { dataChanged } from "../../store/home/actions";

import EditableTable from "./content/personRecord/personRecord";
import locale from "antd/lib/date-picker/locale/en_US";
import moment from "moment";
import LineGraphTrackin from "./content/customerTracking/lineCustomerTracking";
import LineGraph from "./content/personRecord/linePersoneRecord";
import CustomerTracking from "./content/customerTracking/customerTracking";
import DrawerContent from "./content/drawer/drawerContent";
import StatisticsCompared from "./content/statisticsСompared/statisticsСompared";

const { Text } = Typography;
const { Header, Sider, Content } = Layout;
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarMod: false
    };
    this.handleDate();
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
  handleDate = date => {
    const { dispatch } = this.props;

    dispatch(dataChanged(date));
  };
  handleTrackingDate = date => {
    const { dispatch } = this.props;
    dispatch(dataTrackingChanged(date));
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  render() {
    const { navbarMod } = this.state;
    const { date, trackingDate } = this.props;

    const avatar = JSON.parse(localStorage.getItem("currentUser")).photoURL;
    const nickname = JSON.parse(localStorage.getItem("currentUser"))
      .displayName;

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={navbarMod}>
          <div className={this.state.navbarMod ? "logo2" : "logo"}></div>
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
          <Header
            className="site-layout-background"
            style={{ padding: 0, lineHeight: 1 }}
          >
            {React.createElement(
              navbarMod ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle
              }
            )}
            <div className="header_profile">
              <span className="text">
                <span align="center">
                  <Text strong>
                    <Text type="secondary">Hi, </Text> {nickname}{" "}
                  </Text>
                </span>

                <span className="button">
                  <Button type="link" size="small" onClick={this.handleSignOut}>
                    Sign out
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Profile
                  </Button>
                </span>
              </span>
              <Avatar className="avatar" size={50} src={avatar} />
            </div>
            <Drawer
              width={640}
              placement="right"
              closable={true}
              destroyOnClose={true}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <DrawerContent />
            </Drawer>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            <Card
              className="record_person_card "
              title={`Total monthly earnings: `}
              extra={
                <DatePicker
                  locale={locale}
                  onChange={this.handleTrackingDate}
                  defaultValue={moment(trackingDate.fullDate, "YYYY-MM-DD")}
                />
              }
            >
              <LineGraphTrackin />
              <CustomerTracking />
            </Card>
            <Card
              className="record_person_card "
              title={`Number of records per month: `}
              extra={
                <DatePicker
                  locale={locale}
                  onChange={this.handleDate}
                  defaultValue={moment(date.fullDate, "YYYY-MM-DD")}
                />
              }
            >
              <LineGraph />
              <EditableTable />
            </Card>
            <StatisticsCompared />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    date: state.homeReducer.date,
    trackingDate: state.homeReducer.trackingDate
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(HomePage);
export default WrappedHomeComponent;
