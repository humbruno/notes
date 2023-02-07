import SEO from 'components/SEO';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { rem } from 'polished';

import manWorking from 'images/man-computer.png';
import logoDark from 'images/logo-dark.png';
import GoogleLoginButton from 'components/GoogleLoginButton';
import AnonymousLogin from 'components/AnonymousLogin';
import { auth } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import LoadingDots from 'components/LoadingDots';
import { breakpoints } from 'styles/theme';

const Main = styled.main`
  min-height: 100vh;
  display: flex;

  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary.creamWhite};
    padding: 0 24px;
  }
`;

const Description = styled.section`
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;

  padding: 140px 140px 120px;

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary.creamWhite};
    padding: 0;
    text-align: center;
    padding: 20px 0;
  }

  img {
    display: block;

    @media (max-width: ${breakpoints.laptop}) {
      display: none;
    }
  }
`;

const Heading = styled.h2`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${rem(40)};
  line-height: ${rem(42)};
  color: ${({ theme }) => theme.colors.grays.gray900};

  margin-top: 100px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: ${breakpoints.laptop}) {
    margin-top: 0;

    font-size: ${rem(24)};
    line-height: ${rem(32)};
  }
`;

const Text = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(24)};
  line-height: ${rem(32)};
  color: ${({ theme }) => theme.colors.grays.gray400};

  @media (max-width: ${breakpoints.laptop}) {
    font-size: ${rem(16)};
    line-height: ${rem(20)};
  }
`;

const LoginForm = styled.section`
  width: 50%;

  background-color: ${({ theme }) => theme.colors.primary.creamWhite};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    user-select: none;
    margin-bottom: 46px;

    @media (max-width: ${breakpoints.laptop}) {
      margin-bottom: 20px;
    }
  }

  @media (max-width: ${breakpoints.laptop}) {
    width: 100%;
  }
`;

let anonLogin;

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    anonLogin = localStorage.getItem('anonymousLogin');
  }

  useEffect(() => {
    if (user || anonLogin) router.push('/');
  }, [user, anonLogin]);

  if (user || anonLogin || loading) return <LoadingDots />;

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
          <Image src={logoDark} alt="NOTE.me logo" />
          <GoogleLoginButton />
          <AnonymousLogin />
        </LoginForm>
      </Main>
    </>
  );
};

export default Login;
