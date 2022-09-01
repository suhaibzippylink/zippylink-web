import React, { useEffect, useState } from "react";
import { Card, Table, Spin } from "antd";
import { employerCols } from "../Data";
import { Avatar, Typography } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
const { Title } = Typography;

var emps = [];
function Employers() {
  const [employers, setEmployers] = useState();
  const [loader, setLoader] = useState(true);
  console.log("First Line: ", employers);

  const getData = async () => {
    await axios
      .get("/allEmployers")
      .then((res) => {
        console.log("RESPONSE in Employers: ", res.data.All_Users);
        setEmployers(res.data.All_Users);
        emps = res.data.All_Users;
      })
      .then((res) => setLoader(false))
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getData();
    console.log("Employers in EMP: ", employers);
    console.log("Emps in EMP: ", emps);
  }, [employers]);

  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title="Employers Table"
    >
      <div className="table-responsive">
        <Spin
          tip="Loading..."
          spinning={loader}
          style={{ position: "relative", left: "50%", marginTop: 60 }}
        />
        <Table
          columns={employerCols}
          dataSource={emps.map((item) => ({
            key: "1",
            name: (
              <>
                <Avatar.Group>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={40}
                    src="https://pbs.twimg.com/profile_images/1141091748510347266/KNl72RnM_400x400.jpg"
                  ></Avatar>
                  <div className="avatar-info">
                    <Title level={5}>{item.Name}</Title>
                    <p>{item.Email}</p>
                  </div>
                </Avatar.Group>{" "}
              </>
            ),
            function: (
              <>
                <div className="author-info">
                  <Title level={5}>{item.Designation}</Title>
                  <p>Zippy Link Inc.</p>
                </div>
              </>
            ),
            status: (
              <>
                <div className="author-info">
                  <Title level={5}>{item.Address}</Title>
                </div>
              </>
            ),
            employed: (
              <>
                <div className="ant-employed">
                  <span>
                    {new Date(item.StartDate).getDate()} -
                    {new Date(item.StartDate).getMonth()} -
                    {new Date(item.StartDate).getFullYear()}
                  </span>
                </div>
              </>
            ),
            salary: (
              <div className="ant-employed">
                <span>{item.BasicSalary}</span>
                <Link
                  to={{
                    pathname: "/popup",
                    state: {
                      name: `${item.Name}`,
                      email: `${item.Email}`,
                      joined: `
                        ${new Date(item.StartDate).getDate()} -
                        ${new Date(item.StartDate).getMonth()} -
                        ${new Date(item.StartDate).getFullYear()}
                      `,
                      title: `${item.Designation}`,
                      basicSalary: `${item.BasicSalary}`,
                      address: `${item.Address}`,
                    },
                  }}
                >
                  <EyeTwoTone />
                </Link>
              </div>
            ),
          }))}
          pagination={false}
          className="ant-border-space"
        />
      </div>
    </Card>
  );
}

export default Employers;
