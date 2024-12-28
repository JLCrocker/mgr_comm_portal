import styled from 'styled-components';

const StyledILogDiv = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.25fr 1.25fr 1.5fr 1fr;
  width: 97%;
  background-color: rgb(251, 250, 252);
  border: 1px solid black;
  margin: 0.5rem 0 0.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StyledNameField = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  padding: 1rem 0.5rem;
`;

const StyledFieldDiv = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 1rem;
  border-left: 0.5px solid gray;
`;

function ILReport(il) {
  return (
    <>
      <StyledILogDiv>
        <StyledNameField>
          {il.il.employees.first_name} {il.il.employees.last_name}
        </StyledNameField>
        <StyledFieldDiv>
          {new Date(il.il.date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          })}
        </StyledFieldDiv>
        <StyledFieldDiv> {il.il.incident} </StyledFieldDiv>
        <StyledFieldDiv> {il.il.action} </StyledFieldDiv>
        <StyledFieldDiv> {il.il.comments} </StyledFieldDiv>
      </StyledILogDiv>
    </>
  );
}

export default ILReport;
