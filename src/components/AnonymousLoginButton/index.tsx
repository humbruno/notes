import LoginIcon from 'images/SVG/LoginIcon';
import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.semantic.green};
  color: ${({ theme }) => theme.colors.primary.white};
  border: none;

  padding: 16px 81px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${rem(16)};
  line-height: ${rem(18)};

  transition: 150ms ease-in-out;

  &:hover {
    cursor: pointer;
    filter: brightness(1.05);
  }
`;

const AnonymousLoginButton = () => {
  return (
    <StyledButton>
      <LoginIcon />
      Join anonymously
    </StyledButton>
  );
};

export default AnonymousLoginButton;
