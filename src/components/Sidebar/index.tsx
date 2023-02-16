import React, { useContext } from 'react';

import Image from 'next/image';
import logoSimpleDark from 'images/logo-simple-dark.png';
import logoSimpleLight from 'images/logo-simple-light.png';
import styled, { ThemeContext } from 'styled-components';
import PlusIcon from 'images/SVG/PlusIcon';
import LogoutIcon from 'images/SVG/LogouIcon';
import { screenBreakpoints } from 'constants/screenBreakPoints';

const Container = styled.nav`
  background-color: ${({ theme }) => theme.sidebarBackground};
  min-height: 100vh;
  max-width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;

  position: fixed;
  z-index: 1;

  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);
  transition: all 150ms ease-in-out;

  svg {
    g {
      stroke: ${({ theme }) => theme.sidebarSvgFill};
    }
  }

  @media (max-width: ${screenBreakpoints.laptop}) {
    position: fixed;
    width: 100%;
    max-width: 100%;
    min-height: 1px;
    padding: 12px 24px;

    flex-direction: row;
  }
`;

const SidebarButton = styled.button`
  background-color: transparent;
  border: none;

  transition: all 150ms ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);

    svg {
      g {
        stroke: ${({ theme }) => theme.colors.semantic.red};
      }
    }
  }
`;

interface SidebarProps {
  onLogout: () => void;
  onAddNewNote: () => void;
}

const Sidebar = ({ onLogout, onAddNewNote }: SidebarProps) => {
  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <Image src={title === 'dark' ? logoSimpleLight : logoSimpleDark} alt="" />
      <SidebarButton title="New Note" onClick={onAddNewNote}>
        <PlusIcon />
      </SidebarButton>
      <SidebarButton title="Log Out" onClick={onLogout}>
        <LogoutIcon />
      </SidebarButton>
    </Container>
  );
};

export default Sidebar;
