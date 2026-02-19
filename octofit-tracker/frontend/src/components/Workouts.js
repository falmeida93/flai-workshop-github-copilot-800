import React, { useState, useEffect } from 'react';

const DIFFICULTY_BADGE = {
  Easy: 'bg-success',
  Medium: 'bg-warning text-dark',
  Hard: 'bg-danger',
  Beginner: 'bg-info text-dark',
  Advanced: 'bg-danger',
  Intermediate: 'bg-warning text-dark',
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts component: fetch error', err);
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
        <p className="mt-3 text-muted">Loading workouts...</p>
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
          <span>💪</span>
          <h2 className="h5 mb-0">Workouts</h2>
          <span className="badge bg-secondary ms-auto">{workouts.length} records</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Exercise Type</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories (est.)</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">No workouts found.</td>
                  </tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout._id || workout.name}>
                      <td className="text-muted">{idx + 1}</td>
                      <td className="fw-semibold">{workout.name}</td>
                      <td>
                        <span className="badge bg-dark">{workout.exercise_type}</span>
                      </td>
                      <td>
                        <span className={`badge ${DIFFICULTY_BADGE[workout.difficulty] || 'bg-secondary'}`}>
                          {workout.difficulty}
                        </span>
                      </td>
                      <td>{workout.duration}</td>
                      <td>
                        <span className="fw-semibold text-danger">{workout.calories_estimate}</span>
                        <small className="text-muted ms-1">kcal</small>
                      </td>
                      <td className="text-muted">{workout.description}</td>
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

export default Workouts;
