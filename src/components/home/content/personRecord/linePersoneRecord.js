import React from "react";
import { Line } from "react-chartjs-2";
import firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshot: {},
      date: []
    };
    this.changeListen();
  }
  changeListen = () => {
    const { date } = this.props;

    firebase
      .database()
      .ref(`records/${date.yearAndMonth}`)
      .on("value", snapshot => {
        let daysInMonth;
        if (date.month === "2") {
          daysInMonth = 29;
          console.log("feb");
        } else if (parseInt(date.month) % 2 === 0 && date.month !== 2) {
          daysInMonth = 30;
        } else {
          daysInMonth = 31;
        }

        if (snapshot.val() !== null) {
          const arrOfkeys = Object.values(Object.keys(snapshot.val()));
          const date = [];
          for (let index = 0; index <= daysInMonth; index++) {
            const el = arrOfkeys.find(element => element === index.toString());
            if (el !== undefined) {
              date.push(Object.keys(snapshot.val()[el]).length);
            } else {
              date.push(0);
            }
          }
          this.setState({ date });
        } else {
          this.setState({ date: [] });
        }
      });
  };
  componentDidUpdate(props) {
    if (this.props.date.fullDate !== props.date.fullDate) {
      this.changeListen();
    }
  }
  render() {
    const { date } = this.props;
    let daysInMonth;
    if (date.month === "2") {
      daysInMonth = 29;
    } else if (parseInt(date.month) % 2 === 0 && date.month !== 2) {
      daysInMonth = 30;
    } else {
      daysInMonth = 31;
    }

    const labels = [];
    for (let index = 0; index <= daysInMonth; index++) {
      labels.push(index);
    }
    return (
      <div>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                data: this.state.date,
                label: "People records for a month",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                lineTension: 0
              }
            ]
          }}
          width={500}
          height={500}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    monthData: state.personeReducer.monthData,
    date: state.homeReducer.date
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(LineGraph);
export default WrappedHomeComponent;
