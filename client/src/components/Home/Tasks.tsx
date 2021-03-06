import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List, Checkbox, Spin } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchDeleteTask, fetchCompleteTask, setEditTask } from '../../utils/store/actions/task';

const Tasks: React.FC<any> = ({
  tasks,
  taskEditedMode,
  isLoaded,
  selectedDay,
}) => {
  const dispatch = useDispatch();

  const editTaskHandler = React.useCallback((task: any) => {
    dispatch(setEditTask(task));
  }, []);

  const deleteTaskHandler = React.useCallback((id: string) => {
    dispatch(fetchDeleteTask(id));
  }, []);

  const completeTaskHandler = React.useCallback((completed: boolean, id: string) => {
    dispatch(fetchCompleteTask({ completed, id}));
  }, []);

  return <>
    {(taskEditedMode.mode === false && isLoaded === true)
      ? <List
          className="tasks"
          itemLayout="horizontal"
          dataSource={tasks.filter((task: any) => task.createdDay === selectedDay)}
          renderItem={(task: any) => (
            <List.Item
              key={task._id}
              className={task.completed ? 'completed' : undefined}
              actions={[
                <EditOutlined key="edit" className="edit" onClick={() => editTaskHandler(task)} />,
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
      : (taskEditedMode.mode === true && isLoaded === true)
      ? <h1 style={{ textAlign: 'center' }}>Task editing process...</h1>
      : (taskEditedMode.mode === false && isLoaded === false)
      ? <Spin style={{ margin: '0 auto', width: '100%' }} size="large" />
      : <></>
    }
  </>;
};

interface IOwnProps {
  selectedDay: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps) => ({
  tasks: state.tasks,
  taskEditedMode: state.taskEditedMode,
  isLoaded: state.isLoaded,
  selectedDay: ownProps.selectedDay,
});

export default connect(mapStateToProps)(Tasks);
