import LoadingSpinner from 'components/LoadingSpinner';
import { User } from 'firebase/auth';
import TrashIcon from 'images/SVG/TrashIcon';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import updateNoteOnUserProfile from 'utils/updateNoteOnUserProfile';

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

const NoteContent = styled.textarea`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: transparent;
  border: none;
  resize: none;
  font-size: ${rem(20)};
  line-height: ${rem(30)};
  color: ${({ theme }) => theme.colors.primary.midnight};
  overflow-y: auto;
  margin-bottom: 12px;

  scrollbar-width: thin;
  scrollbar-color: white gray;

  &:focus {
    outline: none;
  }

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

const Footnote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteNoteButton = styled.button`
  background-color: transparent;
  border: none;
  transition: all 150ms ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);

    svg {
      g {
        stroke: ${({ theme }) => theme.colors.semantic.red};
      }
    }
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
  user: User;
  date: string;
  uid: string;
  onDeleteNote: (id: string) => void;
}

const Note = ({ uid, user, content, date, onDeleteNote }: NoteProps) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      try {
        setIsSubmitting(true);

        await updateNoteOnUserProfile({
          user: user,
          noteUid: uid,
          newNoteContent: e.target.value,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <Container>
      <NoteContent
        autoComplete="off"
        defaultValue={content}
        onChange={handleInputChange}
        rows={5}
      />
      <Footnote>
        <Date>{date}</Date>
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <DeleteNoteButton
            onClick={() => onDeleteNote(uid)}
            title="Delete Note"
          >
            <TrashIcon />
          </DeleteNoteButton>
        )}
      </Footnote>
    </Container>
  );
};

export default Note;
