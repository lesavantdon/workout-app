import React, { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import axios from "axios";
import "../styles/globalStyles.css";

const API_URL = process.env.REACT_APP_API_URL;

const DetailedWorkoutPage = () => {
  const { currentWeekGenre } = useWorkout();
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/${currentWeekGenre.toLowerCase()}`);
        setWorkoutData(response.data);
      } catch (error) {
        console.error("Error fetching workout data:", error);
        setWorkoutData([]);
      }
    };

    if (currentWeekGenre) {
      fetchWorkoutData();
    }
  }, [currentWeekGenre]);

  useEffect(() => {
    if (!currentWeekGenre || workoutData.length === 0) return;
  
    const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
    const storedWorkout = localStorage.getItem(`workout_${currentWeekGenre}`);
    const storedDate = localStorage.getItem(`workout_date_${currentWeekGenre}`);
  
    if (storedWorkout && storedDate === today) {
      setSelectedWorkout(JSON.parse(storedWorkout)); // Load saved workout only if date matches
    } else {
      const randomIndex = Math.floor(Math.random() * workoutData.length);
      const newWorkout = workoutData[randomIndex];
  
      setSelectedWorkout(newWorkout);
      localStorage.setItem(`workout_${currentWeekGenre}`, JSON.stringify(newWorkout)); // Save workout
      localStorage.setItem(`workout_date_${currentWeekGenre}`, today); // Save today's date
    }
  }, [workoutData, currentWeekGenre]);
  const renderWorkoutDetails = (workout) => {
    if (!workout) return null;

    switch (currentWeekGenre.toLowerCase().trim()) {
      case "calisthenics":
      case "strength":
      case "cardio":
        return (
          <>
            <h3>{workout.category}</h3>
            <p><strong>Warm-up:</strong> {workout.warmup.join(", ")}</p>
            <p><strong>Main Exercises:</strong></p>
            <ul>{workout.main.map((exercise, index) => (
            <li key={index}>{exercise}</li> ))}
            </ul>
            {workout.sets && workout.reps && (
              <p><strong>Sets/Reps:</strong> {workout.sets} sets of {workout.reps} reps</p>
            )}
          </>
        );

      case "yoga":
        return (
          <>
            <h3>{workout.category}</h3>
            <p><strong>Warm-up:</strong> {workout.warmup.join(", ")}</p>
            <p><strong>Yoga Poses:</strong></p>
            <ul>
              {Array.isArray(workout.main) ? (
                workout.main.map((pose) => (
                  <li key={pose._id}>
                    <strong>{pose.pose}</strong> ({pose.sanskrit})
                  </li>
                ))
              ) : (
                <p>No poses available for this workout.</p>
              )}
            </ul>
          </>
        );

      default:
        return <p>Invalid genre.</p>;
    }
  };

  return (
    <div className = "page-container">
      <h1>{currentWeekGenre} Workout Details</h1>
      {selectedWorkout ? (
        <div key={selectedWorkout._id}>{renderWorkoutDetails(selectedWorkout)}</div>
      ) : (
        <p>No workout data available for this genre. Please try again later.</p>
      )}
    </div>
  );
};

export default DetailedWorkoutPage;
