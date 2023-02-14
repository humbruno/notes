import type { NextPage } from 'next';
import { auth, logout } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingDots from 'components/LoadingDots';
import getUserProfileNotes from 'utils/getUserProfileNotes';
import SEO from 'components/SEO';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';
import Greeting from 'components/Greeting';
import Note from 'components/Note';
import deleteNoteFromUserProfile from 'utils/deleteNoteFromUserProfile';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DEFAULT_NOTES } from 'constants/index';
import theme from 'styles/theme';
import addNewNoteToUserProfile from 'utils/addNewNoteToUserProfile';

const possibleBgColors = [
  theme.colors.post.greenCyan,
  theme.colors.post.lightCyan,
  theme.colors.post.lightYellow,
  theme.colors.post.lilac,
  theme.colors.post.redOrange,
];

let anonLogin: string;

const Container = styled.main`
  display: flex;
`;

const ContentContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 40px 112px 0 224px;
  background-color: #fdfdfd;
`;

const NotesContainer = styled.ul`
  list-style: none;
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-top: 63px;
`;

const handleErrorNotification = (errorMessage: string) => {
  toast.error(errorMessage);
};

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    anonLogin = localStorage.getItem('anonymousLogin');
  }

  useEffect(() => {
    if (!user && !anonLogin) router.push('/login');
  }, [user, anonLogin]);

  useEffect(() => {
    let isMounted = true;

    if (user && isMounted) {
      try {
        getUserProfileNotes(user).then((res) => setNotes(res));
      } catch {
        handleErrorNotification('Something went wrong.');
      } finally {
        return;
      }
    }

    if (isMounted) {
      const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
      setNotes(localStorageNotes);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = useCallback(() => {
    if (user) return logout();

    localStorage.clear();

    router.push('/');
  }, [user]);

  const handleDeleteNote = useCallback(
    async (uid: string) => {
      if (user) {
        try {
          setIsLoading(true);

          await deleteNoteFromUserProfile({ user: user, noteUid: uid });

          const res = await getUserProfileNotes(user);
          setNotes(res);

          toast.success('Note deleted successfully.');
        } catch {
          handleErrorNotification('Something went wrong.');
        } finally {
          setIsLoading(false);
          return;
        }
      }

      const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
      const newNotes = localStorageNotes.filter((note) => note.uid !== uid);
      localStorage.setItem('notes', JSON.stringify(newNotes));

      toast.success('Note deleted successfully.');
      setNotes(newNotes);
    },
    [user],
  );

  const handleAddNewNote = async () => {
    if (user) {
      try {
        setIsLoading(true);

        await addNewNoteToUserProfile({ user });

        const newNotes = [DEFAULT_NOTES[0], ...notes];

        toast.success('New note created!');

        setNotes(newNotes);
      } catch {
        handleErrorNotification('Something went wrong.');
      } finally {
        setIsLoading(false);
        return;
      }
    }

    const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
    const newNotes = [DEFAULT_NOTES[0], ...localStorageNotes];
    localStorage.setItem('notes', JSON.stringify(newNotes));

    toast.success('New note created!');
    setNotes(newNotes);
  };

  if ((!user && !anonLogin) || loading || isLoading) return <LoadingDots />;

  return (
    <>
      <SEO
        description="Keep your notes readily at hand!"
        tabName="Dashboard"
        title="NOTE.me"
      />
      <Container>
        <Sidebar onAddNewNote={handleAddNewNote} onLogout={handleLogout} />
        <ContentContainer>
          <Greeting name={user?.displayName || JSON.parse(anonLogin)} />
          <ToastContainer />
          <NotesContainer>
            {notes &&
              notes.map((note, idx) => (
                <li key={note.uid}>
                  <Note
                    bgColor={possibleBgColors[idx % possibleBgColors.length]}
                    user={user}
                    content={note.content}
                    date={note.lastUpdated}
                    uid={note.uid}
                    handleDeleteNote={handleDeleteNote}
                    handleErrorNotification={handleErrorNotification}
                  />
                </li>
              ))}
          </NotesContainer>
        </ContentContainer>
      </Container>
    </>
  );
};

export default Home;
