import type { NextPage } from 'next';
import { auth, db, logout } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingDots from 'components/LoadingDots';
import getUserProfileNotes from 'components/services/getUserProfileNotes';
import SEO from 'components/SEO';
import Sidebar from 'components/Sidebar';
import styled from 'styled-components';

let anonLogin;

const Container = styled.main`
  display: flex;
`;

const ContentContainer = styled.section`
  width: 100%;
  padding: 40px 112px 0 112px;
  background-color: #fdfdfd;
`;

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
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
  }, [user]);

  const handleLogout = () => {
    if (user) return logout();

    localStorage.removeItem('anonymousLogin');

    router.push('/');
  };

  if ((!user && !anonLogin) || loading) return <LoadingDots />;

  return (
    <Container>
      <SEO
        description="Keep your notes readily at hand!"
        tabName="Dashboard"
        title="NOTE.me"
      />
      <Sidebar onLogout={handleLogout} />
      <ContentContainer>
        <p>Hello, {user?.displayName || JSON.parse(anonLogin)}! &#x1F44B;</p>
        <ul>
          {notes.length !== 0 &&
            notes.map((note) => (
              <li key={note.uid}>
                <p>{note.content}</p>
                <p>{note.lastUpdated}</p>
              </li>
            ))}
        </ul>
      </ContentContainer>
    </Container>
  );
};

export default Home;
