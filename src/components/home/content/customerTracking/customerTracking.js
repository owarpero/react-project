import React from "react";

import "antd/dist/antd.css";
import "./tracking.css";
import { Table, Button, Popconfirm, message } from "antd";
import { EditableRow, EditableCell } from "./EditableRow";

import firebase from "firebase/app";
import "firebase/database";
import nanoid from "nanoid";
import { connect } from "react-redux";
import { currentTrackinghData } from "../../../../store/home/customTracking/action";

class CustomerTracking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        editable: true,
        select: false
      },

      {
        title: "Order type",
        dataIndex: "select",
        editable: false,
        select: true
      },

      {
        title: "price",
        dataIndex: "price",
        key: "price",
        editable: false,
        select: false
      },
      {
        title: "Barber",
        dataIndex: "Barber",
        key: "Barber",
        width: "30%",
        editable: false,
        select: false
      },

      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.props.trackingData.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button type="link">Delete</Button>
            </Popconfirm>
          ) : null
      }
    ];

    this.changeListen();
  }
  handleSelect = value => {
    firebase
      .database()
      .ref("/service")
      .once("value")
      .then(snapshot => {
        let snapshotValue = snapshot.val();
        for (const key in snapshotValue) {
          if (value.value === key) {
            console.log(snapshotValue[key]);
            console.log({ ...value, price: snapshotValue[key] });
            this.handleSave({ ...value, price: snapshotValue[key] });
          }
        }
      });
  };
  handleDelete = key => {
    const { date, trackingData } = this.props;
    const dataSource = [...trackingData];
    firebase
      .database()
      .ref(`tracking/${date.yearAndMonth}/${date.day}/${key}`)
      .remove()
      .then(() => {
        message.success("Remove succes");
      })
      .catch(error => {
        message.error("Remove failed: " + error.message);
      });

    currentTrackinghData(dataSource.filter(item => item.key !== key));
  };
  handleAdd = () => {
    const { date } = this.props;
    const avatar = JSON.parse(localStorage.getItem("currentUser")).photoURL;
    const nickname = JSON.parse(localStorage.getItem("currentUser"))
      .displayName;
    const id = nanoid();
    firebase
      .database()
      .ref(`tracking/${date.yearAndMonth}/${date.day}/${id}`)
      .set({
        key: id,
        name: `name`,
        avatar,
        nickname
      });
  };
  handleSave = row => {
    const { date, trackingData } = this.props;
    const newData = [...trackingData];

    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    item.price = `${row.price}`;
    item.value = row.value;

    newData.splice(index, 1, { ...item, ...row });

    let updates = {};

    updates[`tracking/${date.yearAndMonth}/${date.day}/${item.key}`] =
      newData[index];
    console.log(updates);
    firebase
      .database()
      .ref()
      .update(updates);
  };
  changeListen = () => {
    const { date, dispatch } = this.props;

    firebase
      .database()
      .ref(`tracking/${date.yearAndMonth}/${date.day}`)
      .on("value", snapshot => {
        this.setState({ loading: false });

        dispatch(
          currentTrackinghData(
            snapshot.val() === null ? [] : Object.values(snapshot.val())
          )
        );
      });
  };
  componentDidUpdate(props) {
    if (this.props.date.fullDate !== props.date.fullDate) {
      this.changeListen();
    }
  }
  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable && !col.select && col.title !== "Barber") {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          select: col.select,
          handleSelect: this.handleSelect,
          optionsSelect: this.props.optionsSelect
        })
      };
    });

    return (
      <div>
        <Table
          pagination={{ pageSize: 3 }}
          className="table"
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={this.props.trackingData}
          columns={columns}
          loading={this.state.loading}
        />
        <Button onClick={this.handleAdd} type="primary">
          Add a row
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trackingData: state.trackingReducer.trackingData,
    date: state.homeReducer.trackingDate,
    optionsSelect: state.trackingReducer.optionsSelect
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(CustomerTracking);
export default WrappedHomeComponent;
