import SEO from 'components/SEO';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { rem } from 'polished';

import manWorking from 'images/man-computer.png';
import logoDark from 'images/logo-dark.png';
import GoogleLoginButton from 'components/GoogleLoginButton';

const Main = styled.main`
  min-height: 100vh;
  display: flex;
`;

const Description = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;

  padding: 140px 140px 120px;
`;

const Heading = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${rem(40)};
  line-height: ${rem(42)};
  color: ${({ theme }) => theme.colors.grays.gray900};

  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;
`;

const Text = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(24)};
  line-height: ${rem(32)};
  color: ${({ theme }) => theme.colors.grays.gray400};
`;

const LoginForm = styled.section`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.primary.creamWhite};
  padding: 202px 222px;

  display: flex;
  flex-direction: column;
`;

const Login = () => {
  return (
    <>
      <SEO
        description="Keep your notes readily at hand!"
        tabName="Login"
        title="NOTE.me"
      />
      <Main>
        <Description>
          <Image
            src={manWorking}
            alt="Man working on computer"
            style={{ userSelect: 'none' }}
          />
          <Heading>Keep life simple</Heading>
          <Text>
            Store all your notes in a simple and intuitive app that helps you
            enjoy what is most important in life.
          </Text>
        </Description>
        <LoginForm>
          <Image
            src={logoDark}
            alt="NOTE.me logo"
            style={{ userSelect: 'none', marginBottom: '46px' }}
          />
          <GoogleLoginButton />
          <small>or join anonymously</small>
          <form action="">
            <input type="text" name="" id="" />
            <button>Join anonymously</button>
          </form>
        </LoginForm>
      </Main>
    </>
  );
};

export default Login;
