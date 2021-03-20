import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../utils/store/actions/task';
import { fetchUserData } from '../../utils/store/actions/user';
import { Calendar, CreateTaskForm, Tasks, Header, Footer } from '../../components/Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.title = 'Calendar Organizer';
    dispatch(fetchTasks());
    dispatch(fetchUserData());
    // eslint-disable-next-line
  }, []);

  return (
    <section className="home">
      <div style={{ minHeight: 'calc(100vh - 3.55rem)' }}>
        <Header />

        <div className="calendar-create-task-form">
          <Calendar />
          <CreateTaskForm />
        </div>

        <Tasks />
      </div>

      <Footer />
    </section>
  );
};

export default Home;
