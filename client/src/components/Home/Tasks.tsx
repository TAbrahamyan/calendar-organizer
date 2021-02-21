import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ITasksProps {
  tasks: any;
  setTasks: (tasks: any) => void;
  selectedDay: string;
}

export default ({ tasks, setTasks, selectedDay }: ITasksProps) => {
  const remove = (taskId: number): void => {
    setTasks((prevTasks: any) => prevTasks.filter((task: any) => task.id !== taskId));
  };

  const complete = (task: any): void => {
    const newTaskArray = [...tasks];
    const findTaskIndex = tasks.findIndex((t: any) => t === task);
    newTaskArray[findTaskIndex].completed = !newTaskArray[findTaskIndex].completed;
    setTasks(newTaskArray);
  };

  return (
    <List
      className="tasks"
      itemLayout="horizontal"
      dataSource={tasks.filter((task: any) => task.createdDay === selectedDay)}
      renderItem={(task: any) => (
        <List.Item
          key={task.id}
          className={task.completed ? 'completed' : undefined}
          actions={[
            <EditOutlined key="edit" className="edit" />,
            <CloseCircleOutlined key="delete" className="delete" onClick={() => remove(task.id)} />,
          ]}
        >
          <List.Item.Meta
            avatar={<Checkbox style={{ marginTop: '1rem' }} checked={task.completed} onChange={() => complete(task)} />}
            title={task.title}
            description={task.description}
          />
        </List.Item>
      )}
    />
  );
};
