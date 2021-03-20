import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Modal, Button, Input, Popconfirm } from 'antd';
import { UserOutlined, EditTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { IUser } from '../../../../utils/types';
import { notification } from '../../../../utils/helpers/notification';
import {
  fetchChangePassword,
  fetchChangeUserPicture,
  fetchDeleteUserPicture,
  fetchDestroyAccount,
} from '../../../../utils/store/actions/user';

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

interface IChangePasswordForm {
  id: number;
  name: string;
  placeholder: string;
}

const ProfileModal: React.FC<IProfileModalProps> = ({ user, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef<any>(null);
  const { control, formState, handleSubmit, reset } = useForm<IFormData>({ mode: 'onChange' });
  const [ visibleForm, setVisibleForm ] = React.useState<boolean>(false);

  const profileInfo: IProfileInfo[] = [
    { id: 1, text: 'Email', data: user?.email },
    { id: 2, text: 'Full Name', data: user?.fullName },
  ];

  const changePasswordForm: IChangePasswordForm[] = [
    { id: 1, name: 'oldPassword', placeholder: 'Old password' },
    { id: 2, name: 'newPassword', placeholder: 'New password' },
    { id: 3, name: 'confirmNewPassword', placeholder: 'Confirm new password' },
  ];

  const iconsStyles = {
    fontSize: '30px',
    margin: '0.5rem',
    cursor: 'pointer',
  };

  const cancelModalHandler = (): void => {
    reset();
    setModalVisible(false);
    setVisibleForm(false);
  };

  const changePassword = (formData: IFormData): void => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      return notification({ type: 'error', msg: 'Password confirmation is incorrect' });
    }

    dispatch(fetchChangePassword(formData));
    setVisibleForm(false);
    reset();
  };

  const changeProfilePictureHandler = ({ target: { files } }: any): void => {
    if (files && files[0]) {
      const reader: FileReader = new FileReader();

      reader.onload = (): void => {
        dispatch(fetchChangeUserPicture(reader?.result));
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const deletePicture = (): void => {
    dispatch(fetchDeleteUserPicture());
  };

  const destroyAccount = (): void => {
    dispatch(fetchDestroyAccount());
  };

  return (
    <Modal
      className="profile-modal"
      visible={modalVisible}
      centered={true}
      closable={false}
      maskClosable={false}
      title={(
        <p style={{ margin: '0' }}>
          {user.picture ? <img src={user.picture} className="user-picture" alt="" /> : <UserOutlined />} Profile
        </p>
      )}
      footer={[
        <button key="cancel" style={{ marginRight: '1rem' }} className="green-btn" onClick={cancelModalHandler}>
          Cancel
        </button>,
        <Popconfirm key="destroy" placement="top" title="Are you sure?" onConfirm={destroyAccount} okText="Yes" cancelText="No">
          <Button type="primary" danger>Destroy account</Button>
        </Popconfirm>,
      ]}
    >
      <input type="file" ref={fileInputRef} onChange={changeProfilePictureHandler} hidden />

      <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
        {user.picture ? (
          <img src={user.picture} style={{ width: '140px', height: '130px', cursor: 'inherit' }} className="user-picture" alt="" />
        ) : (
          <UserOutlined style={{ fontSize: '70px', cursor: 'inherit' }} />
        )}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EditTwoTone style={iconsStyles} onClick={() => fileInputRef.current.click()} />

          <Popconfirm key="destroy" placement="top" title="Are you sure to delete your picture?" onConfirm={deletePicture} okText="Yes" cancelText="No">
            <CloseCircleTwoTone style={iconsStyles} />
          </Popconfirm>
        </div>
      </div>

      {profileInfo.map((info: IProfileInfo) => (
        <Row key={info.id} justify="space-between" style={{ padding: '0.5rem 0' }}>
          <Col>{info.text}</Col>
          <Col>{info.data}</Col>
        </Row>
      ))}

      {(!visibleForm && user.googleId !== '' && user.facebookUserID !== '') && (
        <button className="red-btn" style={{ width: '180px' }} onClick={() => setVisibleForm(true)}>
          Change password
        </button>
      )}

      {visibleForm && (
        <form onSubmit={handleSubmit(changePassword)}>
          {changePasswordForm.map((input: IChangePasswordForm) => (
            <Controller
              key={input.id}
              control={control}
              name={input.name}
              rules={{ required: true, minLength: 3 }}
              render={({ onChange, value }) => (
                <Input
                  style={{ margin: '0.5rem 0' }}
                  type="password"
                  placeholder={input.placeholder}
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                />
              )}
            />
          ))}

          <button className="red-btn" disabled={!formState.isValid}>
            Change
          </button>

          <button style={{ marginLeft: '0.5rem' }} className="green-btn" onClick={() => setVisibleForm(false)}>
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
