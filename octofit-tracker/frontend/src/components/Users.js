import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users component: fetch error', err);
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
        <p className="mt-3 text-muted">Loading users...</p>
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
          <span>👤</span>
          <h2 className="h5 mb-0">Users</h2>
          <span className="badge bg-secondary ms-auto">{users.length} records</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No users found.</td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user._id || user.email}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`} className="App-link text-decoration-none">{user.email}</a>
                      </td>
                      <td>
                        {user.team
                          ? <span className="badge bg-primary">{user.team}</span>
                          : <span className="text-muted">—</span>}
                      </td>
                      <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</td>
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

export default Users;
