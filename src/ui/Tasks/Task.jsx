/* eslint-disable react/prop-types */
import styled from 'styled-components';
import {
  MdCheckBoxOutlineBlank,
  MdOutlineDelete,
  MdCheckBox,
} from 'react-icons/md';
import { toggleTaskComplete, deleteTask } from '../../server/apiTasks';
// import { format } from 'date-fns';

const StyledTaskDiv = styled.div`
  --task-background-color: transparent;
  /* position: relative;
  display: flex;
  align-items: center;
  width: 99.5%;
  height: auto; */
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;

  display: grid;
  grid-template-rows: 1%.5;
  grid-template-columns: 3.1rem 25.5rem 14.5rem 6.5rem 28% 5.75rem 1rem;
  column-gap: 0.5rem;
  border-radius: 0.5rem;
  align-items: center;

  background-color: rgb(249, 246, 246);
  color: ${(props) => (!props.completed ? `#474646` : `#dddddd`)};

  font-size: 1.2rem;
`;

const StyledMdCheckBox = styled(MdCheckBox)`
  font-size: 2rem;
  padding-right: 1rem;
  width: 2rem;
  transition: all 0.2s ease-in;
  &:active {
    transform: scale(0.8);
  }
`;
const StyledMdCheckBoxBlank = styled(MdCheckBoxOutlineBlank)`
  font-size: 2rem;
  /* padding-right: 1rem;
  width: 2rem; */
  transition: all 0.2s ease-in;
  &:active {
    transform: scale(0.8);
  }
`;

const StyledTaskField = styled.div`
  /* margin: 0 0.5rem; */
  /* padding: 0 0.5rem;
  width: 25rem; */
  background-color: var(--task-background-color);
`;

const StyledFieldTags = styled.div`
  padding: 0 0.5rem;
  left: 30rem;
  width: 14rem;
  background-color: var(--task-background-color);
`;

const StyledFieldUsers = styled.div`
  left: 45rem;
  margin: 0 0.5rem;
  width: 6rem;
  background-color: var(--task-background-color);
`;

const StyledFieldNotes = styled.div`
  left: 52rem;
  margin: 0 0.5rem;
  width: 21rem;
  flex-wrap: wrap;
  background-color: var(--task-background-color);
`;

const StyledFieldDueBy = styled.div`
  right: 0rem;
  margin: 0 0.5rem;
  width: 6rem;
  background-color: var(--task-background-color);
`;

const StyledDelete = styled(MdOutlineDelete)`
  font-size: 1.6rem;
  color: #eeeeee;
  cursor: pointer;
  justify-self: start;
  transition: all 500ms ease-in-out;
  &:hover {
    color: rgb(198, 90, 95);
    transform: scale(1.1);
    &:active {
      transform: scale(0.8);
    }
  }
`;

function Task({ props }) {
  const { id, completed, taskDoc, tags, dueDate, assignmentName, taskNotes } =
    props;

  const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  const displayDate = new Date(dueDate).toLocaleDateString('en-US', options);

  function handleTaskComplete() {
    toggleTaskComplete(id, completed);
  }

  function handleTaskDelete() {
    deleteTask(id);
  }

  return (
    <StyledTaskDiv completed={completed}>
      <div onClick={handleTaskComplete} style={{ marginTop: '5px' }}>
        {!completed ? <StyledMdCheckBoxBlank /> : <StyledMdCheckBox />}
      </div>
      <StyledTaskField>{taskDoc}</StyledTaskField>
      <StyledFieldTags>{tags}</StyledFieldTags>
      <StyledFieldUsers>{assignmentName}</StyledFieldUsers>
      <StyledFieldNotes>{taskNotes}</StyledFieldNotes>
      <StyledFieldDueBy>{displayDate}</StyledFieldDueBy>
      <StyledDelete onClick={handleTaskDelete} />
    </StyledTaskDiv>
  );
}

export default Task;