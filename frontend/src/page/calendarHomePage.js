import React, { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import WorkoutKey from "../components/WorkoutKey";

const getMonthWeeks = () => {
  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const firstDay = new Date(year, today.getMonth(), 1);
  const lastDay = new Date(year, today.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstDayOfWeek = firstDay.getDay();

  const weeks = [];
  let currentWeek = new Array(firstDayOfWeek).fill(null);
  let weekIndex = 0;
  let currentWeekIndex = null;

  const genreColors = {
    Strength: "#FF5733",
    Cardio: "#33B5FF",
    Calisthenics: "#4CAF50",
    Yoga: "#9C27B0",
  };

  const totalWeeks = Math.ceil((firstDay.getDay() + daysInMonth) / 7);
  let genreOrder = [];
  if (totalWeeks >= 4) {
    genreOrder = ["Strength", "Cardio", "Strength", "Yoga"];
    if (totalWeeks === 5) genreOrder.push("Calisthenics");
  } else {
    genreOrder = ["Strength", "Cardio", "Strength", "Yoga"].slice(0, totalWeeks);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, today.getMonth(), day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    currentWeek.push({
      day,
      isWeekend
    });

    if (currentWeek.length === 7 || day === daysInMonth) {
      const genre = genreOrder[weekIndex % genreOrder.length];
      weeks.push({
        days: currentWeek,
        genre,
        color: genreColors[genre],
      });

     if (currentWeek.some(d => d && d.day === today.getDate())) {
  currentWeekIndex = weekIndex;
}


      currentWeek = [];
      weekIndex++;
    }
  }

  return {
    month,
    year,
    weeks,
    currentWeekGenre: weeks[currentWeekIndex]?.genre,
    today,
  };
};

const CalendarPage = () => {
  const { setCurrentWeekGenre } = useWorkout();
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    const { month, year, weeks, currentWeekGenre, today } = getMonthWeeks();
    setCalendarData({ month, year, weeks, currentWeekGenre, today });
    if (currentWeekGenre) {
      setCurrentWeekGenre(currentWeekGenre);
    }
  }, [setCurrentWeekGenre]);

  if (!calendarData) return <div>Loading...</div>;

  const { month, year, weeks, currentWeekGenre, today } = calendarData;

  return (
    <div>
      <h1>Workout Calendar</h1>
      <WorkoutKey />
      <div className="current-week">
        <h2>You're in {currentWeekGenre} Training Week</h2>
        <p>{today.toDateString()}</p>
      </div>
      <h2>{month} {year}</h2>

      <div className="calendar">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="week">
            {week.days.map((dayObj, dayIndex) => {
              if (!dayObj) return <div key={dayIndex} className="day empty"></div>;
              const { day, isWeekend } = dayObj;
              return (
                <div
                  key={dayIndex}
                  className={`day ${isWeekend ? "weekend" : ""}`}
                  style={{
                    backgroundColor: isWeekend ? "transparent" : week.color,
                    color: isWeekend ? "gray" : "white",
                  }}
                >
                  {isWeekend ? "" : day}
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
