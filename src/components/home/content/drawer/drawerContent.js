import React from "react";
import ProfileGraph from "./profileGraph";
import { Carousel } from "antd";
import "./drawer.css";

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div>
        <Carousel>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>asd</div>
        </Carousel>
        <ProfileGraph />
      </div>
    );
  }
}
