import React, { useState } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Typography,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser,updateUser } from "../../store/actions/actions";
import { addressValidation, birthDateValidation, collegeValidation, genderValidation, hobbiesValidation, nameValidation } from "../../validation/validation";

const UserList = () => {
  const originData = useSelector((state) => state.listOfUsers);
  const dispatch = useDispatch();
  const listOfColleges = useSelector((state) => state.listOfColleges[0]);

  console.log("llll", originData);

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    let validationRules
    if (
      title === "Name" ||
      title === "Address" ||
      title === "Hobbies" ||
      title === "Birthdate"
    ) {
      inputNode = <Input />;
      if(title=== 'Name') {
          validationRules = nameValidation
      } else if (title === 'Address') {
          validationRules = addressValidation
      } else if (title ==='Hobbies') {
          validationRules = hobbiesValidation
      } else if (title === 'Birthdate') {
          validationRules = birthDateValidation
      }
    } else if (title === "Gender") {
      inputNode = (
        <Select>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>
      );
      validationRules = genderValidation
    } else if (title === "College") {
        inputNode = (
            <Select showSearch filterOption>
            {listOfColleges
              ? listOfColleges.map((details) => {
                  return (
                    <Select.Option value={details.name} key={details.name}>
                      {details.name}
                    </Select.Option>
                  );
                })
              : null}
          </Select>
        )
        validationRules = collegeValidation
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={validationRules}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState("");

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        name: "",
        age: "",
        address: "",
        ...record,
      });
      setEditingKey(record.key);
    };

    const cancel = () => {
      setEditingKey("");
    };

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          console.log("new",newData)
          dispatch(updateUser(index,newData[0]))
          setData(newData);
          setEditingKey("");
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey("");
        }
      } catch (errInfo) {
        console.log("Validate Failed:", errInfo);
      }
    };

    const handleDelete = (key) => {
      const dataSource = [...originData];
      dispatch(deleteUser(key));
      setData(dataSource.filter((item) => item.key !== key));
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "Name",
        width: "13%",
        editable: true,
      },
      {
        title: "Birthdate",
        dataIndex: "Birthdate",
        width: "9%",
        editable: true,
      },
      {
        title: "Address",
        dataIndex: "Address",
        width: "20%",
        editable: true,
      },
      {
        title: "Gender",
        dataIndex: "Gender",
        width: "10%",
        editable: true,
      },
      {
        title: "College",
        dataIndex: "College",
        width: "25%",
        editable: true,
      },
      {
        title: "Hobbies",
        dataIndex: "Hobbies",
        width: "20%",
        editable: true,
        render: (val) => <p>{val ? val.toString() : null}</p>,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <>
              <Typography.Link
                style={{ marginRight: "5px" }}
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
              |
              <Typography.Link
                type="danger"
                style={{ marginLeft: "5px" }}
                disabled={editingKey !== ""}
                onClick={() => handleDelete(record.key)}
              >
                Delete
              </Typography.Link>
            </>
          );
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    );
  };

  return <EditableTable />;
};

export default UserList;
