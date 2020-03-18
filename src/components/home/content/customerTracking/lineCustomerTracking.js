import React from "react";
import { Line } from "react-chartjs-2";
import firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";

class LineGraphTracking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshot: {},
      date: []
    };
    this.changeListen();
  }
  changeListen = () => {
    const { trackingDate } = this.props;

    firebase
      .database()
      .ref(`tracking/${trackingDate.yearAndMonth}`)
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          const arrOfkeys = Object.values(Object.keys(snapshot.val()));
          const date = [];
          for (let index = 0; index <= trackingDate.daysInMonth; index++) {
            const el = arrOfkeys.find(element => element === index.toString());
            if (el !== undefined) {
              const sumOfPricesPerDay = () => {
                let price = 0;
                for (const key in Object.values(snapshot.val()[el])) {
                  const element = Object.values(snapshot.val()[el])[key].price;

                  element !== undefined ? (price += element) : (price += 0);
                }
                return price;
              };
              date.push(sumOfPricesPerDay());
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
    if (this.props.trackingDate.fullDate !== props.trackingDate.fullDate) {
      this.changeListen();
    }
  }
  render() {
    const { trackingDate } = this.props;

    const labels = [];
    for (let index = 0; index <= trackingDate.daysInMonth; index++) {
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
                label: "Monthly earnings",
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
    trackingDate: state.homeReducer.trackingDate
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(LineGraphTracking);
export default WrappedHomeComponent;
