import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const EntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(collection(db, `users/${auth.currentUser.uid}/entries`), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const entriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEntries(entriesData);
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div>
      <h2>Your Entries</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.title}</h3>
          <p>{entry.content}</p>
          <small>{entry.createdAt.toDate().toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default EntryList;