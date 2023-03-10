import getCurrentDateFormat from 'utils/getCurrentDateFormat';
import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_NOTE_CONTENT =
  'This is how a Note looks like! Very simple, clean and asthetic! 😍';

export const DEFAULT_NOTES: Note[] = Array.from({ length: 3 }).map((i) => ({
  content: DEFAULT_NOTE_CONTENT,
  lastUpdated: getCurrentDateFormat(),
  uid: uuidv4(),
}));
