import React from 'react';
import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { checkInvalidDays } from '../../../../utils/helpers/calendar';
import { ITasks, ICalendar } from '../../../../utils/types';

interface IListItemProps {
  calendar: ICalendar;
  task: ITasks;
  editTaskHandler: (task: ITasks) => void;
  deleteTaskHandler: (id: string) => void;
  completeTaskHandler: (completed: boolean, id: string) => void;
}

const ListItem: React.FC<IListItemProps> = React.memo(props => {
  const { calendar, task, editTaskHandler, deleteTaskHandler, completeTaskHandler } = props;

  return (
    <List.Item
      key={task._id}
      className={task.completed ? 'completed' : undefined}
      actions={[
        (checkInvalidDays(calendar) && <EditOutlined key="edit" className="edit-icon" onClick={() => editTaskHandler(task)} />),
        <CloseCircleOutlined key="delete" className="delete-icon" onClick={() => deleteTaskHandler(task._id)} />,
      ]}
    >
      <List.Item.Meta
        avatar={<Checkbox
          style={{ marginTop: '0.2rem' }}
          checked={task.completed}
          onChange={() => completeTaskHandler(task.completed, task._id)}
        />}
        title={task.title}
        description={task.description}
      />
    </List.Item>
  );
});

export default ListItem;
