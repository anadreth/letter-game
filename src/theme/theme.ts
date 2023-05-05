import { createTheme } from "@mui/material/styles";
import { palette } from "./pallete";
import typography from "./typography";

const theme = createTheme({
  palette: palette,
  typography: typography,
  shape: { borderRadius: 4 },
  customConst: {
    statsBoxHeight: 64,
  },
});

export default theme;
