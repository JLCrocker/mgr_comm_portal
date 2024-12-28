/* eslint-disable react/prop-types */
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  margin: 0 0.5rem 0 0;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  width: 99.5%;
  height: 2.5rem;
  display: grid;
  /* grid-template-rows: repeat(autofit, minmax(1rem, 2.6rem)); */
  grid-template-columns: 2.1rem 25rem 13rem 6.5rem 28% 5.75rem 2rem;
  column-gap: 0.6rem;
  border-radius: 0.5rem;
  align-items: center;
  box-shadow: inset -3px -2px 1px hsla(285, 19.7%, 23.9%, 0.24);

  background-color: rgb(249, 246, 246);
  color: ${(props) => (!props.$completed ? `#474646` : `#dddddd`)};

  font-size: 1.1rem;
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
  font-size: 1rem;
  padding: 0 0.5rem;
  /* color: #644d64; */
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
  font-size: 1rem;
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

function Task({ taskProps }) {
  const { id, completed, taskDoc, tags, dueDate, assignmentName, taskNotes } =
    taskProps;

  const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
  const displayDate = new Date(dueDate).toLocaleDateString('en-US', options);

  function handleTaskComplete() {
    toggleTaskComplete(id, completed);
  }

  function handleTaskDelete() {
    deleteTask(id);
  }

  return (
    <StyledTaskDiv $completed={completed}>
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

Task.propTypes = { completed: PropTypes.bool };
export default Task;
