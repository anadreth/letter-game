export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomColor = (): string => {
  const r = getRandomNumber(1, 255);
  const g = getRandomNumber(1, 255);
  const b = getRandomNumber(1, 255);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getRandomLetter = (): string => {
  const letters = ["A", "B", "C", "D", "E"];
  const index = getRandomNumber(0, letters.length - 1);
  return letters[index];
};

export const getComplementaryColor = (rgbColor: string) => {
  const colorValues = rgbColor.slice(4, -1).split(",");

  const red = parseInt(colorValues[0]);
  const green = parseInt(colorValues[1]);
  const blue = parseInt(colorValues[2]);

  const complementaryRed = 255 - red;
  const complementaryGreen = 255 - green;
  const complementaryBlue = 255 - blue;

  return `rgb(${complementaryRed}, ${complementaryGreen}, ${complementaryBlue})`;
};
