import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import { fetchCreateTask, fetchEditTask, setCancelEditMode } from '../../utils/store/actions/task';
import { ON_INPUT_CHANGE } from '../../utils/constants/actionTypes';
import { checkInvalidDays } from '../../utils/helpers/calendar';

const CreateTaskForm: React.FC<any> = ({
  calendar,
  createTaskForm,
  taskEditedMode,
  onInputChange,
}) => {
  const dispatch = useDispatch();
  const disableButton: boolean = !(createTaskForm.title && createTaskForm.description);

  const onChange = ({ target: t }: any) => onInputChange({ value: t.value, name: t.name });

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
        {checkInvalidDays(calendar)
          ? <>
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

              {taskEditedMode.mode
              ? (<>
                  <Button type="primary" onClick={saveEditedTaskHandler} disabled={disableButton}>Save</Button>
                  <Button type="primary" onClick={cancelEditMode} danger>Cancel</Button>
                </>)
              : <Button type="primary" onClick={createTaskHandler} disabled={disableButton}>Create</Button>
              }
            </>
          : <h1>
              Sorry you don't have opportunity to add task on the <b>{calendar.selectedDay} {calendar.month}</b>,
              because this day already passed.
            </h1>
        }
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  calendar: state.calendar,
  createTaskForm: state.task.createTaskForm,
  taskEditedMode: state.task.taskEditedMode,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInputChange: (payload: any) => dispatch({ type: ON_INPUT_CHANGE, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
