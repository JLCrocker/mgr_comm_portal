/* eslint-disable react/prop-types */
import styled, { css } from 'styled-components';
import { format } from 'date-fns';

const StyledReportEntry = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  height: 98%;
  width: 98.5%;
  background-color: rgb(243, 240, 243);
  color: black;
  border-radius: 0.5rem;
  /* overflow: scroll; */
  /* margin: 0; */
  overflow: hidden;
  padding-left: 0.5rem;
  padding-bottom: 0.35rem;
  border: 0.5px solid #afacac;

  /* border: 1px solid orangered; */
`;

const StyledReportHeader = styled.header`
  display: flex;
  align-items: center;
  justify-items: flex-start;
  background-color: rgb(220, 215, 215);
  border-top: solid 1px #a19f9f;
  height: 1.7rem;
  width: 99.9%;
  /* padding: 0 0.25rem; */
  border-radius: 5px 5px 0 0;
`;

const StyledCategoryHeading = styled('h2')`
  ${(props) =>
    props.$category === 'operations' &&
    css`
      color: rgb(146, 100, 221);
    `}
  ${(props) =>
    props.$category === 'attendance' &&
    css`
      color: rgb(252, 116, 116);
    `}
  ${(props) =>
    props.$category === 'bookkeeping' &&
    css`
      color: rgb(83, 164, 107);
    `}
    ${(props) =>
    props.$category === 'training' &&
    css`
      color: rgb(83, 86, 164);
    `}
    ${(props) =>
    props.$category === 'customers' &&
    css`
      color: rgb(164, 83, 155);
    `}
    ${(props) =>
    props.$category === 'other' &&
    css`
      color: rgb(95, 92, 95);
    `}
  font-weight: 700;
  height: 0.8rem;
  justify-self: flex-start;
  font-size: 1.2rem;
  padding: 0 0.25rem;
  margin-right: 1rem;
`;

const StyledReportParagraph = styled.div`
  padding: 0 0.5rem 0.1rem 0.8rem;
  /* height: 100%; */
  color: #222222;
  /* background-color: #ffffff; */
  font-size: 1.1rem;
  font-weight: 400;
`;

const StyledUserHeading = styled.h3`
  font-weight: 300;
  font-size: 0.8rem;
  justify-self: end;
  margin-left: 0.5rem;

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

const StyledReportDiv = styled.div`
  /* border-top: 0.4px solid rgb(133, 126, 135); */
  background-color: #ffffff;
  border-bottom: 0.5px solid #cfd6d6;
  border-left: 0.5px solid #cfd6d6;
  border-right: 0.5px solid #cfd6d6;

  border-radius: 10px;
  /* margin-right: 1rem; */
  width: 96%;
  /* height: auto; */
  /* padding: 0rem 1rem; */
  margin: 0.35rem;
`;

function ReportData({ reports }) {
  const categoryReports = [...reports.reports];
  const category = `${categoryReports[0]?.category}`;

  return (
    <>
      <StyledReportEntry>
        <StyledCategoryHeading $category={category}>
          {category.toLocaleUpperCase()}
        </StyledCategoryHeading>

        {categoryReports.map((report) => {
          return (
            <StyledReportDiv key={report.id}>
              <StyledReportHeader>
                <StyledUserHeading>
                  Reported by:
                  <span>{report.users.first_name}</span>
                </StyledUserHeading>
                <StyledTimeHeading>
                  at{' '}
                  <span>{format(new Date(report.created_at), 'h:mmaaa')}</span>
                </StyledTimeHeading>
              </StyledReportHeader>
              <StyledReportParagraph>
                <p>{report.report}</p>
              </StyledReportParagraph>
            </StyledReportDiv>
          );
        })}
      </StyledReportEntry>
    </>
  );
}

function Report(reports) {
  // const { category, created_at, report } = opsReport;

  // console.log(reports);

  return <ReportData reports={reports} />;
}

export default Report;
