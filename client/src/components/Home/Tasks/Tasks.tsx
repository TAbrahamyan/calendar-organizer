import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List, Spin } from 'antd';
import { fetchDeleteTask, fetchCompleteTask, setEditTask } from '../../../utils/store/actions/task';
import { ITasks, ICalendar } from '../../../utils/types';
import { ListItem } from './components';

interface ITasksProps {
  tasks: ITasks[];
  calendar: ICalendar;
  isLoaded: boolean;
  taskEditedMode: { mode: boolean; taskId: string };
}

const Tasks: React.FC<ITasksProps> = ({ calendar, tasks, taskEditedMode, isLoaded }) => {
  const dispatch = useDispatch();

  const editTaskHandler = React.useCallback((task: ITasks): void => {
    dispatch(setEditTask(task));
    // eslint-disable-next-line
  }, []);

  const deleteTaskHandler = React.useCallback((id: string): void => {
    dispatch(fetchDeleteTask(id));
    // eslint-disable-next-line
  }, []);

  const completeTaskHandler = React.useCallback((completed: boolean, id: string): void => {
    dispatch(fetchCompleteTask({ completed, id }));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!taskEditedMode.mode ? (
        <>
          {isLoaded ? (
            <List
              className="tasks"
              itemLayout="horizontal"
              dataSource={tasks.filter((task: ITasks) => {
                return task.createdDay === calendar.selectedDay && task.createdMonth === calendar.month;
              })}
              renderItem={(task: ITasks) => (
                <ListItem
                  calendar={calendar}
                  task={task}
                  editTaskHandler={editTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                  completeTaskHandler={completeTaskHandler}
                />
              )}
            />
          ) : (
            <Spin style={{ margin: '0 auto', width: '100%' }} size="large" />
          )}
        </>
      ) : (
        <h1 style={{ textAlign: 'center' }}>Task editing process...</h1>
      )}
    </>
  );
};

const mapState = (state: any) => ({
  calendar: state.calendar,
  tasks: state.task.tasks,
  taskEditedMode: state.task.taskEditedMode,
  isLoaded: state.task.isLoaded,
});

export default connect(mapState)(Tasks);
