const WorkoutKey = () => {
  const genreColors = {
    Strength: "#FF5733", // Red
    Cardio: "#33B5FF",   // Blue
    Calisthenics: "#4CAF50", // Green
    Yoga: "#9C27B0",     // Purple
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
      <h3>Workout Key</h3>
      {Object.entries(genreColors).map(([workout, color]) => (
        <div key={workout} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <div style={{ width: "15px", height: "15px", backgroundColor: color, marginRight: "10px" }}></div>
          <span>{workout}</span>
        </div>
      ))}
    </div>
  );
};

export default WorkoutKey;
