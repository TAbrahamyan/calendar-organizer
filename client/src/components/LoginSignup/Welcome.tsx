import { Button } from 'antd';
import { GoogleSquareFilled, FacebookFilled } from '@ant-design/icons';

export default () => {
  return (
    <div className="welcome">
      <div className="welcome__text">
        <p style={{ fontSize: '3.3em' }}>Welcome to</p>
        <p style={{ fontSize: '2.5em' }}>Calendar Organizer</p>
      </div>

      <div className="welcome__login-with">
        <Button type="primary">
          <GoogleSquareFilled style={{ marginLeft: '-1rem' }} />
          Login with google
        </Button>

        <Button type="primary">
          <FacebookFilled />
          Login with facebook
        </Button>
      </div>
    </div>
  );
};