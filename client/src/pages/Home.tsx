import React from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../components/Home/Header';
import Calendar from '../components/Home/Calendar';
import AddTaskForm from '../components/Home/AddTaskForm';
import Footer from '../components/Home/Footer';
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
      <Header fullName={user?.fullName} />
      <Calendar />
      <AddTaskForm />
      <Footer />
    </div>
  );
};
