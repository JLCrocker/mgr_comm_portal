/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Calendar from 'react-calendar';

const StyledCalendar = styled(Calendar)`
  grid-column: 1;
  grid-row: 3;
  /* width: 20rem; */
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  background-color: #d0cccc;
  border: inset 5px 3px 16px rgb(40, 40, 40);
  padding: 10px;
  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));

  .react-calendar__navigation__label {
    font-size: 1.2rem;
    font-weight: bold;
    width: 9.1rem;
    color: rgb(108, 64, 110);
    padding: 0;
  }
  .react-calendar__tile--now.react-calendar__tile--active {
    background-color: rgb(110, 81, 129);
  }

  .react-calendar__tile--now {
    background-color: rgb(110, 81, 129);
  }

  .react-calendar__tile--active {
    background-color: purple;
  }
`;

function CalendarComponent({ dateValue, setDateValue }) {
  function onChange(nextValue) {
    setDateValue(nextValue);
    // console.log(new Date(nextValue).toISOString().slice(0, 10));
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
