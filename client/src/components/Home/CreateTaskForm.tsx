import { connect, useDispatch } from 'react-redux';
import { Input, Button } from 'antd';
import { fetchCreateTask, fetchEditTask, setCancelEditMode } from '../../utils/store/actions/task';
import { ON_INPUT_CHANGE } from '../../utils/constants/actionTypes';

const CreateTaskForm: React.FC<any> = ({
  createTaskForm,
  taskEditedMode,
  selectedDay,
  onInputChange,
}) => {
  const dispatch = useDispatch();
  const disableButton: boolean = !(createTaskForm.title && createTaskForm.description);
  const currentMonth: string = (new Date().toLocaleString('default', { month: 'long' }));

  const onChange = ({ target: t }: any) => onInputChange({ value: t.value, name: t.placeholder.toLowerCase() });

  const createTaskHandler = (): void => {
    const { title, description } = createTaskForm;
    dispatch(fetchCreateTask({ title, description, selectedDay }));
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
        <p>Create task on <b>{selectedDay} {currentMonth}</b></p>

        <Input placeholder="Title" value={createTaskForm.title} onChange={onChange} />
        <Input.TextArea rows={4} placeholder="Description" value={createTaskForm.description} onChange={onChange} />

        {taskEditedMode.mode
        ? (<>
            <Button type="primary" onClick={saveEditedTaskHandler} disabled={disableButton}>Save</Button>
            <Button type="primary" onClick={cancelEditMode} danger>Cancel</Button>
          </>)
        : <Button type="primary" onClick={createTaskHandler} disabled={disableButton}>Create</Button>
        }
      </div>
    </section>
  );
};

interface IOwnProps {
  selectedDay: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps) => ({
  taskEditedMode: state.task.taskEditedMode,
  createTaskForm: state.task.createTaskForm,
  selectedDay: ownProps.selectedDay,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInputChange: (payload: any) => dispatch({ type: ON_INPUT_CHANGE, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
