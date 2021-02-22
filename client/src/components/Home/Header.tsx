import { PageHeader, Button } from 'antd';

interface IHeader {
  fullName: string;
  logout: () => void;
}

export default ({ fullName, logout }: IHeader) => {
  return (
    <PageHeader
      ghost={false}
      title="Hello"
      subTitle={fullName}
      extra={<Button type="primary" danger={true} onClick={logout}>Log out</Button>}
    />
  );
};
