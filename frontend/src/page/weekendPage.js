import React, { useEffect, useState } from "react";
import axios from "axios";

const WeekendPage = () => {
  const [weekendExercises, setWeekendExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isWeekend, setIsWeekend] = useState(false); // To check if it's the weekend

  // Function to check if today is Saturday or Sunday
  const checkIfWeekend = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: Sunday, 6: Saturday
    return dayOfWeek === 0 || dayOfWeek === 6; // Saturday or Sunday
  };

  // Fetch weekend exercises data from the API
  useEffect(() => {
    if (checkIfWeekend()) {
      setIsWeekend(true);
      const fetchWeekendExercises = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/weekendExercises");
          if (response.data && Array.isArray(response.data)) {
            setWeekendExercises(response.data);
          } else {
            console.warn("Invalid data format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching weekend exercises:", error);
        }
      };

      fetchWeekendExercises();
    } else {
      setIsWeekend(false);
    }
  }, []);

  // Shuffle exercises and return two random exercises
  const shuffleExercises = (exercises) => {
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2); // Return two random exercises
  };

  // Check if the weekend exercises are already in localStorage
  const getSavedExercises = () => {
    const savedExercises = localStorage.getItem("lastSelectedWeekendExercises");
    if (savedExercises) {
      return JSON.parse(savedExercises);
    }
    return null;
  };

  // Store selected exercises in localStorage
  const storeSelectedExercises = (exercises) => {
    localStorage.setItem("lastSelectedWeekendExercises", JSON.stringify(exercises));
  };

  // Handle the exercise selection logic
  useEffect(() => {
    if (weekendExercises.length > 0 && isWeekend) {
      const lastSelected = getSavedExercises();

      // If exercises are already selected (and stored), don't shuffle again
      if (lastSelected) {
        setSelectedExercises(lastSelected);
      } else {
        // If it's a new weekend, shuffle and save exercises
        const shuffledExercises = shuffleExercises(weekendExercises);
        setSelectedExercises(shuffledExercises);
        storeSelectedExercises(shuffledExercises); // Store the exercises for future reference
      }
    }
  }, [weekendExercises, isWeekend]);

  return (
    <div className="page-container">
      <h1>Weekend Workout</h1>

      {!isWeekend ? (
        <p>It's not the weekend! Come back on Saturday or Sunday for your workout.</p>
      ) : (
        <div>
          {selectedExercises.length === 0 ? (
            <p>Loading weekend exercises...</p>
          ) : (
            <div>
              <h3>Selected Weekend Exercises</h3>
              <ul>
                {selectedExercises.map((exercise, index) => (
                  <li key={index}>
                    <strong>{exercise.name}</strong> - {exercise.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeekendPage;
