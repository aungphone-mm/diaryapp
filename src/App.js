import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import NewEntry from './components/NewEntry';
import EntryList from './components/EntryList';

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'reset'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (!user) {
    return (
      <div className="App">
        <h1>My Diary App</h1>
        {authMode === 'login' && <Login />}
        {authMode === 'signup' && <SignUp />}
        {authMode === 'reset' && <PasswordReset />}

        <div className="auth-options">
          {authMode !== 'login' && (
            <button onClick={() => setAuthMode('login')}>Back to Login</button>
          )}
          {authMode !== 'signup' && (
            <button onClick={() => setAuthMode('signup')}>Sign Up</button>
          )}
          {authMode !== 'reset' && (
            <button onClick={() => setAuthMode('reset')}>Forgot Password?</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Diary App</h1>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <NewEntry />
      <EntryList />
    </div>
  );
}

export default App;