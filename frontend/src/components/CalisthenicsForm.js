// CalisthenicsForm.js
import React, { useState } from "react";
import "../styles/JournalPage.css";

const CalisthenicsForm = ({ onLogWorkout }) => {
  const [category, setCategory] = useState("Chest");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise ||!reps ||!duration) {
      setError("All fields are required.");
      return;
    }
    onLogWorkout({ category, exercise,reps, duration, date: new Date().toLocaleDateString() });
    setExercise("");
    setReps("");
    setDuration("");
   
    setError("");
    setSuccess("Workout logged successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <h2>Calisthenics</h2>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {["Chest", "Shoulders", "Legs", "Arms", "Core"].map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <label>Workout Type:</label>
      <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />

      <label>Reps:</label>
      <input type="text" value={reps} onChange={(e) => setReps(e.target.value)} />

      <label>Duration (min)</label>
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="e.g., 45"
      />

      <button type="submit">Log Workout</button>
    </form>
  );
};

export default CalisthenicsForm;
