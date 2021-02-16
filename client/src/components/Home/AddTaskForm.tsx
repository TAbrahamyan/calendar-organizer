import { Form, Input, Button } from 'antd';

export default () => {
  return (
    <section className="add-tasks">
      <Form>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Title is required' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
