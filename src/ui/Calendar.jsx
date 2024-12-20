/* eslint-disable react/prop-types */
import styled from 'styled-components';
// import { useState } from 'react';
import Calendar from 'react-calendar';
// import onChange from './AppLayout';
// import value from './AppLayout';

const StyledCalendar = styled(Calendar)`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 99%;
  background-color: #d0cccc;
  border: inset 5px 3px 16px rgb(149, 149, 149);
  border-radius: var(--border-radius-primary);
  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));

  .react-calendar__navigation__label {
    font-size: 1.2rem;
    font-weight: bold;
    width: 9.1rem;
    color: rgb(108, 64, 110);
    padding: 0;
  }
  .react-calendar__tile--now.react-calendar__tile--active {
    background-color: rgb(178, 96, 233);
  }

  .react-calendar__tile--now {
    background-color: pink;
  }

  .react-calendar__tile--active {
    background-color: purple;
  }
`;

// const CalendarHeader = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const StyledMonth = styled.h3`
//   font-size: 1.4em;
//   margin: 0.5em;
//   color: rgb(73, 70, 70);
// `;

// const StyledYear = styled.h3`
//   font-size: 1.4em;
//   margin: 0.5em;
//   color: #f10707;
// `;

function CalendarComponent({ dateValue, setDateValue }) {
  function onChange(nextValue) {
    setDateValue(nextValue);
    console.log(new Date(nextValue).toISOString());
  }
  return (
    <StyledCalendar
      onChange={onChange}
      // onClick={(e) => console.log(e.target.value)}
      value={dateValue}
    />
  );
}

export default CalendarComponent;
