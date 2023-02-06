import { query, getDocs, collection, where } from 'firebase/firestore';
import { db } from 'lib/firebase';

const getUserProfileNotes = async (user) => {
  let userNotes = [];

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);

  docs.forEach((doc) => {
    userNotes.push(...doc.data().notes);
  });

  return userNotes as Note[];
};

export default getUserProfileNotes;
