import { Uint8 } from "../../deps.ts";
import { Rgb } from "./rgb.ts";

namespace RgbBytes {
  export const Order = {
    ARGB: "argb",
    RGBA: "rgba",
  } as const;
  export type Order = typeof Order[keyof typeof Order];

  /**
   * A normalized RGB component bytes.
   */
  export type Normalized = {
    /**
     * Red component.
     */
    r: Uint8;

    /**
     * Green component.
     */
    g: Uint8;

    /**
     * Blue component.
     */
    b: Uint8;
  };

  /**
   * Normalize RGB component bytes.
   *
   * @param bytes - RGB component bytes.
   * @returns RGB component bytes, where the byte value of each component is normalized to an integer from 0 to 255.
   * @example
   * ```javascript
   * const rgbBytes = RgbBytes.normalize({ r: -1, g: 500, b: 12.3 });
   * // rgbBytes.r
   * //   → 0
   * // rgbBytes.g
   * //   → 255
   * // rgbBytes.b
   * //   → 12
   * ```
   */
  export function normalize(bytes: Rgb): Normalized {
    let r: number | undefined = undefined;
    let g: number | undefined = undefined;
    let b: number | undefined = undefined;
    if (bytes && (typeof bytes === "object")) {
      if (("r" in bytes) && Number.isFinite(bytes.r)) {
        r = bytes.r as number;
      }
      if (("g" in bytes) && Number.isFinite(bytes.g)) {
        g = bytes.g as number;
      }
      if (("b" in bytes) && Number.isFinite(bytes.b)) {
        b = bytes.b as number;
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
