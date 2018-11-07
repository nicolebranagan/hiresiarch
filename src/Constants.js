const KeyMirror = (list) => list.reduce((prev, next) => {prev[next] = next; return prev;}, {});

export const HIRES_WIDTH = 280;
export const HIRES_BYTE_WIDTH = 40;
export const HIRES_HEIGHT = 192;
export const HIRES_VIOLET = "#FF00FF";
export const HIRES_GREEN = "#00FF00";
export const HIRES_WHITE = "#FFFFFF";
export const HIRES_BLUE = "#00AAFF";
export const HIRES_ORANGE = "#FFAA00";
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
  [Colors.VIOLET]: [1, 0],
  [Colors.GREEN]: [0, 1],
  [Colors.BLUE]: [1, 0],
  [Colors.ORANGE]: [0, 1],
  [Colors.BLACK]: [0, 0],
};

export const HIRES_OFFSETS = [];
// Sourced from https://github.com/Michaelangel007/apple2_hgr_font_tutorial
for( var y = 0; y < 193; ++y )
  HIRES_OFFSETS[ y ] = ((y/64)|0)*0x28 + ((y%8)|0)*0x400 + ((y/8)&7)*0x80;
