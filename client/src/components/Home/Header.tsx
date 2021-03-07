import { connect, useDispatch } from 'react-redux';
import { PageHeader, Button } from 'antd';
import { fetchUserLogout } from '../../utils/store/actions/user';

export const Header: React.FC<any> = ({ user }) => {
  const dispatch = useDispatch();

  const logout = (): void => {
    dispatch(fetchUserLogout());
  };

  return (
    <PageHeader
      ghost={false}
      title="Hello"
      subTitle={user?.fullName}
      extra={<Button danger type="primary" onClick={logout}>Log out</Button>}
    />
  );
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(Header);
