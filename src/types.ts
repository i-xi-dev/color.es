import { Uint8, type uint8 } from "../deps.ts";

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

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

namespace RgbComponent {
  export const MIN_VALUE = 0;
  export const MAX_VALUE = 1;

  export function normalize(value: unknown): rgbcomponent {
    if (Number.isFinite(value)) {
      return _clamp(value as number, MIN_VALUE, MAX_VALUE);
    }
    return MIN_VALUE;
  }
}

namespace Alpha {
  export const MIN_VALUE = 0;
  export const MAX_VALUE = 1;

  export function normalize(value: unknown): alpha {
    if (Number.isFinite(value)) {
      return _clamp(value as number, MIN_VALUE, MAX_VALUE);
    }
    return MAX_VALUE;
  }
}

type Rgb = {
  r: rgbcomponent;
  g: rgbcomponent;
  b: rgbcomponent;
  a?: alpha;
};

namespace Rgb {
  export type Normalized = {
    r: rgbcomponent;
    g: rgbcomponent;
    b: rgbcomponent;
    a: alpha;
  };

  export function normalize(value: unknown): Normalized {
    let r = RgbComponent.MIN_VALUE;
    let g = RgbComponent.MIN_VALUE;
    let b = RgbComponent.MIN_VALUE;
    let a = Alpha.MAX_VALUE;
    if (value && (typeof value === "object")) {
      if ("r" in value) {
        r = RgbComponent.normalize(value.r);
      }
      if ("g" in value) {
        g = RgbComponent.normalize(value.g);
      }
      if ("b" in value) {
        b = RgbComponent.normalize(value.b);
      }
      if ("a" in value) {
        a = Alpha.normalize(value.a);
      }
    }
    return { r, g, b, a };
  }
}

namespace RgbByte {
  export const MIN_VALUE = Uint8.MIN_VALUE;
  export const MAX_VALUE = Uint8.MAX_VALUE;

  export function normalize(value: unknown): uint8 {
    if (Number.isFinite(value)) {
      return _clamp(Math.round(value as number), MIN_VALUE, MAX_VALUE) as uint8;
    }
    return MIN_VALUE;
  }
}

namespace AlphaByte {
  export const MIN_VALUE = Uint8.MIN_VALUE;
  export const MAX_VALUE = Uint8.MAX_VALUE;

  export function normalize(value: unknown): uint8 {
    if (Number.isFinite(value)) {
      return _clamp(Math.round(value as number), MIN_VALUE, MAX_VALUE) as uint8;
    }
    return MAX_VALUE;
  }
}

type RgbBytes = {
  r: uint8;
  g: uint8;
  b: uint8;
  a?: uint8;
};

namespace RgbBytes {
  export type Normalized = {
    r: uint8;
    g: uint8;
    b: uint8;
    a: uint8;
  };

  export function normalize(value: unknown): Normalized {
    let rByte: uint8 = Uint8.MIN_VALUE;
    let gByte: uint8 = Uint8.MIN_VALUE;
    let bByte: uint8 = Uint8.MIN_VALUE;
    let aByte: uint8 = Uint8.MAX_VALUE;
    if (value && (typeof value === "object")) {
      if ("r" in value) {
        rByte = RgbByte.normalize(value.r);
      }
      if ("g" in value) {
        gByte = RgbByte.normalize(value.g);
      }
      if ("b" in value) {
        bByte = RgbByte.normalize(value.b);
      }
      if ("a" in value) {
        aByte = AlphaByte.normalize(value.a);
      }
    }
    return {
      r: rByte,
      g: gByte,
      b: bByte,
      a: aByte,
    };
  }
}

namespace Hue {
  export const ZERO_TURN = 0;
  export const ONE_TURN = 360;

  export function normalize(value: unknown): hue {
    if (Number.isFinite(value)) {
      const t = (value as number) % ONE_TURN;
      return (t < ZERO_TURN) ? (t + ONE_TURN) : t;
    }
    return ZERO_TURN;
  }
}

namespace Saturation {
  export const MIN_VALUE = 0;
  export const MAX_VALUE = 1;

  export function normalize(value: unknown): saturation {
    if (Number.isFinite(value)) {
      return _clamp(value as number, MIN_VALUE, MAX_VALUE);
    }
    return MIN_VALUE;
  }
}

namespace Lightness {
  export const MIN_VALUE = 0;
  export const MAX_VALUE = 1;

  export function normalize(value: unknown): lightness {
    if (Number.isFinite(value)) {
      return _clamp(value as number, MIN_VALUE, MAX_VALUE);
    }
    return MIN_VALUE;
  }
}

type Hsl = {
  h: hue;
  s: saturation;
  l: lightness;
  a?: alpha;
};

namespace Hsl {
  export type Normalized = {
    h: hue;
    s: saturation;
    l: lightness;
    a: alpha;
  };

  export function normalize(value: unknown): Normalized {
    let h = Hue.ZERO_TURN;
    let s = Saturation.MIN_VALUE;
    let l = Lightness.MIN_VALUE;
    let a = Alpha.MAX_VALUE;
    if (value && (typeof value === "object")) {
      if ("h" in value) {
        h = Hue.normalize(value.h);
      }
      if ("s" in value) {
        s = Saturation.normalize(value.s);
      }
      if ("l" in value) {
        l = Lightness.normalize(value.l);
      }
      if ("a" in value) {
        a = Alpha.normalize(value.a);
      }
    }
    return { h, s, l, a };
  }  
}

type Hwb = {
  h: hue;
  w: whiteness;
  b: blackness;
  a?: alpha;
};

function _f(n: number, { h, s, l }: Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

function _hslToRgb(normalizedHsl: Hsl.Normalized): Rgb.Normalized {
  return {
    r: _f(0, normalizedHsl),
    g: _f(8, normalizedHsl),
    b: _f(4, normalizedHsl),
    a: normalizedHsl.a,
  };
}

function _rgbToUint8ClampedArray(
  { r, g, b, a }: Rgb.Normalized,
): Uint8ClampedArray {
  return Uint8ClampedArray.of(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
    Math.round(a * 255),
  );
}

function _uint8ClampedArrayToRgbBytes(
  [r, g, b, a]: Uint8ClampedArray,
): RgbBytes.Normalized {
  return { r, g, b, a } as RgbBytes.Normalized;
}

function _rgbToHsl({ r, g, b, a }: Rgb.Normalized): Hsl.Normalized {
  const maxRgb = Math.max(r, g, b);
  const minRgb = Math.min(r, g, b);

  const d = maxRgb - minRgb;

  let h = Hue.ZERO_TURN;
  if (d !== 0) {
    switch (maxRgb) {
      case r:
        h = (g - b) / d;
        break;

      case g:
        h = ((b - r) / d) + 2;
        break;

      // case b:
      default:
        h = ((r - g) / d) + 4;
        break;
    }
    h = Hue.normalize(h * 60);
  }

  const l = (minRgb + maxRgb) / 2;

  let s = 0;
  if (d !== 0) {
    if ((l !== 0) && (l !== 1)) {
      s = (maxRgb - l) / Math.min(l, 1 - l);
    }
  }
  return { h, s, l, a };
}

export {
  _hslToRgb,
  _rgbToHsl,
  _rgbToUint8ClampedArray,
  _uint8ClampedArrayToRgbBytes,
  Alpha,
  Hsl,
  Rgb,
  RgbBytes,
  type alpha,
  type hue,
  type lightness,
  type rgbcomponent,
  type saturation,
};
