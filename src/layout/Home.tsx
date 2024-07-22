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
  const [isMuted, setIsMuted] = useState(false); // Mute state

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
      // Start the timer when puzzle data is set
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error fetching puzzle:", error);
    }
  };

  const handlePlayClick = () => {
    setHasStarted(true);
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

  const handleTimerFinish = () => {
    // Logic for when the timer finishes, e.g., show a message or end the game
    console.log("Timer has finished!");
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
              <Grid puzzleData={puzzleData} />
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
    </div>
  );
};

export default Home;
