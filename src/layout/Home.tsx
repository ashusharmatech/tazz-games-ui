import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import Instructions from "../components/Instructions";
import PlayButton from "../components/PlayButton";
import LoadingGrid from "../components/LoadingGrid";
import Controller from "../components/Controller";

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
    console.log(apiUrl);
    try {
      const response = await fetch(`${apiUrl}/generate_puzzle?size=${size}`);
      const data: PuzzleData = await response.json();
      // Initialize puzzle data with empty cells
      const initialPuzzle = Array(size)
        .fill(null)
        .map(() => Array(size).fill(''));
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

  if (!puzzleData) return <LoadingGrid />;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        {hasStarted ? (
          <> 
            <Controller isActive={isTimerActive} onFinish={() => {}} isMuted={false} onMuteToggle={() => {}}/>
            <div className="w-full max-w-4xl mt-4">
              <Grid puzzleData={puzzleData} />
            </div>
          </>
        ) : (
          <PlayButton onClick={handlePlayClick} />
        )}
      </div>
      <Instructions collapsed={instructionsCollapsed} onToggle={handleToggleInstructions} />
    </div>
  );
};

export default Home;
