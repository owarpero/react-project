import React from "react";

import { Bar } from "react-chartjs-2";
export default function SalesBarChart() {
  const data = {
    labels: [
      "Label 1",
      "Label 2",
      "Label 3",
      "Label 4",
      "Label 5",
      "Label 6",
      "Label 7",
      "Label 8",
      "Label 9",
      "Label 10",
      "Label 11",
      "Label 12",
      "Label 13",
      "Label 14",
      "Label 15",
      "Label 16"
    ],
    datasets: [
      {
        // label: 'dataset 1',
        backgroundColor: "green",
        data: [15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20]
      },
      {
        // label: 'dataset 2',
        backgroundColor: "#f3f3fb",
        data: [15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20]
      }
    ]
  };

  return (
    <div>
      <Bar
        data={data}
        options={{
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
          maintainAspectRatio: true,
          barRadius: 3,
          scales: {
            xAxes: [{ display: false, gridLines: false, stacked: true }],
            yAxes: [{ display: false, stacked: true, gridLines: false }]
          },
          layout: { padding: { left: 0, right: 0, top: 0, bottom: 0 } }
        }}
      />
    </div>
  );
}
