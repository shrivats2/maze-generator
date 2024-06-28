import React, { useState } from "react";
import generateMaze from "../algorithm/algo";

const MazeGenerator: React.FC = () => {
  const [size, setSize] = useState<number>(10);
  const [maze, setMaze] = useState(() => generateMaze(size, size));
  const [error, setError] = useState<string>("");

  const makeClassName = (i: number, j: number): string => {
    const classes = [];
    if (maze[i][j][0] === 0) classes.push("topWall");
    if (maze[i][j][1] === 0) classes.push("rightWall");
    if (maze[i][j][2] === 0) classes.push("bottomWall");
    if (maze[i][j][3] === 0) classes.push("leftWall");
    return classes.join(" ");
  };

  const handleGenerateMaze = (): void => {
    if (size < 5 || size > 40 || isNaN(size)) {
      setError("Enter a value between 5 and 40.");
      return;
    }
    setError("");
    setMaze(generateMaze(size, size));
  };

  return (
    <div className="wrapper">
      <div className="action-block">
        <div>
          <label htmlFor="mazeSize">Size of maze (5-40) :</label>
          <input
            type="number"
            name="mazeSize"
            min="5"
            max="40"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </div>
        <button onClick={handleGenerateMaze}>Generate new maze</button>
        {error && <div className="error">{error}</div>}
      </div>
      <table id="maze">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                  <div />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MazeGenerator;
