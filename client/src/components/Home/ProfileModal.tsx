import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Modal, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchChangePassword, fetchDestroyAccount } from '../../utils/store/actions/user';
import { notification } from '../../utils/helpers/notification';

interface IProfileModal {
  user: any;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const RULES = {
  password: { required: true, minLength: 3 },
};

const ProfileModal = ({ user, modalVisible, setModalVisible }: IProfileModal) => {
  const dispatch = useDispatch();
  const { control, errors, formState, handleSubmit } = useForm({ mode: 'onChange' });
  const [ destroyLoading, setDestroyLoading ] = React.useState<boolean>(false);
  const [ visibleChangePasswordForm, setVisibleChangePasswordForm ] = React.useState<boolean>(false);
  const profileInfo = [
    { id: 1, text: 'Email', data: user?.email },
    { id: 2, text: 'Full Name', data: user?.fullName },
    { id: 3, text: 'Account created', data: user?.createdAt },
  ];

  const destroyAccount = (): void => {
    setDestroyLoading(true);
    dispatch(fetchDestroyAccount(user._id));
  };

  const changePassword = (formData: any): void => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      return notification({ type: 'error', msg: 'Password confirmation is incorrect' });
    }

    setVisibleChangePasswordForm(false);
    dispatch(fetchChangePassword(formData, user._id));
  };

  return (
    <Modal
      visible={modalVisible}
      centered={true}
      closable={false}
      maskClosable={false}
      title={<p style={{ margin: '0' }}><UserOutlined/> Profile</p>}
      footer={[
        <button key="cancel" className="custom-btn" onClick={() => setModalVisible(false)}>
          Cancel
        </button>,
        <Button key="destroy" onClick={destroyAccount} loading={destroyLoading} danger>
          Destroy account
        </Button>,
      ]}
    >
      {profileInfo.map((info: any) => (
        <Row key={info.id} justify="space-between" style={{ padding: '0.5rem 0' }}>
          <Col>{info.text}</Col>
          <Col>{info.data}</Col>
        </Row>
      ))}

      {!visibleChangePasswordForm && (
        <button className="custom-btn" onClick={() => setVisibleChangePasswordForm(true)}>
          Change password
        </button>
      )}

      {visibleChangePasswordForm && (
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

          <button className="custom-btn" disabled={!formState.isValid}>
            Change
          </button>

          <button className="custom-btn" style={{ marginLeft: '1rem' }} onClick={() => setVisibleChangePasswordForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </Modal>
  );
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(ProfileModal);
