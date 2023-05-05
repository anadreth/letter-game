import { Box, Typography, keyframes, styled } from "@mui/material";
import { LetterBoxProps } from "../Letter";

export const slideIn = keyframes({
  to: {
    top: "500px",
  },
});

export const LetterBox = styled(Box)<LetterBoxProps>(
  ({
    width,
    height,
    color,
    backgroundColor,
    top,
    left,
    fallingSpeed,
    isAnimating,
    theme,
  }) => ({
    width,
    height,
    color,
    backgroundColor,
    top,
    left: `${left}%`,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    animation: `${slideIn} ${fallingSpeed}s linear forwards${
      isAnimating ? "" : " paused"
    }`,
  })
);

export const BoldText = styled(Typography)({
  fontWeight: "bold",
});
