import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Instructions from "../components/Instructions";
import PlayButton from "../components/PlayButton";
import LoadingGrid from "../components/LoadingGrid";
import GridHeader from "../components/GridHeader";
import GridFooter from "../components/GridFooter";

interface CellInfo {
  [key: string]: string;
}

interface PuzzleData {
  puzzle: string[][];
  cell_info: CellInfo;
}

const Home: React.FC<{}> = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [instructionsCollapsed, setInstructionsCollapsed] = useState(false);
  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [finalTime, setFinalTime] = useState<number | null>(null);

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const fetchPuzzle = async () => {
    const size = 8; // Change this as needed
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error("API URL environment variable is not set.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/generate_puzzle?size=${size}`);
      const data: PuzzleData = await response.json();
      // Initialize puzzle data with empty cells
      const initialPuzzle = Array(size)
        .fill(null)
        .map(() => Array(size).fill(""));
      setPuzzleData({ ...data, puzzle: initialPuzzle }); // Use the initial empty cells
    } catch (error) {
      console.error("Error fetching puzzle:", error);
    }
  };

  const handlePlayClick = () => {
    setHasStarted(true);
    setIsTimerActive(true); // Start the timer
    setInstructionsCollapsed(true);
  };

  const handleToggleInstructions = () => {
    setInstructionsCollapsed(!instructionsCollapsed);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleClear = () => {
    if (puzzleData) {
      // Logic to clear the grid
      const clearedPuzzle = puzzleData.puzzle.map((row) => row.map(() => ""));
      setPuzzleData((prevData) =>
        prevData ? { ...prevData, puzzle: clearedPuzzle } : null
      );
    }
  };

  const handleNewGame = () => {
    // Logic to start a new game
    fetchPuzzle(); // Re-fetch the puzzle data
    setIsTimerActive(true);
    setHasStarted(true);
    setInstructionsCollapsed(true);
  };

  const handleSolutionValid = (time: number) => {
    setIsTimerActive(false); // Stop the timer when solution is valid
    setFinalTime(time); // Set the final time when the solution is valid
  };

  const handleTimerFinish = (time: number) => {
    console.log("Timer has finished! Final Time:", time);
    setIsTimerActive(false);
    setFinalTime(time);
  };

  if (!puzzleData) return <LoadingGrid />;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        {hasStarted ? (
          <>
            <GridHeader
              isActive={isTimerActive}
              onFinish={handleTimerFinish}
              isMuted={isMuted}
              onMuteToggle={handleMuteToggle}
            />
            <div className="w-full max-w-4xl mt-4">
              <Grid
                puzzleData={puzzleData}
                isMuted={isMuted}
                onSolutionValid={handleSolutionValid} // Pass the onSolutionValid prop
              />
            </div>
            <GridFooter onClear={handleClear} onNewGame={handleNewGame} />
          </>
        ) : (
          <PlayButton onClick={handlePlayClick} />
        )}
      </div>
      <Instructions
        collapsed={instructionsCollapsed}
        onToggle={handleToggleInstructions}
      />
      {finalTime !== null && <div>Final Time: {finalTime} seconds</div>}
    </div>
  );
};

export default Home;
