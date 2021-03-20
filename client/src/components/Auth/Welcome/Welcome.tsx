import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { GoogleSquareFilled, FacebookFilled } from '@ant-design/icons';
import { fetchLoginWithGoogle, fetchLoginWithFacebook } from '../../../utils/store/actions/user';

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const onSuccessHandler = ({ tokenId, googleId }: any): void => {
    dispatch(fetchLoginWithGoogle(tokenId, googleId));
  };

  const responseFacebookHandler = (response: any): void => {
    dispatch(fetchLoginWithFacebook({
      name: response.name,
      email: response.email,
      userID: response.userID,
      picture: response.picture.data.url,
    }));
  };

  return (
    <section className="welcome">
      <div className="text">
        <b style={{ fontSize: '3.3em' }}>Welcome to</b>
        <b style={{ fontSize: '2.3em' }}>Calendar Organizer</b>
      </div>

      <div className="login-with">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}
          onSuccess={onSuccessHandler}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button className="pink-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <GoogleSquareFilled /> Sign in with Google
            </button>
          )}
        />

        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID ?? ''}
          textButton="Sign in with Facebook"
          fields="name,email,picture"
          callback={responseFacebookHandler}
          cssClass="pink-btn"
          icon={<FacebookFilled style={{ marginLeft: '18px' }} />}
        />
      </div>
    </section>
  );
};

export default Welcome;
