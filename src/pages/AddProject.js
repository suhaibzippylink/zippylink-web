import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  DatePicker,
  InputNumber,
} from "antd";

import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { custs } from "../tables/Customers";
const { TextArea } = Input;
const { Option } = Select;

let singleProject = {};
let route = "";
let custs = [];
export default function AddProject(props) {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [customers, setCustomers] = useState();
  const [budget, setBudget] = useState(0);
  const [cost, setCost] = useState(0);
  const [single, setSingle] = useState();

  const validationSchema = Yup.object().shape({
    code: Yup.string().required().label("Project Code"),
    title: Yup.string().required().label("Project Title"),
    customer: Yup.string().required().label("Customer Name"),
    nature: Yup.string().required().label("Project Nature"),
    product: Yup.string().required().label("Product Name"),
    supplier: Yup.string().required().label("Supplier Name"),
    startDate: Yup.string().label("Start Date"),
    status: Yup.string().label("Project Status"),
    budget: Yup.number().label("Project Budget"),
    cost: Yup.number().label("Project Cost"),
    description: Yup.string().required().label("Description"),
  });

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const getData = async () => {
    await axios
      .get("/all-cutomers")
      .then((response) => {
        setCustomers(response.data.allCustomers);
        custs = response.data.allCustomers;
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const fetchProject = async () => {
    console.log("Code to Filter: ", props.location.state.code);
    await axios
      .post("/single-Project", {
        Project_Code: props.location.state.code,
      })
      .then((response) => {
        console.log("Project: ", response.data);
        singleProject = response.data.project;
        setSingle(response.data.project);
      });
  };

  useEffect(() => {
    getData();
    console.log("Customers in Add Project: ", custs);
    if (props.location.state.code) {
      fetchProject();
      route = "/update-project";
    } else route = "/add-project";
  }, [single]);

  const addProject = async (formData, selectedDate, budget, cost) => {
    console.log("Added Customer: ", formData);

    const day = new Date(selectedDate).getDate();
    const month = new Date(selectedDate).getMonth() + 1;
    const year = new Date(selectedDate).getFullYear();
    const date = day + "-" + month + "-" + year;
    console.log("Added Customer Date: ", date);

    try {
      await axios
        .post(route, {
          Project_Code: formData.code,
          Date: selectedDate,
          Customer: formData.customer,
          Project_Title: formData.title,
          Project_Nature: formData.nature,
          Product: formData.product,
          Supplier: formData.supplier,
          Status: formData.status,
          Budget: budget,
          Cost: cost,
          Currency: formData.currency,
          Description: formData.description,
        })
        .then((response) => {
          console.log("Response: ", response.data);
          if (response.data.error) {
            message.error(response.data.error);
          } else if (response.data.message) {
            message.success(response.data.message);
          }
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const initValue = {
    code: "",
    title: "",
    customer: "",
    nature: "",
    product: "",
    supplier: "",
    startDate: "",
    status: "",
    budget: 0,
    cost: 0,
    currency: "",
    description: "",
  };

  const updatingValue = {
    code: singleProject.Project_Code,
    title: singleProject.Project_Title,
    customer: singleProject.Customer,
    nature: singleProject.Project_Nature,
    product: singleProject.Product,
    supplier: singleProject.Supplier,
    startDate: singleProject.StartDate,
    status: singleProject.Status,
    budget: singleProject.Budget,
    cost: singleProject.Cost,
    currency: singleProject.Currency,
    description: singleProject.Description,
  };

  return (
    <>
      <Button
        style={{
          position: "relative",
          left: "20%",

          margin: 10,
          width: 400,
          height: 50,
        }}
      >
        <h1 style={{ fontSize: 30, color: "skyblue" }}>
          Zippy Link Add Project
        </h1>
      </Button>

      <Formik
        style={{}}
        initialValues={props.location.state.code ? updatingValue : initValue}
        onSubmit={(formData) => {
          addProject(formData, selectedDate, budget, cost);
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
                placeholder="Project_Code  e.g PR_000"
                onChange={handleChange("code")}
                value={values.code}
              />
              {touched.code && <p style={{ color: "red" }}>{errors.code}</p>}
            </Form.Item>
            <Form.Item label="Project Title">
              <Input
                placeholder="Project_Title"
                type="text"
                onChange={handleChange("title")}
                value={values.title}
              />
              {touched.title && <p style={{ color: "red" }}>{errors.title}</p>}
            </Form.Item>
            <Form.Item label="Customer Name">
              <Select
                onChange={handleChange("customer")}
                defaultValue={
                  props.location.state.code ? values.customer : "null"
                }
              >
                <Select.Option value="null">Select</Select.Option>
                {custs
                  ? custs.map((item) => {
                      return (
                        <Select.Option value={item.Name}>
                          {item.Name}
                        </Select.Option>
                      );
                    })
                  : customers
                  ? customers.map((item) => {
                      return (
                        <Select.Option value={item.Name}>
                          {item.Name}
                        </Select.Option>
                      );
                    })
                  : custs.map((item) => {
                      return (
                        <Select.Option value={item.Name}>
                          {item.Name}
                        </Select.Option>
                      );
                    })}
              </Select>
            </Form.Item>

            <Form.Item label="Project Nature">
              <Select
                onChange={handleChange("nature")}
                defaultValue={
                  props.location.state.code ? values.nature : "null"
                }
              >
                <Select.Option value="null">Select</Select.Option>
                <Select.Option value="Hardware">Hardware</Select.Option>
                <Select.Option value="Software">Software</Select.Option>
                <Select.Option value="Reneval">Reneval</Select.Option>
                <Select.Option value="Support">Support</Select.Option>
                <Select.Option value="SLA">SLA</Select.Option>
                <Select.Option value="Manage_Service">
                  Manage Service
                </Select.Option>
                <Select.Option value="AMC">AMC</Select.Option>
              </Select>
              {touched.nature && (
                <p style={{ color: "red" }}>{errors.nature}</p>
              )}
            </Form.Item>
            <Form.Item label="Product Name">
              <Select
                onChange={handleChange("product")}
                defaultValue={
                  props.location.state.code ? values.product : "null"
                }
              >
                <Select.Option value="null">Select</Select.Option>
                <Select.Option value="Dell">Dell</Select.Option>
                <Select.Option value="Oracle">Oracle</Select.Option>
                <Select.Option value="Frieght">Frieght</Select.Option>
                <Select.Option value="Customer_Charges">
                  Customer Charges
                </Select.Option>
                <Select.Option value="MDF">MDF</Select.Option>
              </Select>
              {touched.product && (
                <p style={{ color: "red" }}>{errors.product}</p>
              )}
            </Form.Item>
            <Form.Item label="Supplier Name">
              <Input
                placeholder="Supplier Name"
                type="text"
                onChange={handleChange("supplier")}
                value={values.supplier}
              />
              {touched.supplier && (
                <p style={{ color: "red" }}>{errors.supplier}</p>
              )}
            </Form.Item>
            <Form.Item label="Project Date">
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

            <Form.Item label="Project Status">
              <Select
                onChange={handleChange("status")}
                defaultValue={
                  props.location.state.code ? values.status : "null"
                }
              >
                <Select.Option value="null">Select</Select.Option>
                <Select.Option value="Complete">Complete</Select.Option>
                <Select.Option value="Progress">In Progress</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </Select>
              {touched.status && (
                <p style={{ color: "red" }}>{errors.status}</p>
              )}
            </Form.Item>

            <Form.Item label="Project Budget">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <InputNumber
                  addonAfter={
                    <Select
                      defaultValue={
                        props.location.state.code ? values.currency : "AFN"
                      }
                      style={{ width: 60 }}
                      onChange={handleChange("currency")}
                    >
                      <Option value="AFG">AFN </Option>
                      <Option value="USD">$</Option>
                      <Option value="EUR">€</Option>
                      <Option value="GBP">£</Option>
                      <Option value="CNY">¥</Option>
                    </Select>
                  }
                  defaultValue={100}
                  value={budget}
                  onChange={(e) => setBudget(e)}
                />
                <h3> Current: {values.budget}</h3>
              </div>
            </Form.Item>

            <Form.Item label="Project Cost">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <InputNumber
                  // addonAfter={selectAfter}
                  defaultValue={100}
                  value={cost}
                  onChange={(e) => setCost(e)}
                />
                <h3> Current: {values.cost}</h3>
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
