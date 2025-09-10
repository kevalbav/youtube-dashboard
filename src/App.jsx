// src/App.jsx

import { useState, useEffect } from 'react';
import Auth from './Auth';
import Dashboard from './Dashboard'; // This import now correctly points to the new file
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // This effect will check if the user is already logged in
  useEffect(() => {
    // For now, we'll just assume logged out on page load
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Auth onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;