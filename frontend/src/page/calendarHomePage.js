import React from "react";

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

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);

    if (currentWeek.length === 7 || day === daysInMonth) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return { month, year, weeks };
};

const CalendarPage = () => {
  const { month, year, weeks } = getMonthWeeks();

  return (
    <div>
    <h1 className = "h1" >{month} {year} </h1>
    <div className="monthly-workout">
      <div className="calendar">
        {/* Days of the week */}
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
            <div key={idx} className="weekday">{day}</div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="days">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((day, dayIndex) => (
                <div key={dayIndex} className={`day ${day ? "" : "empty"}`}>
                  {day || ""}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CalendarPage;
