import { Uint8 } from "../../deps.ts";
import { Rgb } from "./rgb.ts";

namespace RgbBytes {
  export const Order = {
    ARGB: "argb",
    RGBA: "rgba",
  } as const;
  export type Order = typeof Order[keyof typeof Order];

  export type Normalized = {
    r: Uint8;
    g: Uint8;
    b: Uint8;
  };

  export function normalize(value: Rgb): Normalized {
    let r: number | undefined = undefined;
    let g: number | undefined = undefined;
    let b: number | undefined = undefined;
    if (value && (typeof value === "object")) {
      if (("r" in value) && Number.isFinite(value.r)) {
        r = value.r as number;
      }
      if (("g" in value) && Number.isFinite(value.g)) {
        g = value.g as number;
      }
      if (("b" in value) && Number.isFinite(value.b)) {
        b = value.b as number;
      }
    }
    return {
      r: Uint8.clamp(r),
      g: Uint8.clamp(g),
      b: Uint8.clamp(b),
    };
  }

  export function fromRgb(rgb: Rgb): Normalized {
    const normalizedRgb = Rgb.normalize(rgb);
    return {
      r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
      g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
      b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
    };
  }

  export function toRgb(rgbBytes: Rgb): Rgb.Normalized {
    const normalizedRgbBytes = normalize(rgbBytes);
    return {
      r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
      g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
      b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
    };
  }
}

export { RgbBytes };
