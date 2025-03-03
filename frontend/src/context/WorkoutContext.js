import { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [currentWeekGenre, setCurrentWeekGenre] = useState(() => {
    // Retrieve from localStorage on initial load
    const savedGenre = localStorage.getItem("currentWeekGenre");
    return savedGenre ? savedGenre : ""; // Return the saved genre or empty string
  });

  useEffect(() => {
    // When currentWeekGenre changes, update localStorage
    if (currentWeekGenre) {
      localStorage.setItem("currentWeekGenre", currentWeekGenre);
    }
  }, [currentWeekGenre]);

  return (
    <WorkoutContext.Provider value={{ currentWeekGenre, setCurrentWeekGenre }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);
