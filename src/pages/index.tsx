import type { NextPage } from 'next';
import { auth, logout } from 'lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// export const getServerSideProps = async () => {
//   const [user, loading, error] = useAuthState(auth);

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       user,
//     },
//   };
// };

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div>
      <p>Logged in! Welcome, {user?.displayName}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  );
};

export default Home;
