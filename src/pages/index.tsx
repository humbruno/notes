import type { NextPage } from 'next';
import { auth, logout } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingDots from 'components/LoadingDots';
import getUserProfileNotes from 'utils/getUserProfileNotes';
import SEO from 'components/SEO';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';
import Greeting from 'components/Greeting';
import Note from 'components/Note';
import deleteNoteFromUserProfile from 'utils/deleteNoteFromUserProfile';

let anonLogin: string;

const Container = styled.main`
  display: flex;
`;

const ContentContainer = styled.section`
  width: 100%;
  padding: 40px 112px 0 112px;
  background-color: #fdfdfd;
`;

const NotesContainer = styled.ul`
  list-style: none;
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-top: 63px;
`;

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    anonLogin = localStorage.getItem('anonymousLogin');
  }

  useEffect(() => {
    if (!user && !anonLogin) router.push('/login');
  }, [user, anonLogin]);

  useEffect(() => {
    let isMounted = true;

    try {
      if (user && isMounted) {
        getUserProfileNotes(user).then((res) => setNotes(res));
      }
    } catch (e) {
      console.log(e);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    if (user) return logout();

    localStorage.removeItem('anonymousLogin');

    router.push('/');
  };

  const handleDeleteNote = (uid: string) => {
    deleteNoteFromUserProfile({ user: user, noteUid: uid });
  };

  if ((!user && !anonLogin) || loading) return <LoadingDots />;

  return (
    <>
      <SEO
        description="Keep your notes readily at hand!"
        tabName="Dashboard"
        title="NOTE.me"
      />
      <Container>
        <Sidebar onLogout={handleLogout} />
        <ContentContainer>
          <Greeting name={user?.displayName || JSON.parse(anonLogin)} />
          <NotesContainer>
            {notes &&
              notes.map((note) => (
                <li key={note.uid}>
                  <Note
                    content={note.content}
                    date={note.lastUpdated}
                    uid={note.uid}
                    onDeleteNote={handleDeleteNote}
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
