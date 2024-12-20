import Menu from './Menu';
import Sidebar from './Sidebar';
import ReportPane from './ReportPane';
import TaskPane from './Tasks/TaskPane';
import styled from 'styled-components';
import CalendarComponent from './Calendar';
import { useState } from 'react';
import TaskEntry from './Tasks/TaskEntry';
import ReportEntry from './ReportEntry';

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 18% 39% 26% 16%;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0.8em;
  margin: 0.2em;
  height: 98.5vh;
  width: 98.5vw;
`;

function AppLayout() {
  const [dateValue, setDateValue] = useState(new Date());
  const [modalToggle, setModalToggle] = useState(false);
  const [reportModalToggle, setReportModalToggle] = useState(false);

  return (
    <>
      <StyledLayout>
        <TaskEntry handleModal={{ modalToggle, setModalToggle }} />
        <ReportEntry
          handleModal={{ reportModalToggle, setReportModalToggle }}
        />
        <Sidebar>
          <Menu />
        </Sidebar>
        <ReportPane
          dateValue={dateValue}
          handleModal={{ reportModalToggle, setReportModalToggle }}
        />
        <TaskPane handleModal={{ modalToggle, setModalToggle }} />
        <CalendarComponent dateValue={dateValue} setDateValue={setDateValue} />
      </StyledLayout>
    </>
  );
}

export default AppLayout;
