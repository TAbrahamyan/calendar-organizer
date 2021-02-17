import { List } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

export default ({ tasks }: { tasks: any }) => {
  return (
    <List
      className="tasks"
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(task: any) => (
        <List.Item
          key={task.id}
          actions={[
            <EditOutlined key="edit" className="edit" />,
            <CloseCircleOutlined key="delete" className="delete" />,
          ]}
        >
          <List.Item.Meta title={task.title} description={task.description} />
        </List.Item>
      )}
    />
  );
};
