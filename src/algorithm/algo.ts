/**
 * Generates a maze using the depth-first search algorithm.
 * @param {number} width - Width of the maze.
 * @param {number} height - Height of the maze.
 * @returns {Maze} - An array representing the maze .
 */

type Cell = [number, number, number, number];

function generateMaze(width: number, height: number): Cell[][] {
  const totalCells = width * height;
  const maze: Cell[][] = [];
  const unvisited: boolean[][] = [];

  for (let i = 0; i < height; i++) {
    maze[i] = [];
    unvisited[i] = [];
    for (let j = 0; j < width; j++) {
      maze[i][j] = [0, 0, 0, 0];
      unvisited[i][j] = true;
    }
  }

  let currentCell: [number, number] = [
    Math.floor(Math.random() * height),
    Math.floor(Math.random() * width),
  ];
  const path: [number, number][] = [currentCell];
  unvisited[currentCell[0]][currentCell[1]] = false;
  let visited = 1;

  while (visited < totalCells) {
    const potentialNeighbors: [number, number, number, number][] = [
      [currentCell[0] - 1, currentCell[1], 0, 2],
      [currentCell[0], currentCell[1] + 1, 1, 3],
      [currentCell[0] + 1, currentCell[1], 2, 0],
      [currentCell[0], currentCell[1] - 1, 3, 1],
    ];
    const neighbors: [number, number, number, number][] = [];

    for (let i = 0; i < 4; i++) {
      const [neighborRow, neighborCol] = potentialNeighbors[i];
      if (
        neighborRow >= 0 &&
        neighborRow < height &&
        neighborCol >= 0 &&
        neighborCol < width &&
        unvisited[neighborRow][neighborCol]
      ) {
        neighbors.push(potentialNeighbors[i]);
      }
    }

    if (neighbors.length) {
      const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
      const [nextRow, nextCol, currentWall, neighborWall] = nextCell;

      maze[currentCell[0]][currentCell[1]][currentWall] = 1;
      maze[nextRow][nextCol][neighborWall] = 1;

      unvisited[nextRow][nextCol] = false;
      visited++;
      currentCell = [nextRow, nextCol];
      path.push(currentCell);
    } else {
      currentCell = path.pop() as [number, number];
    }
  }

  maze[0][0][3] = 1; // Open left wall of the starting cell
  maze[height - 1][width - 1][1] = 1; // Open right wall of the ending cell

  return maze;
}

export default generateMaze;
