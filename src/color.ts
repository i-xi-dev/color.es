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

  export type Rgba = Rgb & {
    a: number;
  };

  export type Hsl = {
    h: number;
    s: number;
    l: number;
    a?: number;
  };

  export type Hsla = Hsl & {
    a: number;
  };

  export type Hwb = {
    h: number;
    w: number;
    b: number;
    a?: number;
  };

  export type Hwba = Hwb & {
    a: number;
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
