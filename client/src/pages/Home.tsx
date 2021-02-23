import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Home/Header';
import Calendar from '../components/Home/Calendar';
import CreateTaskForm from '../components/Home/CreateTaskForm';
import Tasks from '../components/Home/Tasks';
import Footer from '../components/Home/Footer';
import userApi from '../utils/api/user';
import TaskAction from '../utils/store/actions/task';

const Home: React.FC<any> = ({ fetchTasks }) => {
  const history = useHistory();
  const [ user, setUser ] = React.useState<any>();
  const [ selectedDay, setSelectedDay ] = React.useState<string>(`${new Date().getDate()}`);

  React.useEffect(() => {
    document.title = 'Calendar Organizer';
    fetchTasks();

    userApi.getMe({ token: localStorage.getItem('token') })
      .then(({ data }) => setUser(data))
      .catch(({ response: { status } }) => status === 500 && logout());
  }, []);

  const logout = (): void => {
    localStorage.clear();
    history.push('/login');
    window.location.reload();
  };

  return (
    <div className="home">
      <div style={{ minHeight: 'calc(100vh - 4.75rem)' }}>
        <Header fullName={user?.fullName} logout={logout} />

        <div style={{ display: 'flex' }}>
          <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <CreateTaskForm selectedDay={selectedDay} />
        </div>

        <Tasks selectedDay={selectedDay} />
      </div>

      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  ...TaskAction,
};

export default connect(null, mapDispatchToProps)(Home);
