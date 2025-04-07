import '../src/styles/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate,  } from "react-router-dom";  
import Navbar from "./components/navbar";
import CalendarPage from "./page/calendarHomePage";
import JournalPage from "./page/journalLogPage"; 
import DetailedWorkoutPage from "./page/detailedWorkoutPage";
import WeekendPage from "./page/weekendPage";
import MentalExercisePage from "./page/mentalExercisePage";
import { WorkoutProvider } from "./context/WorkoutContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <WorkoutProvider>
    <Router>
      <Navbar />
      <div className="container mt-4">
       
        <Routes>
          <Route path="/" element={<Navigate to="/calendar" />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/detailedWorkoutPage" element={<DetailedWorkoutPage/>}/>
          <Route path="/journalLogPage" element={<JournalPage />} />
          <Route path="/weekendPage" element={<WeekendPage />} />
          <Route path="/mentalExercisePage" element={<MentalExercisePage />} />
          <Route path="*" element={<Navigate to="/calendar" />} /> {/* Fallback */}
        </Routes>
      </div>
    </Router>
    </WorkoutProvider>
  );
}

export default App;
