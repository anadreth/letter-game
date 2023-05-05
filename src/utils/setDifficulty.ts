export enum DifficultyEnum {
  NOOB = "Noob",
  WEEB = "Weeb",
  SAMURAI = "Samurai",
  SHOGUN = "Shogun",
  GOD = "God",
  HASBULLA = "Hasbulla",
}

interface ISetDifficultyAndSpeed {
  time: number;
  setDifficulty: React.Dispatch<React.SetStateAction<DifficultyEnum>>;
  setSpeedMin: React.Dispatch<React.SetStateAction<number>>;
  setSpeedMax: React.Dispatch<React.SetStateAction<number>>;
}

export const setDifficultyAndSpeed = ({
  time,
  setDifficulty,
  setSpeedMin,
  setSpeedMax,
}: ISetDifficultyAndSpeed) => {
  
  switch (time) {
    case 0: {
      setDifficulty(DifficultyEnum.NOOB);
      setSpeedMin(10);
      setSpeedMax(10);
      break;
    }
    case 15: {
      setDifficulty(DifficultyEnum.WEEB);
      setSpeedMin(7);
      break;
    }
    case 30: {
      setDifficulty(DifficultyEnum.SAMURAI);
      setSpeedMin(4);
      setSpeedMax(9);
      break;
    }
    case 45: {
      setDifficulty(DifficultyEnum.SHOGUN);
      setSpeedMin(1);
      setSpeedMax(7);
      break;
    }
    case 60: {
      setDifficulty(DifficultyEnum.GOD);
      setSpeedMax(5);
      break;
    }
    case 70: {
      setDifficulty(DifficultyEnum.HASBULLA);
      setSpeedMax(2);
      break;
    }
  }
};
