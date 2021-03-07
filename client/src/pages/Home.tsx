import React from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Home/Header';
import Calendar from '../components/Home/Calendar';
import CreateTaskForm from '../components/Home/CreateTaskForm';
import Tasks from '../components/Home/Tasks';
import Footer from '../components/Home/Footer';
import { fetchTasks } from '../utils/store/actions/task';
import { fetchUserData } from '../utils/store/actions/user';

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = 'Calendar Organizer';
    dispatch(fetchTasks());
    dispatch(fetchUserData());
  }, []);

  return (
    <div className="home">
      <div style={{ minHeight: 'calc(100vh - 4.75rem)' }}>
        <Header />

        <div style={{ display: 'flex' }}>
          <Calendar />
          <CreateTaskForm />
        </div>

        <Tasks />
      </div>

      <Footer />
    </div>
  );
};
