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
  Select,
} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { expencesCols } from "../Data";
import { ToTopOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../auth/Context";
const { TextArea } = Input;
const { Option } = Select;
let exps = [];
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
function Expences() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [expences, setExpences] = useState();
  const [loader, setLoader] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [stringMonth, setStringMonth] = useState("August-2022");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchMonth, setFetchMonth] = useState(new Date());
  const [newControler, setNewControler] = useState(true);
  const [visible, setVisible] = useState(false);
  const [since, setSince] = useState(0);
  const authContext = useContext(AuthContext);
  console.log("First Line in Expence Table: ", expences);

  const validationSchema = Yup.object().shape({
    Exp_Code: Yup.string().required().label("Expence Code"),
    Exp_Title: Yup.string().required().label("Expence Title"),
    Item: Yup.string().required().label("Item"),
    Cost: Yup.number().required().label("Cost"),
    description: Yup.string().required().label("Expence Description"),
    voucher: Yup.string().required().label("Voucher"),
  });
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const getAllExpCode = async () => {
    await axios
      .get(`${baseUrl}/allExpences`)
      .then((response) => {
        let temp = 0;
        for (let i = 0; i < response.data.allExps.length; i++) {
          temp = temp + expences[i].Cost;
        }
        setTotalCost(temp);
      })
      .then((res) => {
        setLoader(false);
      });
  };
  const calculateCost = () => {
    let sum = 0;
    for (var i = 0; i < exps.length; i++) {
      sum += exps[i].Cost;
    }
    setTotalCost(sum);
  };
  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const addNewMonth = async (datePicked) => {
    const day = new Date(datePicked).getDate();
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
  const fetchSelectedMonth = (datePicked) => {
    const month = new Date(datePicked).getMonth();
    const m = parseInt(month.toString());
    const year = new Date(datePicked).getFullYear();
    const date = `${toMonthName(m + 1)}-${year}`;
    setStringMonth(date);
    // alert(date);
    axios
      .post(`${baseUrl}/selected-month-expences`, {
        month: date,
      })
      .then((response) => {
        if (response.data.error) {
          message.error(response.data.error);
          return;
        }
        exps = response.data.selectedMonth.Expences;
        setExpences(response.data.selectedMonth.Expences);
        setLoader(false);
      });
  };
  const addExpence = async (formData) => {
    console.log("Add Expence:  Form Data: ", formData);
    await axios
      .post(`${baseUrl}/add-expence`, {
        Month: stringMonth,
        Exp_Code: formData.Exp_Code,
        Exp_Title: formData.Exp_Title,
        Item: formData.Item,
        Cost: since,
        description: formData.description,
        Account_Email: "zippylink@zippylink.net",
        Name: authContext.user.Name,
        Email: authContext.user.Email,
        Voucher_Number: formData.voucher,
        Currency: formData.currency,
      })
      .then((response) => {
        if (response.data.message) {
          message.success(response.data.message);
          setVisible(false);
        } else if (response.data.error) message.error(response.data.error);
      });
  };
  const deleteExpence = (id) => {
    axios
      .post(`${baseUrl}/delete-expence`, {
        id,
        month: stringMonth,
      })
      .then((response) => {
        if (response.data.message) message.success(response.data.message);
        else if (response.data.error) message.error(response.data.error);
      });
  };

  useEffect(() => {
    fetchSelectedMonth(fetchMonth);
    console.log("Expences: ", expences);
  }, [expences]);

  return (
    <Card
      title="Expenses"
      bordered={false}
      className="criclebox tablespace mb-24"
    >
      <Spin
        tip="Loading..."
        spinning={loader}
        style={{ position: "relative", left: "50%", marginTop: 60 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <DatePicker
            style={{ marginLeft: 5, marginRight: 5 }}
            size="large"
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setNewControler(false);
            }}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
          />

          <Popconfirm
            title="A New month Record will be created on this Date"
            onConfirm={() => {
              addNewMonth(new Date(selectedDate).toString());
            }}
            onCancel={() => message.error("Cancelled")}
            okText="Yes"
            cancelText="No"
          >
            <Button disabled={newControler}>
              Add New Month Expence Record
            </Button>
          </Popconfirm>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h1>Display Month</h1>
          <DatePicker
            style={{ marginLeft: 5, marginRight: 5 }}
            size="large"
            selected={fetchMonth}
            onChange={(date) => {
              setFetchMonth(date);
              setTotalCost(0);
            }}
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
          />
          {/* <Button
            onClick={() => fetchSelectedMonth(new Date(fetchMonth).toString())}
          >
            Go
          </Button> */}
        </div>
      </div>
      <Table
        columns={expencesCols}
        // dataSource={expences}
        dataSource={exps.map((item) => ({
          key: "1",
          Date: (
            <>
              <p>
                {new Date(item.Date).getDate()} /
                {new Date(item.Date).getMonth()} /
                {new Date(item.Date).getFullYear()}
              </p>
            </>
          ),
          Exp_Code: (
            <>
              <p>{item.Exp_Code}</p>
            </>
          ),
          Exp_Title: (
            <>
              <p>{item.Exp_Title}</p>
            </>
          ),
          Item: (
            <>
              <p>{item.Item}</p>
            </>
          ),
          Cost: (
            <>
              <p>{item.Cost}</p>
            </>
          ),
          action: (
            <>
              <Popconfirm
                title="Are you sure you want to delete this expence?"
                onConfirm={() => {
                  deleteExpence(item._id);
                }}
                onCancel={() => message.error("Cancelled")}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
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
      <h1
        style={{
          position: "relative",
          left: "75%",
          color: "red",
        }}
      >
        Total Cost: <a onClick={() => calculateCost()}>Calc</a>
        &nbsp;&nbsp;&nbsp;
        {totalCost}
      </h1>

      <>
        <Button
          type="dashed"
          className="ant-full-box"
          icon={<ToTopOutlined />}
          onClick={() => setVisible(true)}
        >
          Click to Add New Expence
        </Button>
        <Modal
          title="Add New Expence"
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
              Exp_Code: "",
              Exp_Title: "",
              Item: "",
              Cost: 0,
              description: "",
              voucher: "",
              currency: "",
            }}
            onSubmit={(formData) => {
              addExpence(formData, selectedDate, since);
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
                <Form.Item label="Expence Code">
                  <Input
                    placeholder="Expence Code e.g. Ex_000"
                    onChange={handleChange("Exp_Code")}
                  />
                  {touched.Exp_Code && (
                    <p style={{ color: "red" }}>{errors.Exp_Code}</p>
                  )}
                </Form.Item>
                <Form.Item label="Expence Title">
                  <Input
                    placeholder="Expence Title"
                    type="email"
                    onChange={handleChange("Exp_Title")}
                  />
                  {touched.Exp_Title && (
                    <p style={{ color: "red" }}>{errors.Exp_Title}</p>
                  )}
                </Form.Item>

                <Form.Item label="Item">
                  <Input
                    placeholder="Item"
                    type="text"
                    onChange={handleChange("Item")}
                  />
                  {touched.Item && (
                    <p style={{ color: "red" }}>{errors.Item}</p>
                  )}
                </Form.Item>
                <Form.Item label="Voucher">
                  <Input
                    placeholder="Voucher"
                    type="text"
                    onChange={handleChange("voucher")}
                  />
                  {touched.voucher && (
                    <p style={{ color: "red" }}>{errors.voucher}</p>
                  )}
                </Form.Item>
                <Form.Item label="Expence Date">
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
                      onChange={(e) => setSince(e)}
                    />
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
        </Modal>
      </>
    </Card>
  );
}
export default Expences;
