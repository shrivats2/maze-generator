import React from "react";
import MazeGenerator from "./components/mazegenerator";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <img width={100} alt="logo" src="/logo192.png" />
        <h1 style={{ fontWeight: "bold" }}>Maze Generator</h1>
      </div>
      <MazeGenerator />
    </div>
  );
};

export default App;
