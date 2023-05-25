import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Salaries from "../tables/Salaries";
import Expences from "../tables/Expences";
import Customers from "../tables/Customers";
import Employers from "../tables/Employers";
import Projects from "../tables/Projects";
import axios from "axios";
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
function Tables() {
  const [employers, setEmployers] = useState();

  const getData = async () => {
    axios.get(`/allEmployers`, {}).then((res) => {
      console.log("RESPONSE: ", res.data.All_Users);
      setEmployers(res.data.All_Users);
    });
  };

  useEffect(() => {
    getData();
    console.log("Data: ", employers);
  }, []);

  // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Employers />
            <Customers />
            <Projects />
            <Salaries />
            <Expences />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
