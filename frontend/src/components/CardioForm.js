import React, { useState } from "react";
import "../styles/JournalPage.css";

const CardioForm = ({ onLogWorkout }) => {
  const [category, setCategory] = useState("Aerobic");
  const [exercise, setExercise] = useState("");
  const [distance, setDistance] = useState("");  // ✅ Added state
  const [duration, setDuration] = useState("");  // ✅ Added state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise) {
      setError("Exercise type is required.");
      return;
    }
    if (!distance || isNaN(distance) || distance < 0) {
      setError("Valid distance is required.");
      return;
    }
    if (!duration || isNaN(duration) || duration < 0) {
      setError("Valid duration is required.");
      return;
    }

    onLogWorkout({
      category,
      exercise,
      distance: `${distance} mi`,
      duration: `${duration} min`,
      date: new Date().toLocaleDateString(),
    });

    // ✅ Reset fields after submission
    setExercise("");
    setDistance("");
    setDuration("");
    setError("");
    setSuccess("Workout logged successfully!");

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <h2>Cardio</h2>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {["Aerobic", "HIIT"].map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <label>Exercise Type</label>
      <input
        type="text"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="e.g., Running, Cycling"
      />

      <label>Distance (mi)</label>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="e.g., 3.5"
      />

      <label>Duration (min)</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="e.g., 45"
      />

      <button type="submit">Log Workout</button>
    </form>
  );
};

export default CardioForm;
