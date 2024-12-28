/* eslint-disable react/prop-types */
import { CircularProgress } from '@mui/material';
import {
  getAttendanceReports,
  getBooksReports,
  getCustomersReports,
  getOpsReports,
  getOtherReports,
  getTrainingReports,
} from '../../server/apiReports';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../../server/supabase';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdOutlineNoteAdd } from 'react-icons/md';
import Report from './ShiftReportEntry';

const StyledReportsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 0.5fr));
  max-width: 100%;
  max-height: 90%;
  gap: 0.5em 0.3em;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  overflow-y: auto;
  padding: 0.25rem;
  /* border-top: 1px solid gray; */
  /* border-bottom: 1px solid gray; */
  border-radius: 0.5rem;
  /* box-shadow: inset 0px 0px 390px 55px #9d889f98; */
  /* height: 99%; */
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
  /* grid-template-columns: 8rem 1fr 0fr; */
  grid-template-columns: 8rem minmax(10rem, 79%) 9rem;
  /* grid-template-rows: 1fr; */
  /* align-items: end; */
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

function ShiftReports({ dateValue, handleModal }) {
  const [data, setData] = useState('');
  const queryClient = useQueryClient();
  const { reportModalToggle, setReportModalToggle } = handleModal;

  useEffect(() => {
    const subscription = supabase
      .channel('report_db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'reports' },

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
  }, [data, /* dateValue, */ queryClient]);

  // const {
  //   isLoading,
  //   // data: reports,
  //   error,
  // } = useQuery({
  //   queryKey: ['report'],
  //   queryFn: getReports,
  // });

  const {
    opsIsLoading,
    data: opsReports,
    opsError,
  } = useQuery({
    queryKey: ['operations', { date: dateValue }],
    queryFn: () => getOpsReports(dateValue),
  });

  const {
    booksIsLoading,
    data: booksReports,
    booksError,
  } = useQuery({
    queryKey: ['books', { date: dateValue }],
    queryFn: () => getBooksReports(dateValue),
  });

  const {
    customersIsLoading,
    data: customersReports,
    customersError,
  } = useQuery({
    queryKey: ['customers', { date: dateValue }],
    queryFn: () => getCustomersReports(dateValue),
  });

  const {
    trainingIsLoading,
    data: trainingReports,
    trainingError,
  } = useQuery({
    queryKey: ['training', { date: dateValue }],
    queryFn: () => getTrainingReports(dateValue),
  });

  const {
    othersIsLoading,
    data: otherReports,
    othersError,
  } = useQuery({
    queryKey: ['other', { date: dateValue }],
    queryFn: () => getOtherReports(dateValue),
  });

  const {
    attendanceIsLoading,
    data: attendanceReports,
    attendanceError,
  } = useQuery({
    queryKey: ['attendance', { date: dateValue }],
    queryFn: () => getAttendanceReports(dateValue),
  });

  // attendanceReports?.map((rep) => {
  //   console.log(rep);
  // });

  if (
    // isLoading ||
    customersIsLoading ||
    booksIsLoading ||
    customersIsLoading ||
    trainingIsLoading ||
    othersIsLoading ||
    attendanceIsLoading
  )
    return <CircularProgress />;
  if (
    // error,
    booksError ||
    customersError ||
    opsError ||
    trainingError ||
    othersError ||
    attendanceError
  )
    return console.error(
      booksError ||
        customersError ||
        opsError ||
        trainingError ||
        othersError ||
        attendanceError
    );

  function handleClick() {
    setReportModalToggle(!reportModalToggle);
  }

  return (
    <div
      style={{
        maxWidth: '100%',
        height: '100%',
        // borderBottom: '1px solid gray',
        // paddingBottom: '2rem',
      }}>
      <StyledHeading>
        <StyledH2>Shift Notes</StyledH2>
        <StyledNoteAdd onClick={handleClick} />
        <StyledH2 style={{ justifyContent: 'end' }}>
          {new Date(dateValue).toLocaleDateString('en-US')}
        </StyledH2>
      </StyledHeading>
      <Break />

      <StyledReportsDiv>
        {!booksIsLoading && booksReports?.length > 0 && (
          <Report reports={booksReports} />
        )}
        {!attendanceIsLoading && attendanceReports?.length > 0 && (
          <Report reports={attendanceReports} />
        )}
        {!trainingIsLoading && trainingReports?.length > 0 && (
          <Report reports={trainingReports} />
        )}
        {!opsIsLoading && opsReports?.length > 0 && (
          <Report reports={opsReports} />
        )}
        {!customersIsLoading && customersReports?.length > 0 && (
          <Report reports={customersReports} />
        )}
        {!othersIsLoading && otherReports?.length > 0 && (
          <Report reports={otherReports} />
        )}
      </StyledReportsDiv>
    </div>
  );
}

export default ShiftReports;
