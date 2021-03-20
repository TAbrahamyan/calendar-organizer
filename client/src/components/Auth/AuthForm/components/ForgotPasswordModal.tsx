import React from 'react';
import { Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchResetPassword } from '../../../../utils/store/actions/user';

interface IForgotPasswordModalProps {
  forgotPasswordModalVisible: boolean;
  setForgotPasswordModalVisible: (forgotPasswordModalVisible: boolean) => void;
}

const ForgotPasswordModal: React.FC<IForgotPasswordModalProps> = ({
  forgotPasswordModalVisible,
  setForgotPasswordModalVisible,
}) => {
  const [ email, setEmail ] = React.useState<string>('');
  const dispatch = useDispatch();

  const styles = {
    margin: '0',
  };

  const resetPassword = (): void => {
    dispatch(fetchResetPassword(email));
  };

  return (
    <Modal
      visible={forgotPasswordModalVisible}
      centered={true}
      closable={false}
      maskClosable={false}
      title={<p style={styles}>Reset your password</p>}
      footer={[ <button key="cancel" className="pink-btn" onClick={() => setForgotPasswordModalVisible(false)}>Cancel</button> ]}
    >
      <p style={styles}>Provide an email and we will send to it a new password.</p>

      <Input
        style={{ margin: '1rem 0' }}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="off"
      />

      <button className="pink-btn" onClick={resetPassword}>Reset</button>
    </Modal>
  );
};

export default ForgotPasswordModal;
