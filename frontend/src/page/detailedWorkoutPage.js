import React, { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import axios from "axios";
import "../styles/globalStyles.css";

const API_URL = process.env.REACT_APP_API_URL;

const DetailedWorkoutPage = () => {
  const { currentWeekGenre } = useWorkout();
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Shuffle method to randomize exercises
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to check if it's the weekend
  const isWeekend = () => {
    const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    return today === 0 || today === 6;
  };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (!currentWeekGenre) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/api/${currentWeekGenre.toLowerCase()}`);
        if (response.data && Array.isArray(response.data)) {
          setWorkoutData(response.data);
        } else {
          console.warn("Invalid workout data format received:", response.data);
          setWorkoutData([]);
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
        setError("There was an error fetching the workout data. Please try again later.");
        setWorkoutData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, [currentWeekGenre]);

  useEffect(() => {
    if (!currentWeekGenre || workoutData.length === 0) return;

    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const storedWorkout = localStorage.getItem(`workout_${currentWeekGenre}`);
    const storedDate = localStorage.getItem(`workout_date_${currentWeekGenre}`);

    // If it's the weekend, shuffle the workout data and pick one randomly
    if (isWeekend()) {
      const shuffledWorkouts = shuffleArray(workoutData);
      const randomIndex = Math.floor(Math.random() * shuffledWorkouts.length);
      const newWorkout = shuffledWorkouts[randomIndex];

      setSelectedWorkout(newWorkout);
      localStorage.setItem(`workout_${currentWeekGenre}`, JSON.stringify(newWorkout));
      localStorage.setItem(`workout_date_${currentWeekGenre}`, today);
    } else {
      // If it's not the weekend, proceed with the regular logic
      if (storedWorkout && storedDate === today) {
        try {
          setSelectedWorkout(JSON.parse(storedWorkout));
        } catch (error) {
          console.error("Error parsing stored workout data:", error);
        }
      } else {
        const randomIndex = Math.floor(Math.random() * workoutData.length);
        const newWorkout = workoutData[randomIndex];

        setSelectedWorkout(newWorkout);
        localStorage.setItem(`workout_${currentWeekGenre}`, JSON.stringify(newWorkout));
        localStorage.setItem(`workout_date_${currentWeekGenre}`, today);
      }
    }
  }, [workoutData, currentWeekGenre]);

  const renderWorkoutDetails = (workout) => {
    if (!workout) return <p>No workout details available.</p>;

    return (
      <div>
        {/* Display type or category only if it exists */}
        {(workout.type || workout.category) && (
          <h3>{workout.type || workout.category}</h3>
        )}

        {/* Display warm-up for non-yoga workouts */}
        {workout.warmup && !["yoga"].includes(currentWeekGenre.toLowerCase()) && (
          <p><strong>Warm-up:</strong> {Array.isArray(workout.warmup) ? workout.warmup.join(", ") : workout.warmup}</p>
        )}

        {/* Main exercises for general workout types */}
        {["calisthenics", "strength", "cardio"].includes(currentWeekGenre.toLowerCase().trim()) && (
          <>
            <p><strong>Main Exercises:</strong></p>
            <ul>
              {Array.isArray(workout.main) ? workout.main.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              )) : <p>No exercises available.</p>}
            </ul>
            {workout.sets && workout.reps && (
              <p><strong>Sets/Reps:</strong> {workout.sets} sets of {workout.reps} reps</p>
            )}
          </>
        )}

        {/* Yoga-specific details */}
        {currentWeekGenre.toLowerCase().trim() === "yoga" && (
          <>
            <p><strong>Yoga Poses:</strong></p>
            <ul>
              {Array.isArray(workout.main) ? workout.main.map((pose) => (
                <li key={pose._id || pose.pose}>
                  <strong>{pose.pose}</strong> {pose.sanskrit && `(${pose.sanskrit})`}
                </li>
              )) : <p>No yoga poses available.</p>}
            </ul>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    console.log(selectedWorkout); // Log selectedWorkout when it's updated
  }, [selectedWorkout]);

  return (
    <div className="page-container">
      <h1>{currentWeekGenre} Workout Details</h1>
      {loading && <p>Loading workout details...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && selectedWorkout ? renderWorkoutDetails(selectedWorkout) : (
        <p>No workout data available for this genre. Please try again later.</p>
      )}
    </div>
  );
};

export default DetailedWorkoutPage;
