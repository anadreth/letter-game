import { useEffect, useState } from "react";
import {
  getComplementaryColor,
  getRandomColor,
  getRandomLetter,
  getRandomNumber,
} from "./utils/getRandom";
import { Alert, Typography, keyframes, styled } from "@mui/material";

type LetterType = {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  fallingSpeed: number;
  atTheBottom: boolean;
  color: string;
  backgroundColor: string;
  label: string;
  isVisible: boolean;
  setAtTheBottom: (value: boolean) => void;
  setIsVisible: (value: boolean) => void;
};

interface LetterBoxProps {
  width: number;
  height: number;
  color: string;
  backgroundColor: string;
  top: number;
  left: number;
  fallingSpeed: number;
  isAnimating: boolean;
  isVisible: boolean;
}

const slideIn = keyframes({
  to: {
    top: "500px",
  },
});

const LetterBox = styled("div")<LetterBoxProps>(
  ({
    width,
    height,
    color,
    backgroundColor,
    top,
    left,
    fallingSpeed,
    isAnimating,
  }) => ({
    width,
    height,
    color,
    backgroundColor,
    top,
    left,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: `${slideIn} ${fallingSpeed}s linear forwards${
      isAnimating ? "" : " paused"
    }`,
  })
);

const StyledWrapper = styled("div")({
  width: "100%",
  height: "100vh",
});

const Playground = styled("div")({
  height: 500,
  width: 1000,
  position: "relative",
  backgroundColor: "white",
});

const BoldText = styled(Typography)({
  fontWeight: "bold",
});

function App() {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [letters, setLetters] = useState<LetterType[]>([]);
  const [score, setScore] = useState(0);
  const [id, setId] = useState(1);

  const [areAtTheBottom, setAreAtTheBottom] = useState<number>(0);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const createLetter = () => {
      const color = getRandomColor();
      const complementaryColor = getComplementaryColor(color);

      const letter = {
        id: id,
        width: getRandomNumber(30, 80),
        height: getRandomNumber(30, 80),
        top: getRandomNumber(50, 200),
        left: getRandomNumber(100, 900),
        fallingSpeed: getRandomNumber(1, 10),
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
    if (areAtTheBottom === 20) {
      setStart(false);
      setScore(0);
      setTime(0);
      setLetters([]);
      setId(1);
      setAreAtTheBottom(0);
      setIsAnimating(false);
      setLost(true);
    }

    if (start && areAtTheBottom < 20) {
      const interval = setInterval(() => {
        setLetters((prevLetters) => [...prevLetters, createLetter()]);
        setId((prevId) => prevId + 1);
      }, getRandomNumber(100, 1000));
      return () => clearInterval(interval);
    }
  }, [letters, start, id, areAtTheBottom]);

  useEffect(() => {
    if (start) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start]);

  useEffect(() => {
    if (start) {
      const handlePressKey = (event: KeyboardEvent) => {
        console.log("Pressed key:");
        const key = event.key.toLocaleUpperCase();

        const count = letters.reduce((acc, letter) => {
          if (letter.label === key && !letter.atTheBottom) {
            return acc + 1;
          }
          return acc;
        }, 0);

        if (count >= 2) {
          setLetters((prevLetters) =>
            prevLetters.filter((letter) => {
              if (letter.label === key && !letter.atTheBottom) {
                return false;
              }
              return true;
            })
          );
          setScore((prevScore) => prevScore + count);
        }
      };

      window.addEventListener("keydown", handlePressKey);

      return () => {
        window.removeEventListener("keydown", handlePressKey);
      };
    }
  }, [letters, start]);

  const handleStart = () => {
    setLost(false);
    setAreAtTheBottom(0);
    setStart((prevStart) => !prevStart);
    setIsAnimating((prevIsAnimating) => !prevIsAnimating);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event.key);
  };

  const handleAnimationEnd = (letter: LetterType) => {
    letter.setAtTheBottom(true);
    setAreAtTheBottom((prevAreAtTheBottom) => prevAreAtTheBottom + 1);
  };
  return (
    <StyledWrapper>
      <div>
        <button onClick={handleStart}>{start ? "pause" : "start"}</button>
        <p>{letters.length}</p>
        <p>{score}</p>
        <p>{time + " " + "seconds"}</p>
        <p>{areAtTheBottom + "/20 to loose"}</p>
      </div>
      <Playground>
        {letters.map((letter) => (
          <LetterBox
            key={letter.id}
            width={letter.width}
            height={letter.height}
            color={letter.color}
            backgroundColor={letter.backgroundColor}
            top={letter.top}
            left={letter.left}
            fallingSpeed={letter.fallingSpeed}
            isVisible={letter.isVisible}
            isAnimating={isAnimating}
            onAnimationEnd={() => handleAnimationEnd(letter)}
            onKeyDown={handleKeyDown}
          >
            <BoldText>{letter.label}</BoldText>
          </LetterBox>
        ))}
      </Playground>
      {lost && <Alert severity="error">You lost!</Alert>}
    </StyledWrapper>
  );
}

export default App;
