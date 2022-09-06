import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, DatePicker, InputNumber } from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { custs } from "../../tables/Customers";
import { useHistory } from "react-router-dom";
const { TextArea } = Input;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
export default function UpdateCustomer(props) {
  const history = useHistory();
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [since, setSince] = useState(0);
  const [custom, setCustom] = useState({});
  console.log("First Line of update custom: ", custom);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Project Name"),
    email: Yup.string().required().email().label("Email"),
    since: Yup.number().label("Years Since Working"),
    address: Yup.string().required().label("Address"),
    description: Yup.string().required().label("Description"),
  });

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const filterCustomer = () => {
    let dummy = custs.filter(
      (item) => item.Email === props.location.state.email
    );
    setCustom(dummy[0]);
  };

  useEffect(() => {
    filterCustomer();
    console.log("Single Customer in Update Form: ", custom);
  }, [custom]);

  const updateCustomer = async (formData, selectedDate, since) => {
    console.log("Added Customer: ", formData);

    const day = new Date(selectedDate).getDate();
    const month = new Date(selectedDate).getMonth() + 1;
    const year = new Date(selectedDate).getFullYear();
    const date = day + "-" + month + "-" + year;
    console.log("Added Customer Date: ", date);

    try {
      await axios
        .post(`${baseUrl}/update-customer`, {
          Name: formData.name,
          Email: formData.email,
          Year_Since_Working: since,
          Address: formData.address,
          description: formData.description,
        })
        .then((response) => {
          console.log("Response: ", response.data);
          if (response.data.error) {
            message.error(response.data.error);
          } else if (response.data.message) {
            message.success(response.data.message);
            history.push("/customers");
          }
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Button
        style={{
          position: "relative",
          left: "20%",

          margin: 10,
          width: 450,
          height: 50,
        }}
      >
        <h1 style={{ fontSize: 30, color: "skyblue" }}>
          Zippy Link Add New Customer
        </h1>
      </Button>

      <Formik
        style={{}}
        enableReinitialize
        initialValues={{
          name: custom.Name,
          email: custom.Email,
          since: custom.Year_Since_Working,
          address: custom.Address,
          description: custom.description,
        }}
        onSubmit={(formData) => {
          updateCustomer(formData, selectedDate, since);
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
            <Form.Item label="Project Code">
              <Input
                placeholder="Full Name"
                value={values.name}
                onChange={handleChange("name")}
              />
              {touched.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder="Email"
                type="email"
                onChange={handleChange("email")}
                value={values.email}
              />
              {touched.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </Form.Item>

            <Form.Item label="Address">
              <Input
                placeholder="Address"
                type="text"
                onChange={handleChange("address")}
                value={values.address}
              />
              {touched.address && (
                <p style={{ color: "red" }}>{errors.address}</p>
              )}
            </Form.Item>
            <Form.Item label="Joining Date">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
              />
              {touched.startDate && (
                <p style={{ color: "red" }}>{errors.startDate}</p>
              )}
            </Form.Item>

            <Form.Item label="Years Since Working">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <InputNumber
                  defaultValue={100}
                  value={since}
                  onChange={(e) => setSince(e)}
                />
                <h3 style={{ marginLeft: 10 }}> Current: {values.since}</h3>
              </div>
            </Form.Item>

            <Form.Item label="Description">
              <TextArea
                rows={4}
                onChange={handleChange("description")}
                value={values.description}
              />
              {touched.description && (
                <p style={{ color: "red" }}>{errors.description}</p>
              )}
            </Form.Item>

            <Form.Item label="                       ">
              <Button onClick={handleSubmit}>Submit</Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </>
  );
}
