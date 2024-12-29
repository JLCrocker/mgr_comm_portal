import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styled from 'styled-components';

const StyledUserReportDiv = styled.div`
  background-color: #eeeeee;
  height: 11rem;
  width: 30rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 15% 50% 1%;
  /* align-content: center; */
  border: 1px solid rgb(134, 134, 134);
  border-radius: 0.5rem;
  --gauge-font-size: 13px;
`;

const StyledMetricsHeader = styled.div`
  grid-column: 1 / 5;
  grid-row: 1 / 1;
  display: flex;
  align-items: center;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: rgb(196, 192, 192);
  padding: 1rem;
  max-width: 100%;
`;

const StyledGauge = styled(Gauge)`
  justify-self: center;
  align-self: center;
  /* padding-top: 0.75rem; */
  margin-top: 1.5rem;
`;

const StyledGaugeLabel = styled.div`
  justify-items: center;
  margin-top: 0.75rem;
  grid-row: 4;
  & p {
    margin: 0;
  }
`;

const StyledH3 = styled.h3`
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  /* align-content: center; */
  color: #333333;
  /* border: solid 1px green; */
`;
function MetricsReport() {
  const user = 'Sean';

  return (
    <StyledUserReportDiv>
      <StyledMetricsHeader>
        <StyledH3 /*id={`${user}-SR-Gauge`}*/>{user}</StyledH3>
      </StyledMetricsHeader>
      <StyledGauge
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 'var(--gauge-font-size)',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'rgb(100, 197, 26)',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        width={100}
        height={100}
        valueMin={0}
        valueMax={20}
        value={15}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
        /* Below will create a half circle design
        startAngle={89}
        endAngle={269}
        */
        aria-labelledby={`${user}-SR-Gauge`}
        innerRadius="70%"
        outerRadius="99%"
        // ...
      />
      <StyledGaugeLabel>
        ILs <p style={{ fontSize: '0.6rem' }}>(month to date)</p>
      </StyledGaugeLabel>
      <StyledGauge
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 'var(--gauge-font-size)',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'rgb(183, 68, 246)',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        width={100}
        height={100}
        valueMin={0}
        valueMax={240}
        value={75}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
        /* Below will create a half circle design
        startAngle={89}
        endAngle={269}
        */
        aria-labelledby={`${user}-SR-Gauge`}
        innerRadius="74%"
        outerRadius="99%"
        // ...
      />
      <StyledGaugeLabel>
        ILs <p style={{ fontSize: '0.6rem' }}>(year to date)</p>
      </StyledGaugeLabel>
      <StyledGauge
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 'var(--gauge-font-size)',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'rgb(100, 197, 26)',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        width={100}
        height={100}
        valueMin={0}
        valueMax={30}
        value={25}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
        /* Below will create a half circle design
        startAngle={89}
        endAngle={269}
        */
        aria-labelledby={`${user}-SR-Gauge`}
        innerRadius="70%"
        outerRadius="99%"
        // ...
      />
      <StyledGaugeLabel>
        SR Entries <p style={{ fontSize: '0.6rem' }}>(month to date)</p>
      </StyledGaugeLabel>

      <StyledGauge
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 12,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: 'rgb(183, 68, 246)',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
        width={100}
        height={100}
        valueMin={0}
        valueMax={360}
        value={195}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
        /* Below will create a half circle design
        startAngle={89}
        endAngle={269}
        */
        aria-labelledby={`${user}-SR-Gauge`}
        innerRadius="74%"
        outerRadius="99%"
      />
      <StyledGaugeLabel>
        SR Entries <p style={{ fontSize: '0.6rem' }}>(year to date)</p>
      </StyledGaugeLabel>
    </StyledUserReportDiv>
  );
}

export default MetricsReport;
