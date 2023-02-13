import React from 'react';
import styled from 'styled-components';

const Spinner = styled.svg`
  animation: rotate 2s linear infinite;

  circle {
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <Spinner viewBox="0 0 50 50" style={{ height: '16px', width: '16px' }}>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
        style={{ stroke: '#3C3D43' }}
      ></circle>
    </Spinner>
  );
};

export default LoadingSpinner;
