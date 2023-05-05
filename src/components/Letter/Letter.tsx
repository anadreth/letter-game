import { BoldText, LetterBox } from "./styled/LetterStyled";

export type LetterType = {
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

interface ILetterProp {
  letter: LetterType;
  isAnimating: boolean;
  handleAnimationEnd: (letter: LetterType) => void;
}

export interface LetterBoxProps {
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

const Letter = ({ letter, isAnimating, handleAnimationEnd }: ILetterProp) => {
  return (
    <LetterBox
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
    >
      <BoldText>{letter.label}</BoldText>
    </LetterBox>
  );
};

export default Letter;
