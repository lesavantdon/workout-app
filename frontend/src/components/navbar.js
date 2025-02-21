// src/components/Navbar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get current route

  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <div className="d-flex justify-content-between w-100">
          <Link className="navbar-brand" to="/">WorkoutApp</Link>
          <ul className="navbar-nav d-flex list-unstyled mb-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">Home Calendar</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/dailyWorkout' ? 'active' : ''}`}>
              <Link className="nav-link" to="/dailyWorkout">Daily Workout</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/journalLogPage' ? 'active' : ''}`}>
              <Link className="nav-link" to="/journalLogPage">Journal Log</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
