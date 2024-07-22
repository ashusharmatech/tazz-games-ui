import React, { useState } from "react";
import Grid from "../components/Grid";
import Instructions from "../components/Instructions";
import PlayButton from "../components/PlayButton";
import Timer from "../components/Timer";

const Home: React.FC<{}> = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [instructionsCollapsed, setInstructionsCollapsed] = useState(false);


  const handlePlayClick = () => {
    setHasStarted(true);
    setIsTimerActive(true);
    setInstructionsCollapsed(true); 
  };

  const handleToggleInstructions = () => {
    setInstructionsCollapsed(!instructionsCollapsed);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        {hasStarted ? (
          <>
            <Timer isActive={isTimerActive} onFinish={() => {}} />
            <div className="w-full max-w-4xl mt-4">
              <Grid />
            </div>
          </>
        ) : (
          <PlayButton onClick={handlePlayClick} />
        )}
      </div>
      {/* Instructions component */}
      <Instructions collapsed={instructionsCollapsed} onToggle={handleToggleInstructions} />
    </div>
  );
};

export default Home;
