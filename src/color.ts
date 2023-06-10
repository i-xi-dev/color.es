import { type uint8 } from "../deps.ts";

// rgbcomponent >= 0 && rgbcomponent <= 1
type rgbcomponent = number;

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
};

type Rgb24Bit = {
  r: uint8;
  g: uint8;
  b: uint8;
};

type Hsl = {
  h: hue;
  s: saturation;
  l: lightness;
};

type Hwb = {
  h: hue;
  w: whiteness;
  b: blackness;
};

export {
  type Hsl,
  type Hwb,
  type Rgb,
  type Rgb24Bit,
  type rgbcomponent,
};
