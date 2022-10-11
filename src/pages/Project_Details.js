import { Row, Col, Card, Descriptions, Avatar } from "antd";

import BgProfile from "../assets/ZippyImages/4.jpg";
import { useEffect } from "react";
function Project_Details(props) {
  const projectData = props.location.data.item;

  useEffect(() => {
    console.log("Projectssssssss in details: ", projectData);
  }, []);
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: `url(${BgProfile})`,
        }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar
                  size={74}
                  shape="square"
                  src="https://th.bing.com/th/id/OIP.Lu-Gh0-ewlkjJMIRQ1p7fwHaEG?pid=ImgDet&w=178&h=98&c=7&dpr=1.5"
                />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {projectData.Project_Title}({projectData.Currency})
                  </h4>
                  <p>{projectData.Project_Code}</p>
                  <p>{projectData.Customer}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Project Description</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">{projectData.Description}</p>
            <hr className="my-25" />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Descriptions title="Project Information">
                  <Descriptions.Item label="Start Date" span={3}>
                    {projectData.Date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Product" span={3}>
                    {projectData.Product}
                  </Descriptions.Item>
                  <Descriptions.Item label="Supplier" span={3}>
                    {projectData.Supplier}
                  </Descriptions.Item>
                  <Descriptions.Item label="Project Status" span={3}>
                    {projectData.Status}
                  </Descriptions.Item>
                  <Descriptions.Item label="Budget" span={3}>
                    {projectData.Budget}
                    {projectData.Currency}
                  </Descriptions.Item>
                  <Descriptions.Item label="Exchange Rate" span={3}>
                    {projectData.Exchange_Rate}
                  </Descriptions.Item>
                  <Descriptions.Item label="BRT" span={3}>
                    {projectData.BRT}
                    {projectData.Currency}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <Descriptions title="Current Account">
                  <Descriptions.Item label="Currency" span={3}>
                    {projectData.Currency}
                  </Descriptions.Item>
                  <Descriptions.Item label="Net Ammount" span={3}>
                    {projectData.NetAmmount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost" span={3}>
                    {projectData.Cost}
                  </Descriptions.Item>
                  <Descriptions.Item label="Revenue" span={3}>
                    {projectData.Revenue}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <Descriptions title="Alternate Account">
                  <Descriptions.Item label="Currency" span={3}>
                    {projectData.Alternate_Currency}
                  </Descriptions.Item>
                  <Descriptions.Item label="Net Ammount" span={3}>
                    {projectData.Alternate_NetAmmount.toFixed(3)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost" span={3}>
                    {projectData.Alternate_Cost.toFixed(3)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Revenue" span={3}>
                    {projectData.Alternate_Revenue.toFixed(3)}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Project_Details;
