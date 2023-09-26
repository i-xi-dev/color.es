import { NumberUtils } from "../../deps.ts";

/**
 * The opacity value, represented as a `number`.
 *
 * The useful range of the value is `0` to `1`.
 * `0` represents completely transparent, `1` represents completely opaque.
 */
type Alpha = number;

namespace Alpha {
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

export { Alpha };
