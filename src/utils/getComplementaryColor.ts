export const getComplementaryColor = (rgbColor: string) => {
    const colorValues = rgbColor.slice(4, -1).split(",");
  
    const red = parseInt(colorValues[0]);
    const green = parseInt(colorValues[1]);
    const blue = parseInt(colorValues[2]);
  
    const complementaryRed = 255 - red;
    const complementaryGreen = 255 - green;
    const complementaryBlue = 255 - blue;
  
    return `rgb(${complementaryRed}, ${complementaryGreen}, ${complementaryBlue})`;
  };
  
