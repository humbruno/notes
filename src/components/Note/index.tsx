import LoadingSpinner from 'components/LoadingSpinner';
import { User } from 'firebase/auth';
import TrashIcon from 'images/SVG/TrashIcon';
import { rem } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from 'styles/theme';
import getCurrentDateFormat from 'utils/getCurrentDateFormat';
import updateNoteOnUserProfile from 'utils/updateNoteOnUserProfile';

const Container = styled.div<{ bgColor: string; darkTheme: boolean }>`
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
  padding: 24px;
  max-width: 264px;
  height: 240px;
  color: ${({ theme, darkTheme }) =>
    darkTheme ? '#fff' : theme.colors.primary.midnight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: all 150ms ease-in-out;

  svg {
    path,
    circle {
      stroke: ${({ theme, darkTheme }) =>
        darkTheme ? '#fff' : theme.colors.primary.midnight};
    }
  }

  @media (max-width: ${breakpoints.laptop}) {
    padding: 16px;
    max-width: 100%;
  }
`;

const NoteContent = styled.textarea<{ darkTheme: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: transparent;
  border: none;
  resize: none;
  font-size: ${rem(20)};
  line-height: ${rem(30)};
  color: ${({ theme, darkTheme }) =>
    darkTheme ? '#fff' : theme.colors.primary.midnight};
  overflow-y: auto;
  margin-bottom: 12px;

  scrollbar-width: thin;
  scrollbar-color: white gray;

  transition: all 150ms ease-in-out;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: ${rem(18)};
    line-height: ${rem(20)};
  }

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

  @media (max-width: ${breakpoints.laptop}) {
    font-size: ${rem(12)};
  }
`;

interface NoteProps {
  content: string;
  user: User;
  date: string;
  darkTheme: boolean;
  uid: string;
  bgColor: string;
  handleDeleteNote: (id: string) => void;
  handleErrorNotification: (errorMessage: string) => void;
}

const Note = ({
  uid,
  user,
  content,
  date,
  darkTheme,
  bgColor,
  handleDeleteNote,
  handleErrorNotification,
}: NoteProps) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastUpdatedDate, setLastUpdateDate] = useState<string>(date);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      try {
        setIsSubmitting(true);

        if (user) {
          await updateNoteOnUserProfile({
            user,
            noteUid: uid,
            newNoteContent: e.target.value,
          });
          setLastUpdateDate(getCurrentDateFormat());

          return;
        }

        const localStorageNotes = JSON.parse(localStorage.getItem('notes'));

        const objIndex = localStorageNotes.findIndex(
          (obj: Note) => obj.uid === uid,
        );
        localStorageNotes[objIndex].content = e.target.value;
        localStorageNotes[objIndex].lastUpdated = getCurrentDateFormat();
        localStorage.setItem('notes', JSON.stringify(localStorageNotes));
        setLastUpdateDate(getCurrentDateFormat());
      } catch {
        handleErrorNotification('Something went wrong.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <Container bgColor={bgColor} darkTheme={darkTheme}>
      <NoteContent
        darkTheme={darkTheme}
        autoComplete="off"
        defaultValue={content}
        onChange={handleInputChange}
        rows={5}
      />
      <Footnote>
        <Date title="Last Updated">{lastUpdatedDate}</Date>
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <DeleteNoteButton
            onClick={() => handleDeleteNote(uid)}
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
