import React from 'react';
import { Input, Button } from 'antd';

interface ICreateTaskFormProps {
  createTaskForm: any;
  setCreateTaskForm: (createTaskForm: any) => void;
  selectedDay: (string | number);
  setTasks: (tasks: any) => void;
  taskEditedMode: any;
  setTaskEditedMode: (taskEditedMode: any) => void;
}

const CURRENT_MONTH: string = (new Date().toLocaleString('default', { month: 'long' }));

export default ({
  createTaskForm,
  setCreateTaskForm,
  setTasks,
  selectedDay,
  taskEditedMode,
  setTaskEditedMode,
}: ICreateTaskFormProps) => {
  const onChange = ({ target: t }: any) => setCreateTaskForm({ ...createTaskForm, [t.name]: t.value });

  const createTaskHandler = (): void => {
    const { title, description } = createTaskForm;
    if (!title && !description) return;

    const newTask = {
      id: Date.now(),
      title: createTaskForm.title,
      description: createTaskForm.description,
      createdDay: selectedDay,
      completed: false,
    };

    setTasks((prevTasks: any) => [ ...prevTasks, newTask ]);
    setCreateTaskForm({ title: '', description: '' });
  };

  const save = (): void => {
    setTasks((prevTasks: any) => {
      const findTask = prevTasks.find((task: any) => task.id === taskEditedMode.taskId);
      findTask.title = createTaskForm.title;
      findTask.description = createTaskForm.description;

      return prevTasks;
    });

    cancel();
  };

  const cancel = (): void => {
    setCreateTaskForm({ title: '', description: '' });
    setTaskEditedMode({ mode: false, taskId: -1 });
  };

  return (
    <section className="create-task">
      <div className="create-task__content">
        <p>Create task on <b>{selectedDay} {CURRENT_MONTH}</b></p>

        <Input
          placeholder="Title"
          name="title"
          value={createTaskForm.title}
          onChange={onChange}
        />

        <Input.TextArea
          rows={4}
          placeholder="Description"
          name="description"
          value={createTaskForm.description}
          onChange={onChange}
        />

        {taskEditedMode.mode
        ? (<>
            <Button type="primary" onClick={save}>Save</Button>
            <Button type="primary" danger={true} onClick={cancel}>Cancel</Button>
          </>)
        : <Button type="primary" onClick={createTaskHandler}>Create</Button>
        }
      </div>
    </section>
  );
};
