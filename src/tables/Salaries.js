import {
  Card,
  Table,
  Spin,
  Popconfirm,
  Typography,
  DatePicker,
  message,
  Button,
  InputNumber,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { salaryCols } from "../Data";
const { Title } = Typography;
let sals = [];
function Salaries() {
  const [salaries, setSalaries] = useState();
  const [loader, setLoader] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchMonth, setFetchMonth] = useState(new Date());
  const [stringMonth, setStringMonth] = useState("August-2022");
  const [advancePay, setAdvancePay] = useState();
  const [totalSalariesPaid, setTotalSalariesPaid] = useState(0);
  const [newControler, setNewControler] = useState(true);
  console.log("First Line in Salary: ", salaries);

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
      .post("/add-newMonth", {
        Month: date,
      })
      .then((response) => {
        if (response.data.message) message.success(response.data.message);
      });
  };

  const paySalary = async (id, month, payDate, payDeduction) => {
    alert(payDeduction);
    await axios
      .post("/pay-monthly", {
        month,
        id,
        payDate,
        advanceDeduction: parseInt(payDeduction),
      })
      .then((response) => {
        console.log("Response Paid Updation: ", response.data);
        if (response.data.message) message.success(response.data.message);
        else if (response.data.error) message.error(response.data.error);
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
      .post("/selected-month", {
        month: date,
      })
      .then((response) => {
        if (response.data.error) {
          message.error(response.data.error);
          setSalaries({});
          sals = [];
          return;
        }
        // console.log(
        //   "Selected Month Salaries: ",
        //   response.data.selectedMonth.Employers
        // );
        setSalaries(response.data.selectedMonth.Employers);
        sals = response.data.selectedMonth.Employers;
        // setTotalSalariesPaid(response.data.selectedMonth.PaidSalaries);

        setLoader(false);
      });
  };

  const payAdvance = async (id, month, payment) => {
    await axios
      .post("pay-advance", {
        AdvancePay: payment,
        month,
        id,
      })
      .then((response) => {
        message.success("Advance Paid Successfully!");
        console.log("Advance Payment REsponse: ", response.body);
      });
  };
  const totalPaid = () => {
    let total = 0;
    for (var i = 0; i < sals.length; i++) {
      total = total + sals[i].Net_Salary;
    }
    setTotalSalariesPaid(total);
    return total;
  };
  useEffect(() => {
    fetchSelectedMonth(fetchMonth);
    console.log("Salaries: ", salaries);
    totalPaid();
  }, [salaries, selectedDate]);

  return (
    <Card title="Salaries" className="criclebox tablespace mb-24">
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
            <Button disabled={newControler}>Add New Month Salary Record</Button>
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
            onChange={(date) => setFetchMonth(date)}
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
        columns={salaryCols}
        dataSource={sals.map((item) => ({
          key: "1",
          Name: (
            <div className="avatar-info">
              <Title level={5}>{item.Name}</Title>
              <Title level={5}>
                {item.Paid ? (
                  <p style={{ color: "green" }}>Paid</p>
                ) : (
                  <p style={{ color: "red" }}>Not Paid</p>
                )}
              </Title>
            </div>
          ),
          Working_Days: (
            <>
              <p>{item.Working_Days}</p>
            </>
          ),
          Basic_Salary: (
            <>
              <p>{item.Basic_Salary}</p>
            </>
          ),
          Calculated_Salary: (
            <>
              <p>{item.Calculated_Salary}</p>
              <p>Adv: {item.AdvancePay}</p>
            </>
          ),
          TAX: (
            <>
              <p>{item.TAX}</p>
            </>
          ),
          Net_Salary: (
            <>
              <p>{item.Net_Salary}</p>
            </>
          ),
          // Status: (
          //   <>
          //     <Title level={5}>
          //       {item.Paid ? (
          //         <p style={{ color: "green" }}>Paid</p>
          //       ) : (
          //         <p style={{ color: "red" }}>Not Paid</p>
          //       )}
          //     </Title>
          //   </>
          // ),
          Paid: (
            <>
              <Popconfirm
                title="Are you sure to Pay Salary?"
                onConfirm={() => {
                  let advanceDeduction = prompt("Advance Deduction");
                  paySalary(
                    item._id,
                    stringMonth,
                    new Date(selectedDate),
                    advanceDeduction
                  );
                }}
                onCancel={() => message.error("Click on No")}
                okText="Yes"
                cancelText="No"
              >
                <a>PAY</a>
              </Popconfirm>
            </>
          ),
          AdvancePay: (
            <div style={{ flexDirection: "column" }}>
              <InputNumber
                placeholder="0"
                size="small"
                min={0}
                style={{ width: 80 }}
                onChange={(n) => {
                  setAdvancePay(n);
                }}
              />

              <Popconfirm
                title="Are you sure to Pay Advance?"
                onConfirm={() => payAdvance(item._id, stringMonth, advancePay)}
                onCancel={() => message.error("Click on No")}
                okText="Yes"
                cancelText="No"
              >
                <a>Pay</a>
              </Popconfirm>
            </div>
          ),
        }))}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <p style={{ margin: 0 }}>{record.AdvancePay}</p>
        //   ),
        //   rowExpandable: (record) => record.Name !== "Not Expandable",
        // }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "1%",
          right: "20%",
          color: "red",
        }}
      >
        <h1>
          Total Salaries This Month: <a onClick={() => totalPaid()}>Calc</a>
          &nbsp;&nbsp;&nbsp;&nbsp; {totalSalariesPaid}
        </h1>
      </div>
    </Card>
  );
}
export default Salaries;
