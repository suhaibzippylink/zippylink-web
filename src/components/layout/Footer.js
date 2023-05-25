import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { about } from "../../Data";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2022, made with
            {<HeartFilled />} by
            <a
              href="https://suhaib-qanooni.vercel.app/"
              className="font-weight-bold"
              target="_blank"
            >
              Suhaib Qanooni
            </a>
            all rights reserved.
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  href={about.website_link}
                  className="nav-link text-muted"
                  target="_blank"
                >
                  <img src="./zippyLogo.png" width={100} height={30} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  href={about.website_link + "#about"}
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
