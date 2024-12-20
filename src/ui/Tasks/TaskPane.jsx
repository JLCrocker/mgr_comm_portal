/* eslint-disable react/prop-types */
import supabase from '../../server/supabase';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Task from './Task';
import { getTasks } from '../../server/apiTasks';
import { MdAddTask } from 'react-icons/md';
import { CircularProgress } from '@mui/material';

const StyledTaskPane = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ebe7e7;
  width: 96%;
  height: 94.5%;
  grid-column: 2 / span 3;
  grid-row: 2 / span 1;
  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));
  border-radius: var(--border-radius-primary);
  border: 1px inset rgb(124, 123, 123);

  padding: 0.75rem 1rem 0.2rem 1rem;
  overflow: scroll;
`;

const StyledTaskPaneHeader = styled.div`
  display: grid;
  grid-template-rows: 1%.5;
  grid-template-columns: 3.5rem 26rem 14.5rem 6.5rem 26.5% 5rem;
  column-gap: 0.5rem;
  /* height: 1.25rem; */
  /* align-content: start; */
  /* padding: 0.25rem; */
`;

const StyledTagsHeader = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  color: #444444;
  align-self: end;
  padding-bottom: 0.4rem;
`;

const StyledAssignmentHeader = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  color: #444444;
  align-self: end;
  padding-bottom: 0.4rem;
`;

const StyledNotesHeader = styled.div`
  font-weight: 300;
  font-size: 0.9rem;
  color: #444444;
  align-self: end;
  padding-bottom: 0.4rem;
`;

const StyledDueDateHeader = styled.div`
  justify-self: right;
  font-weight: 300;
  font-size: 0.9rem;
  color: #444444;
  align-self: end;
  padding-bottom: 0.4rem;
`;

const StyledH2 = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  color: #444444;
  /* border: solid 1px red; */
`;

const StyledSpinner = styled(CircularProgress)`
  align-self: center;
  margin-top: 8rem;
`;

const StyledAddTask = styled(MdAddTask)`
  font-size: 1.6rem;
  margin-left: 0.7rem;
  color: #037022;
  transition: all 0.3s;
  &:hover {
    color: #06f249;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
    color: rgb(2, 76, 24);
  }
`;

const Break = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background-color: black;
  margin: 0.25rem 0 0.5rem 0;
`;

// eslint-disable-next-line react/prop-types
function TaskPane({ handleModal }) {
  const { modalToggle, setModalToggle } = handleModal;
  const [data, setData] = useState(true);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  console.log(tasks);
  function handleClick() {
    setModalToggle(!modalToggle);
  }

  useEffect(() => {
    const subscription = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },

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
  }, [data, queryClient]);

  if (error) return console.error(error);

  return (
    <StyledTaskPane>
      <StyledTaskPaneHeader>
        <StyledAddTask onClick={handleClick} />
        <StyledH2>Tasks</StyledH2>
        <StyledTagsHeader>Tag</StyledTagsHeader>
        <StyledAssignmentHeader>Assignment</StyledAssignmentHeader>
        <StyledNotesHeader>Notes</StyledNotesHeader>
        <StyledDueDateHeader>Due Date</StyledDueDateHeader>
      </StyledTaskPaneHeader>
      <Break />
      {isLoading ? (
        <StyledSpinner color="inherit" />
      ) : (
        <div style={{ overflow: 'scroll' }}>
          {tasks.map((task) => {
            return <Task props={task} key={task.id} />;
          })}
        </div>
      )}
    </StyledTaskPane>
  );
}

export default TaskPane;
