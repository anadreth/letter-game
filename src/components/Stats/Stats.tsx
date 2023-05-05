import { Box, Button, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { LIVES_NUMBER } from "../../constants/constants";
import { BoldText } from "../Letter/styled/LetterStyled";

interface IStats {
  start: boolean;
  handleStart: () => void;
  score: number;
  lost: boolean;
  time: number;
  areAtTheBottom: number;
  difficulty: string;
}

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  height: theme.customConst.statsBoxHeight,
  color: theme.palette.primary.main,
}));

const Stats = ({
  start,
  time,
  score,
  handleStart,
  areAtTheBottom,
  difficulty,
}: IStats) => {
  const [highestScore, setHighestScore] = useState(0);
  const lives = LIVES_NUMBER - areAtTheBottom;

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
  }, [highestScore, score]);

  return (
    <BoxStyled>
      <Button variant="contained" onClick={handleStart}>
        {start ? "pause" : "start"}
      </Button>
      <Typography variant="h3">{"Time passed: " + time}</Typography>
      <Typography variant="h3">{"Score: " + score}</Typography>
      <Typography variant="h3">{"Highest Score: " + highestScore}</Typography>
      <Typography variant="h3">{"Lives: " + lives + "/20"}</Typography>
      <BoldText variant="h3">{"Difficulty: " + difficulty}</BoldText>
    </BoxStyled>
  );
};

export default Stats;
