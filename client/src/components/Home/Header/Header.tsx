import React from 'react';
import PropTypes from 'prop-types';
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

Header.propTypes = {
  user: PropTypes.shape({
    _v: PropTypes.number,
    _id: PropTypes.string,
    email: PropTypes.string,
    fullName: PropTypes.string,
    password: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    isVerified: PropTypes.bool,
    tasks: PropTypes.arrayOf(PropTypes.shape({
      _v: PropTypes.number,
      _id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      createdDay: PropTypes.string,
      createdMonth: PropTypes.string,
      owner: PropTypes.string,
      completed: PropTypes.bool,
    })),
  }).isRequired,
};

export default connect(
  (state: any) => ({ user: state.user.user }),
)(Header);
