import { useContext, useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Descriptions,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
  Select,
  Typography,
} from "antd";
import BgProfile from "../assets/ZippyImages/4.jpg";
import plus from "../assets/images/plus.png";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

import AuthContext from "../auth/Context";
const { Option } = Select;
const { Text } = Typography;
const base_url =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
let sumBudget = 0;
function Project_Details(props) {
  const projectData = props.location.data.item;
  const authContext = useContext(AuthContext);
  const [pr_cost, setPr_cost] = useState(0);
  const [prAlt_cost, setPrAlt_cost] = useState(0);
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [visible, setVisible] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ammount, setAmmount] = useState(0);
  const [rate, setRate] = useState(80.2);
  const [roleContent, setRoleContent] = useState(true);
  const [reloadDataCounter, setRelaodDataCounter] = useState(0);
  const validationSchema = Yup.object().shape({
    Client_Name: Yup.string().required().label("Client Name"),
    Client_Email: Yup.string().required().email().label("Client Email"),
  });

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const addProjectBudget = (formData) => {
    axios
      .post(`/add-project-budget`, {
        projectCode: projectData.Project_Code,
        Client_Name: formData.Client_Name,
        Client_Email: formData.Client_Email,
        Ammount: ammount,
        CreatedAt: selectedDate,
        Account_Name: "Zippy Link",
        Account_Email: process.env.ACCOUNT_EMAIL || "zippylink@zippylink.net",
        Name: authContext.user.Name || "Hello World",
        Email: authContext.user.Email || "helloworld@gmail.com",
        Project_Name: projectData.Project_Title,
        Currency: formData.currency ? formData.currency : "USD",
        Exchange_Rate: rate,
      })
      .then((response) => {
        setVisible(false);
        if (response.data.message) {
          message.success(response.data.message);
        } else if (response.data.error) message.error(response.data.error);
      });
  };
  const calculateCosts = () => {
    let current_cost = 0;
    let alt_cost = 0;

    for (let i = 0; i < projectData.Project_Cost.length; i++) {
      if (
        projectData.Currency == "USD" &&
        projectData.Project_Cost[i].Currency == "USD"
      ) {
        current_cost += projectData.Project_Cost[i].Cost_USD;
        alt_cost += projectData.Project_Cost[i].Cost_AFN;
      } else if (
        projectData.Currency == "AFN" &&
        projectData.Project_Cost[i].Currency == "AFN"
      ) {
        current_cost += projectData.Project_Cost[i].Cost_AFN;
        alt_cost += projectData.Project_Cost[i].Cost_USD;
      } else if (
        projectData.Currency == "AFN" &&
        projectData.Currency != projectData.Project_Cost[i].Currency
      ) {
        current_cost += projectData.Project_Cost[i].Cost_AFN;
        alt_cost += projectData.Project_Cost[i].Cost_USD;
      } else if (
        projectData.Currency == "USD" &&
        projectData.Currency != projectData.Project_Cost[i].Currency
      ) {
        current_cost += projectData.Project_Cost[i].Cost_USD;
        alt_cost += projectData.Project_Cost[i].Cost_AFN;
      }
    }

    setPr_cost(current_cost);
    setPrAlt_cost(alt_cost);
  };
  useEffect(() => {
    if (authContext.user.Role === "Admin") setRoleContent(false);
    console.log("Projectssssssss in details: ", projectData);
    calculateCosts();
    for (let i = 0; i < projectData.Project_Budget; i++) {
      sumBudget += projectData.Project_Budget[i].Ammount;
    }
    setTotalInstallment(sumBudget);
  }, [pr_cost, prAlt_cost]);
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: `url(${BgProfile})`,
        }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src="https://th.bing.com/th/id/OIP.Lu-Gh0-ewlkjJMIRQ1p7fwHaEG?pid=ImgDet&w=178&h=98&c=7&dpr=1.5"
                />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {projectData.Project_Title}({projectData.Currency})
                  </h4>
                  <p>{projectData.Project_Code}</p>
                  <p>{projectData.Customer}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Project Description</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">{projectData.Description}</p>
            <hr className="my-25" />
            <abbr title="Add Project Budget Installement">
              <a
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
                onClick={() => {
                  if (!roleContent) {
                    setVisible(true);
                  }
                }}
              >
                <img src={plus} alt="" style={{ width: 20, height: 20 }} />
                <h1 style={{ color: "green" }}>
                  Add Project Budget Installement
                </h1>
              </a>
            </abbr>
            <hr className="my-25" />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Descriptions title="Project Information">
                  <Descriptions.Item label="Start Date" span={3}>
                    {projectData.Date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Product" span={3}>
                    {projectData.Product}
                  </Descriptions.Item>
                  <Descriptions.Item label="Supplier" span={3}>
                    {projectData.Supplier}
                  </Descriptions.Item>
                  <Descriptions.Item label="Project Status" span={3}>
                    <Text
                      type={
                        projectData.Status == "Complete" ? "success" : "warning"
                      }
                    >
                      {projectData.Status}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Budget" span={3}>
                    <Text code type="success">
                      {projectData.Budget.toLocaleString("en-US")}
                      {projectData.Currency}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Exchange Rate" span={3}>
                    {projectData.Exchange_Rate}
                  </Descriptions.Item>
                  <Descriptions.Item label="BRT" span={3}>
                    {projectData.BRT.toLocaleString("en-US")}
                    {projectData.Currency}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <Descriptions title="Current Account">
                  <Descriptions.Item label="Currency" span={3}>
                    {projectData.Currency}
                  </Descriptions.Item>
                  <Descriptions.Item label="Net Ammount" span={3}>
                    {projectData.NetAmmount.toLocaleString("en-US")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost" span={3}>
                    <Text type="danger">
                      {projectData.Cost.toLocaleString("en-US")}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Revenue" span={3}>
                    <Text type="success">
                      {projectData.Revenue.toLocaleString("en-US")}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Installments" span={3}>
                    <Text type="success">
                      {projectData.Total_Installment.toLocaleString("en-US")} (
                      {projectData.Project_Budget.length})
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Client Still to pay" span={3}>
                    <Text type="warning">
                      {projectData.NetAmmount -
                        projectData.Total_Installment.toLocaleString("en-US")}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <Descriptions title="Alternate Account">
                  <Descriptions.Item label="Currency" span={3}>
                    {projectData.Alternate_Currency}
                  </Descriptions.Item>
                  <Descriptions.Item label="Net Ammount" span={3}>
                    {projectData.Alternate_NetAmmount.toLocaleString("en-US")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost" span={3}>
                    {projectData.Alternate_Cost.toLocaleString("en-US")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Revenue" span={3}>
                    {projectData.Alternate_Revenue.toLocaleString("en-US")}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        </Col>
        <Modal
          title="Project Budget Installement"
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
              Client_Name: "",
              Client_Email: "",
              currency: "",
            }}
            onSubmit={(formData) => {
              addProjectBudget(formData);
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
                <Form.Item label="Client Name">
                  <Input
                    placeholder="Client Name"
                    type="text"
                    onChange={handleChange("Client_Name")}
                  />
                </Form.Item>
                {touched.Client_Name && (
                  <p style={{ color: "red" }}>{errors.Client_Name}</p>
                )}
                <Form.Item label="Client Email">
                  <Input
                    placeholder="Client Email"
                    type="text"
                    onChange={handleChange("Client_Email")}
                  />
                </Form.Item>
                {touched.Client_Email && (
                  <p style={{ color: "red" }}>{errors.Client_Email}</p>
                )}
                <Form.Item label="Installement Date">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd-MM-yyyy"
                    maxDate={new Date()}
                  />
                </Form.Item>

                <Form.Item label="Ammount">
                  <InputNumber
                    addonAfter={
                      <Select
                        defaultValue="USD"
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
                    onChange={(e) => setAmmount(e)}
                  />
                  {`Project Currency is: ${projectData.Currency}`}
                </Form.Item>
                <Form.Item label="Exchange Rate">
                  <InputNumber
                    defaultValue={rate}
                    onChange={(e) => setRate(e)}
                  />
                </Form.Item>
                <Form.Item label="                       ">
                  <Button onClick={handleSubmit}>Submit</Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>
      </Row>
    </>
  );
}

export default Project_Details;
