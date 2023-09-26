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
  export type Component = number;

  export namespace Component {
    export const MIN_VALUE = 0;

    export const MAX_VALUE = 1;

    //XXX 現バージョンでは、範囲は0-1で固定（sRGB以外は考慮しない）
    export function normalize(value: unknown): Component {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export type Normalized = {
    r: Component;
    g: Component;
    b: Component;
  };

  export function normalize(value: Rgb): Normalized {
    let r: unknown = undefined;
    let g: unknown = undefined;
    let b: unknown = undefined;
    if (value && (typeof value === "object")) {
      if ("r" in value) {
        r = value.r;
      }
      if ("g" in value) {
        g = value.g;
      }
      if ("b" in value) {
        b = value.b;
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
