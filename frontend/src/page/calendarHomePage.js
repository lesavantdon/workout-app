import React, { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext"; // Import Context Hook
import WorkoutKey from "../components/WorkoutKey";

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getMonthWeeks = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const firstDay = new Date(year, today.getMonth(), 1);
  const lastDay = new Date(year, today.getMonth() + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const weeks = [];
  let currentWeek = new Array(firstDayOfWeek).fill(null);
  let weekIndex = 0;
  let currentWeekIndex = null;

  // Colors for each genre
  const genreColors = {
    Strength: "#FF5733", // Red
    Cardio: "#33B5FF",   // Blue
    Calisthenics: "#4CAF50", // Green
    Yoga: "#9C27B0",     // Purple
  };

  
  
  const currentMonthKey = `${year}-${today.getMonth() + 1}`;
  let genreOrder = JSON.parse(localStorage.getItem(currentMonthKey));

  if (!genreOrder) {
    const baseGenres = ["Strength", "Cardio", "Calisthenics", "Yoga"];
    genreOrder = shuffleArray(baseGenres);
    // Save the genres to localStorage for the current month
    localStorage.setItem(currentMonthKey, JSON.stringify(genreOrder));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);

    if (currentWeek.length === 7 || day === daysInMonth) {
      let genre = genreOrder[weekIndex % genreOrder.length];

      // Prevent the last week from repeating the previous one
      if (weekIndex > 0 && genre === weeks[weekIndex - 1].genre) {
        genreOrder = shuffleArray(["Strength", "Cardio", "Calisthenics", "Yoga"]); // Reshuffle if needed
        genre = genreOrder[0]; // Pick the first one after reshuffling
      }

      weeks.push({ days: currentWeek, genre, color: genreColors[genre] });

      if (currentWeek.includes(today.getDate())) {
        currentWeekIndex = weekIndex;
      }

      currentWeek = [];
      weekIndex++;
    }
  }

  return { month, year, weeks, currentWeekGenre: weeks[currentWeekIndex]?.genre, today };
};

const CalendarPage = () => {
  const { setCurrentWeekGenre } = useWorkout(); // Get setCurrentWeekGenre from context
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    const { month, year, weeks, currentWeekGenre, today } = getMonthWeeks();
    setCalendarData({ month, year, weeks, currentWeekGenre, today });
    
    if (currentWeekGenre) {
      console.log("Setting currentWeekGenre:", currentWeekGenre);
      setCurrentWeekGenre(currentWeekGenre); // Set the genre in context
    }
  }, [setCurrentWeekGenre]);

  if (!calendarData) return <div>Loading...</div>;

  const { month, year, weeks, currentWeekGenre, today } = calendarData;

  return (
    <div>
      <div>
        <h1>Workout Calendar</h1>
        <WorkoutKey />
        {/* Display the current week's genre with full date */}
        <div className="current-week">
          <h2>You're in {currentWeekGenre} Training Week</h2>
          <p>{today.toDateString()}</p>
        </div>
      </div>
      <h1>{month} {year}</h1>
      <div className="calendar">
        {/* Calendar Days */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            {week.days.map((day, dayIndex) => {
              // Get the day of the week (0-6)
              const dayOfWeek = new Date(year, today.getMonth(), day).getDay();

              // If it's Saturday (6) or Sunday (0), display a blocked-out day
              const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;

              return (
                <div
                  key={dayIndex}
                  className={`day ${day ? "" : "empty"} ${isWeekend ? "weekend" : ""}`}
                  style={{
                    backgroundColor: isWeekend ? "transparent" : week.color,
                    color: isWeekend ? "gray" : "white", // Gray out weekends
                  }}
                  title={day ? `${month} ${day}, ${year}` : ""}
                >
                  {isWeekend ? " No Workout" : day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
