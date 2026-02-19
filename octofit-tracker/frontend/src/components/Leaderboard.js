import React, { useState, useEffect } from 'react';

function rankClass(rank) {
  if (rank === 1) return 'rank-gold';
  if (rank === 2) return 'rank-silver';
  if (rank === 3) return 'rank-bronze';
  return '';
}

function rankIcon(rank) {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setEntries(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card page-card">
        <div className="card-header d-flex align-items-center gap-2">
          <span>🏆</span>
          <h2 className="h5 mb-0">Leaderboard</h2>
          <span className="badge bg-secondary ms-auto">{entries.length} athletes</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Total Activities</th>
                  <th scope="col">Total Calories</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">No leaderboard data found.</td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry._id || entry.user_email}>
                      <td className={`fw-bold ${rankClass(entry.rank)}`}>
                        {rankIcon(entry.rank)}
                      </td>
                      <td className="fw-semibold">{entry.user_name}</td>
                      <td>
                        <a href={`mailto:${entry.user_email}`} className="App-link text-decoration-none">
                          {entry.user_email}
                        </a>
                      </td>
                      <td>
                        {entry.team
                          ? <span className="badge bg-primary">{entry.team}</span>
                          : <span className="text-muted">—</span>}
                      </td>
                      <td>
                        <span className="badge bg-dark">{entry.total_activities}</span>
                      </td>
                      <td>
                        <span className="fw-semibold text-danger">{entry.total_calories}</span>
                        <small className="text-muted ms-1">kcal</small>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
