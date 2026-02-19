import React, { useState, useEffect } from 'react';

const ACTIVITY_BADGE = {
  Running: 'bg-success',
  Cycling: 'bg-warning text-dark',
  Swimming: 'bg-info text-dark',
  Weightlifting: 'bg-danger',
  Yoga: 'bg-purple',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities component: fetch error', err);
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
        <p className="mt-3 text-muted">Loading activities...</p>
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
          <span>🏃</span>
          <h2 className="h5 mb-0">Activities</h2>
          <span className="badge bg-secondary ms-auto">{activities.length} records</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">No activities found.</td>
                  </tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity._id || `${activity.user_email}-${activity.date}-${idx}`}>
                      <td className="text-muted">{idx + 1}</td>
                      <td>{activity.user_email}</td>
                      <td>
                        <span className={`badge ${ACTIVITY_BADGE[activity.activity_type] || 'bg-secondary'}`}>
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>{activity.duration}</td>
                      <td>
                        <span className="fw-semibold text-danger">{activity.calories}</span>
                        <small className="text-muted ms-1">kcal</small>
                      </td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                      <td className="text-muted fst-italic">{activity.notes || '—'}</td>
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

export default Activities;
