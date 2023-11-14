import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  try {
    await store.add({ content });
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  } finally {
    await tx.done;
  }
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  try {
    const allContent = await store.getAll();
    console.log('All content retrieved from the database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error getting content from the database:', error);
  } finally {
    await tx.done;
  }
};

initdb();
