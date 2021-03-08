import { Button } from 'antd';
import { GoogleSquareFilled, FacebookFilled } from '@ant-design/icons';

export default () => (
  <section className="welcome">
    <div className="text">
      <b style={{ fontSize: '3.3em', textAlign: 'center' }}>Welcome to</b>
      <b style={{ fontSize: '2.5em' }}>Calendar Organizer</b>
    </div>

    <div className="login-with">
      <Button type="primary"><GoogleSquareFilled /> Login with google</Button>
      <Button type="primary"><FacebookFilled /> Login with facebook</Button>
    </div>
  </section>
);
