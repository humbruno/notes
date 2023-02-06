export {};

declare global {
  type Note = {
    uid: string;
    content: string;
    lastUpdated: string;
  };
}
