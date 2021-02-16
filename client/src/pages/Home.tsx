import React from 'react';
import { useHistory } from 'react-router-dom';
import Calendar from '../components/Home/Calendar';
import userApi from '../utils/api/user';

export const Home: React.FC = () => {
  const history = useHistory();
  const [ user, setUser ] = React.useState<any>();

  React.useEffect(() => {
    document.title = 'Calendar Organizer';

    userApi.getMe({ token: localStorage.getItem('token') }).then(({ data }) => {
      setUser(data);
    }).catch(err => {
      if (err.response.status === 500) {
        localStorage.clear();
        history.push('/login');
        window.location.reload();
      }
    });
  }, []);

  return (
    <div className="home">
      <Calendar />
    </div>
  );
};
