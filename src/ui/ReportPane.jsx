/* eslint-disable react/prop-types */
import styled from 'styled-components';
// import ReportEntry from './Report.jsx';
import {
  getReports,
  getOpsReports,
  getBooksReports,
  getCustomersReports,
  getTrainingReports,
} from '../server/apiReports';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineNoteAdd } from 'react-icons/md';
import Report from './Report.jsx';
// import { useState } from 'react';

// eslint-disable-next-line no-unused-vars

const StyledDiv = styled.div`
  grid-column: 2 / span 3;
  grid-row-start: 1;
  border-radius: var(--border-radius-primary);
  width: 96%;
  height: 60vh;
  background-color: #e1dddd;
  border: 1px inset rgb(124, 123, 123);
  padding: 1rem;

  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));
  overflow: scroll;
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
  grid-template-columns: 8rem 1fr 0fr;
  grid-template-rows: 1fr;
  align-items: end;
  padding-bottom: 0.3rem;
`;

const StyledReportsDiv = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  gap: 0.5em 1.2em;
  overflow: scroll;
  margin-top: 0.75rem;
  height: 93%;
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

function ReportPane({ dateValue, handleModal }) {
  const { reportModalToggle, setReportModalToggle } = handleModal;
  const {
    isLoading,
    data: reports,
    error,
  } = useQuery({
    queryKey: ['report'],
    queryFn: getReports,
  });

  const {
    opsIsLoading,
    data: opsReports,
    opsError,
  } = useQuery({
    queryKey: ['operations'],
    queryFn: getOpsReports,
  });

  const {
    booksIsLoading,
    data: booksReports,
    booksError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooksReports,
  });

  const {
    customersIsLoading,
    data: customersReports,
    customersError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomersReports,
  });

  const {
    // customersIsLoading,
    data: trainingReports,
    // customersError,
  } = useQuery({
    queryKey: ['training'],
    queryFn: getTrainingReports,
  });

  console.log(booksReports);
  console.log(customersReports);
  console.log(trainingReports);
  console.log(opsReports);

  if (customersIsLoading) return <p>Ops Loading...</p>;
  if (customersError) return console.error(error);
  if (booksIsLoading) return <p>Ops Loading...</p>;
  if (booksError) return console.error(error);
  if (opsIsLoading) return <p>Ops Loading...</p>;
  if (opsError) return console.error(error);
  if (isLoading) return <p>Loading</p>;
  if (error) return console.error(error);

  function handleClick() {
    setReportModalToggle(!reportModalToggle);
  }
  return (
    <>
      <StyledDiv>
        <StyledHeading>
          <StyledH2>Shift Notes</StyledH2>
          <StyledNoteAdd onClick={handleClick} />
          <StyledH2>{new Date(dateValue).toLocaleDateString('en-US')}</StyledH2>
        </StyledHeading>
        <Break />
        <StyledReportsDiv>
          {reports.map((report) => {
            return <Report props={report} key={report.id} />;
          })}
        </StyledReportsDiv>
      </StyledDiv>
    </>
  );
}

export default ReportPane;
