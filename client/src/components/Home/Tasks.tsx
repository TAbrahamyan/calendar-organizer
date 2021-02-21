import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ITasksProps {
  tasks: any;
  selectedDay: string;
}

export default ({ tasks, selectedDay }: ITasksProps) => {
  return (
    <List
      className="tasks"
      itemLayout="horizontal"
      dataSource={tasks.filter((task: any) => task.createdDay === selectedDay)}
      renderItem={(task: any) => (
        <List.Item
          key={task.id}
          actions={[
            <EditOutlined key="edit" className="edit" />,
            <CloseCircleOutlined key="delete" className="delete" />,
          ]}
        >
          <List.Item.Meta
            avatar={<Checkbox style={{ marginTop: '1rem' }} />}
            title={task.title}
            description={task.description}
          />
        </List.Item>
      )}
    />
  );
};
