import React from 'react';
import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { checkInvalidDays } from '../../../../utils/helpers/calendar';

const ListItem: React.FC<any> = React.memo(props => {
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
          style={{ marginTop: '1rem' }}
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
