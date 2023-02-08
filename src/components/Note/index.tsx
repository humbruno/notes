import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.post.greenCyan};
  padding: 24px;
  max-width: 264px;
  height: 240px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoteContent = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${rem(20)};
  line-height: ${rem(30)};
  color: ${({ theme }) => theme.colors.primary.midnight};
  overflow-y: auto;
  margin-bottom: 12px;

  scrollbar-width: thin;
  scrollbar-color: white gray;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grays.gray300};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary.creamWhite};
    border-radius: 10px;
  }
`;

const Date = styled.small`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
  color: ${({ theme }) => theme.colors.primary.midnight};
`;

interface NoteProps {
  content: string;
  date: string;
}

const Note = ({ content, date }: NoteProps) => {
  return (
    <Container>
      <NoteContent>{content}</NoteContent>
      <Date>{date}</Date>
    </Container>
  );
};

export default Note;