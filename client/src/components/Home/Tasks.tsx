import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List, Checkbox, Spin } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchDeleteTask, fetchCompleteTask, setEditTask } from '../../utils/store/actions/task';
import { checkInvalidDays } from '../../utils/helpers/calendar';

const Tasks: React.FC<any> = ({ taskStore, calendarStore }) => {
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

  return <>
    {!taskStore.taskEditedMode.mode
      ? <>
          {taskStore.isLoaded
          ? <List
              className="tasks"
              itemLayout="horizontal"
              dataSource={taskStore.tasks.filter((task: any) => {
                return task.createdDay === calendarStore.selectedDay && task.createdMonth === calendarStore.month;
              })}
              renderItem={(task: any) => (
                <List.Item
                  key={task._id}
                  className={task.completed ? 'completed' : undefined}
                  actions={[
                    (checkInvalidDays(calendarStore) &&
                    <EditOutlined key="edit" className="edit" onClick={() => editTaskHandler(task)} />),
                    <CloseCircleOutlined key="delete" className="delete" onClick={() => deleteTaskHandler(task._id)} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Checkbox
                      style={{ marginTop: '1rem' }}
                      checked={task.completed}
                      onChange={() => completeTaskHandler(task.completed, task._id)}
                    />}
                    title={task.title}
                    description={task.description}
                  />
                </List.Item>
              )}
            />
          : <Spin style={{ margin: '0 auto', width: '100%' }} size="large" />
          }
        </>
      : <h1 style={{ textAlign: 'center' }}>Task editing process...</h1>
    }
  </>;
};

const mapStateToProps = (state: any) => ({
  taskStore: state.task,
  calendarStore: state.calendar,
});

export default connect(mapStateToProps)(Tasks);
