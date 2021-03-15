import { connect } from 'react-redux';
import { Modal } from 'antd';
import { VerifiedOutlined } from '@ant-design/icons';

interface IVerificationModalProps {
  verificationModal: boolean;
}

const VerificationModal: React.FC<IVerificationModalProps> = ({ verificationModal }) => {
  const closeModal = (): void => {
    window.location.reload();
  };

  const styles = {
    margin: '0',
  };

  return (
    <Modal
      visible={verificationModal}
      centered={true}
      closable={false}
      maskClosable={false}
      title={<p style={styles}><VerifiedOutlined /> Verify your account</p>}
      footer={[ <button key="cancel" className="pink-btn" onClick={closeModal}>OK</button> ]}
    >
      <p style={styles}>You need to verify your account before continue.</p>
      <p style={styles}>We've send the verification link to your inbox.</p>
      <p style={styles}>Check spam if not received.</p>
    </Modal>
  );
};

export default connect(
  (state: any) => ({ verificationModal: state.user.verificationModal }),
)(VerificationModal);
