import { Progress, Avatar, Typography, Tooltip } from "antd";
import { EyeTwoTone } from "@ant-design/icons";
// Images
import ava1 from "./assets/images/logo-shopify.svg";
import ava2 from "./assets/images/logo-atlassian.svg";
import ava3 from "./assets/images/logo-slack.svg";
import ava5 from "./assets/images/logo-jira.svg";
import ava6 from "./assets/images/logo-invision.svg";
import pencil from "./assets/images/pencil.svg";
import face from "./assets/images/face-1.jpg";
import face3 from "./assets/images/ateeq.jpeg";
import face4 from "./assets/images/face-4.jpg";
import face5 from "./assets/images/face-5.jpeg";
import face6 from "./assets/images/face-6.jpeg";

import team1 from "./assets/images/team-1.jpg";
import team2 from "./assets/images/team-2.jpg";
import team3 from "./assets/images/team-3.jpg";
import team4 from "./assets/images/team-4.jpg";
import { Link } from "react-router-dom";
const { Title } = Typography;

//About Zippylink
export const about = {
  website_link: "https://zippylink-web.netlify.app/",
  what_we_do:
    "We Provide wide range of services in the field of education, government services, information technologies, Managed Services, system integration and ICT infrastructure establishment solutions. The company specializes in bringing solutions to ensure business optimization and sustainable growth.",
  who_we_are:
    "ZippyLink ICT Services is a fast-growing Systems Integration company. With rich experience at its background, and industry lead man power of more than 15 years of experience, ZIPPY LINK is considered as an expert in industry-leading technology platforms. We specialize in analysing, designing, integrating and executing an infrastructure that has high integrity and stability to deliver competitive advantage for your business. Our Motto is to solve business Challenges with Information Technology Solutions in a creative way.",
};

// Employers Table Data
export const employerCols = [
  {
    title: "EMPLOYER",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "DESIGNATION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "ADDRESS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "EMPLOYED",
    key: "employed",
    dataIndex: "employed",
  },
  {
    title: "SALARY",
    key: "salary",
    dataIndex: "salary",
  },
];

export const employerData = [
  {
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
            <Title level={5}>Suhaib Qanooni</Title>
            <p>suhaibqanooni2000@gmail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Software Engineer</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: "Kabul, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2022</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>15000</span>
        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Suhaib Qanooni",
              email: "suhaibqanooni2000@gmail.com",
              joined: "9/8/2022",
              title: "Software Engineer",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face3}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Ateequllah Safi</Title>
            <p>ateequllah@zippylink.net</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>System Engineer</Title>
          <p>Engineer</p>
        </div>
      </>
    ),

    status: "Kunduz, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2018</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>25000</span>
        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Ateequllah Safi",
              email: "ateequllah@zippylink.net",
              joined: "9/8/2022",
              title: "Technical Engineer",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },
  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face5}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Baryalay Dawoodzai</Title>
            <p>baryalay@zippylink.net</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Technical Engineer</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: "Kabul, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2022</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>15000</span>
        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Shafiq Seddique",
              email: "shafiq@gmail.com",
              joined: "9/8/2022",
              title: "Cook",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Laure Perrier</Title>
            <p>laure@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Executive</Title>
          <p>Projects</p>
        </div>
      </>
    ),

    status: "Kabul, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2022</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>15000</span>
        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Shafiq Seddique",
              email: "shafiq@gmail.com",
              joined: "9/8/2022",
              title: "Cook",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },
  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face4}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Miriam Eric</Title>
            <p>miriam@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Marketing</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: "Kabul, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2022</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>15000</span>
        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Shafiq Seddique",
              email: "shafiq@gmail.com",
              joined: "9/8/2022",
              title: "Cook",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={face6}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Shafiq Seddique</Title>
            <p>shafiq@gmail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Cook</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: "Kabul, Afghanistan",
    employed: (
      <>
        <div className="ant-employed">
          <span>9/8/2022</span>
        </div>
      </>
    ),
    salary: (
      <div className="ant-employed">
        <span>15000</span>

        <Link
          to={{
            pathname: "/popup",
            state: {
              name: "Shafiq Seddique",
              email: "shafiq@gmail.com",
              joined: "9/8/2022",
              title: "Cook",
              basicSalary: "15000",
              address: "Kabul, Afghanistan",
            },
          }}
        >
          <EyeTwoTone />
        </Link>
      </div>
    ),
  },
];

// export const employerData = employers.map((emp, index) => (
//   <>
//     key: {index}, name: (
//     <>
//       <Avatar.Group>
//         <Avatar
//           className="shape-avatar"
//           shape="square"
//           size={40}
//           src="https://pbs.twimg.com/profile_images/1141091748510347266/KNl72RnM_400x400.jpg"
//         ></Avatar>
//         <div className="avatar-info">
//           <Title level={5}>{emp.Name}</Title>
//           <p>{emp.Email}</p>
//         </div>
//       </Avatar.Group>{" "}
//     </>
//     ), function: (
//     <>
//       <div className="author-info">
//         <Title level={5}>Software Engineer</Title>
//         <p>Developer</p>
//       </div>
//     </>
//     ), status: "Kabul, Afghanistan", employed: (
//     <>
//       <div className="ant-employed">
//         <span>9/8/2022</span>
//       </div>
//     </>
//     ), salary: (
//     <div className="ant-employed">
//       <span>15000</span>
//       <Link
//         to={{
//           pathname: "/popup",
//           state: {
//             name: "Suhaib Qanooni",
//             email: "suhaibqanooni2000@gmail.com",
//             joined: "9/8/2022",
//             title: "Software Engineer",
//             basicSalary: "15000",
//             address: "Kabul, Afghanistan",
//           },
//         }}
//       >
//         <EyeTwoTone />
//       </Link>
//     </div>
//     ),
//   </>
// ));

// project table Data
export const projectCols = [
  {
    title: "CUSTOMER",
    dataIndex: "name",
  },
  {
    title: "PROJECT CODE",
    dataIndex: "code",
  },
  {
    title: "PROJECT TITLE",
    dataIndex: "title",
  },
  {
    title: "STARTED",
    dataIndex: "start",
  },
  {
    title: "P.O VALUE",
    dataIndex: "age",
  },
  {
    title: "BRT",
    dataIndex: "brt",
  },
  {
    title: "COST",
    dataIndex: "cost",
  },
  {
    title: "REVENUE",
    dataIndex: "revenue",
  },
  {
    title: "STATUS",
    dataIndex: "status",
  },
  {
    title: "ACTION",
    dataIndex: "action",
  },
];

export const projectData = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Etisalat</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$8,000</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <img className="tootip-img" src={team1} alt="" />
        </Tooltip>

        <Tooltip placement="bottom" title="Alexander Smith">
          <img className="tootip-img" src={team3} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <img className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">Completed</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" />
          <span>
            <Link to="/popup" onClick={() => alert("Hello")}>
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>MTN</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    title: <div className="semibold">ICT</div>,
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$9,500</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <img className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <img className="tootip-img" src={team2} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Alexander Smith">
          <img className="tootip-img" src={team3} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <img className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">Completed</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" />
          <span>
            <Link to="/popup">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Oracle</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$120,000</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <img className="tootip-img" src={team1} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">In Progress</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={39} size="small" />
          {/* format={() => "done"} */}
          <span>
            <Link to="/popup">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Pashtany Bank</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Alexander Smith">
          <img className="tootip-img" src={team3} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <img className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">Canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link to="/popup">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Mili Bank</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$11,000</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <img className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <img className="tootip-img" src={team2} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">Completed</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" />
          <span>
            <Link to="/popup">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>MCIT</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    start: <div className="semibold">1/7/2022</div>,
    age: (
      <>
        <div className="semibold">$12,000</div>
      </>
    ),
    member: (
      <div className="avatar-group mt-2">
        <Tooltip placement="bottom" title="Ryan Tompson">
          <img className="tootip-img" src={team1} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Romina Hadid">
          <img className="tootip-img" src={team2} alt="" />
        </Tooltip>
        <Tooltip placement="bottom" title="Jessica Doe">
          <img className="tootip-img" src={team4} alt="" />
        </Tooltip>
      </div>
    ),
    cost: <div className="text-sm">$5,800</div>,
    address: (
      <>
        <div className="text-sm">Canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={5} size="small" status="exception" />
          <span>
            <Link to="/popup">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

//Salary Table Data
export const salaryCols = [
  { title: "Employer Name", dataIndex: "Name", key: "Name" },
  { title: "Days", dataIndex: "Working_Days", key: "Working_Days" },
  { title: "Basic Salary", dataIndex: "Basic_Salary", key: "Basic_Salary" },
  {
    title: "Calculated Salary",
    dataIndex: "Calculated_Salary",
    key: "Calculated_Salary",
  },
  { title: "TAX", dataIndex: "TAX", key: "TAX" },
  { title: "Net Salary", dataIndex: "Net_Salary", key: "Net_Salary" },
  // { title: "Status", dataIndex: "Status", key: "Status  " },
  {
    title: "PAY?",
    dataIndex: "Paid",
    key: "x",
  },
  { title: "AdvancePay", dataIndex: "AdvancePay", key: "AdvancePay" },
];

export const salaryData = [
  {
    key: 1,
    name: "Ateequllah Safi",
    days: 27,
    basicSalary: 25000,
    salary: 23500,
    tax: 1050,
    netSalary: 22450,
    payDate: "1/9/2022",
    description: "Ateequllah Safi Senior Technical Engineer",
  },
  {
    key: 2,
    name: "Suhaib Qanooni",
    days: 27,
    basicSalary: 25000,
    salary: 23500,
    tax: 1050,
    netSalary: 22450,
    payDate: "1/9/2022",
    description: "Suhaib Qanooni Software Engineer.",
  },
  {
    key: 3,
    name: "Baryalay Dawoodzai",
    days: 27,
    basicSalary: 25000,
    salary: 23500,
    tax: 1050,
    netSalary: 22450,
    payDate: "1/9/2022",
  },
  {
    key: 4,
    name: "Ateequllah Safi",
    days: 27,
    basicSalary: 25000,
    salary: 23500,
    tax: 1050,
    netSalary: 22450,
    payDate: "1/9/2022",
  },
];

//Customer Table Data
export const customerCols = [
  { title: "Name", dataIndex: "Name", key: "Name" },
  {
    title: "Since (years)",
    dataIndex: "Year_Since_Working",
    key: "Year_Since_Working",
  },
  { title: "Address", dataIndex: "Address", key: "Address" },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
    // render: () => <a onClick={() => alert("Record Deleted...")}>Delete</a>,
  },
];
export const customerData = [
  {
    key: 1,
    name: "Etisalat",
    age: 8,
    address: "New York No. 1 Lake Park",
    description: "Etisalat is our Client since last 8 years",
  },
  {
    key: 2,
    name: "Pashtany Bank",
    age: 6,
    address: "London No. 1 Lake Park",
    description: "This is Pashtany, we working with them since 6 years.",
  },
  {
    key: 3,
    name: "Mili Bank (BMA)",
    age: 10,
    address: "Jiangsu No. 1 Lake Park",
    description: "Bank Mili Afghanistan is working with us since 10 years.",
  },
  {
    key: 4,
    name: "MTN",
    age: 9,
    address: "Sidney No. 1 Lake Park",
    description: "This is MTN, we are serving them since 9 years",
  },
];

//Expences Table Data
export const expencesCols = [
  { title: "Date", dataIndex: "Date", key: "Date" },
  { title: "Expence Code", dataIndex: "Exp_Code", key: "Exp_Code" },
  { title: "Expence Title", dataIndex: "Exp_Title", key: "Exp_Title" },
  { title: "Item", dataIndex: "Item", key: "Item" },
  { title: "USD Cost", dataIndex: "USD_Cost", key: "USD_Cost" },
  { title: "AFN Cost", dataIndex: "AFN_Cost", key: "AFN_Cost" },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
  },
];
export const expencesData = [
  {
    key: 1,
    date: "1/7/2022",
    exp_code: "EX_001",
    item: "Gas",
    cost: 500,
    description: "Gas for the kitchen",
  },
  {
    key: 2,
    date: "1/7/2022",
    exp_code: "EX_001",
    item: "Gas",
    cost: 500,
    description: "Gas for the kitchen",
  },
  {
    key: 3,
    date: "1/7/2022",
    exp_code: "EX_001",
    item: "Gas",
    cost: 500,
    description: "Gas for the kitchen",
  },
  {
    key: 4,
    date: "1/7/2022",
    exp_code: "EX_001",
    item: "Gas",
    cost: 500,
    description: "Gas for the kitchen",
  },
];

//Accounts Table Data
export const accountsCols = [
  { title: "Account Name", dataIndex: "Account_Name", key: "Account_Name" },
  // { title: "Account Email", dataIndex: "Account_Email", key: "Account_Email" },
  {
    title: "USD Total Credit",
    dataIndex: "USD_Total_Credit",
    key: "USD_Total_Credit",
  },
  {
    title: "USD Total Debit",
    dataIndex: "USD_Total_Debit",
    key: "USD_Total_Debit",
  },
  {
    title: "USD Cash Inhand",
    dataIndex: "USD_Cash_Inhand",
    key: "USD_Cash_Inhand",
  },
  {
    title: "AFN Total Credit",
    dataIndex: "AFN_Total_Credit",
    key: "AFN_Total_Credit",
  },
  {
    title: "AFN Total Debit",
    dataIndex: "AFN_Total_Debit",
    key: "AFN_Total_Debit",
  },
  {
    title: "AFN Cash Inhand",
    dataIndex: "AFN_Cash_Inhand",
    key: "AFN_Cash_Inhand",
  },
];

//Credit Table Data
export const accountsCreditCols = [
  { title: "Date", dataIndex: "Date", key: "Date" },
  { title: "CreditBy", dataIndex: "CreditBy", key: "CreditBy" },
  { title: "Source", dataIndex: "Source", key: "Source" },
  { title: "ReceiveAs", dataIndex: "ReceiveAs", key: "ReceiveAs" },
  { title: "Ammount", dataIndex: "Ammount", key: "Ammount" },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
  },
];
//Debit Table Data
export const accountsDebitCols = [
  { title: "Date", dataIndex: "Date", key: "Date" },
  { title: "Person", dataIndex: "Person", key: "Person" },
  {
    title: "Voucher_Number",
    dataIndex: "Voucher_Number",
    key: "Voucher_Number",
  },
  { title: "ReceiveAs", dataIndex: "ReceiveAs", key: "ReceiveAs" },
  { title: "Ammount", dataIndex: "Ammount", key: "Ammount" },
  {
    title: "Action",
    dataIndex: "action",
    key: "x",
  },
];
