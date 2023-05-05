import { LetterType } from "../components/Letter/Letter";
import { getComplementaryColor } from "./getComplementaryColor";
import {
  getRandomColor,
  getRandomLetter,
  getRandomNumber,
} from "./getRandom";

interface ICreateLetter {
  id: number;
  speedMin: number;
  speedMax: number;
  setLetters: React.Dispatch<React.SetStateAction<LetterType[]>>;
}

export const createLetter = ({
  id,
  speedMin,
  speedMax,
  setLetters,
}: ICreateLetter) => {
  const color = getRandomColor();
  const complementaryColor = getComplementaryColor(color);

  const letter = {
    id: id,
    width: getRandomNumber(30, 80),
    height: getRandomNumber(30, 80),
    top: getRandomNumber(10, 200),
    left: getRandomNumber(10, 90),
    fallingSpeed: getRandomNumber(speedMin, speedMax),
    atTheBottom: false,
    color: color,
    backgroundColor: complementaryColor,
    label: getRandomLetter(),
    zIndex: id + 1,
    isVisible: true,
    setAtTheBottom: (value: boolean) => {
      setLetters((prevLetters) =>
        prevLetters.map((prevLetter) =>
          prevLetter.id === letter.id
            ? { ...prevLetter, atTheBottom: value }
            : prevLetter
        )
      );
    },
    setIsVisible: (value: boolean) => {
      setLetters((prevLetters) =>
        prevLetters.map((prevLetter) =>
          prevLetter.id === letter.id
            ? { ...prevLetter, visible: value }
            : prevLetter
        )
      );
    },
  };
  return letter;
};
