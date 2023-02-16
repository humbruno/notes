import React from 'react';

import Image from 'next/image';
import logoSimpleDark from 'images/logo-simple-dark.png';
import logoSimpleLight from 'images/logo-simple-light.png';
import styled from 'styled-components';
import PlusIcon from 'images/SVG/PlusIcon';
import LogoutIcon from 'images/SVG/LogouIcon';
import { breakpoints } from 'styles/theme';

const Container = styled.nav<{ darkTheme: boolean }>`
  background-color: ${({ theme, darkTheme }) =>
    darkTheme
      ? theme.colors.primary.midnight
      : theme.colors.primary.creamWhite};
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
      stroke: ${({ theme, darkTheme }) => (darkTheme ? '#fff' : '#3C3D43')};
    }
  }

  @media (max-width: ${breakpoints.laptop}) {
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
  darkTheme: boolean;
  onLogout: () => void;
  onAddNewNote: () => void;
}

const Sidebar = ({ darkTheme, onLogout, onAddNewNote }: SidebarProps) => {
  return (
    <Container darkTheme={darkTheme}>
      <Image src={darkTheme ? logoSimpleLight : logoSimpleDark} alt="" />
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
