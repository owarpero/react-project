import React, { useRef, useEffect } from "react";

import { Chart } from "chart.js";
import { connect } from "react-redux";
import nanoid from "nanoid";
function SalesBarChart(props) {
  let labels = [];
  for (let index = 0; index < props.date / 2; index++) {
    labels.push(`Day${index}`);
    labels.push(`Day${index}`);
  }
  const ref = useRef();
  const data = {
    labels,
    datasets: [
      {
        // label: 'dataset 1',
        backgroundColor: "green",
        data: props.recordsData[0]
      },
      {
        // label: 'dataset 2',
        backgroundColor: "gray",
        data: props.recordsData[1]
      }
    ]
  };
  useEffect(() => {
    const chart = new Chart(ref.current, {
      data,
      type: "bar",
      options: {
        title: { display: false },
        tooltips: {
          intersect: false,
          mode: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        barRadius: 4,
        scales: {
          xAxes: [{ display: false, gridLines: false, stacked: true }],
          yAxes: [{ display: false, stacked: true, gridLines: false }]
        },
        layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } },
        datasetKeyProvider: nanoid
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);
  return <canvas ref={ref} />;
}
const mapStateToProps = state => {
  return {
    recordsData: state.statisticsReducer.recordData
  };
};
const WrappedComponent = connect(mapStateToProps)(SalesBarChart);
export default WrappedComponent;
