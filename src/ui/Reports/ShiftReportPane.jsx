/* eslint-disable react/prop-types */
import styled from 'styled-components';
// import supabase from '../../server/supabase.js';
// import {
//   // getReports,
//   getOpsReports,
//   getBooksReports,
//   getCustomersReports,
//   getTrainingReports,
//   getOtherReports,
//   getAttendanceReports,
// } from '../../server/apiReports.js';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { MdOutlineNoteAdd } from 'react-icons/md';
// import Report from './Report.jsx';
// import { useState, useEffect } from 'react';
// import { CircularProgress } from '@mui/material';
import ShiftReports from './ShiftReports.jsx';
import ILogReports from '../ILogs/ILogReportsPane.jsx';

// eslint-disable-next-line no-unused-vars

const StyledDiv = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  border-radius: var(--border-radius-primary);
  max-width: 100vw;
  max-height: 100%;
  background-color: #ebe7e7;
  border: 1px inset rgb(240, 239, 239);
  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));
  /* resize: vertical; */
  overflow: auto;
  border-bottom: 1px solid gray;
  padding: 0.75rem;
`;

function ReportPane({ dateValue, handleModal, viewSelector }) {
  return (
    <>
      <StyledDiv>
        {viewSelector === 'shiftReports' && (
          <ShiftReports dateValue={dateValue} handleModal={handleModal} />
        )}
        {viewSelector === 'ILs' && <ILogReports />}
      </StyledDiv>
    </>
  );
}

export default ReportPane;
