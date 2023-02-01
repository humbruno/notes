import type { NextPage } from 'next';
import {
  getSession,
  GetSessionParams,
  signOut,
  useSession,
} from 'next-auth/react';

export const getServerSideProps = async (ctx: GetSessionParams) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>Logged in! Welcome, {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
