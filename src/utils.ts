// Utility function to generate colors
export const generateColors = (numColors: number): string[] => {
  const colors: string[] = [];
  const hueIncrement = 360 / numColors;

  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor(hueIncrement * i);
    colors.push(`hsl(${hue}, 70%, 80%)`); // Light pastel colors
  }

  return colors;
};


export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
