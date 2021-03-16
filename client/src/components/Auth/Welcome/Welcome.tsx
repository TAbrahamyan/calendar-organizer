import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { GoogleOutlined } from '@ant-design/icons';
import { fetchLoginWithGoogle } from '../../../utils/store/actions/user';

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const onSuccessHandler = ({ tokenId, googleId }: any): void => {
    dispatch(fetchLoginWithGoogle(tokenId, googleId));
  };

  return (
    <section className="welcome">
      <div className="text">
        <b style={{ fontSize: '3.3em', textAlign: 'center' }}>Welcome to</b>
        <b style={{ fontSize: '2.3em' }}>Calendar Organizer</b>
      </div>

      <div className="login-with">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
          buttonText="Sign in with google"
          onSuccess={onSuccessHandler}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button className="pink-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <GoogleOutlined /> Sign in with google
            </button>
          )}
        />
      </div>
    </section>
  );
};

export default Welcome;
