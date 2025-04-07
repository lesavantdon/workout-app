import React, { useEffect, useState } from "react";
import axios from "axios";

const MentalExercisePage = () => {
  const [mentalExercises, setMentalExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to shuffle exercises and return two random exercises
  const shuffleExercises = (exercises) => {
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2); // Return 2 random exercises
  };

  // Function to get saved exercises from localStorage
  const getSavedExercises = () => {
    const savedExercises = localStorage.getItem("lastSelectedMentalExercises");
    if (savedExercises) {
      return JSON.parse(savedExercises);
    }
    return null;
  };

  // Store selected exercises in localStorage
  const storeSelectedExercises = (exercises) => {
    localStorage.setItem("lastSelectedMentalExercises", JSON.stringify(exercises));
  };

  // Function to check if the exercises need to be updated (new day)
  const checkIfNewDay = () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const lastSavedDate = localStorage.getItem("lastSavedMentalExercisesDate");

    if (lastSavedDate !== today) {
      // If the date has changed, return true (new day)
      localStorage.setItem("lastSavedMentalExercisesDate", today); // Update the saved date
      return true;
    }
    return false;
  };

  // Fetch mental exercises from the API
  useEffect(() => {
    const fetchMentalExercises = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mental");
        if (response.data && Array.isArray(response.data)) {
          setMentalExercises(response.data);
        } else {
          console.warn("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching mental exercises:", error);
      }
    };

    fetchMentalExercises();
  }, []);

  // Handle the exercise selection logic
  useEffect(() => {
    if (mentalExercises.length > 0) {
      const lastSelected = getSavedExercises();

      // Check if it's a new day and if we need to shuffle and save new exercises
      if (checkIfNewDay() || !lastSelected) {
        const shuffledExercises = shuffleExercises(mentalExercises);
        setSelectedExercises(shuffledExercises);
        storeSelectedExercises(shuffledExercises); // Store the exercises for the day
      } else {
        setSelectedExercises(lastSelected); // Use saved exercises if it's the same day
      }
      setIsLoaded(true);
    }
  }, [mentalExercises]);

  return (
    <div className="page-container">
      <h1>Mental Exercise for Today</h1>

      {!isLoaded ? (
        <p>Loading mental exercises...</p>
      ) : (
        <div>
          {selectedExercises.length === 0 ? (
            <p>No exercises available for today.</p>
          ) : (
            <div>
              <h3>Today's Selected Exercises</h3>
              <ul>
                {selectedExercises.map((exercise, index) => (
                  <li key={index}>
                    <strong>{exercise.name} </strong> - {exercise.description}
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

export default MentalExercisePage;
