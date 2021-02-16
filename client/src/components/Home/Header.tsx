import { useHistory } from 'react-router-dom';
import { PageHeader, Button } from 'antd';

export default ({ fullName }: { fullName: string }) => {
  const history = useHistory();

  const logout = (): void => {
    localStorage.clear();
    history.push('/login');
    window.location.reload();
  };

  return (
    <PageHeader
      ghost={false}
      title="Hello"
      subTitle={fullName}
      extra={<Button type="primary" danger={true} onClick={logout}>Log out</Button>}
    />
  );
};
