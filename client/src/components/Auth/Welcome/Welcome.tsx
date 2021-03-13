import { GoogleSquareFilled, FacebookFilled } from '@ant-design/icons';

const Welcome: React.FC = () => {
  return (
    <section className="welcome">
      <div className="text">
        <b style={{ fontSize: '3.3em', textAlign: 'center' }}>Welcome to</b>
        <b style={{ fontSize: '2.3em' }}>Calendar Organizer</b>
      </div>

      <div className="login-with">
        <button className="pink-btn">
          <GoogleSquareFilled style={{ marginLeft: '-16px' }} /> Login with google
        </button>

        <button className="pink-btn">
          <FacebookFilled /> Login with facebook
        </button>
      </div>
    </section>
  );
};

export default Welcome;
