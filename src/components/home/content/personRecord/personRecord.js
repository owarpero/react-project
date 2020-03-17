import React from "react";

import "antd/dist/antd.css";
import "./personRecord.css";
import { Table, Button, Popconfirm, message } from "antd";
import { EditableRow, EditableCell } from "./EditableRow";

import firebase from "firebase/app";
import "firebase/database";
import nanoid from "nanoid";
import { connect } from "react-redux";
import { currentMonthData } from "../../../../store/home/personeRecord/action";
//import { currentMonthData } from "../../../../../store/home/personeRecord/action";

class EditableTable extends React.Component {
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
        title: "gender",
        dataIndex: "gender",
        editable: true,
        select: false
      },
      {
        title: "time",
        dataIndex: "time",
        editable: true,
        select: false
      },

      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.props.monthData.length >= 1 ? (
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

  handleAdd = () => {
    const { date } = this.props;
    const id = nanoid();
    firebase
      .database()
      .ref(`records/${date.yearAndMonth}/${date.day}/${id}`)
      .set({
        key: id,
        name: `name`,
        gender: "M",
        time: `time`
      });
  };
  changeListen() {
    const { date, dispatch } = this.props;

    firebase
      .database()
      .ref(`records/${date.yearAndMonth}/${date.day}`)
      .on("value", snapshot => {
        this.setState({ loading: false });

        dispatch(
          currentMonthData(
            snapshot.val() === null ? [] : Object.values(snapshot.val())
          )
        );
      });
  }
  handleSave = row => {
    const { date, monthData } = this.props;
    const newData = [...monthData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, { ...item, ...row });

    let updates = {};

    updates[`records/${date.yearAndMonth}/${date.day}/${item.key}`] =
      newData[index];

    firebase
      .database()
      .ref()
      .update(updates);
    currentMonthData(newData);
  };
  handleDelete = key => {
    const { date, monthData } = this.props;
    const dataSource = [...monthData];
    firebase
      .database()
      .ref(`records/${date.yearAndMonth}/${date.day}/${key}`)
      .remove()
      .then(() => {
        message.success("Remove succes");
      })
      .catch(error => {
        message.error("Remove failed: " + error.message);
      });

    currentMonthData(dataSource.filter(item => item.key !== key));
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
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
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
          dataSource={this.props.monthData}
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
    monthData: state.personeReducer.monthData,
    date: state.homeReducer.date
  };
};
const WrappedHomeComponent = connect(mapStateToProps)(EditableTable);
export default WrappedHomeComponent;
