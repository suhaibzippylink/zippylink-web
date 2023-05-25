import {
  Card,
  Table,
  Spin,
  Popconfirm,
  message,
  DatePicker,
  InputNumber,
  Button,
  Modal,
  Form,
  Input,
  Progress,
  Select,
} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { accountsCols, accountsDebitCols, accountsCreditCols } from "../Data";
import { ToTopOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../auth/Context";
import { style } from "../Config/Design";
const { Option } = Select;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
let exps = [];
let crd = [];
let dbt = [];
let acc = [];
function Accounts() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [credit, setCredit] = useState();
  const [debit, setDebit] = useState();
  const [loader, setLoader] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [totalCostUSD, setTotalCostUSD] = useState(0);
  const [stringMonth, setStringMonth] = useState("August-2022");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchMonth, setFetchMonth] = useState(new Date());
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [creditVisible, setCreditVisible] = useState(false);
  const [since, setSince] = useState(0);
  const authContext = useContext(AuthContext);
  console.log("First Line Accounts Credit: ", credit);
  console.log("First Line Accounts Debit: ", debit);

  const validationSchema = Yup.object().shape({
    Ammount: Yup.number().required().label("Ammount"),
    Voucher_Number: Yup.string().required().label("Voucher_Number"),
    ReceiveAs: Yup.string().required().label("ReceiveAs"),
  });
  const creditValidationSchema = Yup.object().shape({
    SourceName: Yup.string().required().label("Source Name"),
    SourceCode: Yup.string().label("Source Code"),
    Ammount: Yup.number().required().label("Ammount"),
    ReceiveAs: Yup.string().required().label("ReceiveAs"),
    currency: Yup.string().label("Currency"),
  });
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  const calculateCostAFN = () => {
    let sum = 0;
    for (var i = 0; i < dbt.length; i++) {
      if (dbt[i].Currency === "AFN") {
        sum += dbt[i].Ammount;
      }
    }
    setTotalCost(sum);
  };
  const calculateCostUSD = () => {
    let sum = 0;
    for (var i = 0; i < dbt.length; i++) {
      if (dbt[i].Currency === "USD") {
        sum += dbt[i].Ammount;
      }
    }
    setTotalCostUSD(sum);
  };
  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const addNewMonth = async (datePicked) => {
    // const day = new Date(datePicked).getDate();
    const month = new Date(datePicked).getMonth();
    const m = parseInt(month.toString());

    const year = new Date(datePicked).getFullYear();
    const date = `${toMonthName(m + 1)}-${year}`;
    alert(date);
    await axios
      .post(`${baseUrl}/add-newExpenceRecord`, {
        Month: date,
      })
      .then((response) => {
        if (response.data.message) message.success(response.data.message);
      });
  };
  const fetchAccountDetails = (datePicked) => {
    const month = new Date(datePicked).getMonth();
    const m = parseInt(month.toString());
    const year = new Date(datePicked).getFullYear();
    const date = `${toMonthName(m + 1)}-${year}`;
    setStringMonth(date);
    axios
      .get(`/get-accounts-details`, {
        month: date,
      })
      .then((response) => {
        if (response.data.error) {
          message.error(response.data.error);
          return;
        }
        exps = response.data.accounts.Credit;
        console.log("Acounts: ", response.data.accounts);
        setCredit(response.data.accounts[0].Credit);
        acc = response.data.accounts;
        crd = response.data.accounts[0].Credit;

        dbt = response.data.accounts[0].Debit;

        setDebit(response.data.accounts[0].Debit);
        setLoader(false);
      });
  };
  const debitAccount = async (formData) => {
    await axios
      .post(`/debit-account`, {
        Account_Email: process.env.ACCOUNT_EMAIL || "zippylink@zippylink.net",
        Name: authContext.user.Name,
        Email: authContext.user.Email,
        Voucher_Number: formData.Voucher_Number,
        ReceiveAs: formData.ReceiveAs,
        Ammount: since,
        Date: selectedDate,
        Currency: formData.Currency,
      })
      .then((response) => {
        if (response.data.message) {
          message.success(response.data.message);
          setVisible(false);
        } else if (response.data.error) message.error(response.data.error);
      });
  };
  const creditAccount = async (formData) => {
    setLoader(true);
    await axios
      .post(`/credit-account`, {
        Account_Email: process.env.ACCOUNT_EMAIL || "zippylink@zippylink.net",
        Name: authContext.user.Name,
        Email: authContext.user.Email,
        Project_Name: formData.SourceName,
        Project_Code: formData.SourceCode,
        ReceiveAs: formData.ReceiveAs,
        Ammount: since,
        Date: selectedDate,
        Currency: formData.currency,
      })
      .then((response) => {
        setLoader(false);
        if (response.data.message) {
          message.success(response.data.message);
          setCreditVisible(false);
        } else if (response.data.error) message.error(response.data.error);
      })
      .catch((error) => {
        message.error(error);
      });
  };
  const deleteDebitEntry = (id) => {
    setDeleteLoader(true);
    axios
      .post(`/delete-debited`, {
        id,
        Account_Email: process.env.ACCOUNT_EMAIL || "zippylink@zippylink.net",
      })
      .then((response) => {
        setDeleteLoader(false);
        if (response.data.message) message.success(response.data.message);
        else if (response.data.error) message.error(response.data.error);
      });
  };

  useEffect(() => {
    fetchAccountDetails(fetchMonth);
    console.log("Accounts: ", exps);
  }, [credit, debit]);

  return (
    <Card
      title="Accounts"
      bordered={false}
      className="criclebox tablespace mb-24"
    >
      <Spin
        tip="Loading..."
        spinning={loader}
        style={{ position: "relative", left: "50%", marginTop: 60 }}
      />
      <Table
        size="small"
        style={{ fontFamily: style.accountFont }}
        columns={accountsCols}
        dataSource={acc.map((item) => ({
          key: "1",
          Account_Name: (
            <>
              <h1>{item.Account_Name}</h1>
            </>
          ),
          // Account_Email: (
          //   <>
          //     <h1>{item.Account_Email}</h1>
          //   </>
          // ),
          USD_Total_Credit: (
            <>
              <h1>{item.USD_Total_Credit.toLocaleString("en-US")}$</h1>
            </>
          ),
          USD_Total_Debit: (
            <>
              <h1>{item.USD_Total_Debit.toLocaleString("en-US")}$</h1>
            </>
          ),
          USD_Cash_Inhand: (
            <>
              <h1 style={{ color: item.USD_Cash_Inhand > 0 ? "Green" : "red" }}>
                {item.USD_Cash_Inhand > 0 ? (
                  <ToTopOutlined />
                ) : (
                  <VerticalAlignBottomOutlined />
                )}
                {item.USD_Cash_Inhand.toLocaleString("en-US")}$
              </h1>
            </>
          ),
          AFN_Total_Credit: (
            <>
              <h1>{item.AFN_Total_Credit.toLocaleString("en-US")}AFN</h1>
            </>
          ),
          AFN_Total_Debit: (
            <>
              <h1>{item.AFN_Total_Debit.toLocaleString("en-US")}AFN</h1>
            </>
          ),
          AFN_Cash_Inhand: (
            <>
              <h1 style={{ color: item.AFN_Cash_Inhand > 0 ? "Green" : "red" }}>
                {item.AFN_Cash_Inhand > 0 ? (
                  <ToTopOutlined />
                ) : (
                  <VerticalAlignBottomOutlined />
                )}
                {item.AFN_Cash_Inhand.toLocaleString("en-US")}AFN
              </h1>
            </>
          ),
        }))}
      />
      <h3 style={{ marginLeft: 20 }}>Credit</h3>
      <Table
        size="small"
        columns={accountsCreditCols}
        dataSource={crd.map((item) => ({
          key: "1",
          Date: (
            <>
              <p>
                {new Date(item.Date).getDate()} /{" "}
                {new Date(item.Date).getMonth()} /{" "}
                {new Date(item.Date).getFullYear()}
              </p>
            </>
          ),
          CreditBy: (
            <>
              <p>{item.CreditBy.Name}</p>
              <p>{item.CreditBy.Email}</p>
            </>
          ),
          Source: (
            <>
              <p>{item.Source.Project_Name}</p>
              <p>{item.Source.Project_Code}</p>
            </>
          ),
          ReceiveAs: (
            <>
              <p>
                {item.ReceiveAs}
                {item.Currency}
              </p>
            </>
          ),
          Ammount: (
            <>
              <p>{item.Ammount.toLocaleString("en-US")}</p>
            </>
          ),
          action: (
            <>
              <Progress percent={100} />
            </>
          ),
        }))}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      <Button
        style={{ backgroundColor: style.btnColor, color: style.btnTextColor }}
        type="dashed"
        className="ant-full-box"
        icon={<ToTopOutlined />}
        onClick={() => setCreditVisible(true)}
      >
        Credit
      </Button>
      <h3 style={{ marginLeft: 20 }}>Debit</h3>
      <Table
        size="small"
        columns={accountsDebitCols}
        dataSource={dbt.map((item) => ({
          key: "1",
          Date: (
            <>
              <p>
                {new Date(item.Date).getDate()} /{" "}
                {new Date(item.Date).getMonth()} /{" "}
                {new Date(item.Date).getFullYear()}
              </p>
            </>
          ),
          Person: (
            <>
              <p>{item.Person.Name}</p>
              <p>{item.Person.Email}</p>
            </>
          ),
          Voucher_Number: (
            <>
              <p>{item.Voucher_Number}</p>
            </>
          ),
          ReceiveAs: (
            <>
              <p>{item.ReceiveAs}</p>
            </>
          ),
          Ammount: (
            <>
              <p>
                {item.Ammount.toLocaleString("en-US")}
                {item.Currency}
              </p>
            </>
          ),
          action: (
            <>
              <Popconfirm
                title="Are you sure you want to delete this Entry?"
                onConfirm={() => {
                  alert("This Option is Disabled");
                  // deleteDebitEntry(item._id);
                }}
                onCancel={() => message.error("Cancelled")}
                okText="Yes"
                cancelText="No"
              >
                <Spin
                  spinning={deleteLoader}
                  size="small"
                  style={{ color: "red" }}
                />
                <a>Delete</a>
              </Popconfirm>
            </>
          ),
        }))}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p style={{ margin: 0 }}>{record.Person.Name}</p>
              <p style={{ margin: 0 }}>{record.Person.Email}</p>
            </>
          ),
          rowExpandable: (record) => record.Person.Name !== "Not Expandable",
        }}
      />
      <h1
        style={{
          position: "relative",
          left: "60%",
          color: "red",
          fontFamily: style.accountFont,
        }}
      >
        Total USD Cost: <a onClick={() => calculateCostUSD()}>Calculate</a>
        &nbsp;&nbsp;&nbsp;
        {totalCostUSD.toLocaleString("en-US")}$
      </h1>
      <h1
        style={{
          position: "relative",
          left: "60%",
          color: "red",
          fontFamily: style.accountFont,
        }}
      >
        Total AFN Cost: <a onClick={() => calculateCostAFN()}>Calculate</a>
        &nbsp;&nbsp;&nbsp;
        {totalCost.toLocaleString("en-US")}AFN
      </h1>

      <>
        <Button
          style={{ backgroundColor: style.btnColor, color: style.btnTextColor }}
          type="dashed"
          className="ant-full-box"
          icon={<ToTopOutlined />}
          onClick={() => setVisible(true)}
        >
          Debit
        </Button>
        <Modal
          title="Debit Account"
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
              Voucher_Number: "",
              Ammount: 0,
              ReceiveAs: "",
              Currency: "",
            }}
            onSubmit={(formData) => {
              debitAccount(formData, selectedDate, since);
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
                <Form.Item label="Voucher Number">
                  <Input
                    placeholder="Voucher Number e.g. 000000"
                    onChange={handleChange("Voucher_Number")}
                  />
                  {touched.Voucher_Number && (
                    <p style={{ color: "red" }}>{errors.Voucher_Number}</p>
                  )}
                </Form.Item>
                <Form.Item label="Expence">
                  <Input
                    placeholder="Expence"
                    onChange={handleChange("ReceiveAs")}
                  />
                  {touched.ReceiveAs && (
                    <p style={{ color: "red" }}>{errors.ReceiveAs}</p>
                  )}
                </Form.Item>
                <Form.Item label="Date">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd-MM-yyyy"
                    maxDate={new Date()}
                  />
                </Form.Item>

                <Form.Item label="Ammount">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <InputNumber
                      defaultValue={100}
                      onChange={(e) => setSince(e)}
                      addonAfter={
                        <Select
                          defaultValue="USD"
                          style={{ width: 60 }}
                          onChange={handleChange("Currency")}
                        >
                          <Option value="AFN">AFN </Option>
                          <Option value="USD">$</Option>
                          <Option value="EUR">€</Option>
                          <Option value="GBP">£</Option>
                          <Option value="CNY">¥</Option>
                        </Select>
                      }
                    />
                  </div>
                </Form.Item>

                <Form.Item label="                       ">
                  <Button onClick={handleSubmit}>Submit</Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>
        <Modal
          title="Credit Account"
          centered
          visible={creditVisible}
          onOk={() => {
            setCreditVisible(false);
          }}
          onCancel={() => setCreditVisible(false)}
          width={1000}
        >
          <Formik
            style={{}}
            initialValues={{
              SourceName: "",
              SourceCode: "",
              Ammount: 0,
              ReceiveAs: "",
              currency: "USD",
            }}
            onSubmit={(formData) => {
              creditAccount(formData, selectedDate, since);
            }}
            // validationSchema={creditValidationSchema}
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
                <Form.Item label="Source Name">
                  <Input
                    placeholder="Source Name"
                    onChange={handleChange("SourceName")}
                  />
                  {touched.SourceName && (
                    <p style={{ color: "red" }}>{errors.SourceName}</p>
                  )}
                </Form.Item>
                <Form.Item label="Source Code">
                  <Input
                    placeholder="Source Code"
                    onChange={handleChange("SourceCode")}
                  />
                  {touched.SourceCode && (
                    <p style={{ color: "red" }}>{errors.SourceCode}</p>
                  )}
                </Form.Item>
                <Form.Item label="Receive As">
                  <Input
                    placeholder="Receive As"
                    onChange={handleChange("ReceiveAs")}
                  />
                  {touched.ReceiveAs && (
                    <p style={{ color: "red" }}>{errors.ReceiveAs}</p>
                  )}
                </Form.Item>
                <Form.Item label="Date">
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

                <Form.Item label="Ammount">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <InputNumber
                      defaultValue={100}
                      onChange={(e) => setSince(e)}
                      addonAfter={
                        <Select
                          defaultValue="USD"
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
                    />
                  </div>
                </Form.Item>

                <Form.Item label="                       ">
                  <Button onClick={handleSubmit}>
                    <Spin spinning={loader} size="small" />
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </Modal>
      </>
    </Card>
  );
}
export default Accounts;
