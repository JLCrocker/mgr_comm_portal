import styled from 'styled-components';
import {
  MdCreate,
  MdBarChart,
  MdSettings,
  MdPeopleAlt,
  MdLogout,
} from 'react-icons/md';

const StyledMenuHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem 1rem 0.6rem 1rem;
  margin: 0;
`;
const Break = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background-color: black;
  margin: 0;
  padding: 0;
`;

const StyledH2 = styled.h2`
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  color: transparent;
  background-color: rgb(0, 0, 0);
  text-shadow: 0.45px 0.25px 1px rgba(255, 255, 255, 0.25);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  margin: 0;
`;

const StyledNewReportIcon = styled(MdCreate)`
  color: #222222;
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledIlIcon = styled(MdPeopleAlt)`
  color: #222222;
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledRunReportsIcon = styled(MdBarChart)`
  color: #222222;
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledSettingsIcon = styled(MdSettings)`
  color: #222222;
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledLogoutIcon = styled(MdLogout)`
  color: #222222;
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledDiv = styled.div`
  --icon-size--primary: 2rem;
  display: flex;
  justify-items: center;
  align-items: center;
  height: 2.2rem;
  width: 100%;
  padding-left: 0.5rem;
  margin-left: 0.25rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    /* transform: scale(1.01); */
    /* border: 1px solid #444444; */
    background-color: rgb(188, 183, 183);
    box-shadow: 0.05rem 0.05rem 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }

  h4 {
    font-weight: 400;
    font-size: 1rem;
    color: rgb(62, 62, 62);
    margin: 0.4rem;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  font-size: 1.1em;
  flex-direction: column;
  align-items: flex-start;
  width: 86%;
  padding: 0 0rem 0 0.5rem;

  :active {
    font-weight: bold;
  }
`;

function Menu() {
  return (
    <>
      <StyledMenuHeader>
        <StyledH2>Menu</StyledH2>
        <Break />
      </StyledMenuHeader>
      <StyledMenu>
        <StyledDiv>
          <StyledNewReportIcon />
          <h4>New Shift Report</h4>
        </StyledDiv>
        <StyledDiv>
          <StyledIlIcon />
          <h4>New Incident Log</h4>
        </StyledDiv>
        <StyledDiv>
          <StyledRunReportsIcon />
          <h4>Reports</h4>
        </StyledDiv>
        <StyledDiv>
          <StyledSettingsIcon />
          <h4>Settings</h4>
        </StyledDiv>
        <StyledDiv>
          <StyledLogoutIcon />
          <h4>Logout</h4>
        </StyledDiv>
      </StyledMenu>
    </>
  );
}

export default Menu;
