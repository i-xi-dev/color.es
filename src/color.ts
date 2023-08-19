import { Angle, NumberUtils } from "../deps.ts";

namespace Color {
  // x >= 0 && x <= 1
  export type Component = number;

  export namespace Component {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Component {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp((value as number), MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export type Alpha = Component;

  export namespace Alpha {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Alpha {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp((value as number), MIN_VALUE, MAX_VALUE);
      }
      return MAX_VALUE;
    }
  }

  export type Hue = Angle.Degrees;

  // 何度が何色かは色空間による
  // 彩度0はNaNで表す
  export namespace Hue {
    export const ZERO_TURN = 0;

    export function normalize(value: unknown): Hue {
      if (Number.isFinite(value)) {
        return Angle.Degrees.normalize(value as number);
      }
      return Number.NaN;
    }
  }

  export type Rgb = {
    r: number;
    g: number;
    b: number;
  };

  export type Rgba = {
    r: number;
    g: number;
    b: number;
    a: number;
  };

  export type Hsl = {
    h: number;
    s: number;
    l: number;
  };

  export type Hsla = {
    h: number;
    s: number;
    l: number;
    a: number;
  };


}

export { Color };
