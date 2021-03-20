import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { fetchUserLogout } from '../../../../utils/store/actions/user';
import { IUser } from '../../../../utils/types';

interface IHeaderMenuProps {
  user: IUser;
  setModalVisible: (modalVisible: boolean) => void;
}

const HeaderMenu: React.FC<IHeaderMenuProps> = ({ user, setModalVisible }) => {
  const dispatch = useDispatch();

  return (
    <Menu theme="dark" className="header-menu">
      <Menu.Item
        key="1"
        icon={user.picture ? (
          <img src={user.picture} className="user-picture" style={{ width: '16px', height: '16px' }} alt="" />
        ) : (
          <UserOutlined style={{ fontSize: '16px' }} />
        )}
        onClick={() => setModalVisible(true)}
      >
        <span>Profile</span>
      </Menu.Item>

      <Menu.Item
        key="2"
        icon={<LogoutOutlined style={{ fontSize: '16px' }} />}
        onClick={() => dispatch(fetchUserLogout())}
      >
        <span>Log out</span>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
