import { useState, useEffect } from "react";
import Cell from "./Cell";
import { generateColors } from "../utils";
import LoadingGrid from "./LoadingGrid";

interface CellInfo {
  [key: string]: string;
}

interface PuzzleData {
  puzzle: string[][];
  cell_info: CellInfo;
}

interface GridProps {
  puzzleData: PuzzleData;
  isMuted: boolean;
  onSolutionValid: (time: number) => void;
}

const Grid: React.FC<GridProps> = ({ puzzleData, isMuted, onSolutionValid }) => {
  const [originalData, setOriginalData] = useState<PuzzleData | null>(null);
  const [regionColors, setRegionColors] = useState<{ [key: string]: string }>({});
  const [invalidCells, setInvalidCells] = useState<[number, number][]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    if (puzzleData) {
      setOriginalData(puzzleData);
      displayPuzzle(puzzleData);
      setStartTime(Date.now()); // Set the start time when the puzzle is loaded
    }
  }, [puzzleData]);

  const displayPuzzle = (data: PuzzleData) => {
    const uniqueRegions = new Set(Object.values(data.cell_info));
    const colors = generateColors(uniqueRegions.size);
    const newRegionColors: { [key: string]: string } = {};
    const uniqueRegionsArray = Array.from(uniqueRegions);

    uniqueRegionsArray.forEach((region, idx) => {
      newRegionColors[region] = colors[idx];
    });

    setRegionColors(newRegionColors);
  };

  const toggleCell = (i: number, j: number) => {
    if (!originalData) return;

    // Create a new puzzle state with updated cell value
    const newData = {
      ...originalData,
      puzzle: originalData.puzzle.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((cell, colIndex) =>
              colIndex === j
                ? cell === ''
                  ? 'X'
                  : cell === 'X'
                  ? '♕'
                  : ''
                : cell
            )
          : row
      ),
    };

    setOriginalData(newData); // Update the state with the new puzzle
    validateSolution(newData); // Validate the solution after updating the cell
  };

  const validateSolution = (data: PuzzleData) => {
    const puzzleSize = data.puzzle.length;
    const regionCounts: { [key: string]: number } = {};
    const rowCounts = new Array(puzzleSize).fill(0);
    const colCounts = new Array(puzzleSize).fill(0);
    const cellsToHighlight: [number, number][] = [];
    let allOsPlaced = true;

    // Check for each region and count '♕'s in rows and columns
    for (let i = 0; i < puzzleSize; i++) {
      for (let j = 0; j < puzzleSize; j++) {
        const cellValue = data.puzzle[i][j];
        const regionId = data.cell_info[`(${i}, ${j})`];

        if (cellValue === '♕') {
          // Check for region constraints
          if (!regionCounts[regionId]) {
            regionCounts[regionId] = 0;
          }
          regionCounts[regionId]++;
          rowCounts[i]++;
          colCounts[j]++;

          // Check for diagonal constraints
          const diagonals = [
            [i - 1, j - 1],
            [i - 1, j + 1],
            [i + 1, j - 1],
            [i + 1, j + 1],
          ];
          for (const [di, dj] of diagonals) {
            if (
              di >= 0 &&
              di < puzzleSize &&
              dj >= 0 &&
              dj < puzzleSize &&
              data.puzzle[di][dj] === '♕'
            ) {
              cellsToHighlight.push([i, j]); // Add current cell to highlight list
              cellsToHighlight.push([di, dj]); // Add diagonal cell to highlight list
            }
          }
        }
      }
    }

    // Check if each region has exactly one '♕'
    for (const regionId in regionCounts) {
      if (regionCounts[regionId] !== 1) {
        // Highlight cells in the region
        for (let i = 0; i < puzzleSize; i++) {
          for (let j = 0; j < puzzleSize; j++) {
            const regionCheckId = data.cell_info[`(${i}, ${j})`];
            if (regionCheckId === regionId && data.puzzle[i][j] === '♕') {
              cellsToHighlight.push([i, j]);
            }
          }
        }
        allOsPlaced = false;
      }
    }

    // Check if each row and column has exactly one '♕'
    for (let i = 0; i < puzzleSize; i++) {
      if (rowCounts[i] !== 1) {
        // Highlight cells in the row
        for (let j = 0; j < puzzleSize; j++) {
          if (data.puzzle[i][j] === '♕') {
            cellsToHighlight.push([i, j]);
          }
        }
        allOsPlaced = false;
      }
      if (colCounts[i] !== 1) {
        // Highlight cells in the column
        for (let j = 0; j < puzzleSize; j++) {
          if (data.puzzle[j][i] === '♕') {
            cellsToHighlight.push([j, i]);
          }
        }
        allOsPlaced = false;
      }
    }

    const isValid = allOsPlaced && cellsToHighlight.length === 0;
    setInvalidCells(cellsToHighlight);

    if (isValid) {
      const finishTime = (Date.now() - startTime) / 1000; // Calculate the time taken in seconds
      onSolutionValid(finishTime); // Notify the parent component
    }
  };

  if (!originalData) return <LoadingGrid />;

  return (
    <div id="puzzle-container" className="bg-white shadow-md rounded border-2 border-gray-900">
      <table className="table-auto w-full">
        <tbody>
          {originalData?.puzzle.map((row, i) => (
            <tr key={i} className="border-b border-gray-200">
              {row.map((cell, j) => (
                <Cell
                  key={j}
                  color={regionColors[originalData.cell_info[`(${i}, ${j})`]] || ''}
                  value={cell}
                  onClick={() => toggleCell(i, j)}
                  highlight={invalidCells.some(([x, y]) => x === i && y === j)}
                  isMuted={isMuted}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
  );
};

export default Grid;
