import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fetchDeleteTask } from '../../utils/store/actions/task';
import { EDIT_MODE, COMPLETE_TASK } from '../../utils/constants/actionTypes';

const Tasks = ({
  tasks,
  taskEditedMode,
  selectedDay,
  edit,
  complete,
}: any) => {
  const dispatch = useDispatch();

  const removeHandler = (taskId: string): void => {
    dispatch(fetchDeleteTask(taskId));
  };

  return <>
    {!taskEditedMode.mode &&
      <List
        className="tasks"
        itemLayout="horizontal"
        dataSource={tasks.filter((task: any) => task.taskCreatedDay === selectedDay)}
        renderItem={(task: any) => (
          <List.Item
            key={task.id}
            className={task.completed ? 'completed' : undefined}
            actions={[
              <EditOutlined key="edit" className="edit" onClick={() => edit({ task })} />,
              <CloseCircleOutlined key="delete" className="delete" onClick={() => removeHandler(task._id)} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Checkbox
                style={{ marginTop: '1rem' }}
                checked={task.completed}
                onChange={() => complete({ taskId: task._id })}
              />}
              title={task.title}
              description={task.description}
            />
          </List.Item>
        )}
      />
    }
  </>;
};

interface IOwnProps {
  selectedDay: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps) => ({
  tasks: state.tasks,
  taskEditedMode: state.taskEditedMode,
  selectedDay: ownProps.selectedDay,
});

const mapDispatchToProps = (dispatch: any) => ({
  edit: (payload: any) => dispatch({ type: EDIT_MODE, payload }),
  complete: (payload: { taskId: number }) => dispatch({ type: COMPLETE_TASK, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
