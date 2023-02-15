import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.h2<{ darkTheme: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(32)};
  line-height: ${rem(36)};
  color: ${({ theme, darkTheme }) =>
    darkTheme ? '#fff' : theme.colors.grays.gray900};
`;

const Username = styled.strong`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Text = styled.p<{ darkTheme: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(20)};
  line-height: ${rem(22)};
  color: ${({ theme, darkTheme }) =>
    darkTheme ? '#fff' : theme.colors.grays.gray600};

  margin-top: 10px;
`;

interface GreetingProps {
  name: string;
  darkTheme: boolean;
}

const Greeting = ({ name, darkTheme }: GreetingProps) => {
  return (
    <Container>
      <Title darkTheme={darkTheme}>
        Hello, <Username>{name}!</Username> &#x1F44B;
      </Title>
      <Text darkTheme={darkTheme}>All your notes are here, in one place!</Text>
    </Container>
  );
};

export default Greeting;
