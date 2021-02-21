import React from 'react';
import { Form, Input, Button } from 'antd';

interface ICreateTaskFormProps {
  selectedDay: (string | number);
  setTasks: (tasks: any) => void;
}

const CURRENT_MONTH: string = (new Date().toLocaleString('default', { month: 'long' }));
const RULES = {
  title: [{ required: true, message: 'Title is required' }],
  description: [{ required: true, message: 'Description is required' }],
};

export default ({ setTasks, selectedDay }: ICreateTaskFormProps) => {
  const [ form ] = Form.useForm();
  const [ createTaskForm, setCreateTaskForm ] = React.useState({ title: '', description: '' });
  const formRef = React.useRef<any>();

  const onChange = ({ target: t }: any) => setCreateTaskForm({ ...createTaskForm, [t.name]: t.value });

  const createTaskHandler = (): void => {
    const newTask = {
      id: Date.now(),
      title: createTaskForm.title,
      description: createTaskForm.description,
      createdDay: selectedDay,
      completed: false,
    };

    setTasks((prevTasks: any) => [ ...prevTasks, newTask ]);
    formRef.current.resetFields();
  };

  return (
    <section className="create-task">
      <div className="create-task__content">
        <p>Create task on <b>{selectedDay} {CURRENT_MONTH}</b></p>

        <Form form={form} ref={formRef}>
          <Form.Item name="title" rules={RULES.title}>
            <Input
              placeholder="Title"
              name="title"
              value={createTaskForm.title}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item name="description" rules={RULES.description}>
            <Input.TextArea
              rows={4}
              placeholder="Description"
              name="description"
              value={createTaskForm.description}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={createTaskHandler}
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
