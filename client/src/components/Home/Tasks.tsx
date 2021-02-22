import { connect } from 'react-redux';
import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { EDIT_MODE, REMOVE_TASK, COMPLETE_TASK } from '../../utils/constants/actionTypes';

const Tasks = ({
  tasks,
  taskEditedMode,
  selectedDay,
  edit,
  remove,
  complete,
}: any) => {
  return <>
    {!taskEditedMode.mode &&
      <List
        className="tasks"
        itemLayout="horizontal"
        dataSource={tasks.filter((task: any) => task.createdDay === selectedDay)}
        renderItem={(task: any) => (
          <List.Item
            key={task.id}
            className={task.completed ? 'completed' : undefined}
            actions={[
              <EditOutlined key="edit" className="edit" onClick={() => edit({ task })} />,
              <CloseCircleOutlined key="delete" className="delete" onClick={() => remove({ taskId: task.id })} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Checkbox
                style={{ marginTop: '1rem' }}
                checked={task.completed}
                onChange={() => complete({ taskId: task.id })}
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
  remove: (payload: { taskId: number }) => dispatch({ type: REMOVE_TASK, payload }),
  complete: (payload: { taskId: number }) => dispatch({ type: COMPLETE_TASK, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
