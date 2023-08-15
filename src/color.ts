import { NumberUtils } from "../deps.ts";

namespace Color {
  // Alpha >= 0 && Alpha <= 1
  export type Alpha = number;

  export namespace Alpha {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Alpha {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MAX_VALUE;
    }
  }

  export type Rgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  export type FromOptions = {
    discardAlpha?: boolean;
  };

  export type ToOptions = {
    omitAlphaIfOpaque?: boolean;
  };
}

export { Color };
