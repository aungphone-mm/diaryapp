import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

const NewEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      alert('You must be logged in to create an entry.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `users/${auth.currentUser.uid}/entries`), {
        title: title,
        content: content,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle('');
      setContent('');
      alert('Entry added successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('Error adding entry. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Diary Entry</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your entry here..."
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default NewEntry;