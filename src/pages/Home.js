import { useState, useEffect } from "react";

import { Card, Col, Row, Typography, Carousel } from "antd";

import home1 from "../assets/ZippyImages/1.jpg";
import home2 from "../assets/ZippyImages/2.jpg";
import home3 from "../assets/ZippyImages/3.jpg";
import home4 from "../assets/ZippyImages/4.jpg";
import home5 from "../assets/ZippyImages/5.jpg";
import home6 from "../assets/ZippyImages/6.jpg";
import home7 from "../assets/ZippyImages/7.jpg";
import home8 from "../assets/ZippyImages/8.jpg";
import home9 from "../assets/ZippyImages/9.jpg";

import axios from "axios";
let pros = [];
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
function Home() {
  const { Title } = Typography;

  const [projects, setProjects] = useState();
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [revenue, setRevenue] = useState(0);
  console.log(
    "Projects in 1st line in Dashboard: ",
    projects,
    totalBudget,
    totalCost,
    revenue
  );

  const getData = async () => {
    await axios
      .get(`${baseUrl}/all-projects`)
      .then((response) => {
        setProjects(response.data.Projects);
        pros = response.data.Projects;
        let budget = 0;
        let cost = 0;
        for (let i = 0; i < pros.length; i++) {
          budget = budget + pros[i].Budget;
          cost = cost + pros[i].Cost;
        }

        setTotalBudget(budget);
        setTotalCost(cost);
        setRevenue(budget - cost);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getData();
    console.log("Projects in Project Table: ", projects);
    console.log("Pros: ", pros);
  }, [projects]);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const count = [
    {
      today: "Total Projects",
      title: pros.length,
      number: 120,
      persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Total Budget",
      title: totalBudget,
      persent: "+20%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Total Cost",
      title: totalCost,
      persent: "+20%",
      icon: dollor,
      // bnb: "redtext",
      bnb: "bnb2",
    },
    {
      today: "Revenue",
      title: revenue,
      persent: "10%",
      icon: heart,
      bnb: "bnb2",
    },
  ];

  return (
    <>
      <div className="layout-content">
        {/* <Card className="rowgap-vbox"> */}
        <Carousel
          autoplay
          effect="fade"
          dotPosition="right"
          style={{ width: "100%", height: "1005" }}
        >
          <div>
            <img src={home1} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home2} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home3} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home4} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home5} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home6} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home7} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home8} style={{ width: "100%", height: 400 }} />
          </div>
          <div>
            <img src={home9} style={{ width: "100%", height: 400 }} />
          </div>
        </Carousel>
        {/* </Card> */}

        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={20}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
