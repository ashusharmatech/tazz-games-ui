import React from 'react';

interface PuzzleControlsProps {
  isAudioOn: boolean;
  toggleAudio: () => void;
  isVibrationOn: boolean;
  toggleVibration: () => void;
}

const PuzzleControls: React.FC<PuzzleControlsProps> = ({
  isAudioOn,
  toggleAudio,
  isVibrationOn,
  toggleVibration
}) => (
  <div>
    <button id="audio-toggle" onClick={toggleAudio}>
      {isAudioOn ? 'Disable Audio' : 'Enable Audio'}
    </button>
    <button id="vibration-toggle" onClick={toggleVibration}>
      {isVibrationOn ? 'Disable Vibration' : 'Enable Vibration'}
    </button>
  </div>
);

export default PuzzleControls;
