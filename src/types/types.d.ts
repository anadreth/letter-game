export declare module "@mui/material/styles" {
  interface Theme {
    customConst: {
      statsBoxHeight: number;
    };
  }

  interface ThemeOptions {
    customConst: {
      statsBoxHeight?: number;
    };
  }

  interface Palette {
    gray: Palette["primary"];
  }

  interface PaletteOptions {
    gray?: PaletteOptions["primary"];
  }
}
