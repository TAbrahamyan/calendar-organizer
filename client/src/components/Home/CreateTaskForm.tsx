import { connect, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import { fetchCreateTask, fetchEditTask, setCancelEditMode } from '../../utils/store/actions/task';
import { ON_INPUT_CHANGE } from '../../utils/constants/actionTypes';
import { checkInvalidDays } from '../../utils/helpers/calendar';

const CreateTaskForm: React.FC<any> = ({ taskStore, calendarStore, onInputChange }) => {
  const dispatch = useDispatch();
  const disableButton: boolean = !(taskStore.createTaskForm.title && taskStore.createTaskForm.description);

  const onChange = ({ target: t }: any) => onInputChange({ value: t.value, name: t.name });

  const createTaskHandler = (): void => {
    const { title, description } = taskStore.createTaskForm;
    dispatch(fetchCreateTask({
      title,
      description,
      selectedDay: calendarStore.selectedDay,
      selectedMonth: calendarStore.month,
    }));
  };

  const saveEditedTaskHandler = (): void => {
    const { title, description } = taskStore.createTaskForm;
    dispatch(fetchEditTask({ title, description, taskId: taskStore.taskEditedMode.taskId }));
  };

  const cancelEditMode = (): void => {
    dispatch(setCancelEditMode());
  };

  return (
    <section className="create-task">
      <div className="create-task__content">
        {checkInvalidDays(calendarStore)
          ? <>
              <p>Create task on <b>{calendarStore.selectedDay} {calendarStore.month}</b></p>

              <Input
                placeholder="Title"
                name="title"
                value={taskStore.createTaskForm.title}
                onChange={onChange}
              />

              <Input.TextArea
                rows={4}
                placeholder="Description"
                name="description"
                value={taskStore.createTaskForm.description}
                onChange={onChange}
              />

              {taskStore.taskEditedMode.mode
              ? (<>
                  <Button type="primary" onClick={saveEditedTaskHandler} disabled={disableButton}>Save</Button>
                  <Button type="primary" onClick={cancelEditMode} danger>Cancel</Button>
                </>)
              : <Button type="primary" onClick={createTaskHandler} disabled={disableButton}>Create</Button>
              }
            </>
          : <h1>
              Sorry you don't have opportunity to add task on the <b>{calendarStore.selectedDay} {calendarStore.month}</b>,
              because this day already passed.
            </h1>
        }
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  taskStore: state.task,
  calendarStore: state.calendar,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInputChange: (payload: any) => dispatch({ type: ON_INPUT_CHANGE, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
