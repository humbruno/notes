import { DEFAULT_NOTES } from 'constants/index';
import { User } from 'firebase/auth';
import {
  doc,
  query,
  getDocs,
  collection,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'lib/firebase';

interface RequestParams {
  user: User;
}

const addNewNoteToUserProfile = async ({ user }: RequestParams) => {
  let newNotes: Note[] = [];
  let firebaseUserId: string;

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);

  docs.forEach((doc) => {
    firebaseUserId = doc.id;
    newNotes.push(DEFAULT_NOTES[0], ...doc.data().notes);
  });

  const docRef = doc(db, 'users', firebaseUserId);

  const data = {
    notes: newNotes,
  };

  updateDoc(docRef, data);
};

export default addNewNoteToUserProfile;
