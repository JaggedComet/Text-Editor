import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('texteditor', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log('Post to the ase');
  // const jateDb = await openDB('jate', 1);
  // const tx = jateDb.transaction('texteditor', 'readwrite');
  // const store = tx.objectStore('texteditor');
  // const request = store.add({ code: content });
  // const result = await request;
  // console.log('🚀 - data saved to the database', result);
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('texteditor', 'readwrite');

  const store = tx.objectStore('texteditor');

  const request = store.put({content, id: 0});

  const result = await request;
  if (!result) {
    console.error('putDb not implemented')
  } else {
    console.log('🚀 - data saved to the database', result); 
  };
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  console.log('GET all from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('texteditor', 'readonly');

  const store = tx.objectStore('texteditor');

  const request = store.getAll();
  console.log(request);
  const result = await request;

  console.log('result.value', result);
  // console.error('getDb not implemented');
  if (!result) {
    console.error('getDb not implemented')
  } else {
    console.log('🚀 - data saved to the database', result); 
    return result[0].content;
  };
}

initdb();
