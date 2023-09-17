import { ByteSequence, NumberUtils, Uint8 } from "../deps.ts";
import { Color } from "./color.ts";

namespace _Rgb {
  export type Normalized = {
    r: RgbColor.RgbComponent;
    g: RgbColor.RgbComponent;
    b: RgbColor.RgbComponent;
  };

  export function normalize(value: Color.Rgb): Normalized {
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
      r: RgbColor.RgbComponent.normalize(r),
      g: RgbColor.RgbComponent.normalize(g),
      b: RgbColor.RgbComponent.normalize(b),
    };
  }
}

namespace _RgbBytes {
  export type Normalized = {
    r: Uint8;
    g: Uint8;
    b: Uint8;
  };

  export function normalize(value: Color.Rgb): Normalized {
    let r: number | undefined = undefined;
    let g: number | undefined = undefined;
    let b: number | undefined = undefined;
    if (value && (typeof value === "object")) {
      if (("r" in value) && Number.isFinite(value.r)) {
        r = value.r as number;
      }
      if (("g" in value) && Number.isFinite(value.g)) {
        g = value.g as number;
      }
      if (("b" in value) && Number.isFinite(value.b)) {
        b = value.b as number;
      }
    }
    return {
      r: Uint8.clamp(r),
      g: Uint8.clamp(g),
      b: Uint8.clamp(b),
    };
  }

  export function fromRgb(rgb: Color.Rgb): Normalized {
    const normalizedRgb = _Rgb.normalize(rgb);
    return {
      r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
      g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
      b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
    };
  }

  export function toRgb(rgbBytes: Color.Rgb): _Rgb.Normalized {
    const normalizedRgbBytes = normalize(rgbBytes);
    return {
      r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
      g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
      b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
    };
  }
}

namespace _Hsl {
  export type Normalized = {
    h: Color.Hue;
    s: RgbColor.Saturation;
    l: RgbColor.Lightness;
  };

  export function normalize(value: Color.Hsl): Normalized {
    let h: unknown = undefined;
    let s: unknown = undefined;
    let l: unknown = undefined;
    if (value && (typeof value === "object")) {
      if ("h" in value) {
        h = value.h;
      }
      if ("s" in value) {
        s = value.s;
      }
      if ("l" in value) {
        l = value.l;
      }
    }
    return {
      h: Color.Hue.normalize(h),
      s: RgbColor.Saturation.normalize(s),
      l: RgbColor.Lightness.normalize(l),
    };
  }

  export function fromRgb(rgb: Color.Rgb): Normalized {
    const { r, g, b } = _Rgb.normalize(rgb);

    const maxRgb = Math.max(r, g, b);
    const minRgb = Math.min(r, g, b);

    const d = maxRgb - minRgb;

    let h = Color.Hue.ZERO_TURN; //XXX Number.NaNにするか
    if (d !== 0) {
      switch (maxRgb) {
        case r:
          h = (g - b) / d;
          break;

        case g:
          h = ((b - r) / d) + 2;
          break;

        // case b:
        default:
          h = ((r - g) / d) + 4;
          break;
      }
      h = Color.Hue.normalize(h * 60);
    }

    const l = (minRgb + maxRgb) / 2;

    let s = 0;
    if (d !== 0) {
      if ((l !== 0) && (l !== 1)) {
        s = (maxRgb - l) / Math.min(l, 1 - l);
      }
    }
    return { h, s, l };
  }

  export function toRgb(hsl: Color.Hsl): _Rgb.Normalized {
    const normalizedHsl = normalize(hsl);
    return {
      r: _f(0, normalizedHsl),
      g: _f(8, normalizedHsl),
      b: _f(4, normalizedHsl),
    };
  }

  function _f(n: number, { h, s, l }: Normalized): number {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  }
}

namespace _Hwb {
  export type Normalized = {
    h: Color.Hue;
    w: RgbColor.Whiteness;
    b: RgbColor.Blackness;
  };

  export function normalize(value: Color.Hwb): Normalized {
    let h: unknown = undefined;
    let w: unknown = undefined;
    let b: unknown = undefined;
    if (value && (typeof value === "object")) {
      if ("h" in value) {
        h = value.h;
      }
      if ("w" in value) {
        w = value.w;
      }
      if ("b" in value) {
        b = value.b;
      }
    }
    return {
      h: Color.Hue.normalize(h),
      w: RgbColor.Whiteness.normalize(w),
      b: RgbColor.Blackness.normalize(b),
      //XXX w+bに上限制約があるが…
    };
  }

  export function fromRgb(rgb: Color.Rgb): Normalized {
    const { r, g, b } = _Rgb.normalize(rgb);
    const { h } = _Hsl.fromRgb(rgb);
    const w = Math.min(r, g, b);
    const blackness = 1 - Math.max(r, g, b);
    return { h, w, b: blackness };
  }

  export function toRgb(hwb: Color.Hwb): _Rgb.Normalized {
    const { h, w, b } = normalize(hwb);
    if (w + b >= 1) {
      const g = w / (w + b);
      return {
        r: g,
        g: g,
        b: g,
      };
    }

    const rgb = _Hsl.toRgb({ h, s: 1, l: 0.5 });
    rgb.r = (rgb.r * (1 - w - b)) + w;
    rgb.g = (rgb.g * (1 - w - b)) + w;
    rgb.b = (rgb.b * (1 - w - b)) + w;
    return rgb;
  }
}

type _FromOptions = {
  ignoreAlpha?: boolean;
};

type _ToOptions = {
  discardAlpha?: boolean;
  omitAlphaIfOpaque?: boolean;
};

function _isRequiredAlpha(alpha: Color.Alpha, options?: _ToOptions): boolean {
  if (options?.discardAlpha === true) {
    return false;
  }
  if (
    (options?.omitAlphaIfOpaque === true) && (alpha === Color.Alpha.MAX_VALUE)
  ) {
    return false;
  }
  return true;
}

/**
 * A color represented by red, green, and blue channels
 */
class RgbColor {
  readonly #r: RgbColor.RgbComponent;
  readonly #g: RgbColor.RgbComponent;
  readonly #b: RgbColor.RgbComponent;
  readonly #a: Color.Alpha;

  #rgbBytesCache?: _RgbBytes.Normalized;
  #alphaByteCache?: Uint8;
  #hslCache?: _Hsl.Normalized;
  #hwbCache?: _Hwb.Normalized;

  private constructor(
    r: RgbColor.RgbComponent,
    g: RgbColor.RgbComponent,
    b: RgbColor.RgbComponent,
    a: Color.Alpha,
  ) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#a = a;
    Object.freeze(this);
  }

  /**
   * The red component value.
   */
  get red(): RgbColor.RgbComponent {
    return this.#r;
  }

  /**
   * The green component value.
   */
  get green(): RgbColor.RgbComponent {
    return this.#g;
  }

  /**
   * The blue component value.
   */
  get blue(): RgbColor.RgbComponent {
    return this.#b;
  }

  get alpha(): Color.Alpha {
    return this.#a;
  }

  get hue(): Color.Hue {
    return this.#hsl.h;
  }

  get saturation(): RgbColor.Saturation {
    return this.#hsl.s;
  }

  get lightness(): RgbColor.Lightness {
    return this.#hsl.l;
  }

  get whiteness(): RgbColor.Whiteness {
    return this.#hwb.w;
  }

  get blackness(): RgbColor.Blackness {
    return this.#hwb.b;
  }

  get #rgbBytes(): _RgbBytes.Normalized {
    if (!this.#rgbBytesCache) {
      this.#rgbBytesCache = _RgbBytes.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#rgbBytesCache };
  }

  get #alphaByte(): Uint8 {
    if (Uint8.isUint8(this.#alphaByteCache) !== true) {
      this.#alphaByteCache = Uint8.clamp(this.#a * Uint8.MAX_VALUE);
    }
    return this.#alphaByteCache as Uint8;
  }

  get #hsl(): _Hsl.Normalized {
    if (!this.#hslCache) {
      this.#hslCache = _Hsl.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#hslCache };
  }

  get #hwb(): _Hwb.Normalized {
    if (!this.#hwbCache) {
      this.#hwbCache = _Hwb.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#hwbCache };
  }

  static fromRgb(rgba: Color.Rgb, options?: RgbColor.FromRgbOptions): RgbColor {
    // sRGB固定

    if (options?.mode === "precision") {
      const { r, g, b } = _Rgb.normalize(rgba);
      const a = (options?.ignoreAlpha === true)
        ? Color.Alpha.MAX_VALUE
        : Color.Alpha.normalize(rgba.a);
      return new RgbColor(r, g, b, a);
    } else {
      const { r, g, b } = _RgbBytes.toRgb(rgba);
      let a: number = Color.Alpha.MAX_VALUE;
      if (options?.ignoreAlpha !== true) {
        if (options?.mode === "bytes") {
          if (Number.isFinite(rgba.a)) {
            a = Uint8.clamp(rgba.a) / Uint8.MAX_VALUE;
          }
        } else {
          a = Color.Alpha.normalize(rgba.a);
        }
      }
      return new RgbColor(r, g, b, a);
    }
  }

  static fromHsl(hsla: Color.Hsl, options?: RgbColor.FromHslOptions): RgbColor {
    const { r, g, b } = _Hsl.toRgb(hsla);
    const a = (options?.ignoreAlpha === true)
      ? Color.Alpha.MAX_VALUE
      : Color.Alpha.normalize(hsla.a);
    return new RgbColor(r, g, b, a);
  }

  static fromHwb(hwba: Color.Hwb, options?: RgbColor.FromHwbOptions): RgbColor {
    const { r, g, b } = _Hwb.toRgb(hwba);
    const a = (options?.ignoreAlpha === true)
      ? Color.Alpha.MAX_VALUE
      : Color.Alpha.normalize(hwba.a);
    return new RgbColor(r, g, b, a);
  }

  static fromUint8Array(
    rgbaBytes: Uint8Array | Uint8ClampedArray,
    options?: RgbColor.FromUint8ArrayOptions,
  ): RgbColor {
    if (rgbaBytes[Symbol.iterator]) {
      const bytes: [number, number, number, number] = [
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MAX_VALUE,
      ];

      let i = 0;
      for (const byte of rgbaBytes) {
        if ((options?.ignoreAlpha === true) && (i >= 3)) {
          break;
        }
        if (i >= 4) {
          break;
        }

        bytes[i] = byte;

        i = i + 1;
      }

      return RgbColor.fromRgb({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
        a: bytes[3],
      }, { mode: "bytes" });
    }
    throw new TypeError("rgbaBytes");
  }

  static fromHexString(
    hexString: string,
    options?: RgbColor.FromHexStringOptions,
  ): RgbColor {
    if (typeof hexString !== "string") {
      throw new TypeError("hexString");
    }

    let rr = "00";
    let gg = "00";
    let bb = "00";
    let aa = "ff";
    if (options?.order === "argb") {
      if (/^#[0-9a-f]{8}$/i.test(hexString)) {
        if (options?.ignoreAlpha !== true) {
          aa = hexString.substring(1, 3);
        }
        rr = hexString.substring(3, 5);
        gg = hexString.substring(5, 7);
        bb = hexString.substring(7, 9);
      }
    } else {
      if (/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hexString)) {
        rr = hexString.substring(1, 3);
        gg = hexString.substring(3, 5);
        bb = hexString.substring(5, 7);
        if ((hexString.length === 9) && (options?.ignoreAlpha !== true)) {
          aa = hexString.substring(7, 9);
        }
      }
    }

    return RgbColor.fromUint8Array(
      ByteSequence.parse(rr + gg + bb + aa).getUint8View(),
    );
  }

  toRgb(options?: RgbColor.ToRgbOptions): Color.Rgb {
    let r: number;
    let g: number;
    let b: number;
    let a: number;
    if (options?.mode === "precision") {
      r = this.#r;
      g = this.#g;
      b = this.#b;
      a = this.#a;
    } else {
      r = this.#rgbBytes.r;
      g = this.#rgbBytes.g;
      b = this.#rgbBytes.b;
      if (options?.mode === "bytes") {
        a = this.#alphaByte;
      } else {
        a = this.#a;
      }
    }

    if (_isRequiredAlpha(this.#a, options)) {
      return { r, g, b, a };
    }
    return { r, g, b };
  }

  toHsl(options?: RgbColor.ToHslOptions): Color.Hsl {
    const { h, s, l } = this.#hsl;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, s, l, a: this.#a };
    }
    return { h, s, l };
  }

  toHwb(options?: RgbColor.ToHwbOptions): Color.Hwb {
    const { h, w, b } = this.#hwb;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, w, b, a: this.#a };
    }
    return { h, w, b };
  }

  toUint8Array(options?: RgbColor.ToUint8ArrayOptions): Uint8Array {
    const { r, g, b } = this.#rgbBytes;
    if (_isRequiredAlpha(this.#a, options)) {
      return Uint8Array.of(r, g, b, this.#alphaByte);
    }
    return Uint8Array.of(r, g, b);
  }

  toUint8ClampedArray(
    options?: RgbColor.ToUint8ArrayOptions,
  ): Uint8ClampedArray {
    const { r, g, b } = this.#rgbBytes;
    if (_isRequiredAlpha(this.#a, options)) {
      return Uint8ClampedArray.of(r, g, b, this.#alphaByte);
    }
    return Uint8ClampedArray.of(r, g, b);
  }

  toHexString(options?: RgbColor.ToHexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const bytes = ByteSequence.fromArrayBufferView(this.toUint8Array());
    const rrggbbaa: string = bytes.format({ lowerCase });
    const rrggbb = rrggbbaa.substring(0, 6);
    const aa = rrggbbaa.substring(6);

    if (_isRequiredAlpha(this.#a, options) !== true) {
      return "#" + rrggbb;
    }

    if (options?.order === "argb") {
      return "#" + aa + rrggbb;
    }
    return "#" + rrggbb + aa;
  }

  toString(): string {
    return this.toHexString({
      // omitAlphaIfOpaque: true,
      upperCase: true,
    });
  }

  toJSON(): _Rgb.Normalized & { a: Color.Alpha } {
    return this.toRgb({
      mode: "precision",
    }) as (_Rgb.Normalized & { a: Color.Alpha });
  }

  plusHue(relativeHue: number): RgbColor {
    const { h, s, l } = this.#hsl;
    return RgbColor.fromHsl({
      h: (h + relativeHue),
      s,
      l,
      a: this.#a,
    });
  }

  withHue(absoluteHue: number): RgbColor {
    const { s, l } = this.#hsl;
    return RgbColor.fromHsl({
      h: absoluteHue,
      s,
      l,
      a: this.#a,
    });
  }

  plusSaturation(relativeSaturation: number): RgbColor {
    const { h, s, l } = this.#hsl;
    return RgbColor.fromHsl({
      h,
      s: (s + relativeSaturation),
      l,
      a: this.#a,
    });
  }

  withSaturation(absoluteSaturation: number): RgbColor {
    const { h, l } = this.#hsl;
    return RgbColor.fromHsl({
      h,
      s: absoluteSaturation,
      l,
      a: this.#a,
    });
  }

  plusLightness(relativeLightness: number): RgbColor {
    const { h, s, l } = this.#hsl;
    return RgbColor.fromHsl({
      h,
      s,
      l: (l + relativeLightness),
      a: this.#a,
    });
  }

  withLightness(absoluteLightness: number): RgbColor {
    const { h, s } = this.#hsl;
    return RgbColor.fromHsl({
      h,
      s,
      l: absoluteLightness,
      a: this.#a,
    });
  }

  plusAlpha(relativeAlpha: number): RgbColor {
    return new RgbColor(
      this.#r,
      this.#g,
      this.#b,
      Color.Alpha.normalize(this.#a + relativeAlpha),
    );
  }

  withAlpha(absoluteAlpha: number): RgbColor {
    return new RgbColor(
      this.#r,
      this.#g,
      this.#b,
      Color.Alpha.normalize(absoluteAlpha),
    );
  }

  withoutAlpha(): RgbColor {
    return new RgbColor(this.#r, this.#g, this.#b, Color.Alpha.MAX_VALUE);
  }
}

namespace RgbColor {
  export type RgbComponent = number;
  export namespace RgbComponent {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;
    //XXX 現バージョンでは、範囲は0-1で固定（sRGB以外は考慮しない）
    export const normalize = _normalize_0_1;
  }

  type _0_1 = number;

  const _0_1_MIN = 0;
  const _0_1_MAX = 1;
  function _normalize_0_1(value: unknown): _0_1 {
    if (Number.isFinite(value)) {
      return NumberUtils.clamp(value as number, _0_1_MIN, _0_1_MAX);
    }
    return _0_1_MIN;
  }

  //XXX ここで適切？
  export type Saturation = _0_1;
  export namespace Saturation {
    export const MIN_VALUE = _0_1_MIN;
    export const MAX_VALUE = _0_1_MAX;
    export const normalize = _normalize_0_1;
  }

  //XXX ここで適切？
  export type Lightness = _0_1;
  export namespace Lightness {
    export const MIN_VALUE = _0_1_MIN;
    export const MAX_VALUE = _0_1_MAX;
    export const normalize = _normalize_0_1;
  }

  //XXX ここで適切？
  export type Whiteness = _0_1;
  export namespace Whiteness {
    export const MIN_VALUE = _0_1_MIN;
    export const MAX_VALUE = _0_1_MAX;
    export const normalize = _normalize_0_1;
  }

  //XXX ここで適切？
  export type Blackness = _0_1;
  export namespace Blackness {
    export const MIN_VALUE = _0_1_MIN;
    export const MAX_VALUE = _0_1_MAX;
    export const normalize = _normalize_0_1;
  }

  type RgbOptions = {
    mode?: "compat" | "bytes" | "precision";
  };

  type HexStringOptions = {
    order?: "rgba" | "argb";
  };

  export type FromRgbOptions = RgbOptions & _FromOptions;

  export type ToRgbOptions = RgbOptions & _ToOptions;

  export type FromHslOptions = _FromOptions;

  export type ToHslOptions = _ToOptions;

  export type FromHwbOptions = _FromOptions;

  export type ToHwbOptions = _ToOptions;

  export type FromUint8ArrayOptions = _FromOptions;

  export type ToUint8ArrayOptions = _ToOptions;

  export type FromHexStringOptions = HexStringOptions & _FromOptions;

  export type ToHexStringOptions = HexStringOptions & {
    upperCase?: boolean;
  } & _ToOptions;
}

export { RgbColor };
