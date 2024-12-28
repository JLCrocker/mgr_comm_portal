/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MdOutlineNoteAdd } from 'react-icons/md';
import { getILogs, getILogsByNameAndDate } from '../../server/apiIlogs';
import supabase from '../../server/supabase';
import {
  DesktopDatePicker,
  LocalizationProvider,
  PickersLayout,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getEmployees } from '../../server/apiEmployees';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // TextField,
  CircularProgress,
} from '@mui/material';
// import { format } from 'date-fns';
import dayjs from 'dayjs';
import ILReport from './ILogReportEntry';

const StyledMainDiv = styled.div`
  overflow-y: hidden;
  max-width: 100%;
  height: 100%;
`;
const StyledH2 = styled.h2`
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  color: transparent;
  background-color: rgb(14, 14, 14);
  text-shadow: 0.45px 0.25px 1px rgba(255, 255, 255, 0.45);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  margin: 0;
`;

const Break = styled.div`
  position: fixed;
  display: block;
  height: 0.05rem;
  width: 98%;
  background-color: #444444;
  margin: 0;
`;

const StyledHeading = styled.div`
  display: grid;
  grid-template-columns: 10rem 4fr 4fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  align-items: end;
  padding-bottom: 0.3rem;
`;

const StyledNoteAdd = styled(MdOutlineNoteAdd)`
  font-size: 1.5rem;
  color: #037022;
  margin-bottom: 0.15rem;
  transition: all 200ms ease-in-out;
  &:hover {
    color: #06f249;
  }
  &:active {
    transform: scale(0.9);
    color: #037022;
  }
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

const StyledILogsMainDiv = styled.div`
  margin-top: 0.5rem;
  /* padding: 0.25rem; */
  overflow-y: scroll;
  height: 76%;
  border-top: 0.25px solid #afacac;
  border-bottom: 0.25px solid #afacac;
  padding: 0.25rem;
`;

const StyledILogsListHeader = styled.div`
  display: grid;
  padding-top: 0.5rem;
  margin-left: 1rem;
  /* grid-template-columns: 0.61fr 0.395fr 1.35fr 1.62fr 1.18fr; */
  grid-template-columns: 0.5fr 0.25fr 1.25fr 1.5fr 1.02fr;
  width: 96.8%;
  /* max-width: 100%; */
  /* justify-items: center; */
  margin: 0 auto;
`;

// const StyledHeaderField = styled.div`
//   /* display: flex; */
//   align-items: center;
//   justify-items: center;
//   font-weight: 600;
//   margin: 10px 0 0 0;
//   /* padding: 0.25rem 0 0 1.5rem; */
//   padding: 0 0.75rem;
//   max-width: 100%;
//   border-left: 0.5px solid gray;
//   &:first-child {
//     border: none;
//   }
// `;

const StyledNameField = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 400;
  padding: 0.5rem 0 0 0rem;
  width: 100%;
  max-height: 1rem;
  /* width: 7.9rem; */
`;

const StyledFieldDiv = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 0.5rem 0.95rem 0 1rem;
  /* border-left: 0.5px solid gray; */
  height: 1rem;
  margin-right: 2.2rem;
  /* max-width: 100%; */
`;
// const StyledTextField = styled(TextField)``;

function ILogReports({ iLogModalToggle, setIlogModalToggle }) {
  const [data, setData] = useState(false);
  const [startDate, setStartDate] = useState(
    dayjs(Date.now()).subtract(1, 'year')
  );
  const [endDate, setEndDate] = useState(dayjs(Date.now()));
  const [employee, setEmployee] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  function handleClick() {
    setIlogModalToggle(!iLogModalToggle);
  }

  // Get All ILogs
  const {
    isLoading: isLoading,
    data: allILogs,
    error: error,
  } = useQuery({
    queryKey: ['iLogReports'],
    queryFn: getILogs,
  });

  // Get ILogs by Name and Date
  const {
    iLogsByNameAndDateIsLoading,
    data: iLogsByNameAndDate,
    // iLogsByNameAndDateError,
  } = useQuery({
    queryKey: [
      'iLogsNameAndDate',
      { employeeId: employeeId, startDate: startDate, endDate: endDate },
    ],
    queryFn: () => getILogsByNameAndDate(employeeId, startDate, endDate),
  });

  // Get Employees Name List
  const {
    isLoading: employeesLoading,
    data: employees,
    error: employeesError,
  } = useQuery({
    queryKey: ['iLogEmployees'],
    queryFn: getEmployees,
  });

  function handleReset() {
    setEmployeeId('');
    setStartDate(dayjs(Date.now()).subtract(1, 'year'));
    setEndDate(dayjs(Date.now()));
    setEmployee('');
  }

  function findAndSetEmployee(employee) {
    const foundEmployee = employees.find((emp) => emp.first_name === employee);
    setEmployeeId(Number(foundEmployee.id));
    console.log(employee);
  }

  const handleSelectEmployee = (event) => {
    setEmployee(event.target.value);
    findAndSetEmployee(event.target.value);
  };

  // Subscribe to ILogs
  const queryClient = useQueryClient();
  useEffect(() => {
    const subscription = supabase
      .channel('ilog-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'incident_logs' },

        // Update component state with new data
        (payload) => {
          console.log(payload.new),
            setData(!data),
            queryClient.invalidateQueries();
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => subscription.unsubscribe();
  }, [data, startDate, endDate, employeeId, queryClient]);

  // console.log(iLogsByNameAndDateIsLoading, iLogsByNameAndDateError);
  // if (employeesLoading) return console.log('employees loading...');
  if (employeesError) return console.error(employeesError);

  var iLogs = '';
  iLogsByNameAndDate ? (iLogs = iLogsByNameAndDate) : (iLogs = allILogs);
  return (
    <StyledMainDiv>
      <StyledHeading>
        <StyledH2>Incident Logs</StyledH2>
        <StyledNoteAdd onClick={handleClick} />
      </StyledHeading>
      <Break />
      <Box
        sx={{
          margin: '0.75rem 0',
          display: 'flex',
          alignContent: 'center',
          width: '58%',
          height: '2.5rem',
        }}>
        <FormControl
          sx={{
            minWidth: 280,
          }}>
          <InputLabel id="employee-selector-label" color="secondary">
            Employee
          </InputLabel>
          {!employeesLoading && (
            <Select
              labelId="employee-selector-label"
              id="employee-selector"
              color="secondary"
              size="small"
              value={employee}
              label="Employee"
              sx={{
                width: '17rem',
                marginRight: '0.5rem',
              }}
              onChange={handleSelectEmployee}>
              {employees.map((el) => (
                <MenuItem key={el.id} value={el.first_name}>
                  {el.first_name} {el.last_name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
            slots={{
              layout: StyledPickersLayout,
            }}
            value={startDate}
            sx={{
              width: '12.1rem',
              marginRight: '0.5rem',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#9500ae',
                },
                '&.MuiTextField-root': {
                  color: 'purple',
                },
              },
            }}
            label="Start Date"
            // defaultValue={new Date()}
            onChange={(newValue) =>
              setStartDate(dayjs(new Date(newValue).toISOString().slice(0, 10)))
            }
          />
          <DesktopDatePicker
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
            slots={{
              layout: StyledPickersLayout,
            }}
            sx={{
              width: '12.1rem',
              marginRight: '0.5rem',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#9500ae',
                },
                '&.MuiInputLabel-formControl': {
                  color: 'purple',
                },
              },
            }}
            label="End Date"
            value={endDate}
            onChange={(newValue) =>
              setEndDate(dayjs(new Date(newValue).toISOString().slice(0, 10)))
            }
          />
          <Button
            onClick={handleReset}
            color="secondary"
            variant="outlined"
            style={{ height: '2.5rem' }}>
            Reset
          </Button>
        </LocalizationProvider>
      </Box>
      <Break />
      <StyledILogsListHeader>
        <StyledNameField>Employee Name</StyledNameField>
        <StyledFieldDiv>Date</StyledFieldDiv>
        <StyledFieldDiv>Incident</StyledFieldDiv>
        <StyledFieldDiv>Action Taken</StyledFieldDiv>
        <StyledFieldDiv>Comments</StyledFieldDiv>
      </StyledILogsListHeader>
      <StyledILogsMainDiv>
        {iLogsByNameAndDateIsLoading || isLoading ? (
          <CircularProgress sx={{ m: '0 auto' }} />
        ) : (
          !error &&
          iLogs?.map((il) => {
            return <ILReport il={il} key={il.id} />;
          })
        )}
      </StyledILogsMainDiv>
    </StyledMainDiv>
  );
}

export default ILogReports;
