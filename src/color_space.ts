const _RgbColorSpace = {
  A98_RGB: "a98-rgb",
  DISPLAY_P3: "display-p3",
  PROPHOTO_RGB: "prophoto-rgb",
  REC2020: "rec2020",
  SRGB: "srgb",
  SRGB_LINEAR: "srgb-linear",
} as const;

const _XyzColorSpace = {
  XYZ: "xyz",
  XYZ_D50: "xyz-d50",
  XYZ_D65: "xyz-d65",
} as const;

const ColorSpace = {
  ..._RgbColorSpace,
  ..._XyzColorSpace,
  //XXX 他のspace
} as const;

/**
 * The color space
 */
type ColorSpace = typeof ColorSpace[keyof typeof ColorSpace];

export { ColorSpace };
