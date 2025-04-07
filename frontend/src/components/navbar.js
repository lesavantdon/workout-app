import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // Get current route

  // Inline styles for the navbar
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 2rem",
    backgroundColor: "#f8f9fa", // Light background
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow
  };

  const navListStyle = {
    display: "flex",
    flexDirection: "row", // Make items horizontal
    justifyContent: "space-around",
    width: "auto", // Set width to auto, to fit content
    listStyle: "none",
    margin: "0",
    padding: "0",
  };

  const navItemStyle = {
    margin: "0 15px", // Spacing between items
    fontSize: "1rem",
  };

  const activeStyle = {
    color: "#007bff", // Active link color
    fontWeight: "bold", // Active link boldness
  };

  return (
    <nav style={navbarStyle} className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ fontSize: "1.5rem" }}>
          WorkoutApp
        </Link>

        {/* Navbar items */}
        <ul style={navListStyle}>
          <li
            style={navItemStyle}
            className={location.pathname === "/" ? "active" : ""}
          >
            <Link className="nav-link" to="/" style={location.pathname === "/" ? activeStyle : {}}>
              Home Calendar
            </Link>
          </li>

          <li
            style={navItemStyle}
            className={location.pathname === "/detailedWorkoutPage" ? "active" : ""}
          >
            <Link
              className="nav-link"
              to="/detailedWorkoutPage"
              style={location.pathname === "/detailedWorkoutPage" ? activeStyle : {}}
            >
              Daily Workout
            </Link>
          </li>


          <li
            style={navItemStyle}
            className={location.pathname === "/weekendPage" ? "active" : ""}
          >
            <Link
              className="nav-link"
              to="/weekendPage"
              style={location.pathname === "/weekendPage" ? activeStyle : {}}
            >
              Weekend Page
            </Link>
          </li>

          <li
            style={navItemStyle}
            className={location.pathname === "/mentalExercisePage" ? "active" : ""}
          >
            <Link
              className="nav-link"
              to="/mentalExercisePage"
              style={location.pathname === "/mentalExercisePage" ? activeStyle : {}}
            >
              Mental Exercise Page
            </Link>
          </li>
          <li
            style={navItemStyle}
            className={location.pathname === "/journalLogPage" ? "active" : ""}
          >
            <Link
              className="nav-link"
              to="/journalLogPage"
              style={location.pathname === "/journalLogPage" ? activeStyle : {}}
            >
              Journal Log
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
