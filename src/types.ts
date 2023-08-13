import { type uint8 } from "../deps.ts";

// rgbcomponent >= 0 && rgbcomponent <= 1
type rgbcomponent = number;

// alpha >= 0 && alpha <= 1
type alpha = number;

// angle
type hue = number;

// saturation >= 0 && saturation <= 1
type saturation = number;

// lightness >= 0 && lightness <= 1
type lightness = number;

// whiteness >= 0 && whiteness <= 1
type whiteness = number;

// blackness >= 0 && blackness <= 1
type blackness = number;

type Rgb = {
  r: rgbcomponent;
  g: rgbcomponent;
  b: rgbcomponent;
  a?: alpha;
};

type NormalizedRgb = {
  r: rgbcomponent;
  g: rgbcomponent;
  b: rgbcomponent;
  a: alpha;
};

type RgbBytes = {
  r: uint8;
  g: uint8;
  b: uint8;
  a?: uint8;
};

type NormalizedRgbBytes = {
  r: uint8;
  g: uint8;
  b: uint8;
  a: uint8;
};

type Hsl = {
  h: hue;
  s: saturation;
  l: lightness;
  a?: alpha;
};

type NormalizedHsl = {
  h: hue;
  s: saturation;
  l: lightness;
  a: alpha;
};

type Hwb = {
  h: hue;
  w: whiteness;
  b: blackness;
  a?: alpha;
};

export {
  type alpha,
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type NormalizedHsl,
  type NormalizedRgb,
  type NormalizedRgbBytes,
  type Rgb,
  type RgbBytes,
  type rgbcomponent,
  type saturation,
};
