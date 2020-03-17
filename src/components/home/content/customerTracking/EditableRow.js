import React, { useRef, useState, useContext, useEffect } from "react";

import "antd/dist/antd.css";

import { Form, Input, Select, message, Avatar } from "antd";

import nanoid from "nanoid";
import { Typography } from "antd";
const EditableContext = React.createContext();

const { Text } = Typography;
const { Option } = Select;
export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
export const EditableCell = ({
  record,
  title,
  editable,
  children,
  dataIndex,
  handleSave,
  select,
  handleSelect,
  optionsSelect,
  ...restProps
}) => {
  const [editing, setEditint] = useState(false);

  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) inputRef.current.focus();
  }, [editing]);

  const toggleEdit = () => {
    setEditint(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };
  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  const saveSelect = async value => {
    try {
      const values = await form.validateFields();

      handleSelect({ ...record, ...values, value });
    } catch (errInfo) {
      message.error(errInfo);
    }
  };
  let childNode = children;

  if (title === "Barber") {
    childNode = (
      <div>
        <Avatar src={record.avatar} /> <Text>{record.nickname}</Text>
      </div>
    );
  } else if (title === "price") {
    childNode = <Text name={dataIndex}>{title}</Text>;
  } else if (editable) {
    childNode = editing ? (
      <div>
        <Form.Item
          style={{
            margin: 0
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      </div>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  } else if (select && optionsSelect) {
    childNode = (
      <div>
        <Form.Item
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`
            }
          ]}
        >
          <Select
            showSearch
            defaultValue={record[dataIndex]}
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={saveSelect}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {optionsSelect.map(el => (
              <Option value={el} key={nanoid()}>
                {el}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
