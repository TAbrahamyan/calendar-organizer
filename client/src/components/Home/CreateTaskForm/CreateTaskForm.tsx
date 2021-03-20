import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { checkInvalidDays } from '../../../utils/helpers/calendar';
import { fetchCreateTask, fetchEditTask, setCancelEditMode, setInputValues } from '../../../utils/store/actions/task';
import { ICalendar } from '../../../utils/types';

interface ICreateTaskFormProps {
  calendar: ICalendar;
  taskEditedMode: { mode: boolean; taskId: string };
  createTaskForm: { title: string, description: string };
}

const CreateTaskForm: React.FC<ICreateTaskFormProps> = ({ calendar, taskEditedMode, createTaskForm }) => {
  const dispatch = useDispatch();
  const disableButton: boolean = !(createTaskForm.title && createTaskForm.description);

  const onChange = ({ target: t }: any) => dispatch(setInputValues({ value: t.value, name: t.name }));

  const createTaskHandler = (): void => {
    const { title, description } = createTaskForm;

    dispatch(fetchCreateTask({
      title,
      description,
      selectedDay: calendar.selectedDay,
      selectedMonth: calendar.month,
    }));
  };

  const saveEditedTaskHandler = (): void => {
    const { title, description } = createTaskForm;
    dispatch(fetchEditTask({ title, description, taskId: taskEditedMode.taskId }));
  };

  const cancelEditMode = (): void => {
    dispatch(setCancelEditMode());
  };

  return (
    <section className="create-task">
      <div className="create-task__content">
        {checkInvalidDays(calendar) ? (
          <>
            <p>Create task on <b>{calendar.selectedDay} {calendar.month}</b></p>

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

            {taskEditedMode.mode ? (
              <>
                <button className="blue-btn" onClick={saveEditedTaskHandler} disabled={disableButton}>Save</button>
                <button className="green-btn" onClick={cancelEditMode}>Cancel</button>
              </>
            ) : (
              <button className="blue-btn" onClick={createTaskHandler} disabled={disableButton}>Create</button>
            )}
          </>
        ) : (
          <h1>
            Sorry you don't have opportunity to add task on the <b>{calendar.selectedDay} {calendar.month}</b>,
            because this day already passed.
          </h1>
        )}
      </div>
    </section>
  );
};

const mapState = (state: any) => ({
  calendar: state.calendar,
  createTaskForm: state.task.createTaskForm,
  taskEditedMode: state.task.taskEditedMode,
});

export default connect(mapState)(CreateTaskForm);
