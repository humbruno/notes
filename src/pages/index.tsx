import type { NextPage } from 'next';
import { auth, db, logout } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingDots from 'components/LoadingDots';
import getUserProfileNotes from 'components/services/getUserProfileNotes';

const Home: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

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

  if (loading) return <LoadingDots />;

  return (
    <div>
      <p>Logged in! Welcome, {user?.displayName}</p>
      <button onClick={logout}>Sign out</button>
      <ul>
        {notes.length !== 0 &&
          notes.map((note) => (
            <li key={note.uid}>
              <p>{note.content}</p>
              <p>{note.lastUpdated}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
