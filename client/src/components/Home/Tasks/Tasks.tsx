import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List, Spin } from 'antd';

import { fetchDeleteTask, fetchCompleteTask, setEditTask } from '../../../utils/store/actions/task';
import { ListItem } from './components';

const Tasks: React.FC<any> = ({ taskEditedMode, isLoaded, tasks, calendar }) => {
  const dispatch = useDispatch();

  const editTaskHandler = React.useCallback((task: any): void => {
    dispatch(setEditTask(task));
  }, []);

  const deleteTaskHandler = React.useCallback((id: string): void => {
    dispatch(fetchDeleteTask(id));
  }, []);

  const completeTaskHandler = React.useCallback((completed: boolean, id: string): void => {
    dispatch(fetchCompleteTask({ completed, id }));
  }, []);

  return (
    <>
      {!taskEditedMode.mode ? (
        <>
          {isLoaded ? (
            <List
              className="tasks"
              itemLayout="horizontal"
              dataSource={tasks.filter((task: any) => {
                return task.createdDay === calendar.selectedDay && task.createdMonth === calendar.month;
              })}
              renderItem={(task: any) => (
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
  taskEditedMode: state.task.taskEditedMode,
  isLoaded: state.task.isLoaded,
  tasks: state.task.tasks,
  calendar: state.calendar,
});

export default connect(mapState)(Tasks);
