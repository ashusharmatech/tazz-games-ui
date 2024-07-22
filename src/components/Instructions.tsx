import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface InstructionsProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ collapsed, onToggle }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 shadow-xl rounded-xl max-w-2xl mx-auto my-6">
      {/* Header section with title and toggle button */}
      <div className="flex items-center justify-between p-6 rounded-t-2xl">
        <h2 className="text-xl font-extrabold text-blue-800">
          How to play
        </h2>
        <button
          onClick={onToggle}
          className="text-gray-800 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp} size="lg" />
        </button>
      </div>
      {/* Content section with smooth transition */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${collapsed ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'} p-4`}>
        <div className={`text-gray-800 text-l`}>
          <ol className="list-decimal list-inside space-y-2">
            <li>Your goal is to place exactly one ♕ in each row, column, and colored region.</li>
            <li>Tap once to place 'x' and tap twice to place ♕. Use 'x' to mark cells where ♕ cannot be placed.</li>
            <li>No two ♕ symbols can touch each other, even diagonally.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
