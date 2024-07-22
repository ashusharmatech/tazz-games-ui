import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Timer from "./Timer";

interface ControllerProps {
  isActive: boolean;
  onFinish: () => void;
  isMuted: boolean;
  onMuteToggle: () => void; // Added to handle mute toggle
}

const Controller: React.FC<ControllerProps> = ({ isActive, onFinish, isMuted, onMuteToggle }) => {
  return (
    <div className="flex items-center justify-between p-2 shadow-md rounded bg-white">
      <div className="flex items-center">
      <Timer isActive={isActive} onFinish={onFinish} />
      </div>
      <button
        onClick={onMuteToggle}
        className="flex items-center text-lg ml-2 focus:outline-none"
        aria-label="Toggle Mute"
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="text-lg" />
        <span className="ml-2">{isMuted ? "Muted" : "Unmuted"}</span>
      </button>
    </div>
  );
};

export default Controller;
