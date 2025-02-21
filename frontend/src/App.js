import '../src/styles/App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate,  } from "react-router-dom";  
import Navbar from "./components/navbar";
import CalendarPage from "./page/calendarHomePage";
import JournalPage from "./page/journalLogPage"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
       
        <Routes>
          <Route path="/" element={<Navigate to="/calendar" />} />
          <Route path="/calendar" element={<CalendarPage />} />
          
          <Route path="/journalLogPage" element={<JournalPage />} />
          <Route path="*" element={<Navigate to="/calendar" />} /> {/* Fallback */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
