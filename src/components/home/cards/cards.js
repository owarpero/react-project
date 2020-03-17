import React from "react";
import { Card } from "antd";
import Bar from "../content/gtaphs/bar";
import "./card.css";

export default function Cards() {
  return (
    <div>
      <Card className="shadow">
        <Bar />
      </Card>
    </div>
  );
}
