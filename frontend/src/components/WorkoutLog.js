import React from "react";
import "../styles/JournalPage.css";

const WorkoutLog = ({ workouts }) => {
  return (
    <div className="workout-log">
      <h2>Workout Log</h2>
      {workouts.length === 0 ? (
        <p className="log-placeholder">No workouts logged yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Exercise</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Distance</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.date}</td>
                <td>{workout.category}</td>
                <td>{workout.exercise}</td>
                <td>{workout.reps}</td>
                <td>{workout.weight}</td>
                <td>{workout.distance || "-"}</td>
                <td>{workout.duration || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkoutLog;
