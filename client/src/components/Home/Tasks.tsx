import { List, Checkbox } from 'antd';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ITasksProps {
  createTaskForm: any;
  setCreateTaskForm: (createTaskForm: any) => void;
  tasks: any;
  setTasks: (tasks: any) => void;
  taskEditedMode: any;
  setTaskEditedMode: (taskEditedMode: any) => void;
  selectedDay: string;
}

export default ({
  createTaskForm,
  setCreateTaskForm,
  tasks,
  setTasks,
  taskEditedMode,
  setTaskEditedMode,
  selectedDay,
}: ITasksProps) => {
  const edit = (task: any): void => {
    setCreateTaskForm({ title: task.title, description: task.description });
    setTaskEditedMode({ mode: true, taskId: task.id });
  };

  const remove = (taskId: number): void => {
    setTasks((prevTasks: any) => prevTasks.filter((task: any) => task.id !== taskId));
  };

  const complete = (taskId: number): void => {
    setTasks((prevTasks: any) => {
      return prevTasks.map((task: any) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
        }

        return task;
      });
    });
  };

  return (
    <>
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
                <EditOutlined key="edit" className="edit" onClick={() => edit(task)} />,
                <CloseCircleOutlined key="delete" className="delete" onClick={() => remove(task.id)} />,
              ]}
            >
              <List.Item.Meta
                avatar={<Checkbox style={{ marginTop: '1rem' }} checked={task.completed} onChange={() => complete(task.id)} />}
                title={task.title}
                description={task.description}
              />
            </List.Item>
          )}
        />
      }
    </>
  );
};
