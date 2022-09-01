import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PopUp = () => {
  const location = useLocation();
  const data = location.state;
  console.log("Data: ", data);
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  // const showModal = () => {
  //   setVisible(true);
  // };

  const handleOk = () => {
    // setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with customized footer
      </Button> */}
      <Modal
        visible={visible}
        title="Employer Information"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            href="/tables"
            type="primary"
          >
            Return
          </Button>,
        ]}
      >
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Address: {data.address}</p>
        <p>Title: {data.title}</p>
        <p>Joined: {data.joined}</p>
        <p>Basic Salary: {data.basicSalary}</p>
      </Modal>
    </>
  );
};

export default PopUp;
