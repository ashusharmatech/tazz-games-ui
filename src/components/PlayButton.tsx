import React from 'react';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define the type for the component props
interface PlayButtonProps {
  onClick: () => void; // Function type for onClick
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="bg-white rounded flex justify-center items-center">
        <button
          onClick={onClick}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="text-lg leading-lg opacity-75"
          />
        </button>
      </div>
    </div>
  );
};

export default PlayButton;
