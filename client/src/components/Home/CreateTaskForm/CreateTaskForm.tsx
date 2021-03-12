import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Input } from 'antd';

import { checkInvalidDays } from '../../../utils/helpers/calendar';
import { fetchCreateTask, fetchEditTask, setCancelEditMode, setInputValues } from '../../../utils/store/actions/task';

const CreateTaskForm: React.FC<any> = ({ calendar, createTaskForm, taskEditedMode }) => {
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

  const cancelEditMode = React.useCallback((): void => {
    dispatch(setCancelEditMode());
  }, []);

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
                <button className="create-btn" onClick={saveEditedTaskHandler} disabled={disableButton}>Save</button>
                <button className="cancel-btn" onClick={cancelEditMode}>Cancel</button>
              </>
            ) : (
              <button className="create-btn" onClick={createTaskHandler} disabled={disableButton}>Create</button>
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
