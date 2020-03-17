import React from "react";
import { Row, Col, Card } from "antd";
import SalesBarChart from "./salesBar";
import "antd/dist/antd.css";
import "./statistics.css";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";

class StatisticsCompared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earningsData: [],
      recordsData: []
    };
  }
  changeListenEarnings = () => {
    const { trackingDate } = this.props;

    firebase
      .database()
      .ref(`tracking/${trackingDate.yearAndMonth}`)
      .on("value", snapshot => {
        this.setState({ loading: false });
      });
  };
  async getPrevMonth(target, prevMonth) {
    const snapshot = await firebase
      .database()
      .ref(`/${target}/${prevMonth}`)
      .once("value");
    return snapshot.val();
  }
  changeListenRecords = () => {
    const { date } = this.props;

    firebase
      .database()
      .ref(`tracking/${date.yearAndMonth}`)
      .on("value", snapshot => {
        this.setState({ loading: false });
      });
  };
  componentDidUpdate = props => {
    if (this.props.trackingDate.fullDate !== props.trackingDate.fullDate) {
      this.changeListenEarnings();
    }
  };
  render() {
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={true}></Card>
          </Col>
          <Col span={8}>
            <Card
              //loading={true}
              title="Last month earnings goal"
              extra="Check out each column for more details"
              bordered={false}
            >
              <SalesBarChart />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Purpose of people records for a month "
              bordered={false}
            >
              <SalesBarChart />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    date: state.homeReducer.date,
    trackingDate: state.homeReducer.trackingDate
  };
};
const WrappedComponent = connect(mapStateToProps)(StatisticsCompared);
export default WrappedComponent;
