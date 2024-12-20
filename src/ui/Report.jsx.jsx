/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
import { format } from 'date-fns';

const StyledReportEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  height: 99%;
  width: 99%;
  background-color: #f6f4f4;
  color: black;
  border-radius: 5px;
  /* overflow: scroll; */
  margin: 0;
  padding-left: 1rem;
`;

const StyledReportHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: rgb(236, 234, 234);
  /* border-bottom: solid 1px #444444; */
  height: 1.4rem;
  width: 97%;
  padding: 0 0.25rem;
  border-radius: 5px;
`;

const StyledCategoryHeading = styled.h2`
  ${(props) =>
    props.category === 'operations' &&
    css`
      color: rgb(221, 118, 100);
    `}
  ${(props) =>
    props.category === 'bookkeeping' &&
    css`
      color: rgb(83, 164, 107);
    `}
    ${(props) =>
    props.category === 'training' &&
    css`
      color: rgb(83, 86, 164);
    `}
    ${(props) =>
    props.category === 'customers' &&
    css`
      color: rgb(164, 83, 155);
    `}
  font-weight: 700;
  height: 0.8rem;
  justify-self: flex-start;
  font-size: 1.2rem;
  padding: 0 0.25rem;
  margin-right: 1rem;
`;

const StyledReportParagraph = styled.div`
  padding: 0 0.5rem 0.5rem 0;
  margin-top: 0;
  height: 100%;
  color: black;
  font-size: 1.1rem;
  font-weight: 400;
`;

const StyledUserHeading = styled.h3`
  font-weight: 300;
  font-size: 0.8rem;
  justify-self: end;

  span {
    margin-left: 0.3rem;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 0.3rem;
  }
`;
const StyledTimeHeading = styled.h3`
  justify-self: end;
  font-weight: 300;
  font-size: 0.8rem;
  span {
    margin-left: 0.1rem;
    font-weight: 500;
    font-size: 1rem;
  }
`;

function Report({ props }) {
  const { category, created_at, report } = props;

  const firstName = props.users.first_name;
  return (
    <>
      <StyledReportEntry>
        <StyledCategoryHeading category={category}>
          {category.toLocaleUpperCase()}
        </StyledCategoryHeading>
        <StyledReportHeader>
          <StyledUserHeading>
            Reported by:
            <span>{firstName}</span>
          </StyledUserHeading>
          <StyledTimeHeading>
            at <span>{format(new Date(created_at), 'h:m aaa')}</span>
          </StyledTimeHeading>
        </StyledReportHeader>
        <StyledReportParagraph>
          <p>{report}</p>
        </StyledReportParagraph>
      </StyledReportEntry>
    </>
  );
}

export default Report;
