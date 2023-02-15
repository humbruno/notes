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
import getCurrentDateFormat from './getCurrentDateFormat';

interface RequestParams {
  user: User;
  noteUid: string;
  newNoteContent: string;
}

const updateNoteOnUserProfile = async ({
  user,
  noteUid,
  newNoteContent,
}: RequestParams) => {
  let newNotes: Note[] = [];
  let firebaseUserId: string;

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);

  docs.forEach((doc) => {
    firebaseUserId = doc.id;
    newNotes.push(...doc.data().notes);
  });

  const objIndex = newNotes.findIndex((obj) => obj.uid == noteUid);
  newNotes[objIndex].content = newNoteContent;
  newNotes[objIndex].lastUpdated = getCurrentDateFormat();

  const docRef = doc(db, 'users', firebaseUserId);

  const data = {
    notes: newNotes,
  };

  updateDoc(docRef, data);
};

export default updateNoteOnUserProfile;
