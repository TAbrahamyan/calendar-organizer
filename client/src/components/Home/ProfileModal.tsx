import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Modal, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchDestroyAccount } from '../../utils/store/actions/user';

interface IProfileModal {
  user: any;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const ProfileModal = ({ user, modalVisible, setModalVisible }: IProfileModal) => {
  const dispatch = useDispatch();
  const [ destroyLoading, setDestroyLoading ] = React.useState<boolean>(false);

  const destroyAccount = (): void => {
    setDestroyLoading(true);
    dispatch(fetchDestroyAccount(user._id));
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

      <Button onClick={destroyAccount} loading={destroyLoading} danger>
        Destroy account
      </Button>
    </Modal>
  );
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(ProfileModal);
