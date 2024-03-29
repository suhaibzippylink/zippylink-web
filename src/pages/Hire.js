import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Upload,
  message,
} from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { style } from "../Config/Design";
const { TextArea } = Input;
const { Option } = Select;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
export default function Hire() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [salary, setSalary] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    address: Yup.string().required().label("Address"),
    phone: Yup.string().required().label("Phone"),
    gender: Yup.string().required().label("Phone"),
    designation: Yup.string().required().label("Designation"),
    startDate: Yup.string().label("Start Date"),
    basicSalary: Yup.number().label("Basic Salary"),
    description: Yup.string().required().label("Description"),
  });
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }
  const addCostomer = async (formData, selectedDate, salary) => {
    console.log("Added Customer: ", formData);

    const day = new Date(selectedDate).getDate();
    const month = new Date(selectedDate).getMonth() + 1;
    const year = new Date(selectedDate).getFullYear();
    const date = day + "-" + month + "-" + year;
    const m = `${toMonthName(month)}-${year}`;
    console.log("Added Customer: ", date);
    try {
      await axios
        .post(`/add-employer`, {
          month: m,
          Name: formData.name,
          Email: formData.email,
          Address: formData.address,
          Phone: formData.phone,
          Gender: formData.gender,
          Designation: formData.designation,
          StartDate: date,
          BasicSalary: salary ? salary : 100,
          description: formData.description,
          currency: formData.currency ? formData.currency : "AFN",
        })
        .then((response) => {
          console.log("Response: ", response.data);
          if (response.data.message) message.success(response.data.message);
          else if (response.data.error) message.error(response.data.error);
        });
    } catch (error) {
      console.log("Error: ", error);
      message.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: style.labelColor,
          margin: 10,
          width: "100%",
          height: 55,
        }}
      >
        <img src="./zippyLogo.png" alt="logo" width={140} height={60} />
        <h1
          style={{
            fontSize: 30,
            color: style.btnTextColor,
          }}
        >
          Zippy Link Hiring
        </h1>
      </div>

      <Formik
        style={{}}
        initialValues={{
          name: "",
          email: "",
          address: "",
          phone: "",
          designation: "",
          startDate: "",
          basicSalary: 0,
          description: "",
          currency: "",
        }}
        onSubmit={(formData) => {
          addCostomer(formData, selectedDate, salary);
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            disabled={componentDisabled}
          >
            <Form.Item label="Name">
              <Input placeholder="Full Name" onChange={handleChange("name")} />
              {touched.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder="Email"
                type="email"
                onChange={handleChange("email")}
              />
              {touched.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </Form.Item>
            <Form.Item label="Address">
              <Input placeholder="Address" onChange={handleChange("address")} />
              {touched.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                placeholder="+93781234567"
                type="number"
                onChange={handleChange("phone")}
              />
              {touched.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </Form.Item>
            <Form.Item label="Gender">
              <Radio.Group onChange={handleChange("gender")}>
                <Radio value="male"> Male </Radio>
                <Radio value="female"> Female </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Designation">
              <Select onChange={handleChange("designation")}>
                <Select.Option value="null">Select</Select.Option>
                <Select.Option value="ceo">
                  Chief Executive Officer (CEO)
                </Select.Option>
                <Select.Option value="hr">Human Resource (HR)</Select.Option>
                <Select.Option value="manager">Project Manager</Select.Option>
                <Select.Option value="software_engineer">
                  Software Engineer
                </Select.Option>
                <Select.Option value="technical_engineer">
                  Technical Engineer
                </Select.Option>
                <Select.Option value="gaurd">Gaurd</Select.Option>
                <Select.Option value="cook">Cook</Select.Option>
                <Select.Option value="cleaner">Cleaner</Select.Option>
              </Select>
              {touched.description && (
                <p style={{ color: "red" }}>{errors.designation}</p>
              )}
            </Form.Item>

            <Form.Item label="Joining Date">
              <DatePicker
                // onChange={handleChange("startDate")}
                // onDateChange={() => handleChange("startDate")}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
              />
              {touched.startDate && (
                <p style={{ color: "red" }}>{errors.startDate}</p>
              )}
            </Form.Item>

            <Form.Item label="Basic Salary">
              {/* <InputNumber
                step={100}
                min={0}
                type="number"
                value={values}
                onChange={handleChange("basicSalary")}
              />
              {touched.basicSalary && (
                <p style={{ color: "red" }}>{errors.basicSalary}</p>
              )} */}
              <InputNumber
                addonAfter={
                  <Select
                    defaultValue="AFN"
                    style={{ width: 60 }}
                    onChange={handleChange("currency")}
                  >
                    <Option value="AFN">AFN</Option>
                    <Option value="USD">$</Option>
                    <Option value="EUR">€</Option>
                    <Option value="GBP">£</Option>
                    <Option value="CNY">¥</Option>
                  </Select>
                }
                defaultValue={100}
                onChange={(e) => setSalary(e)}
              />
            </Form.Item>
            <Form.Item label="Description">
              <TextArea rows={4} onChange={handleChange("description")} />
              {touched.description && (
                <p style={{ color: "red" }}>{errors.description}</p>
              )}
            </Form.Item>

            <Form.Item label="Profile Picture" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
              <Button
                onClick={handleSubmit}
                style={{
                  backgroundColor: style.btnColor,
                  color: style.btnTextColor,
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </>
  );
}
