import React, { useRef } from "react";
import tap from "../assets/tap-notification.mp3";

interface CellProps {
  color: string;
  value: string;
  highlight: boolean;
  onClick: () => void;
  isMuted: string;
}

const Cell: React.FC<CellProps> = React.memo(({ color, value, highlight, onClick , isMuted}) => {
  // Create a ref to hold the current audio instance
  const tapAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {

    if(!isMuted){
      // Stop the currently playing audio, if any
      if (tapAudioRef.current) {
        tapAudioRef.current.pause();
        tapAudioRef.current.currentTime = 0; // Reset the audio to the beginning
      }

      // Create a new audio instance and play it
      const tapAudio = new Audio(tap);
      tapAudioRef.current = tapAudio;
      tapAudio.play();
    }
    
    
    // Trigger device vibration if the Vibration API is supported
    if ("vibrate" in navigator) {
      navigator.vibrate(50); // Vibration for 50ms
    }
    
    // Call the passed onClick handler
    onClick();
  };

  return (
    <td
      style={{
        backgroundColor: color,
        boxSizing: "border-box",
        width: "60px",  // Fixed width
        height: "60px", // Fixed height
        padding: "0",   // Remove padding to control size precisely
        textAlign: "center", // Center text horizontally
        verticalAlign: "middle", // Center text vertically
        lineHeight: "60px", // Match line height to cell height for vertical centering
        border: highlight ? "2px solid red" : "1px solid gray" // Highlight border for invalid cells
      }}
      className="border-r border-gray-200"
      onClick={handleClick}
    >
      <span
        style={{
          fontSize: value === "♕" ? "18px" : value === "X" ? "14px" : "18px", // Conditional font size
          fontWeight: value === "X" ? "normal" : "bold", // Conditional font weight
          opacity: value === "X" ? "0.75" : "1", // Conditional text opacity
        }}
      >
        {value}
      </span>
    </td>
  );
});

export default Cell;
