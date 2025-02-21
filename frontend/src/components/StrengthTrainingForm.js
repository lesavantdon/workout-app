import React, { useState } from "react";
import "../styles/JournalPage.css"; // Import the new CSS file

const StrengthTrainingForm = ({ onLogWorkout }) => {
  const [category, setCategory] = useState("Arms/Abs");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise || !reps || !weight) {
      setError("All fields are required.");
      return;
    }
    
    onLogWorkout({ category, exercise, reps, weight, date: new Date().toLocaleDateString() });
    
    setExercise("");
    setReps("");
    setWeight("");
    setError("");
    setSuccess("Workout logged successfully!");
    
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="workout-form">
      <h2>Strength Training</h2>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {["Arms/Abs", "Legs", "Shoulders", "Back", "Chest"].map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <label>Exercise:</label>
      <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />

      <label>Reps:</label>
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />

      <label>Weight (lbs/kg):</label>
      <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

      <button type="submit">Log Workout</button>
    </form>
  );
};

export default StrengthTrainingForm;
