import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Table,
  Spin,
  Button,
  Avatar,
  Typography,
  Modal,
  message,
  Popconfirm,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Progress,
} from "antd";
import { projectCols } from "../Data";
import { ToTopOutlined } from "@ant-design/icons";
// Images
import ava1 from "../assets/images/logo-shopify.svg";
import pencil from "../assets/images/pencil.svg";
import delet from "../assets/images/delete.png";
import plus from "../assets/images/plus.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../auth/Context";
const { Title } = Typography;
const { TextArea } = Input;

let pros = [];
function Projects(props) {
  const authContext = useContext(AuthContext);
  const [projects, setProjects] = useState();
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ammount, setAmmount] = useState(0);
  const [projectCode, setProjectCode] = useState();
  const [currency, setCurrency] = useState();
  const [roleContent, setRoleContent] = useState(true);
  console.log("First Line in Projects Table: ", projects);

  const validationSchema = Yup.object().shape({
    Cost_Title: Yup.string().required().label("Cost_Title"),
    Cost_Type: Yup.string().required().label("Cost_Type"),
  });

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const getData = async () => {
    await axios
      .get("/all-projects")
      .then((response) => {
        setProjects(response.data.Projects);
        pros = response.data.Projects;
      })
      .then((res) => setLoader(false))
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const addProjectCost = (formData) => {
    axios
      .post("/add-project-cost", {
        projectCode,
        Cost_Title: formData.Cost_Title,
        Cost_Type: formData.Cost_Type,
        Ammount: ammount,
        CreatedAt: selectedDate,
      })
      .then((response) => {
        setVisible(false);

        if (response.data.message) message.success(response.data.message);
        else if (response.data.error) message.error(response.data.error);
      });
  };
  useEffect(() => {
    getData();
    if (authContext.user.Role === "Admin") setRoleContent(false);
    console.log("Projects in Project Table: ", projects);
    console.log("Pros: ", pros);
  }, [projects]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title="Projects Table"
    >
      <div className="table-responsive">
        <Spin
          tip="Loading..."
          spinning={loader}
          style={{ position: "relative", left: "50%", marginTop: 60 }}
        />
        <Table
          columns={projectCols}
          dataSource={pros.map((item) => ({
            key: "1",
            name: (
              <>
                <Avatar.Group>
                  <Avatar
                    className="shape-avatar"
                    src={ava1}
                    size={25}
                    alt=""
                  />
                  <div className="avatar-info">
                    <Title level={5}>{item.Customer}</Title>
                  </div>
                </Avatar.Group>
              </>
            ),
            code: <div className="semibold">{item.Project_Code}</div>,
            title: <div className="semibold">{item.Project_Title}</div>,
            start: (
              <div className="semibold">
                {new Date(item.Date).getDate()}-{" "}
                {new Date(item.Date).getMonth()}-{" "}
                {new Date(item.Date).getFullYear()}
              </div>
            ),
            age: (
              <>
                <div className="semibold">
                  {item.Budget}
                  {item.Currency === "AFN"
                    ? "AFN"
                    : item.Currency === "USD"
                    ? "$"
                    : item.Currency === "EUR"
                    ? "€"
                    : item.Currency === "GBP"
                    ? "£"
                    : item.Currency === "CNY"
                    ? "¥"
                    : ""}
                </div>
              </>
            ),

            cost: (
              <>
                <div className="text-sm">
                  {item.Cost}
                  {item.Currency === "AFN"
                    ? "AFN"
                    : item.Currency === "USD"
                    ? "$"
                    : item.Currency === "EUR"
                    ? "€"
                    : item.Currency === "GBP"
                    ? "£"
                    : item.Currency === "CNY"
                    ? "¥"
                    : ""}
                </div>
              </>
            ),
            revenue: (
              <>
                <div className="text-sm">
                  {item.Budget - item.Cost}
                  {item.Currency === "AFN"
                    ? "AFN"
                    : item.Currency === "USD"
                    ? "$"
                    : item.Currency === "EUR"
                    ? "€"
                    : item.Currency === "GBP"
                    ? "£"
                    : item.Currency === "CNY"
                    ? "¥"
                    : ""}
                </div>
              </>
            ),
            status: (
              <>
                <div className="text-sm">{item.Status}</div>
                {item.Status === "Completed" ? (
                  <Progress percent={100} size="small" />
                ) : item.Status === "In Progress" ? (
                  <Progress
                    percent={
                      65
                      // Math.floor(Math.random() * 100) + 40
                    }
                    size="small"
                    status="active"
                  />
                ) : item.Status === "Cancelled" ? (
                  <Progress percent={15} size="small" status="exception" />
                ) : null}
              </>
            ),
            action: (
              <div className="ant-progress-project">
                <abbr title="Add Project Cost">
                  <a
                    onClick={() => {
                      if (!roleContent) {
                        setVisible(true);
                        setProjectCode(item.Project_Code);
                        setCurrency(item.Currency);
                      }
                    }}
                  >
                    <img src={plus} alt="" style={{ width: 15, height: 15 }} />
                  </a>
                </abbr>
                <abbr title="Edit Project">
                  <span hidden={roleContent}>
                    <Link
                      disabled={roleContent}
                      to={{
                        pathname: "/add-project",
                        state: {
                          code: item.Project_Code,
                        },
                      }}
                    >
                      <img src={pencil} alt="" />
                    </Link>
                  </span>
                </abbr>
                <abbr title="Delete Project">
                  <span>
                    <Popconfirm
                      disabled={roleContent}
                      title="Are you sure you want to delete the Project?"
                      onConfirm={() =>
                        message.success("Project will be Deleted")
                      }
                      onCancel={() => message.error("Click on No")}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a disabled={roleContent}>
                        <img
                          src={delet}
                          alt=""
                          style={{ width: 15, height: 20 }}
                        />
                      </a>
                    </Popconfirm>
                  </span>
                </abbr>
              </div>
            ),
          }))}
          pagination={false}
          className="ant-border-space"
        />
      </div>
      <div className="uploadfile pb-15 shadow-none">
        <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
          <Link
            to={{
              pathname: "/add-project",
              state: {
                newProject: "Add New",
              },
            }}
          >
            Click to Add New Project
          </Link>
        </Button>
      </div>
      <Modal
        title="Add Project Cost"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Formik
          style={{}}
          initialValues={{
            Cost_Title: "",
            Cost_Type: "",
          }}
          onSubmit={(formData) => {
            addProjectCost(formData);
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
              <Form.Item label="Cost Title">
                <Input
                  placeholder="Cost Title"
                  type="text"
                  onChange={handleChange("Cost_Title")}
                />
              </Form.Item>
              {touched.Cost_Title && (
                <p style={{ color: "red" }}>{errors.Cost_Title}</p>
              )}
              <Form.Item label="Cost Type">
                <Input
                  placeholder="Cost Type"
                  type="text"
                  onChange={handleChange("Cost_Type")}
                />
              </Form.Item>
              {touched.Cost_Type && (
                <p style={{ color: "red" }}>{errors.Cost_Type}</p>
              )}
              <Form.Item label="Cost Date">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd-MM-yyyy"
                  maxDate={new Date()}
                />
              </Form.Item>

              <Form.Item label="Ammount">
                <InputNumber
                  defaultValue={100}
                  onChange={(e) => setAmmount(e)}
                />
                {currency}
              </Form.Item>

              <Form.Item label="                       ">
                <Button onClick={handleSubmit}>Submit</Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </Card>
  );
}

export default Projects;
