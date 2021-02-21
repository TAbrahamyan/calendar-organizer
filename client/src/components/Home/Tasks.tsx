import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ITasksProps {
  tasks: any;
  setTasks: (tasks: any) => void;
  selectedDay: string;
}

export default ({ tasks, setTasks, selectedDay }: ITasksProps) => {
  const deleteTask = (taskId: number): void => {
    setTasks((prevTasks: any) => prevTasks.filter((task: any) => task.id !== taskId));
  };

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
            <CloseCircleOutlined key="delete" className="delete" onClick={() => deleteTask(task.id)} />,
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
