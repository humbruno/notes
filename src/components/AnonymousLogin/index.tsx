import { rem } from 'polished';
import React, { useRef } from 'react';
import styled from 'styled-components';
import AnonymousLoginButton from 'components/AnonymousLoginButton';
import { useRouter } from 'next/router';
import { DEFAULT_NOTES } from 'constants/index';
import { screenBreakpoints } from 'constants/screenBreakpoints';

const Divider = styled.small`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
  color: ${({ theme }) => theme.colors.grays.gray300};
  position: relative;
  text-align: center;
  margin-top: 46px;

  @media (max-width: ${screenBreakpoints.laptop}) {
    margin-top: 20px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  gap: 30px;

  @media (max-width: ${screenBreakpoints.laptop}) {
    margin-top: 20px;
    width: 100%;
  }
`;

const NameInput = styled.input`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #a8a8b3;
  color: ${({ theme }) => theme.colors.grays.gray300};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(16)};
  line-height: ${rem(18)};

  :focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.semantic.green};
  }

  @media (max-width: ${screenBreakpoints.laptop}) {
    font-size: ${rem(14)};
  }
`;

const AnonymousLogin = () => {
  const router = useRouter();

  const anonLoginRef = useRef(null);

  const handleAnonymousLoginFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    localStorage.setItem(
      'anonymousLogin',
      JSON.stringify(anonLoginRef.current.value),
    );

    localStorage.setItem('notes', JSON.stringify(DEFAULT_NOTES));

    router.push('/');
  };

  return (
    <>
      <Divider>or join anonymously</Divider>
      <LoginForm onSubmit={handleAnonymousLoginFormSubmit}>
        <NameInput
          type="text"
          name="username"
          id="username"
          placeholder="Type your secret codename"
          maxLength={20}
          required
          ref={anonLoginRef}
        />
        <AnonymousLoginButton />
      </LoginForm>
    </>
  );
};

export default AnonymousLogin;
