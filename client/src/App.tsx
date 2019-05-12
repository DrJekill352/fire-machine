import React, { useCallback, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { app } from './firebase.config';

import firebase from 'firebase';

export const App = () => {

  const [user, setUser] = useState<firebase.User | null>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      setUser(user);
    });
  }, [])

  const handleAuth = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    const result =  await app.auth().signInWithPopup(provider)
    setUser(result.user);
  }, []);

  const handleLogout = useCallback(async () => {
    setUser(undefined);
    await app.auth().signOut();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {user ? (
          <>
            <div>{user.email}</div>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
            <button onClick={handleAuth}>Auth Google</button>
          )}
      </header>
    </div>
  );
}
