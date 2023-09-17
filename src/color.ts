import { Angle, NumberUtils } from "../deps.ts";

namespace Color {
  // 以下いずれか
  // ・r,g,bはバイト表現 0～255、aは0～1（多分一般的。VuetifyとかReactの形式）
  // ・r,g,b,aすべてバイト表現 0～255
  // ・r,g,b,aすべて0～1
  export type Rgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  export type Hsl = {
    h: number;
    s: number;
    l: number;
    a?: number;
  };

  export type Hwb = {
    h: number;
    w: number;
    b: number;
    a?: number;
  };

  export const Space = {
    SRGB: "srgb",
  } as const;
  export type Space = typeof Space[keyof typeof Space];

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
