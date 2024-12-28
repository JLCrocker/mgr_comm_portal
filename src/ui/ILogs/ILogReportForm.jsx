/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { format } from 'date-fns';
// import supabase from '../../server/supabase';
import { MdOutlineClose } from 'react-icons/md';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getUsers } from '../../server/apiUsers';
import { getEmployees } from '../../server/apiEmployees';
import { submitIlog } from '../../server/apiIlogs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { styled as muiStyled } from '@mui/material/styles';
import { DesktopDatePicker, PickersLayout } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { submitILog } from '../../server/apiILogs';

const StyledModal = styled.div`
  position: absolute;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  margin: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(41, 29, 43, 0.46);
  backdrop-filter: blur(9px);
  z-index: 15;
  visibility: visible;
`;

const StyledModalDiv = styled.div`
  position: relative;
  margin: 0 auto;
  top: 10rem;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr; */
  background-color: rgb(241, 239, 241);
  border: 1px inset rgba(58, 49, 58, 0.82);

  height: 70%;
  width: 34%;
  border-radius: 10px;
  /* transform: translateY(-5%); */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
  padding: 1.5rem;
`;

const StyledInputHeader = styled.header`
  grid-column-start: 1;
  grid-column-end: 5;
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
  grid-row-start: 2;
  grid-column: 1 / 5;
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

const StyledBox = styled(Box)``;

// eslint-disable-next-line react/prop-types
function IncidentLogEntry({ handleModal }) {
  // eslint-disable-next-line no-unused-vars
  const { iLogModalToggle: modalToggle, setIlogModalToggle: setModalToggle } =
    handleModal;
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [employee, setEmployee] = useState('');
  const [incident, setIncident] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [comments, setComments] = useState('');
  const [userId, setUserId] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  function closeModal() {
    setModalToggle(!closeModal);
  }

  const {
    isLoading: usersLoading,
    data: users,
    // error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  function findAndSetUser(user) {
    const foundUser = users.find((u) => u.first_name === user);
    setUserId(Number(foundUser.user_id));
    // console.log(userId);
  }

  const handleSelectUser = (event) => {
    setUser(event.target.value);
    findAndSetUser(event.target.value);
  };

  const {
    isLoading: employeesLoading,
    data: employees,
    // error: employeesError,
  } = useQuery({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });

  function findAndSetEmployee(employee) {
    const foundEmployee = employees.find((emp) => emp.first_name === employee);
    setEmployeeId(Number(foundEmployee.id));
    // console.log(employee);
  }

  const handleSelectEmployee = (event) => {
    setEmployee(event.target.value);
    findAndSetEmployee(event.target.value);
  };

  // if (usersLoading) return console.log('users loading...');
  // if (usersError) return console.error(usersError);
  // if (employeesLoading) return console.log('employees loading...');
  // if (employeesError) return console.error(usersError);

  function clearForm() {
    setUser('');
    setEmployee('');
    setIncident('');
    setActionTaken('');
    setComments('');
    setDate('');
    setUserId('');
    setEmployeeId('');
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(date);

    const newIlog = {
      userId,
      employeeId,
      date,
      incident,
      actionTaken,
      comments,
    };

    submitIlog(newIlog);
    clearForm();
    closeModal();
  }

  return (
    <StyledModal style={{ visibility: modalToggle ? 'visible' : 'hidden' }}>
      <StyledModalDiv>
        <StyledInputHeader>
          <StyledH2>Record an Incident</StyledH2>
          <StyledExitIcon onClick={closeModal} />
        </StyledInputHeader>
        <Break />
        <StyledBox
          sx={{
            display: 'flex',
            flexDirection: 'row',
            m: 1,
            width: '80ch',
          }}>
          {' '}
          <form onSubmit={handleSubmitForm}>
            <Box sx={{ minWidth: 600 }}>
              <FormControl sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="user-selector-label" color="secondary">
                  User
                </InputLabel>
                <Select
                  required
                  autoFocus
                  labelId="user-selector-label"
                  id="user-simple-select"
                  color="secondary"
                  value={user}
                  label="User"
                  onChange={handleSelectUser}>
                  {/* <MenuItem value={10}>Ten</MenuItem> */}
                  {usersLoading
                    ? 'Loading'
                    : users.map((el) => (
                        <MenuItem key={el.user_id} value={el.first_name}>
                          {el.first_name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 280 }}>
                <InputLabel id="employee-selector-label" color="secondary">
                  Employee
                </InputLabel>
                <Select
                  labelId="employee-selector-label"
                  id="demo-simple-select"
                  color="secondary"
                  // defualtValue={''}
                  value={employee}
                  label="Employee"
                  margin="none"
                  onChange={handleSelectEmployee}>
                  {/* <MenuItem value={10}>Ten</MenuItem> */}
                  {employeesLoading
                    ? 'Loading...'
                    : employees.map((el) => (
                        <MenuItem key={el.id} value={el.first_name}>
                          {el.first_name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Box>

            <TextField
              required
              autoFocus
              id="outlined-basic"
              label="What happened?"
              variant="outlined"
              multiline
              fullWidth
              minRows={6}
              margin="normal"
              color="secondary"
              value={incident}
              onChange={(e) => setIncident(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="What action did you take?"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              minRows={5}
              color="secondary"
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Comments"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              minRows={6}
              color="secondary"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  slots={{
                    textField: StyledTextField,
                    layout: StyledPickersLayout,
                  }}
                  label="Set a Date"
                  // defaultValue={new Date()}
                  onChange={(newValue) =>
                    setDate(format(new Date(newValue), 'yyyyMMdd'))
                  }
                />
              </LocalizationProvider>
              <Button type="submit" color="secondary" variant="standard">
                Submit
              </Button>
            </Box>
          </form>
        </StyledBox>
      </StyledModalDiv>
    </StyledModal>
  );
}

export default IncidentLogEntry;
