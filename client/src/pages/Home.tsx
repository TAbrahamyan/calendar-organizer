import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Home/Header';
import Calendar from '../components/Home/Calendar';
import CreateTaskForm from '../components/Home/CreateTaskForm';
import Tasks from '../components/Home/Tasks';
import Footer from '../components/Home/Footer';
import userApi from '../utils/api/user';

export const Home: React.FC = () => {
  const history = useHistory();
  const [ user, setUser ] = React.useState<any>();
  const [ selectedDay, setSelectedDay ] = React.useState<string>(`${new Date().getDate()}`);
  const [ tasks, setTasks ] = React.useState([]);

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
      <div style={{ minHeight: 'calc(100vh - 4.75rem)' }}>
        <Header fullName={user?.fullName} />

        <div style={{ display: 'flex' }}>
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <CreateTaskForm selectedDay={selectedDay} setTasks={setTasks} />
        </div>

        <Tasks tasks={tasks} setTasks={setTasks} selectedDay={selectedDay} />
      </div>

      <Footer />
    </div>
  );
};
