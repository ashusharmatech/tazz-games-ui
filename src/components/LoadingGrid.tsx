import { useState, useEffect } from "react";
import { generateColors } from "../utils";

const LoadingGrid = () => {
  const [colors, setColors] = useState<string[][]>([]);
  const numColors = 8; // You can adjust this based on your grid size

  useEffect(() => {
    // Generate a random color for each cell initially
    const initialColors = Array(8).fill(null).map(() => Array(8).fill(''));

    const updateColors = () => {
      const generatedColors = generateColors(numColors);
      const updatedColors = initialColors.map(row =>
        row.map(() => {
          const randomColor = generatedColors[Math.floor(Math.random() * numColors)];
          return randomColor;
        })
      );
      setColors(updatedColors);
    };

    // Update colors every 500ms
    const interval = setInterval(updateColors, 500);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [numColors]);

  return (
    <div
      id="loading-container"
      className="bg-white shadow-md rounded border-2 border-gray-900"
    >
      <table className="table-auto w-full">
        <tbody>
          {colors.map((row, i) => (
            <tr key={i} className="border-b border-gray-200">
              {row.map((color, j) => (
                <td
                  key={j}
                  style={{
                    backgroundColor: color,
                    width: "60px",
                    height: "60px",
                    padding: "0",
                  }}
                  className="border-r border-gray-200"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingGrid;
