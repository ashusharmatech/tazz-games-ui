import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { delay, generateColors } from "../utils";
import LoadingGrid from "./LoadingGrid";

interface CellInfo {
  [key: string]: string;
}

interface PuzzleData {
  puzzle: string[][];
  cell_info: CellInfo;
}

const Grid = () => {
  const [originalData, setOriginalData] = useState<PuzzleData | null>(null);
  const [regionColors, setRegionColors] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const fetchPuzzle = async () => {
    const size = 8; // Change this as needed
    if (!originalData) {

      fetch(`http://localhost:5000/generate_puzzle?size=${size}`)
        .then((response) => response.json())
        .then((data: PuzzleData) => {
          // Initialize puzzle data with empty cells
          const initialPuzzle = Array(size)
            .fill(null)
            .map(() => Array(size).fill(""));
          setOriginalData({ ...data, puzzle: initialPuzzle }); // Use the initial empty cells
          displayPuzzle(data); // Display the puzzle
        })
        .catch((error) => console.error("Error fetching puzzle:", error));
    }
  };

  const displayPuzzle = (data: PuzzleData) => {
    const uniqueRegions = new Set(Object.values(data.cell_info));
    const colors = generateColors(uniqueRegions.size);
    const newRegionColors: { [key: string]: string } = {};
    uniqueRegions.forEach((region, index) => {
      newRegionColors[region] = colors[index];
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
                ? cell === ""
                  ? "X"
                  : cell === "X"
                  ? "♕"
                  : ""
                : cell
            )
          : row
      ),
    };

    setOriginalData(newData); // Update the state with the new puzzle
  };

  if (!originalData) return <LoadingGrid/>;

  return (
    <div
      id="puzzle-container"
      className="bg-white shadow-md rounded border-2 border-gray-900"
    >
      <table className="table-auto w-full">
        <tbody>
          {originalData.puzzle.map((row, i) => (
            <tr key={i} className="border-b border-gray-200">
              {row.map((cell, j) => (
                <Cell
                  key={j}
                  color={
                    regionColors[originalData.cell_info[`(${i}, ${j})`]] || ""
                  }
                  value={cell}
                  onClick={() => toggleCell(i, j)}
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
