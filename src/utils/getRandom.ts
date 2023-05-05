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

