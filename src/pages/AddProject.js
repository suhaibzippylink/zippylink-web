import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  DatePicker,
  Upload,
  InputNumber,
  Spin,
} from "antd";
import { ToTopOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../auth/Context";
const { TextArea } = Input;
const { Option } = Select;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
let singleProject = {};
let route = "";
let custs = [];
export default function AddProject(props) {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [customers, setCustomers] = useState();
  const [budget, setBudget] = useState(0);
  const [cost, setCost] = useState(0);
  const [single, setSingle] = useState();
  const [file, setFile] = useState();
  const [filePath, setFilePath] = useState("");
  const [controlUploadSpin, setControlUploadSpin] = useState(false);
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
      .get(`${baseUrl}/all-cutomers`)
      .then((response) => {
        setCustomers(response.data.allCustomers);
        custs = response.data.allCustomers;
      })
      .then((res) => {});
  };

  const fetchProject = async () => {
    console.log("Code to Filter: ", props.location.state.code);
    await axios
      .post(`${baseUrl}/single-Project`, {
        Project_Code: props.location.state.code,
      })
      .then((response) => {
        console.log("Project: ", response.data);
        singleProject = response.data.project;
        setSingle(response.data.project);
      });
  };

  const handleUploadAnt = (e) => {
    //Change
    setControlUploadSpin(true);
    console.log("e in ANtd: ", e);
    if (e.file.status !== "uploading") {
      setControlUploadSpin(false);
    }
    if (e.file.status === "done") {
      message.success(`${e.file.name} file uploaded successfully`);
      setControlUploadSpin(false);
      setFile(e);
    } else if (e.file.status === "error") {
      // message.error(`${e.file.name} file upload failed.`);
      setControlUploadSpin(false);
    }
    console.log("File Antd: ", e.file);
    setFile(e.file.originFileObj);
  };

  useEffect(() => {
    getData();
    console.log("Customers in Add Project: ", custs);
    if (props.location.state.code) {
      fetchProject();
      route = `${baseUrl}/update-project`;
    } else route = `${baseUrl}/add-project`;
  }, [single, file]);

  const addProject = async (formData, selectedDate, budget, cost) => {
    console.log("Added Customer: ", formData);

    const day = new Date(selectedDate).getDate();
    const month = new Date(selectedDate).getMonth() + 1;
    const year = new Date(selectedDate).getFullYear();
    const date = day + "-" + month + "-" + year;
    console.log("Added Customer Date: ", date);

    //upload File Start
    console.log("File in Upload: ", file);
    const fileFormData = new FormData();
    fileFormData.append(`file`, file);
    console.log("Form Data: ", fileFormData.get("file"));
    let path = "";
    await axios
      .post(`${baseUrl}/file-upload/${formData.code}`, fileFormData)
      .then((response) => {
        console.log("Response file upload: ", response.data);
        setFilePath(response.data.file_url);
        console.log("NEW URL: ", response.data.file_url);
        path = response.data.file_url;
        if (response.data.message) message.success(response.data.message);
        else if (response.data.error) message.error(response.data.error);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    //upload File End

    try {
      await axios
        .post(route, {
          File: path, //Change
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
          Account_Email: "zippylink@zippylink.net",
          Name: authContext.user.Name,
          Email: authContext.user.Email,
        })
        .then((response) => {
          console.log("Response: ", response.data);
          if (response.data.error) {
            message.error(response.data.error);
          } else if (response.data.message) {
            message.success(response.data.message);
            history.push("/projects");
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
        enableReinitialize
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
                {custs.map((item) => {
                  return (
                    <Select.Option value={item.Name}>{item.Name}</Select.Option>
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
                <Select.Option value="Renewal">Renewal</Select.Option>
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
              {/* <Select
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
              </Select> */}
              <Input
                placeholder="Product Name"
                type="text"
                onChange={handleChange("product")}
                value={values.product}
              />
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
                      <Option value="AFN">AFN </Option>
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
            <Upload.Dragger
              progress={{
                strokeWidth: 3,
                format: (percent) =>
                  percent && `${parseFloat(percent.toFixed(2))}%`,

                strokeColor: { "0%": "#108ee9", "100%": "#87d068" },
              }}
              accept=".docx, .xlsx, .PNG, .jpeg, .jpg"
              iconRender={() => {
                return <Spin spinning={controlUploadSpin}></Spin>;
              }}
              listType="picture"
              onChange={(e) => handleUploadAnt(e)}
            >
              <Button
                type="dashed"
                className="ant-full-box"
                icon={<ToTopOutlined />}
              >
                <span className="click">Upload File</span>
              </Button>
            </Upload.Dragger>

            <Form.Item label="                       ">
              <Button onClick={handleSubmit}>Submit</Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </>
  );
}
