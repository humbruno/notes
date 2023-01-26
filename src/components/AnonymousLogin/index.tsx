import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import AnonymousLoginButton from 'components/AnonymousLoginButton';

const Divider = styled.small`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
  color: ${({ theme }) => theme.colors.grays.gray300};
  position: relative;
  width: 100%;
  text-align: center;
  margin-top: 46px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    height: 1px;
    width: 76px;
    background-color: ${({ theme }) => theme.colors.grays.gray300};
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
    top: 50%;
    height: 1px;
    width: 76px;
    background-color: ${({ theme }) => theme.colors.grays.gray300};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  gap: 30px;
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
`;

const AnonymousLogin = () => {
  return (
    <>
      <Divider>or join anonymously</Divider>
      <LoginForm action="">
        <NameInput
          type="text"
          name=""
          id=""
          placeholder="Type your secret codename"
        />
        <AnonymousLoginButton />
      </LoginForm>
    </>
  );
};

export default AnonymousLogin;
