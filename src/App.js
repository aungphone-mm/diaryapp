// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import NewEntry from './components/NewEntry';
import EntryList from './components/EntryList';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', or 'reset'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const renderAuthComponent = () => {
    switch(authMode) {
      case 'signup':
        return <SignUp />;
      case 'reset':
        return <PasswordReset />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Diary App</h1>
        {user && (
          <div className="user-info">
            <span>Logged in as: {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      <main>
        {user ? (
          <>
            <NewEntry />
            <EntryList />
          </>
        ) : (
          <>
            {renderAuthComponent()}
            <div className="auth-options">
              <button onClick={() => setAuthMode('login')}>Login</button>
              <button onClick={() => setAuthMode('signup')}>Sign Up</button>
              <button onClick={() => setAuthMode('reset')}>Forgot Password</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;