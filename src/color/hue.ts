import { Angle } from "../../deps.ts";

/**
 * The hue, represented as an angle in degrees on the hue circle.
 */
type Hue = Angle.Degrees;

namespace Hue {
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

export { Hue };
