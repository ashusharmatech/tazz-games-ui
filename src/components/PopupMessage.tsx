import React from 'react';

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">{message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Start a new game!
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
