import { NumberUtils } from "../../deps.ts";
import { Hue } from "../color/hue.ts";
import { Rgb } from "./rgb.ts";

/**
 * The HSL object, that represents RGB color in hue, saturation, and lightness.
 */
type Hsl = {
  /**
   * Hue
   */
  h: number;

  /**
   * Saturation
   */
  s: number;

  /**
   * Lightness
   */
  l: number;

  /**
   * Alpha
   */
  a?: number;
};

namespace Hsl {
  //XXX ここで適切？
  export type Saturation = number;

  export namespace Saturation {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Saturation {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  //XXX ここで適切？
  export type Lightness = number;

  export namespace Lightness {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Lightness {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export type Normalized = {
    h: Hue;
    s: Saturation;
    l: Lightness;
  };

  export function normalize(value: Hsl): Normalized {
    let h: unknown = undefined;
    let s: unknown = undefined;
    let l: unknown = undefined;
    if (value && (typeof value === "object")) {
      if ("h" in value) {
        h = value.h;
      }
      if ("s" in value) {
        s = value.s;
      }
      if ("l" in value) {
        l = value.l;
      }
    }
    return {
      h: Hue.normalize(h),
      s: Saturation.normalize(s),
      l: Lightness.normalize(l),
    };
  }

  export function fromRgb(rgb: Rgb): Normalized {
    const { r, g, b } = Rgb.normalize(rgb);

    const maxRgb = Math.max(r, g, b);
    const minRgb = Math.min(r, g, b);

    const d = maxRgb - minRgb;

    let h = Hue.NONE;
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
    return { h, s, l };
  }

  export function toRgb(hsl: Hsl): Rgb.Normalized {
    const normalizedHsl = normalize(hsl);
    return {
      r: _f(0, normalizedHsl),
      g: _f(8, normalizedHsl),
      b: _f(4, normalizedHsl),
    };
  }

  function _f(n: number, { h, s, l }: Normalized): number {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }
}

export { Hsl };
