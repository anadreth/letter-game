import { Alert, Box, styled } from "@mui/material";
import Playground from "./components/Playground/Playground";
import { useEffect, useState } from "react";
import { LetterType } from "./components/Letter/Letter";
import { getRandomNumber } from "./utils/getRandom";
import Stats from "./components/Stats/Stats";
import { DifficultyEnum } from "./utils/setDifficulty";
import { setDifficultyAndSpeed } from "./utils/setDifficulty";
import { createLetter } from "./utils/createLetter";

const StyledWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.gray.main,
}));

const AlertBox = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

function App() {
  const [start, setStart] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [lost, setLost] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [id, setId] = useState<number>(1);
  const [speedMax, setSpeedMax] = useState<number>(10);
  const [speedMin, setSpeedMin] = useState<number>(10);
  const [areAtTheBottom, setAreAtTheBottom] = useState<number>(0);

  const [difficulty, setDifficulty] = useState<DifficultyEnum>(
    DifficultyEnum.NOOB
  );

  const [letters, setLetters] = useState<LetterType[]>([]);

  useEffect(() => {
    const newLetter = createLetter({ id, speedMax, speedMin, setLetters });

    if (areAtTheBottom === 20) {
      setStart(false);
      setLetters([]);
      setId(1);
      setAreAtTheBottom(0);
      setIsAnimating(false);
      setLost(true);
    }

    if (start && areAtTheBottom < 20) {
      const interval = setInterval(() => {
        setLetters((prevLetters) => [...prevLetters, newLetter]);
        setId((prevId) => prevId + 1);
      }, getRandomNumber(speedMin * 10, speedMax * 100));
      return () => clearInterval(interval);
    }
  }, [areAtTheBottom, id, speedMax, speedMin, start]);

  useEffect(() => {
    if (start) {
      const handlePressKey = (event: KeyboardEvent) => {
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

  useEffect(() => {
    if (start) {
      setDifficultyAndSpeed({ time, setDifficulty, setSpeedMin, setSpeedMax });

      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [start, time]);

  const handleStart = () => {
    if (lost) {
      setScore(0);
      setAreAtTheBottom(0);
      setTime(0);
    }
    setStart((prevStart) => !prevStart);
    setIsAnimating((prevIsAnimating) => !prevIsAnimating);
    setLost(false);
  };

  const handleAnimationEnd = (letter: LetterType) => {
    letter.setAtTheBottom(true);
    setAreAtTheBottom((prevAreAtTheBottom) => prevAreAtTheBottom + 1);
  };

  return (
    <StyledWrapper>
      {lost && (
        <AlertBox>
          <Alert severity="error">{`I am sorry, ooo mighty ${difficulty}, but you died. Maybe try again in next life?`}</Alert>
          <Alert severity="info">{`You slashed ${score} letters.`}</Alert>
        </AlertBox>
      )}
      <Stats
        start={start}
        lost={lost}
        handleStart={handleStart}
        score={score}
        time={time}
        areAtTheBottom={areAtTheBottom}
        difficulty={difficulty}
      />
      <Playground
        letters={letters}
        isAnimating={isAnimating}
        handleAnimationEnd={handleAnimationEnd}
      />
    </StyledWrapper>
  );
}

export default App;
