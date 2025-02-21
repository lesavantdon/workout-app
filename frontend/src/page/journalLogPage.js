import React, { useState, useEffect } from "react";
import StrengthTrainingForm from "../components/StrengthTrainingForm";
import CardioForm from "../components/CardioForm";
import CalisthenicsForm from "../components/CalisthenicsForm";
import "../styles/JournalPage.css";
import "../styles/tableStyles.css";
import "../styles/formStyles.css";

const JournalPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState("Strength Training");
  const [logs, setLogs] = useState({
    "Strength Training": [],
    "Cardio": [],
    "Calisthenics": [],
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch workouts from MongoDB
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true); // Set loading before fetch
      try {
        const response = await fetch("http://localhost:5000/api/workouts");
        const data = await response.json();

        const formattedLogs = data.reduce((acc, workout) => {
          acc[workout.type] = [...(acc[workout.type] || []), workout];
          return acc;
        }, { "Strength Training": [], "Cardio": [], "Calisthenics": [] });

        setLogs(formattedLogs);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchWorkouts();
  }, [selectedWorkout]); // Re-fetch data when selected workout changes

  // Log new workout to MongoDB
  const handleLogWorkout = async (workoutData) => {
    try {
      // Send the new workout data to the server
      const response = await fetch("http://localhost:5000/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...workoutData, type: selectedWorkout }),
      });

      const newWorkout = await response.json();

      // Immediately update the logs state with the new workout
      setLogs((prevLogs) => ({
        ...prevLogs,
        [selectedWorkout]: [newWorkout, ...prevLogs[selectedWorkout]],
      }));
    } catch (error) {
      console.error("Error logging workout:", error);
    }
  };

  const renderForm = () => {
    const formComponents = {
      "Strength Training": StrengthTrainingForm,
      "Cardio": CardioForm,
      "Calisthenics": CalisthenicsForm,
    };
    const SelectedForm = formComponents[selectedWorkout];
    return SelectedForm ? <SelectedForm onLogWorkout={handleLogWorkout} /> : null;
  };

  const renderTableHeader = () => {
    if (selectedWorkout === "Strength Training") {
      return (
        <tr>
          <th>Date</th>
          <th>Exercise</th>
          <th>Reps</th>
          <th>Weight (lbs)</th>
        </tr>
      );
    } else if (selectedWorkout === "Cardio") {
      return (
        <tr>
          <th>Date</th>
          <th>Exercise</th>
          <th>Duration</th>
          <th>Distance</th>
        </tr>
      );
    } else if (selectedWorkout === "Calisthenics") {
      return (
        <tr>
          <th>Date</th>
          <th>Exercise</th>
          <th>Reps</th>
          <th>Duration (min)</th>
        </tr>
      );
    }
    return null;
  };

  const renderTableBody = () => {
    return logs[selectedWorkout]?.length === 0 ? (
      <tr>
        <td colSpan="4">No logs yet.</td>
      </tr>
    ) : (
      logs[selectedWorkout].map((log, index) => (
        <tr key={index}>
          <td>{new Date(log.date).toLocaleDateString()}</td>
          <td>{log.exercise || "N/A"}</td>
          <td>{log.reps || log.duration || "-"}</td>
          <td>{log.weight || log.distance || "-"}</td>
        </tr>
      ))
    );
  };

  return (
    <div >
      <h1>WORKOUT JOURNAL</h1>
      <div className= "workout-category-buttons">
        {["Strength Training", "Cardio", "Calisthenics"].map((type) => (
          <button key={type} 
          onClick={() => setSelectedWorkout(type)}
          className ={selectedWorkout ===type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : renderForm()}

      <h2>{selectedWorkout} History</h2>
      <table className="workout-table">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default JournalPage;
