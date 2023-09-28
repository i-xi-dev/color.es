import { NumberUtils } from "../../deps.ts";

/**
 * The RGB object, that represents RGB color in red, green, and blue.
 */
type Rgb = {
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

namespace Rgb {
  /**
   * A component (r, g, or b) of RGB color.
   */
  export type Component = number;

  export namespace Component {
    /**
     * The minimum value of component.
     */
    export const MIN_VALUE = 0;

    /**
     * The maximum value of component.
     */
    export const MAX_VALUE = 1;

    //XXX 現バージョンでは、0以上1以下に正規化する（＝sRGB以外は考慮しない）
    /**
     * Normalize a component value to the range of 0 to 1.
     *
     * In the current version, normalized values are restricted to be greater than or equal to 0 and less than or equal to 1.
     *
     * @param component - A component value
     * @returns A component value normalized to the range of 0 to 1.
     * @example
     * ```javascript
     * const r = Rgb.Component.normalize(1);
     * // r
     * //   → 1
     * ```
     * @example
     * ```javascript
     * const r = Rgb.Component.normalize(2.5);
     * // r
     * //   → 1
     * ```
     * @example
     * ```javascript
     * const r = Rgb.Component.normalize(-5);
     * // r
     * //   → 0
     * ```
     */
    export function normalize(component: unknown): Component {
      if (Number.isFinite(component)) {
        return NumberUtils.clamp(component as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  /**
   * A normalized RGB components.
   */
  export type Normalized = {
    r: Component;
    g: Component;
    b: Component;
  };

  /**
   * Normalize RGB components.
   *
   * @param components - RGB components.
   * @returns RGB components where the value of each component is normalized from 0 to 1.
   * @example
   * ```javascript
   * const rgb = Rgb.normalize({ r: -1, g: 0.5, b: 3.2 });
   * // rgb.r
   * //   → 0
   * // rgb.g
   * //   → 0.5
   * // rgb.b
   * //   → 1
   * ```
   */
  export function normalize(components: Rgb): Normalized {
    let r: unknown = undefined;
    let g: unknown = undefined;
    let b: unknown = undefined;
    if (components && (typeof components === "object")) {
      if ("r" in components) {
        r = components.r;
      }
      if ("g" in components) {
        g = components.g;
      }
      if ("b" in components) {
        b = components.b;
      }
    }
    return {
      r: Component.normalize(r),
      g: Component.normalize(g),
      b: Component.normalize(b),
    };
  }
}

export { Rgb };
