import React from 'react';
import styles from './LoadingDots.module.css';
import styled from 'styled-components';

const FullPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotsContainer = styled.div`
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
    background-color: ${({ theme }) => theme.colors.semantic.green};
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

const LoadingDots = () => {
  return (
    <FullPageContainer>
      <DotsContainer>
        <div></div>
        <div></div>
        <div></div>
      </DotsContainer>
    </FullPageContainer>
  );
};

export default LoadingDots;
