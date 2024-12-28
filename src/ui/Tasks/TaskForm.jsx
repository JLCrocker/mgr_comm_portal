/* eslint-disable react/prop-types */
import styled from 'styled-components';
// import supabase from '../../server/supabase';
import { MdOutlineClose } from 'react-icons/md';
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { styled as muiStyled } from '@mui/material/styles';
import { DesktopDatePicker, PickersLayout } from '@mui/x-date-pickers';
import { useState } from 'react';
import { submitTasks } from '../../server/apiTasks';

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(41, 29, 43, 0.46);
  backdrop-filter: blur(9px);
  z-index: 15;
  visibility: visible;
`;

const StyledModalDiv = styled.div`
  background-color: rgb(241, 239, 241);
  border: 1px inset rgba(58, 49, 58, 0.82);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 32rem;
  width: 35rem;
  border-radius: 10px;
  /* transform: translateY(-5%); */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
  padding: 1.5rem;
`;

const StyledTaskInputHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
`;

const StyledExitIcon = styled(MdOutlineClose)`
  font-size: 2.25rem;
  color: rgb(88, 88, 88);
  transition: transform 0.55s ease-in-out, color 0.2s ease-in;
  &:hover {
    transform: scale(1.2);
    color: rgb(209, 209, 209);
  }
  &:active {
    transform: scale(0.8);
  }
`;

const StyledH2 = styled.h2`
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  color: transparent;
  background-color: rgb(88, 88, 88);
  text-shadow: 0.45px 0.25px 1px rgba(87, 85, 85, 0.45);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  margin: 0;
`;

const Break = styled.div`
  height: 0.05rem;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.45);
  margin: 0;
  margin-bottom: 0.6rem;
`;

const StyledPickersLayout = styled(PickersLayout)({
  '.MuiDateCalendar-root': {
    color: '#a360b5',
    borderRadius: '2px',
    borderWidth: '2px',
    borderColor: '#a360b5',
    border: '1px solid',
    backgroundColor: '#eeeeee',
  },
});

const StyledTextField = styled(TextField)``;

// eslint-disable-next-line react/prop-types
function TaskEntry({ handleModal }) {
  // eslint-disable-next-line no-unused-vars
  const { modalToggle, setModalToggle } = handleModal;
  const [taskDescription, setTaskDescription] = useState('');
  const [taskTags, setTaskTags] = useState('');
  const [taskAssignment, setTaskAssignment] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  function closeModal() {
    setModalToggle(!closeModal);
  }

  function clearForm() {
    setTaskAssignment('');
    setTaskTags('');
    setTaskDescription('');
    setTaskNotes('');
    setTaskDueDate('');
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const dueDate = new Date(taskDueDate.$d).toISOString();

    const newTask = {
      taskDescription,
      taskTags,
      taskAssignment,
      taskNotes,
      dueDate,
    };

    submitTasks(newTask);
    clearForm();
    closeModal();
  }

  return (
    <StyledModal style={{ visibility: modalToggle ? 'visible' : 'hidden' }}>
      <StyledModalDiv>
        <StyledTaskInputHeader>
          <StyledH2>Create Task</StyledH2>
          <StyledExitIcon onClick={closeModal} />
        </StyledTaskInputHeader>
        <Break />
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            autoFocus
            id="outlined-basic"
            label="Enter your new task."
            variant="standard"
            multiline
            minRows={2}
            margin="normal"
            fullWidth
            color="secondary"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Tag It."
            variant="standard"
            margin="normal"
            fullWidth
            color="secondary"
            value={taskTags}
            onChange={(e) => setTaskTags(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Assign it."
            variant="standard"
            margin="normal"
            fullWidth
            color="secondary"
            value={taskAssignment}
            onChange={(e) => setTaskAssignment(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Add some context."
            variant="outlined"
            multiline
            minRows={3}
            margin="normal"
            fullWidth
            color="secondary"
            value={taskNotes}
            onChange={(e) => setTaskNotes(e.target.value)}
          />
          {/* <TextField
            id="outlined-basic"
            label="Set the date."
            variant="standard"
            margin="normal"
            fullWidth
            color="secondary"
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              slots={{
                textField: StyledTextField,
                layout: StyledPickersLayout,
              }}
              label="Set a Date"
              defaultValue={new Date().now}
              // value={taskDueDate}
              onChange={(newValue) => setTaskDueDate(newValue)}
            />
            <Button type="submit" color="secondary" variant="standard">
              Submit
            </Button>
          </LocalizationProvider>
        </form>
      </StyledModalDiv>
    </StyledModal>
  );
}

export default TaskEntry;
