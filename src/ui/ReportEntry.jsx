/* eslint-disable react/prop-types */
import styled from 'styled-components';
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

import { getCategories, submitReport } from '../server/apiReports';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../server/apiUsers';
// import { submitReport } from '../../server/apiReports';

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(41, 33, 43, 0.53);
  backdrop-filter: blur(10px);
  z-index: 15;
  visibility: visible;
`;

const StyledModalDiv = styled.div`
  background-color: rgb(241, 239, 241);
  border: 1px inset rgba(58, 49, 58, 0.82);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 2% 20% 20% 20% 20%;
  grid-row-gap: 0.1rem;
  /* flex-direction: column; */
  /* justify-content: flex-start; */
  /* align-items: center; */
  /* width: 35rem; */
  border-radius: 10px;
  /* transform: translateY(-5%); */
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
  padding: 1.25rem;
`;

const StyledReportInputHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: end;
  width: 100%;
  padding: 0;
  height: 2.5rem;
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
  margin-bottom: 1rem;
`;

// eslint-disable-next-line react/prop-types
function ReportEntry({ handleModal }) {
  // eslint-disable-next-line no-unused-vars
  const { reportModalToggle, setReportModalToggle } = handleModal;
  const [report, setReport] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');

  function closeModal() {
    setReportModalToggle(!reportModalToggle);
  }

  function clearForm() {
    setReport('');
    setUser('');
    setCategory('');
  }

  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    isLoading: usersLoading,
    data: users,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (usersLoading) return console.log('users loading...');
  if (usersError) return console.error(error);

  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
  };

  function findAndSetUser(user) {
    const foundUser = users.find((u) => u.first_name === user);
    setUserId(Number(foundUser.user_id));
    console.log(userId);
  }

  const handleSelectUser = (event) => {
    setUser(event.target.value);
    findAndSetUser(event.target.value);
    // const selectedUserId = users.find((el) => {
    //   if (el.first_name === user) return el;
    // });
    // setUserId(selectedUser.user_id);
  };

  function handleSubmitForm(e) {
    e.preventDefault();
    const newReport = { userId, category, report };

    console.log(newReport);

    submitReport(newReport);
    clearForm();
    closeModal();
  }

  if (error) console.error(error);
  if (isLoading) console.log('loading...');

  return (
    <StyledModal
      style={{ visibility: reportModalToggle ? 'visible' : 'hidden' }}>
      <StyledModalDiv>
        <StyledReportInputHeader>
          <StyledH2>New Report</StyledH2>
          <StyledExitIcon onClick={closeModal} />
        </StyledReportInputHeader>
        <Break />
        <form onSubmit={handleSubmitForm}>
          <Box sx={{ minWidth: 600 }}>
            <FormControl sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="user-selector-label">User</InputLabel>
              <Select
                required
                labelId="user-selector-label"
                id="user-simple-select"
                value={user}
                label="User"
                onChange={handleSelectUser}>
                {/* <MenuItem value={10}>Ten</MenuItem> */}
                {isLoading
                  ? 'Loading'
                  : users.map((el) => (
                      <MenuItem key={el.user_id} value={el.first_name}>
                        {el.first_name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 280 }}>
              <InputLabel id="category-selector-label">Category</InputLabel>
              <Select
                labelId="category-selector-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                margin="none"
                onChange={handleSelectCategory}>
                {/* <MenuItem value={10}>Ten</MenuItem> */}
                {isLoading
                  ? 'Loading'
                  : categories.map((el) => (
                      <MenuItem key={el.id} value={el.category}>
                        {el.category}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            {/* </Box>
            <Box sx={{ minWidth: 600 }}> */}
          </Box>
          <FormControl sx={{ m: 0, minWidth: 590 }}>
            <Box>
              <TextField
                required
                autoFocus
                id="outlined-basic"
                label="Report what happened:"
                variant="outlined"
                multiline
                minRows={5}
                margin="dense"
                fullWidth
                color="secondary"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />
            </Box>
          </FormControl>
          <div style={{ margin: '0.5rem', justifySelf: 'end' }}>
            <Button
              type="submit"
              color="inherit"
              variant="outlined"
              size="medium">
              Submit
            </Button>
          </div>
        </form>
      </StyledModalDiv>
    </StyledModal>
  );
}

export default ReportEntry;
