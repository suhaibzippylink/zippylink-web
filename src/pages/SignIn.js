import React, { useContext, useState } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message,
  Spin,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import Footer from "../components/layout/Footer";
import AuthContext from "../auth/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Content } = Layout;
const baseUrl =
  process.env.SERVER_URL || "https://zippylink-server.herokuapp.com";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const authContext = useContext(AuthContext);
  // const login = async (email, password) => {
  //   setLoader(true);
  //   await axios
  //     .post(`${baseUrl}/sign-in`, {
  //       Email: email,
  //       Password: password,
  //     })
  //     .then((response) => {
  //       if (response.data.message) {
  //         console.log("Logged User: ", response.data.loggedUser);
  //         const { Name, Email, Designation, Role, Phone } =
  //           response.data.loggedUser;
  //         setLoader(false);
  //         authContext.setUser({ Name, Email, Designation, Role, Phone });
  //         message.success(response.data.message);
  //       } else if (response.data.error) {
  //         message.error(response.data.error);
  //         setLoader(false);
  //       }
  //     });

  //   console.log("User in SignIn: ", authContext.user);
  // };
  const login = async (email, password) => {
    setLoader(true);
    fetch(`/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          message.success(response.message);
          const loggedUser = jwtDecode(response.token);
          authContext.setUser(loggedUser);
          setLoader(false);
        } else if (response.error) {
          message.error(response.error);
          setLoader(false);
        }
      });

    console.log("User in SignIn: ", authContext.user);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <img src="./zippyLogo.png" width={160} height={70} alt="LOGO" />
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <img src="./zippyLogo.png" width={300} height={140} alt="LOGO" />
              {/* <Title className="mb-15">Sign In</Title> */}
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>

              <Form layout="vertical" className="row-col">
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input a Valid email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      min: 4,
                      message: "Please input a Valid password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                {/* <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item> */}

                <Form.Item>
                  <Button
                    onClick={() => login(email, password)}
                    type="danger"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    <Spin
                      spinning={loader}
                      size="small"
                      style={{ color: "red" }}
                    />
                    SIGN IN
                  </Button>
                </Form.Item>
                {/* <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p> */}
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>

        <Footer />
      </Layout>
    </>
  );
}
