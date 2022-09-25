import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Avatar,
  Typography,
  Spin,
  Button,
  Popconfirm,
  message,
} from "antd";
import { customerCols } from "../Data";
import { ToTopOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import pencil from "../assets/images/pencil.svg";
import delet from "../assets/images/delete.png";
const { Title } = Typography;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
export let custs = [];
function Customers(props) {
  const [customers, setCustomers] = useState();
  const [loader, setLoader] = useState(true);
  console.log("First line in Customer Table: ", customers);

  const getData = async () => {
    await axios
      .get(`${baseUrl}/all-cutomers`)
      .then((response) => {
        setCustomers(response.data.allCustomers);
        custs = response.data.allCustomers;
      })
      .then((res) => {
        setLoader(false);
      });
  };
  const deleteCustomer = async (email) => {
    await axios
      .post(`${baseUrl}/delete-customer`, {
        Email: email,
      })
      .then((response) => {
        console.log({ message: "Customer Deleted SUccessfully!!!", response });
      });
  };

  useEffect(() => {
    getData();
    console.log("Customers: ", customers);
  }, [customers, custs]);

  return (
    <Card
      title="Customers"
      bordered={false}
      className="criclebox tablespace mb-24"
    >
      <Spin
        tip="Loading..."
        spinning={loader}
        style={{ position: "relative", left: "50%", marginTop: 60 }}
      />
      <Table
        columns={customerCols}
        dataSource={custs.map((item) => ({
          key: "1",
          Name: (
            <>
              <Avatar.Group>
                <Avatar
                  className="shape-avatar"
                  shape="square"
                  size={40}
                  src="https://th.bing.com/th/id/OIP.Lu-Gh0-ewlkjJMIRQ1p7fwHaEG?pid=ImgDet&w=178&h=98&c=7&dpr=1.5"
                ></Avatar>
                <div className="avatar-info">
                  <Title level={5}>{item.Name}</Title>
                  <p>{item.Email}</p>
                </div>
              </Avatar.Group>{" "}
            </>
          ),
          Year_Since_Working: (
            <>
              <Title level={5}>{item.Year_Since_Working}</Title>
            </>
          ),
          Address: (
            <>
              <Title level={5}>{item.Address}</Title>
            </>
          ),
          action: (
            <>
              <Link
                to={{
                  pathname: "/update-customer",
                  state: { email: item.Email, id: item._id },
                }}
              >
                <img src={pencil} />
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Popconfirm
                title="Are you sure you want to delete this expence?"
                onConfirm={() => {
                  deleteCustomer(item.Email);
                }}
                onCancel={() => message.error("Cancelled")}
                okText="Yes"
                cancelText="No"
              >
                <a>
                  <img src={delet} width={15} height={20} />
                </a>
              </Popconfirm>
            </>
          ),
        }))}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.Name !== "Not Expandable",
        }}
      />
      <div className="uploadfile pb-15 shadow-none">
        <Button type="dashed" className="ant-full-box" icon={<ToTopOutlined />}>
          <Link
            to={{
              pathname: "/add-customer",
              state: {
                newCustomer: "Add New",
              },
            }}
          >
            Click to Add New Customer
          </Link>
        </Button>
      </div>
    </Card>
  );
}

export default Customers;
