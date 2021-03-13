import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Modal, Button, Input, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import { notification } from '../../../../utils/helpers/notification';
import { fetchChangePassword, fetchDestroyAccount } from '../../../../utils/store/actions/user';
import { IUser } from '../../../../utils/types';

interface IProfileModalProps {
  user: IUser;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

interface IFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface IProfileInfo {
  id: number;
  text: string;
  data: string;
}

const RULES = {
  password: { required: true, minLength: 3 },
};

const ProfileModal: React.FC<IProfileModalProps> = ({ user, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const { control, errors, formState, handleSubmit, reset } = useForm<IFormData>({ mode: 'onChange' });
  const [ visibleForm, setVisibleForm ] = React.useState<boolean>(false);
  const profileInfo: IProfileInfo[] = [
    { id: 1, text: 'Email', data: user?.email },
    { id: 2, text: 'Full Name', data: user?.fullName },
    { id: 3, text: 'Account created', data: moment(user?.createdAt).format('MMMM DD, YYYY') },
  ];

  const cancelModalHandler = (): void => {
    reset();
    setModalVisible(false);
    setVisibleForm(false);
  };

  const changePassword = (formData: IFormData): void => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      return notification({ type: 'error', msg: 'Password confirmation is incorrect' });
    }

    dispatch(fetchChangePassword(formData, user._id));
    setVisibleForm(false);
    reset();
  };

  const destroyAccount = (): void => {
    dispatch(fetchDestroyAccount(user._id));
  };

  return (
    <Modal
      visible={modalVisible}
      centered={true}
      closable={false}
      maskClosable={false}
      title={<p style={{ margin: '0' }}><UserOutlined/> Profile</p>}
      footer={[
        <button key="cancel" className="cancel-btn" onClick={cancelModalHandler}>
          Cancel
        </button>,
        <Popconfirm key="destroy" placement="top" title="Are you sure?" onConfirm={destroyAccount} okText="Yes" cancelText="No">
          <Button type="primary" danger>Destroy account</Button>
        </Popconfirm>,
      ]}
    >
      {profileInfo.map((info: IProfileInfo) => (
        <Row key={info.id} justify="space-between" style={{ padding: '0.5rem 0' }}>
          <Col>{info.text}</Col>
          <Col>{info.data}</Col>
        </Row>
      ))}

      {!visibleForm && (
        <button className="change-btn" onClick={() => setVisibleForm(true)}>
          Change password
        </button>
      )}

      {visibleForm && (
        <form onSubmit={handleSubmit(changePassword)}>
          <Controller
            control={control}
            name="oldPassword"
            rules={RULES.password}
            render={({ onChange, value }) => (
              <Input.Password placeholder="Old password" value={value} onChange={onChange} />
            )}
          />

          <div style={{ marginTop: '1rem' }}>
            <Controller
              control={control}
              name="newPassword"
              rules={RULES.password}
              render={({ onChange, value }) => (
                <Input.Password placeholder="New Password" value={value} onChange={onChange} />
              )}
            />

            {errors.newPassword && <span className="error">Password minimum length is 3</span>}
          </div>

          <div style={{ margin: '1rem 0' }}>
            <Controller
              control={control}
              name="confirmNewPassword"
              rules={RULES.password}
              render={({ onChange, value }) => (
                <Input.Password placeholder="Confirm new password" value={value} onChange={onChange} />
              )}
            />

            {errors.confirmNewPassword && <span className="error">Password minimum length is 3</span>}
          </div>

          <button className="change-btn" disabled={!formState.isValid}>
            Change
          </button>

          <button style={{ marginLeft: '1rem' }} className="cancel-btn" onClick={() => setVisibleForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </Modal>
  );
};

interface IOwnProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const mapState = (state: any, ownProps: IOwnProps) => ({
  user: state.user.user,
  modalVisible: ownProps.modalVisible,
  setModalVisible: ownProps.setModalVisible,
});

export default connect(mapState)(ProfileModal);
