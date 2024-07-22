import React from "react";

interface CellProps {
  color: string;
  value: string;
  highlight: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = React.memo(({ color, value, highlight, onClick }) => {
  // Determine font size, font weight, and text opacity based on value
  const fontSize = value === "♕" ? "18px" : value === "X" ? "10px" : "18px";
  const fontWeight = value === "X" ? "normal" : "bold"; // Non-bold for "X"
  const textOpacity = value === "X" ? "0.75" : "1"; // 75% opacity for "X"

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
      onClick={onClick}
    >
      <span
        style={{
          fontSize: fontSize, // Conditional font size
          fontWeight: fontWeight, // Conditional font weight
          opacity: textOpacity, // Conditional text opacity
        }}
      >
        {value}
      </span>
    </td>
  );
});

export default Cell;
