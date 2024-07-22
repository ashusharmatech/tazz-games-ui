import React from "react";

interface GridFooterProps {
  onClear: () => void;
  onNewGame: () => void;
}

const GridFooter: React.FC<GridFooterProps> = ({ onClear, onNewGame }) => {
  return (
    <div className="flex justify-between p-2 bg-gray-200 border-t border-gray-300 mt-4">
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Clear
      </button>
      <button
        onClick={onNewGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        New Game
      </button>
    </div>
  );
};

export default GridFooter;
