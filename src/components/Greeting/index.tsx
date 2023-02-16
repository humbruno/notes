import { screenBreakpoints } from 'constants/screenBreakpoints';
import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(32)};
  line-height: ${rem(36)};
  color: ${({ theme }) => theme.textPrimary};

  @media (max-width: ${screenBreakpoints.laptop}) {
    font-size: ${rem(24)};
    line-height: ${rem(30)};
  }
`;

const Username = styled.strong`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Text = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(20)};
  line-height: ${rem(22)};
  color: ${({ theme }) => theme.textSecondary};

  margin-top: 10px;

  @media (max-width: ${screenBreakpoints.laptop}) {
    font-size: ${rem(16)};
    line-height: ${rem(20)};
  }
`;

interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return (
    <Container>
      <Title>
        Hello, <Username>{name}!</Username> &#x1F44B;
      </Title>
      <Text>All your notes are here, in one place!</Text>
    </Container>
  );
};

export default Greeting;
