import { Box, styled } from "@mui/material";
import Letter, { LetterType } from "../Letter/Letter";

interface IPlayground {
  letters: LetterType[];
  isAnimating: boolean;
  handleAnimationEnd: (letter: LetterType) => void;
}

export const PlaygroundStyled = styled(Box)(({theme}) => ({
  height: 500,
  width: "90vw",
  position: "relative",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius
}))

const Playground = ({
  letters,
  isAnimating,
  handleAnimationEnd,
}: IPlayground) => {
  return (
    <PlaygroundStyled>
      {letters.map((letter) => (
        <Letter
          key={letter.id}
          letter={letter}
          isAnimating={isAnimating}
          handleAnimationEnd={handleAnimationEnd}
        />
      ))}
    </PlaygroundStyled>
  );
};

export default Playground;
