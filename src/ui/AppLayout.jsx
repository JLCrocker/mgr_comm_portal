import Menu from './Sidebar/Menu';
import Sidebar from './Sidebar/Sidebar';
import ReportPane from './Reports/ShiftReportPane';
import TaskPane from './Tasks/TaskPane';
import styled from 'styled-components';
import CalendarComponent from './Sidebar/Calendar';
import { useState } from 'react';
import TaskEntry from './Tasks/TaskForm';
import ReportEntry from './Reports/ShiftReportForm';
import IncidentLogEntry from './ILogs/ILogReportForm';

const StyledLayout = styled.div`
  display: grid;
  /* grid-template-columns: 17% 33% 33% 14%; */
  /* grid-template-columns: ; */
  grid-template-columns: 18rem 83%;
  grid-template-rows: 25rem 10rem;
  grid-gap: 10px;

  /* margin: 0.5em; */
  padding: 0.5rem;
  max-height: 96.5vh;
  max-width: 100%;
`;

function AppLayout() {
  const [dateValue, setDateValue] = useState(Date.now());
  const [modalToggle, setModalToggle] = useState(false);
  const [reportModalToggle, setReportModalToggle] = useState(false);
  const [iLogModalToggle, setIlogModalToggle] = useState(false);
  const [viewSelector, setViewSelector] = useState('shiftReports');

  function handleView(newView) {
    setViewSelector(newView);
  }

  return (
    <>
      <StyledLayout>
        <TaskEntry handleModal={{ modalToggle, setModalToggle }} />
        <ReportEntry
          handleModal={{ reportModalToggle, setReportModalToggle }}
        />
        <IncidentLogEntry
          handleModal={{ iLogModalToggle, setIlogModalToggle }}
        />
        <Sidebar>
          <Menu
            handleModal={{ iLogModalToggle, setIlogModalToggle }}
            handleView={handleView}
            setViewSelector={setViewSelector}
          />
        </Sidebar>
        <ReportPane
          dateValue={dateValue}
          handleModal={{ reportModalToggle, setReportModalToggle }}
          viewSelector={viewSelector}
        />
        {/* <div
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            fontSize: '2.4rem',
            padding: '1rem',
            margin: 0,
            gridColumnStart: 4,
            backgroundColor: '#afacac',
            borderRadius: '0.5rem',
          }}>
          Dashboard
        </div> */}
        <TaskPane handleModal={{ modalToggle, setModalToggle }} />
        <CalendarComponent dateValue={dateValue} setDateValue={setDateValue} />
      </StyledLayout>
    </>
  );
}

export default AppLayout;
