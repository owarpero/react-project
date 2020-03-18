import React from "react";
import { Row, Col, Card } from "antd";
import SalesBarChart from "./salesBar";
import "antd/dist/antd.css";
import "./statistics.css";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/database";
import { statisticsRecordChanged } from "../../../../store/home/statisticsCompared/actions";

class StatisticsCompared extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      earningsData: [],
      recordsData: []
    };
    this.changeListenRecords();
  }
  changeListenEarnings = () => {
    const { trackingDate } = this.props;

    firebase
      .database()
      .ref(`tracking/${trackingDate.yearAndMonth}`)
      .on("value", snapshot => {
        //this.setState({ loading: false });
      });
  };
  async getPrevMonth(target, prevMonth) {
    console.log(prevMonth);
    const snapshot = await firebase
      .database()
      .ref(`/${target}/${prevMonth}`)
      .once("value", snapshot => {
        return snapshot.val();
      });

    return snapshot;
  }
  changeListenRecords = () => {
    const { date } = this.props;
    const { dispatch } = this.props;
    firebase
      .database()
      .ref(`records/${date.yearAndMonth}`)
      .on("value", currentSnapshot => {
        this.getPrevMonth("records", `${date.year}-${date.month - 1}`).then(
          snapshot => {
            const arrOfkeys = Object.values(Object.keys(currentSnapshot.val()));
            let currentData = [];
            console.log(date.daysInMonth);
            for (let index = 0; index <= date.daysInMonth; index++) {
              const el = arrOfkeys.find(
                element => element === index.toString()
              );

              if (el !== undefined) {
                currentData.push(Object.keys(currentSnapshot.val()[el]).length);
              } else {
                currentData.push(0);
              }
            }
            const arrOfkeysSnapshot = Object.values(
              Object.keys(snapshot.val())
            );
            let prevData = [];

            for (let index = 0; index <= date.daysInMonth; index++) {
              const el = arrOfkeysSnapshot.find(
                element => element === index.toString()
              );

              if (el !== undefined) {
                prevData.push(Object.keys(snapshot.val()[el]).length);
              } else {
                prevData.push(0);
              }
            }

            dispatch(statisticsRecordChanged([currentData, prevData]));
          }
        );

        this.setState({ loading: false });
        this.forceUpdate();
      });
  };
  componentDidUpdate = props => {
    if (this.props.trackingDate.fullDate !== props.trackingDate.fullDate) {
      this.changeListenEarnings();
    }
  };
  render() {
    console.log(this.state.recordsData);
    return (
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Card title"
              bordered={true}
              loading={this.state.loading}
            ></Card>
          </Col>
          <Col span={8}>
            <Card
              loading={this.state.loading}
              //loading={true}
              title="Last month earnings goal"
              extra="Check out each column for more details"
              bordered={false}
            >
              <SalesBarChart
                data={this.state.recordsData}
                date={this.props.date.daysInMonth}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              loading={this.state.loading}
              title="Purpose of people records for a month "
              bordered={false}
            >
              <SalesBarChart
                data={this.state.recordsData}
                date={this.props.date.daysInMonth}
              />
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
