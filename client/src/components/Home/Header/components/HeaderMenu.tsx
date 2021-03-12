import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { fetchUserLogout } from '../../../../utils/store/actions/user';

interface IHeaderMenuProps {
  setModalVisible: (modalVisible: boolean) => void;
}

const HeaderMenu: React.FC<IHeaderMenuProps> = ({ setModalVisible }) => {
  const dispatch = useDispatch();

  return (
    <Menu theme="dark" className="header-menu">
      <Menu.Item key="1" icon={<UserOutlined />} onClick={() => setModalVisible(true)}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={() => dispatch(fetchUserLogout())}>
        Log out
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
