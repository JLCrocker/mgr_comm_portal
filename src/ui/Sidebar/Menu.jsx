/* eslint-disable react/prop-types */
import styled from 'styled-components';
import {
  MdCreate,
  MdBarChart,
  MdSettings,
  MdPeopleAlt,
  MdLogout,
} from 'react-icons/md';
import { useState } from 'react';

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

const StyledH2 = styled.h3`
  font-weight: 600;
  font-size: 1.06rem;
  display: flex;
  justify-content: center;
  color: transparent;
  background-color: rgb(0, 0, 0);
  text-shadow: 0.45px 0.25px 1px rgba(255, 255, 255, 0.25);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  margin: 0;
  margin-bottom: 0.2rem;
`;

const StyledNewReportIcon = styled(MdCreate)`
  /* color: #222222; */
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledIlIcon = styled(MdPeopleAlt)`
  /* color: #222222; */
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledRunReportsIcon = styled(MdBarChart)`
  /* color: #222222; */
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledSettingsIcon = styled(MdSettings)`
  /* color: #222222; */
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledLogoutIcon = styled(MdLogout)`
  /* color: #222222; */
  margin-right: 0.5rem;
  font-size: var(--icon-size--primary);
`;

const StyledDiv = styled.div`
  --icon-size--primary: 2rem;
  color: #222222;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 0.5rem;
  margin-left: 0.25rem;
  transition: all 0.1s ease-in;
  cursor: pointer;

  &:hover {
    background-color: rgb(147, 144, 144);

    color: rgb(240, 238, 238);
    border-radius: 5px;
  }

  span {
    font-weight: 400;
    font-size: 1rem;
    color: inherit;
    /* color: rgb(62, 62, 62); */
    margin: 0.4rem;
  }
`;

const StyledMenu = styled.div`
  display: flex;
  font-size: 1.1em;
  flex-direction: column;
  align-items: flex-start;
  width: 99%;
  padding: 0 0rem 0 0.5rem;

  :active {
    font-weight: bold;
  }
`;

const StyledImage = styled.img`
  width: 85%;
  border-radius: 10px;
  object-fit: contain;
  margin: 0.75rem 0.5rem -0.6rem 1.2rem;
  /* padding: 1rem; */
`;

const StyledReportsMenuDiv = styled.div`
  display: flex;

  height: 4.5rem;
  justify-items: center;
  align-items: center;
  /* margin: 0.5rem; */
  /* padding: 0.5rem; */
  padding: 0.4rem 1.25rem;
  /* margin-left: 2.2rem; */
  transition: all 200ms ease-in-out;

  li {
    list-style-type: circle;
    font-weight: 300;
    line-height: 1.5rem;
    &:hover {
      font-size: 1.2rem;
      font-weight: 400;
      color: rgb(255, 255, 255);
      /* text-shadow: 0.5px 0.5px 3px black; */
      /* background-color: rgb(89, 87, 87); */

      z-index: 2;
    }
  }
`;

const StyledMenuItemDiv = styled.div`
  height: 2.3rem;
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  align-items: center;
`;

const StyledPlusMinus = styled.div`
  color: rgba(15, 13, 13, 0.35);
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 0.25rem;
  transition: transform 300ms ease-in-out;
  &.active {
    transform: rotate(-180deg);
  }
`;

function Menu({ handleModal, handleView }) {
  const { iLogModalToggle, setIlogModalToggle } = handleModal;
  const [reportsOpen, setReportsOpen] = useState(false);

  function handleIlogClick() {
    setIlogModalToggle(!iLogModalToggle);
  }

  function handleReportsClick() {
    setReportsOpen(!reportsOpen);
  }

  function handleSettingsClick() {
    console.log('Settings Clicked');
  }

  function handleLogout() {
    console.log('Logout Clicked');
  }

  return (
    <>
      <StyledImage src="../../public/chcy7ea307b4.webp" />
      <StyledMenuHeader>
        <StyledH2>Manager Communication Portal</StyledH2>
        <Break />
      </StyledMenuHeader>
      <StyledMenu>
        <StyledDiv>
          <StyledMenuItemDiv onClick={() => handleView('shiftReports')}>
            <StyledNewReportIcon />
            <span>Shift Reports</span>
          </StyledMenuItemDiv>
        </StyledDiv>
        <StyledDiv onClick={handleIlogClick}>
          <StyledMenuItemDiv>
            <StyledIlIcon />
            <span>New Incident Log</span>
          </StyledMenuItemDiv>
        </StyledDiv>
        <StyledDiv onClick={handleReportsClick}>
          <StyledMenuItemDiv>
            <StyledRunReportsIcon />
            <span>Reports </span>
            {
              /* {!reportsOpen ? ( */
              <StyledPlusMinus className={reportsOpen ? 'active' : ''}>
                &#9662;
              </StyledPlusMinus>
              /*) : ( */
            }
            {/* <StyledPlusMinus className={!reportsOpen ? 'active' : ''}>
              &#9652;
            </StyledPlusMinus> */}
            {/* )} */}
          </StyledMenuItemDiv>
          {reportsOpen ? <ReportsMenu handleView={handleView} /> : null}
        </StyledDiv>
        <StyledDiv onClick={handleSettingsClick}>
          <StyledMenuItemDiv>
            <StyledSettingsIcon />
            <span>Settings</span>
          </StyledMenuItemDiv>
        </StyledDiv>
        <StyledDiv onClick={handleLogout}>
          <StyledMenuItemDiv>
            <StyledLogoutIcon />
            <span>Logout</span>
          </StyledMenuItemDiv>
        </StyledDiv>
      </StyledMenu>
    </>
  );
}

export default Menu;

function ReportsMenu({ handleView }) {
  return (
    <StyledReportsMenuDiv>
      <ul>
        <li onClick={() => handleView('ILs')}>ILs</li>
        <li onClick={() => handleView('SlMetrics')}>SL Metrics</li>
        <li>Training</li>
      </ul>
    </StyledReportsMenuDiv>
  );
}
