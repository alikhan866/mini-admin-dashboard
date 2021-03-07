import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox } from "antd";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { listOfUsers, listsOfColleges } from "../../store/actions/actions";
import CustomToast from "../CustomToast/CustomToast";
import { nameValidation,birthDateValidation, addressValidation, genderValidation, collegeValidation, hobbiesValidation} from "../../validation/validation";

const User = () => {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastDetails, setToastDetails] = useState();

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const listOfColleges = useSelector((state) => state.listOfColleges[0]);

  const onSubmit = (data) => {
    data.Birthdate = moment().format("DD-MM-YYYY");
    data.key = data.Name + data.Address + data.Gender + Math.random();
    console.log(data);
    if(data.Hobbies[data.Hobbies.length - 1 ] === 'Other') {
      data.Hobbies.pop()
      data.Hobbies.push(data.OtherHobbies)
    }
    dispatch(listOfUsers(data));
    setShowToast(true);
    setToastDetails({
      toastBody: `Successfully added ${data.Name} to the user list`,
      toastColor: "green",
    });
    form.resetFields();
    setIsOtherSelected(false)
  };

  const getColleges = async () => {
    try {
      const payload = await axios.get(
        "http://universities.hipolabs.com/search?name="
      );
      console.log(payload.data);
      dispatch(listsOfColleges(payload.data));
    } catch (e) {
      setShowToast(true);
      setToastDetails({
        toastBody:
          "Could not get list of colleges.. Network Error please reload the page",
        toastColor: "red",
      });
    }
  };

  useEffect(() => {
    if (!listOfColleges || listOfColleges?.length <= 0) {
      getColleges();
    }
  }, []);

  return (
    <>
      <CustomToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastDetails={toastDetails}
      />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size={"default"}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item label="Name" name="Name" rules={nameValidation}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Birthdate"
          name="Birthdate"
          rules={birthDateValidation}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Address"
          name="Address"
          rules={addressValidation}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="Gender"
          rules={genderValidation}
        >
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="College"
          name="College"
          rules={collegeValidation}
        >
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
        </Form.Item>

        <Form.Item
          label="Hobbies"
          name="Hobbies"
          valuePropName="checked"
          rules={hobbiesValidation}
        >
          <Checkbox.Group>
            <Checkbox value="Reading" disabled={isOtherSelected}>
              Reading
            </Checkbox>
            <Checkbox value="Gaming" disabled={isOtherSelected}>
              Gaming
            </Checkbox>
            <Checkbox value="Travelling" disabled={isOtherSelected}>
              Travelling
            </Checkbox>
            <Checkbox value="Drawing" disabled={isOtherSelected}>
              Drawing
            </Checkbox>
            <Checkbox
              value="Other"
              onChange={(e) => setIsOtherSelected(e.target.checked)}
            >
              Other
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>

        {isOtherSelected ? (
          <Form.Item
            label="OtherHobbies"
            name="OtherHobbies"
            rules={hobbiesValidation}
          >
            <Input />
          </Form.Item>
        ) : null}
        <div className="Button-css">
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default User;
