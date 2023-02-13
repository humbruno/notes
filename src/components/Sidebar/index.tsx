import React from 'react';

import Image from 'next/image';
import logoSimpleDark from 'images/logo-simple-dark.png';
import styled from 'styled-components';
import PlusIcon from 'images/SVG/PlusIcon';
import LogoutIcon from 'images/SVG/LogouIcon';

const Container = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary.creamWhite};
  min-height: 100vh;
  max-width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px;

  position: relative;
  z-index: 1;

  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.05);
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
  return (
    <Container>
      <Image src={logoSimpleDark} alt="" />
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
