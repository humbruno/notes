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
  noteUid: string;
}

const deleteNoteFromUserProfile = async ({ user, noteUid }: RequestParams) => {
  let newNotes: Note[] = [];
  let firebaseUserId: string;

  const q = query(collection(db, 'users'), where('uid', '==', user.uid));
  const docs = await getDocs(q);

  docs.forEach((doc) => {
    firebaseUserId = doc.id;
    newNotes.push(
      ...doc.data().notes.filter((note: Note) => note.uid !== noteUid),
    );
  });

  const docRef = doc(db, 'users', firebaseUserId);

  const data = {
    notes: newNotes,
  };

  updateDoc(docRef, data)
    .then((docRef) => {
      console.log('Success!');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default deleteNoteFromUserProfile;
