import { Uint8, type uint8 } from "../deps.ts";
import {
  type alpha,
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type NormalizedHsl,
  type NormalizedRgb,
  type NormalizedRgbBytes,
  type RgbBytes,
  type rgbcomponent,
  type saturation,
} from "./types.ts";

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

const _MIN_RGB_COMPONENT = 0;
const _MAX_RGB_COMPONENT = 1;

function _normalizeRgbComponent(value: unknown): rgbcomponent {
  if (Number.isFinite(value)) {
    return _clamp(value as number, _MIN_RGB_COMPONENT, _MAX_RGB_COMPONENT);
  }
  return _MIN_RGB_COMPONENT;
}

const _MIN_ALPHA = 0;
const _MAX_ALPHA = 1;

function _normalizeAlpha(value: unknown): alpha {
  if (Number.isFinite(value)) {
    return _clamp(value as number, _MIN_ALPHA, _MAX_ALPHA);
  }
  return _MAX_ALPHA;
}

function _normalizeRgb(value: unknown): NormalizedRgb {
  let r = _MIN_RGB_COMPONENT;
  let g = _MIN_RGB_COMPONENT;
  let b = _MIN_RGB_COMPONENT;
  let a = _MAX_ALPHA;
  if (value && (typeof value === "object")) {
    if ("r" in value) {
      r = _normalizeRgbComponent(value.r);
    }
    if ("g" in value) {
      g = _normalizeRgbComponent(value.g);
    }
    if ("b" in value) {
      b = _normalizeRgbComponent(value.b);
    }
    if ("a" in value) {
      a = _normalizeAlpha(value.a);
    }
  }
  return {
    r,
    g,
    b,
    a,
  };
}

function _normalizeRgbByte(value: unknown): uint8 {
  if (Number.isFinite(value)) {
    return _clamp(
      Math.round(value as number),
      Uint8.MIN_VALUE,
      Uint8.MAX_VALUE,
    ) as uint8;
  }
  return Uint8.MIN_VALUE;
}

function _normalizeAlphaByte(value: unknown): uint8 {
  if (Number.isFinite(value)) {
    return _clamp(
      Math.round(value as number),
      Uint8.MIN_VALUE,
      Uint8.MAX_VALUE,
    ) as uint8;
  }
  return Uint8.MAX_VALUE;
}

function _normalizeRgbBytes(value: unknown): NormalizedRgbBytes {
  let rByte: uint8 = Uint8.MIN_VALUE;
  let gByte: uint8 = Uint8.MIN_VALUE;
  let bByte: uint8 = Uint8.MIN_VALUE;
  let aByte: uint8 = Uint8.MAX_VALUE;
  if (value && (typeof value === "object")) {
    if ("r" in value) {
      rByte = _normalizeRgbByte(value.r);
    }
    if ("g" in value) {
      gByte = _normalizeRgbByte(value.g);
    }
    if ("b" in value) {
      bByte = _normalizeRgbByte(value.b);
    }
    if ("a" in value) {
      aByte = _normalizeAlphaByte(value.a);
    }
  }
  return {
    r: rByte,
    g: gByte,
    b: bByte,
    a: aByte,
  };
}

const _HUE_0TURN = 0;
const _HUE_1TURN = 360;

function _normalizeHue(value: unknown): hue {
  if (Number.isFinite(value)) {
    const t = (value as number) % _HUE_1TURN;
    return (t < _HUE_0TURN) ? (t + _HUE_1TURN) : t;
  }
  return _HUE_0TURN;
}

const _MIN_SATURATION = 0;
const _MAX_SATURATION = 1;

function _normalizeSaturation(value: unknown): saturation {
  if (Number.isFinite(value)) {
    return _clamp(value as number, _MIN_SATURATION, _MAX_SATURATION);
  }
  return _MIN_SATURATION;
}

const _MIN_LIGHTNESS = 0;
const _MAX_LIGHTNESS = 1;

function _normalizeLightness(value: unknown): lightness {
  if (Number.isFinite(value)) {
    return _clamp(value as number, _MIN_LIGHTNESS, _MAX_LIGHTNESS);
  }
  return _MIN_LIGHTNESS;
}

function _normalizeHsl(value: unknown): NormalizedHsl {
  let h = _HUE_0TURN;
  let s = _MIN_SATURATION;
  let l = _MIN_LIGHTNESS;
  let a = _MAX_ALPHA;
  if (value && (typeof value === "object")) {
    if ("h" in value) {
      h = _normalizeHue(value.h);
    }
    if ("s" in value) {
      s = _normalizeSaturation(value.s);
    }
    if ("l" in value) {
      l = _normalizeLightness(value.l);
    }
    if ("a" in value) {
      a = _normalizeAlpha(value.a);
    }
  }
  return {
    h,
    s,
    l,
    a,
  };
}

function _f(n: number, { h, s, l }: Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

function _hslToRgb(normalizedHsl: NormalizedHsl): NormalizedRgb {
  return {
    r: _f(0, normalizedHsl),
    g: _f(8, normalizedHsl),
    b: _f(4, normalizedHsl),
    a: normalizedHsl.a,
  };
}

function _rgbToUint8ClampedArray(
  { r, g, b, a }: NormalizedRgb,
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
): NormalizedRgbBytes {
  return {
    r,
    g,
    b,
    a,
  } as NormalizedRgbBytes;
}

function _rgbToHsl({ r, g, b, a }: NormalizedRgb): NormalizedHsl {
  const maxRgb = Math.max(r, g, b);
  const minRgb = Math.min(r, g, b);

  const d = maxRgb - minRgb;

  let h = _HUE_0TURN;
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
    h = _normalizeHue(h * 60);
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
  _normalizeHsl,
  _normalizeRgb,
  _normalizeRgbBytes,
  _rgbToHsl,
  _rgbToUint8ClampedArray,
  _uint8ClampedArrayToRgbBytes,
};
