import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface IProfileModal {
  user: any;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const ProfileModal = ({ user, modalVisible, setModalVisible }: IProfileModal) => {
  const destroyAccount = (): void => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      centered={true}
      closable={false}
      maskClosable={false}
      title={<p style={{ margin: '0' }}><UserOutlined/> Profile</p>}
      footer={<Button type="primary" onClick={() => setModalVisible(false)}>Cancel</Button>}
    >
      <Row justify="space-between" style={{ padding: '0.5rem 0' }}>
        <Col>Email</Col>
        <Col>{user?.email}</Col>
      </Row>

      <Row justify="space-between" style={{ padding: '0.5rem 0' }}>
        <Col>Full Name</Col>
        <Col>{user?.fullName}</Col>
      </Row>

      <Row justify="space-between" style={{ padding: '0.5rem 0' }}>
        <Col>Account created</Col>
        <Col>{user?.createdAt}</Col>
      </Row>

      <Button onClick={destroyAccount} danger>
        Destroy account
      </Button>
    </Modal>
  );
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(ProfileModal);
