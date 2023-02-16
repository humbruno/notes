import GoogleIcon from 'images/SVG/GoogleIcon';
import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { signInWithGoogle } from 'lib/firebase';
import { screenBreakpoints } from 'constants/screenBreakPoints';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.semantic.red};
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
    filter: brightness(1.1);
  }

  @media (max-width: ${screenBreakpoints.laptop}) {
    width: 100%;
    padding: 16px;

    font-size: ${rem(14)};
  }
`;

const GoogleLoginButton = () => {
  return (
    <StyledButton onClick={signInWithGoogle}>
      <GoogleIcon />
      Join with Google
    </StyledButton>
  );
};

export default GoogleLoginButton;
