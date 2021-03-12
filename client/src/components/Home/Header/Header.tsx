import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { HeaderMenu, ProfileModal } from './components';

const Header: React.FC<any> = ({ user }) => {
  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);

  return (
    <>
      <PageHeader
        className="header"
        title="Hello"
        subTitle={user?.fullName}
        extra={!modalVisible && (
          <Dropdown trigger={['click']} overlay={<HeaderMenu setModalVisible={setModalVisible} />}>
            <UserOutlined />
          </Dropdown>
        )}
      />

      <ProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(Header);
