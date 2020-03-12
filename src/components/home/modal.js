import React from "react";
import "antd/dist/antd.css";
import "./home.css";
import { Modal, Button } from "antd";

export default class ProfileInfo extends React.Component {
  render() {
    const { visible, loading } = this.props.state;
    const handleSignOut = this.props.handleSignOut;
    const handleCancel = this.props.handleCancel;
    return (
      <div>
        <Modal
          onCancel={handleCancel}
          style={{ top: 70, left: "35%" }}
          mask={false}
          visible={visible}
          title="Title"
          onOk={handleSignOut}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
