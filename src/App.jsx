import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // IMPORTANT: Replace this with the URL of your live FastAPI backend
  const apiUrl = 'https://kevals-first-api.onrender.com/stats';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setStats(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="card"><h1>YouTube Dashboard</h1><p>Loading data...</p></div>;
  }

  if (error) {
    return <div className="card"><h1>YouTube Dashboard</h1><p>Error: {error}</p></div>;
  }

  return (
    <div className="card">
      <h1>YouTube Channel Stats</h1>
      {stats && (
        <div className="stats-grid">
          <div className="stat-item">
            <h2>Subscribers</h2>
            <p>{stats.subscribers.toLocaleString()}</p>
          </div>
          <div className="stat-item">
            <h2>Total Views</h2>
            <p>{stats.views.toLocaleString()}</p>
          </div>
          <div className="stat-item">
            <h2>Total Videos</h2>
            <p>{stats.videos.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;