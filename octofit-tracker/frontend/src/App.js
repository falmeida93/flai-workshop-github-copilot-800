import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

const features = [
  { icon: '👤', title: 'Users', to: '/users', desc: 'Manage athlete profiles and account information.' },
  { icon: '🏆', title: 'Leaderboard', to: '/leaderboard', desc: 'See who leads the pack in calories and activity.' },
  { icon: '🏃', title: 'Activities', to: '/activities', desc: 'Log and track every workout session.' },
  { icon: '👥', title: 'Teams', to: '/teams', desc: 'Create teams and compete together.' },
  { icon: '💪', title: 'Workouts', to: '/workouts', desc: 'Browse personalised workout recommendations.' },
];

function App() {
  return (
    <div className="App">
      {/* ── Navbar ── */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} alt="OctoFit logo" className="navbar-logo" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Routes ── */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero */}
                <div className="octofit-hero text-center">
                  <h1 className="display-4 fw-bold">🏋️ OctoFit Tracker</h1>
                  <p className="lead mt-3">
                    Track your workouts, compete with your team, and climb the leaderboard!
                  </p>
                  <NavLink className="btn btn-outline-light btn-lg mt-3" to="/leaderboard">
                    View Leaderboard
                  </NavLink>
                </div>

                {/* Feature Cards */}
                <div className="container pb-5">
                  <h2 className="text-center mb-4 fw-semibold">Explore the App</h2>
                  <div className="row g-4 justify-content-center">
                    {features.map((f) => (
                      <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={f.title}>
                        <div className="card feature-card h-100 text-center">
                          <div className="card-body">
                            <div className="feature-icon">{f.icon}</div>
                            <h5 className="card-title fw-bold">{f.title}</h5>
                            <p className="card-text text-muted small">{f.desc}</p>
                            <NavLink className="btn btn-dark btn-sm mt-2" to={f.to}>
                              Go to {f.title}
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-dark text-secondary text-center py-3 mt-4">
        <small>&copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Built with React &amp; Django</small>
      </footer>
    </div>
  );
}

export default App;
