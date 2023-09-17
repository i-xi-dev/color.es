import { Angle, NumberUtils } from "../deps.ts";

namespace Color {
  /**
   * The RGB object, that represents RGB color in red, green, and blue.
   */
  export type Rgb = {
    /**
     * Red
     */
    r: number;

    /**
     * Green
     */
    g: number;

    /**
     * Blue
     */
    b: number;

    /**
     * Alpha
     */
    a?: number;
  };

  /**
   * The HSL object, that represents RGB color in hue, saturation, and lightness.
   */
  export type Hsl = {
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

  /**
   * The HWB object, that represents RGB color in hue, whiteness, and blackness.
   */
  export type Hwb = {
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

  const _RgbSpace = {
    A98_RGB: "a98-rgb",
    DISPLAY_P3: "display-p3",
    PROPHOTO_RGB: "prophoto-rgb",
    REC2020: "rec2020",
    SRGB: "srgb",
    SRGB_LINEAR: "srgb-linear",
  } as const;

  const _XyzSpace = {
    XYZ: "xyz",
    XYZ_D50: "xyz-d50",
    XYZ_D65: "xyz-d65",
  } as const;

  export const Space = {
    ..._RgbSpace,
    ..._XyzSpace,
    //XXX 他のspace
  } as const;

  /**
   * The color space
   */
  export type Space = typeof Space[keyof typeof Space];

  /**
   * The opacity value, represented as a `number`.
   * 
   * The useful range of the value is `0` to `1`.
   * `0` represents completely transparent, `1` represents completely opaque.
   */
  export type Alpha = number;

  export namespace Alpha {
    /**
     * The minimum value of alpha value.
     */
    export const MIN_VALUE = 0;

    /**
     * The maximum value of alpha value.
     */
    export const MAX_VALUE = 1;

    /**
     * If the `value` is a numeric type, returns the result rounded to the range of `0` to `1`.
     * Otherwise, returns `1`.
     * 
     * @param value - Alpha value.
     * @returns A normalized alpha value.
     */
    export function normalize(value: unknown): Alpha {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MAX_VALUE;
    }
  }

  export type Hue = Angle.Degrees;

  export namespace Hue {
    export const ZERO_TURN = 0;

    export function normalize(value: unknown): Hue {
      if (Number.isFinite(value)) {
        return Angle.Degrees.normalize(value as number);
      }
      return ZERO_TURN; //XXX Number.NaN にするか？
    }
  }
}

export { Color };
