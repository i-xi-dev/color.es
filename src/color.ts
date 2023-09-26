import { Angle, NumberUtils } from "../deps.ts";

namespace Color {
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
     * @example
     * ```javascript
     * const alpha = Color.Alpha.normalize(1.1);
     * // alpha
     * //   → 1
     * ```
     * @example
     * ```javascript
     * const alpha = Color.Alpha.normalize(-1);
     * // alpha
     * //   → 0
     * ```
     * @example
     * ```javascript
     * const alpha = Color.Alpha.normalize(0.5);
     * // alpha
     * //   → 0.5
     * ```
     * @example
     * ```javascript
     * const alpha = Color.Alpha.normalize(undefined);
     * // alpha
     * //   → 1
     * ```
     */
    export function normalize(value: unknown): Alpha {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MAX_VALUE;
    }
  }

  /**
   * The hue, represented as an angle in degrees on the hue circle.
   */
  export type Hue = Angle.Degrees;

  export namespace Hue {
    export const ZERO_TURN = 0;

    /**
     * If the `value` is a numeric type, returns the result rounded to `0` or more and less than `360`.
     * Otherwise, returns `0`.
     *
     * @param value - Hue.
     * @returns A normalized hue.
     * @example
     * ```javascript
     * const hue = Color.Hue.normalize(90);
     * // hue
     * //   → 90
     * ```
     * @example
     * ```javascript
     * const hue = Color.Hue.normalize(-90);
     * // hue
     * //   → 270
     * ```
     * @example
     * ```javascript
     * const hue = Color.Hue.normalize(720);
     * // hue
     * //   → 0
     * ```
     */
    export function normalize(value: unknown): Hue {
      if (Number.isFinite(value)) {
        return Angle.Degrees.normalize(value as number);
      }
      return ZERO_TURN; //XXX Number.NaN にするか？
    }
  }

  /**
   * The object with the following optional fields.
   *
   * - `ignoreAlpha`:
   *     Whether to interpret `a` (alpha) as `1` or not.
   *     If `order` is `"argb"`, ignore `ignoreAlpha`.
   */
  export type FromOptions = {
    /**
     * Whether to interpret `a` (alpha) as `1` or not.
     *
     * If `order` is `"argb"`, ignore `ignoreAlpha`.
     */
    ignoreAlpha?: boolean;
  };

  /**
   * The object with the following optional fields.
   *
   * - `discardAlpha`:
   *     Whether to discard `a` (alpha).
   *     The default is `false`.
   * - `omitAlphaIfOpaque`:
   *     Whether to omit `a` (alpha) if alpha equals `1`.
   *     The default is `false`.
   */
  export type ToOptions = {
    /**
     * Whether to discard `a` (alpha).
     * The default is `false`.
     */
    discardAlpha?: boolean;

    /**
     * Whether to omit `a` (alpha) if alpha equals `1`.
     * The default is `false`.
     */
    omitAlphaIfOpaque?: boolean;
  };
}

export { Color };
