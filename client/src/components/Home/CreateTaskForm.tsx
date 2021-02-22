import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import {
  ON_INPUT_CHANGE,
  CREATE_TASK,
  CANCEL_EDIT_MODE,
  SAVE_EDITED_TASK,
} from '../../utils/constants/actionTypes';

const CreateTaskForm = ({
  createTaskForm,
  taskEditedMode,
  selectedDay,
  create,
  onInputChange,
  cancelEditMode,
  saveEditedTask,
}: any) => {
  const disableButton = !(createTaskForm.title && createTaskForm.description);
  const currentMonth: string = (new Date().toLocaleString('default', { month: 'long' }));

  return (
    <section className="create-task">
      <div className="create-task__content">
        <p>Create task on <b>{selectedDay} {currentMonth}</b></p>

        <Input
          placeholder="Title"
          value={createTaskForm.title}
          onChange={({ target: { value } }) => onInputChange({ value, name: 'title' })}
        />

        <Input.TextArea
          rows={4}
          placeholder="Description"
          value={createTaskForm.description}
          onChange={({ target: { value } }) => onInputChange({ value, name: 'description' })}
        />

        {taskEditedMode.mode
        ? (<>
            <Button type="primary" onClick={saveEditedTask} disabled={disableButton}>Save</Button>
            <Button type="primary" onClick={cancelEditMode} danger={true}>Cancel</Button>
          </>)
        : <Button type="primary" onClick={() => create({ selectedDay })} disabled={disableButton}>Create</Button>
        }
      </div>
    </section>
  );
};

interface IOwnProps {
  selectedDay: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps) => ({
  taskEditedMode: state.taskEditedMode,
  createTaskForm: state.createTaskForm,
  selectedDay: ownProps.selectedDay,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: any) => dispatch({ type: CREATE_TASK, payload }),
  onInputChange: (payload: any) => dispatch({ type: ON_INPUT_CHANGE, payload }),
  cancelEditMode: () => dispatch({ type: CANCEL_EDIT_MODE }),
  saveEditedTask: () => dispatch({ type: SAVE_EDITED_TASK }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
