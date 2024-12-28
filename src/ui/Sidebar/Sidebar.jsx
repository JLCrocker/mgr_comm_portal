import styled from 'styled-components';

const StyledSidebar = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 252, 252);
  /* height: 63.5vh; */
  max-width: 100%;
  height: 100%;
  border-radius: var(--border-radius-primary);
  border: 1px inset rgb(51, 50, 51);
  filter: drop-shadow(4px 4px 3px rgb(0, 0, 0, 0.25));
  overflow: hidden;
`;

// eslint-disable-next-line react/prop-types
function Sidebar({ children }) {
  return <StyledSidebar>{children}</StyledSidebar>;
}

export default Sidebar;
