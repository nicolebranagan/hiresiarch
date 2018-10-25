const KeyMirror = (list) => list.reduce((prev, next) => {prev[next] = next; return prev;}, {});

export const HIRES_WIDTH = 280;
export const HIRES_BYTE_WIDTH = 40;
export const HIRES_HEIGHT = 192;
export const HIRES_VIOLET = "#FF00FF";
export const HIRES_GREEN = "#00FF00";
export const HIRES_WHITE = "#FFFFFF";
export const HIRES_BLUE = "#0055FF";
export const HIRES_ORANGE = "#FF5500";
export const MONO = "#00DD00";

export const Colors = KeyMirror([
  'VIOLET',
  'GREEN',
  'WHITE',
  'BLUE',
  'ORANGE',
  'BLACK'
])

export const COLOR_COLORS = [
  Colors.WHITE,
  Colors.VIOLET,
  Colors.GREEN,
  Colors.BLUE,
  Colors.ORANGE,
  Colors.BLACK
];

export const MONO_COLORS = [
  Colors.WHITE,
  Colors.BLACK
];

export const ColorCodes = {
  [Colors.WHITE]: [1, 1],
  [Colors.VIOLET]: [0, 1],
  [Colors.GREEN]: [1, 0],
  [Colors.BLUE]: [0, 1],
  [Colors.ORANGE]: [1, 0],
  [Colors.BLACK]: [0, 0],
};
