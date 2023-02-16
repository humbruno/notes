import React from 'react';
import styled from 'styled-components';

const FullPageContainer = styled.div<{ darkTheme?: boolean }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ darkTheme }) => (darkTheme ? '#3C3D43' : '#fdfdfd')};
`;

const DotsContainer = styled.div<{ darkTheme?: boolean }>`
  display: flex;
  justify-content: center;

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translateY(-16px);
    }
  }

  div {
    width: 16px;
    height: 16px;
    margin: 3px 6px;
    border-radius: 50%;
    background-color: ${({ darkTheme }) => (darkTheme ? '#FDBAA3' : '#30C58D')};
    opacity: 1;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

interface Props {
  darkTheme?: boolean;
}

const LoadingDots = ({ darkTheme }: Props) => {
  return (
    <FullPageContainer darkTheme={darkTheme}>
      <DotsContainer darkTheme={darkTheme}>
        <div />
        <div />
        <div />
      </DotsContainer>
    </FullPageContainer>
  );
};

export default LoadingDots;
