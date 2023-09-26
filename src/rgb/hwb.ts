import { NumberUtils } from "../../deps.ts";
import { Color } from "../color.ts";
import { Rgb } from "../rgb.ts";
import { Hsl } from "./hsl.ts";

/**
 * The HWB object, that represents RGB color in hue, whiteness, and blackness.
 */
type Hwb = {
  /**
   * Hue
   */
  h: number;

  /**
   * Whiteness
   */
  w: number;

  /**
   * Blackness
   */
  b: number;

  /**
   * Alpha
   */
  a?: number;
};

namespace Hwb {
  //XXX ここで適切？
  export type Whiteness = number;
  export namespace Whiteness {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Whiteness {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  //XXX ここで適切？
  export type Blackness = number;
  export namespace Blackness {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Blackness {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export type Normalized = {
    h: Color.Hue;
    w: Whiteness;
    b: Blackness;
  };

  export function normalize(value: Hwb): Normalized {
    let h: unknown = undefined;
    let w: unknown = undefined;
    let b: unknown = undefined;
    if (value && (typeof value === "object")) {
      if ("h" in value) {
        h = value.h;
      }
      if ("w" in value) {
        w = value.w;
      }
      if ("b" in value) {
        b = value.b;
      }
    }
    return {
      h: Color.Hue.normalize(h),
      w: Whiteness.normalize(w),
      b: Blackness.normalize(b),
      //XXX w+bに上限制約があるが…
    };
  }

  export function fromRgb(rgb: Rgb): Normalized {
    const { r, g, b } = Rgb.normalize(rgb);
    const { h } = Hsl.fromRgb(rgb);
    const w = Math.min(r, g, b);
    const blackness = 1 - Math.max(r, g, b);
    return { h, w, b: blackness };
  }

  export function toRgb(hwb: Hwb): Rgb.Normalized {
    const { h, w, b } = normalize(hwb);
    if (w + b >= 1) {
      const g = w / (w + b);
      return {
        r: g,
        g: g,
        b: g,
      };
    }

    const rgb = Hsl.toRgb({ h, s: 1, l: 0.5 });
    rgb.r = (rgb.r * (1 - w - b)) + w;
    rgb.g = (rgb.g * (1 - w - b)) + w;
    rgb.b = (rgb.b * (1 - w - b)) + w;
    return rgb;
  }
}

export { Hwb };
