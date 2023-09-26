import { ByteSequence, NumberUtils, Uint8 } from "../deps.ts";
import { Color } from "./color.ts";
import { Rgb } from "./rgb.ts";
import { RgbBytes } from "./rgb/bytes.ts";

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
type _Saturation = _0_1;
namespace _Saturation {
  export const MIN_VALUE = _0_1_MIN;
  export const MAX_VALUE = _0_1_MAX;
  export const normalize = _normalize_0_1;
}

//XXX ここで適切？
type _Lightness = _0_1;
namespace _Lightness {
  export const MIN_VALUE = _0_1_MIN;
  export const MAX_VALUE = _0_1_MAX;
  export const normalize = _normalize_0_1;
}

//XXX ここで適切？
type _Whiteness = _0_1;
namespace _Whiteness {
  export const MIN_VALUE = _0_1_MIN;
  export const MAX_VALUE = _0_1_MAX;
  export const normalize = _normalize_0_1;
}

//XXX ここで適切？
type _Blackness = _0_1;
namespace _Blackness {
  export const MIN_VALUE = _0_1_MIN;
  export const MAX_VALUE = _0_1_MAX;
  export const normalize = _normalize_0_1;
}

type _RgbOptions = {
  mode?: "compat" | "bytes" | "precision";
};

export type RgbOrderOptions = {
  order?: RgbBytes.Order;
};

export type FromArrayOptions = RgbOrderOptions & Color.FromOptions;

export type ToArrayOptions = RgbOrderOptions & Color.ToOptions;

type _ToStringOptons = {
  lowerCase?: boolean;
};

export type ToHexStringOptions =
  & RgbOrderOptions
  & _ToStringOptons
  & Color.ToOptions;

namespace _Hsl {
  export type Normalized = {
    h: Color.Hue;
    s: _Saturation;
    l: _Lightness;
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
      s: _Saturation.normalize(s),
      l: _Lightness.normalize(l),
    };
  }

  export function fromRgb(rgb: Rgb): Normalized {
    const { r, g, b } = Rgb.normalize(rgb);

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

  export function toRgb(hsl: Color.Hsl): Rgb.Normalized {
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
    w: _Whiteness;
    b: _Blackness;
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
      w: _Whiteness.normalize(w),
      b: _Blackness.normalize(b),
      //XXX w+bに上限制約があるが…
    };
  }

  export function fromRgb(rgb: Rgb): Normalized {
    const { r, g, b } = Rgb.normalize(rgb);
    const { h } = _Hsl.fromRgb(rgb);
    const w = Math.min(r, g, b);
    const blackness = 1 - Math.max(r, g, b);
    return { h, w, b: blackness };
  }

  export function toRgb(hwb: Color.Hwb): Rgb.Normalized {
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

function _isRequiredAlpha(
  alpha: Color.Alpha,
  options?: Color.ToOptions,
): boolean {
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
  readonly #space: Color.Space;
  readonly #r: Rgb.Component;
  readonly #g: Rgb.Component;
  readonly #b: Rgb.Component;
  readonly #a: Color.Alpha;

  #rgbBytesCache?: RgbBytes.Normalized;
  #alphaByteCache?: Uint8;
  #hslCache?: _Hsl.Normalized;
  #hwbCache?: _Hwb.Normalized;

  private constructor(
    r: Rgb.Component,
    g: Rgb.Component,
    b: Rgb.Component,
    a: Color.Alpha,
  ) {
    this.#space = Color.Space.SRGB; //XXX 現バージョンでは固定とする
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#a = a;
    Object.freeze(this);
  }

  /**
   * Gets the color space.
   *
   * Always returns `"srgb"` in this version.
   */
  get space(): Color.Space {
    return this.#space;
  }

  /**
   * Gets the red component value.
   *
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const r = color.red;
   * // r
   * //   → 1
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#88ffff");
   * const r = color.red;
   * // r
   * //   → 0.533333
   * ```
   */
  get red(): Rgb.Component {
    return this.#r;
  }

  /**
   * Gets the green component value.
   *
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#00ff00");
   * const g = color.green;
   * // g
   * //   → 1
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff88ff");
   * const g = color.green;
   * // g
   * //   → 0.533333
   * ```
   */
  get green(): Rgb.Component {
    return this.#g;
  }

  /**
   * Gets the blue component value.
   *
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#0000ff");
   * const b = color.blue;
   * // b
   * //   → 1
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ffff88");
   * const b = color.blue;
   * // b
   * //   → 0.533333
   * ```
   */
  get blue(): Rgb.Component {
    return this.#b;
  }

  /**
   * Gets the alpha component value.
   *
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#000000");
   * const a = color.alpha;
   * // a
   * //   → 1
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#00000000");
   * const a = color.alpha;
   * // a
   * //   → 0
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ffffff88");
   * const a = color.alpha;
   * // a
   * //   → 0.533333
   * ```
   */
  get alpha(): Color.Alpha {
    return this.#a;
  }

  get hue(): Color.Hue {
    return this.#hsl.h;
  }

  get saturation(): _Saturation {
    return this.#hsl.s;
  }

  get lightness(): _Lightness {
    return this.#hsl.l;
  }

  get whiteness(): _Whiteness {
    return this.#hwb.w;
  }

  get blackness(): _Blackness {
    return this.#hwb.b;
  }

  get #rgbBytes(): RgbBytes.Normalized {
    if (!this.#rgbBytesCache) {
      this.#rgbBytesCache = RgbBytes.fromRgb({
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

  // ・r,g,bはバイト表現 0～255、aは0～1（多分一般的。VuetifyとかReactの形式）
  // ・r,g,b,aすべてバイト表現 0～255
  // ・r,g,b,aすべて0～1
  static fromRgb(rgba: Rgb, options?: FromRgbOptions): RgbColor {
    // sRGB固定

    if (options?.mode === "precision") {
      const { r, g, b } = Rgb.normalize(rgba);
      const a = (options?.ignoreAlpha === true)
        ? Color.Alpha.MAX_VALUE
        : Color.Alpha.normalize(rgba.a);
      return new RgbColor(r, g, b, a);
    } else {
      const { r, g, b } = RgbBytes.toRgb(rgba);
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

  static fromHsl(hsla: Color.Hsl, options?: FromHslOptions): RgbColor {
    const { r, g, b } = _Hsl.toRgb(hsla);
    const a = (options?.ignoreAlpha === true)
      ? Color.Alpha.MAX_VALUE
      : Color.Alpha.normalize(hsla.a);
    return new RgbColor(r, g, b, a);
  }

  static fromHwb(hwba: Color.Hwb, options?: FromHwbOptions): RgbColor {
    const { r, g, b } = _Hwb.toRgb(hwba);
    const a = (options?.ignoreAlpha === true)
      ? Color.Alpha.MAX_VALUE
      : Color.Alpha.normalize(hwba.a);
    return new RgbColor(r, g, b, a);
  }

  static fromUint8Array(
    rgbaBytes: Uint8Array | Uint8ClampedArray,
    options?: FromArrayOptions,
  ): RgbColor {
    if (rgbaBytes[Symbol.iterator]) {
      const [byte0, byte1, byte2, byte3] = rgbaBytes;

      const bytes = {
        r: Uint8.MIN_VALUE,
        g: Uint8.MIN_VALUE,
        b: Uint8.MIN_VALUE,
        a: Uint8.MAX_VALUE,
      };
      if (options?.order === RgbBytes.Order.ARGB) {
        bytes.r = Uint8.isUint8(byte1) ? byte1 : bytes.r;
        bytes.g = Uint8.isUint8(byte2) ? byte2 : bytes.g;
        bytes.b = Uint8.isUint8(byte3) ? byte3 : bytes.b;
        bytes.a = Uint8.isUint8(byte0) ? byte0 : bytes.a;
      } else {
        bytes.r = Uint8.isUint8(byte0) ? byte0 : bytes.r;
        bytes.g = Uint8.isUint8(byte1) ? byte1 : bytes.g;
        bytes.b = Uint8.isUint8(byte2) ? byte2 : bytes.b;
        bytes.a = ((options?.ignoreAlpha !== true) && Uint8.isUint8(byte3))
          ? byte3
          : bytes.a;
      }

      return RgbColor.fromRgb(bytes, { mode: "bytes" });
    }
    throw new TypeError("rgbaBytes");
  }

  static fromHexString(
    hexString: string,
    options?: FromHexStringOptions,
  ): RgbColor {
    if (typeof hexString !== "string") {
      throw new TypeError("hexString");
    }

    let rr = "00";
    let gg = "00";
    let bb = "00";
    let aa = "ff";
    if (options?.order === RgbBytes.Order.ARGB) {
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

  toRgb(options?: ToRgbOptions): Rgb {
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

  /**
   * Returns the triplet of `h` (hue), `s` (saturation), and `l` (lightness).
   *
   * @param options - An options object.
   * @returns A triplet of `h`, `s`, and `l`.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const hsl = color.toHsl();
   * // hsl
   * //   → {
   * //       h: 0,
   * //       s: 1,
   * //       l: 0.5,
   * //       a: 1,
   * //     }
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const hsl = color.toHsl({ omitAlphaIfOpaque: true });
   * // hsl
   * //   → {
   * //       h: 0,
   * //       s: 1,
   * //       l: 0.5,
   * //     }
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff000088");
   * const hsl = color.toHsl({ discardAlpha: true });
   * // hsl
   * //   → {
   * //       h: 0,
   * //       s: 1,
   * //       l: 0.5,
   * //     }
   * ```
   */
  toHsl(options?: Color.ToOptions): Color.Hsl {
    const { h, s, l } = this.#hsl;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, s, l, a: this.#a };
    }
    return { h, s, l };
  }

  /**
   * Returns the triplet of `h` (hue), `w` (whiteness), and `b` (blackness).
   *
   * @param options - An options object.
   * @returns A triplet of `h`, `w`, and `b`.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff8888");
   * const hwb = color.toHwb();
   * // hwb
   * //   → {
   * //       h: 0,
   * //       w: 0.533333,
   * //       b: 0,
   * //       a: 1,
   * //     }
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff8888");
   * const hwb = color.toHwb({ omitAlphaIfOpaque: true });
   * // hwb
   * //   → {
   * //       h: 0,
   * //       w: 0.533333,
   * //       b: 0,
   * //     }
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff888888");
   * const hwb = color.toHwb({ discardAlpha: true });
   * // hwb
   * //   → {
   * //       h: 0,
   * //       w: 0.533333,
   * //       b: 0,
   * //     }
   * ```
   */
  toHwb(options?: Color.ToOptions): Color.Hwb {
    const { h, w, b } = this.#hwb;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, w, b, a: this.#a };
    }
    return { h, w, b };
  }

  #toByteArray(
    options?: ToArrayOptions,
  ): [Uint8, Uint8, Uint8] | [Uint8, Uint8, Uint8, Uint8] {
    const { r, g, b } = this.#rgbBytes;

    if (options?.order === RgbBytes.Order.ARGB) {
      return [this.#alphaByte, r, g, b];
    } else {
      const isRequiredAlpha = _isRequiredAlpha(this.#a, options);
      if (isRequiredAlpha === true) {
        return [r, g, b, this.#alphaByte];
      }
      return [r, g, b];
    }
  }

  /**
   * Returns the RGB expressed as a byte sequence.
   *
   * @param options - An options object.
   * @returns A RGB(A) byte sequence or the ARGB byte sequence.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const bytes = color.toUint8Array();
   * // bytes
   * //   → Uint8Array[ 0x11, 0x22, 0x33, 0xFF ] // RGBA
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const bytes = color.toUint8Array({ discardAlpha: true });
   * // bytes
   * //   → Uint8Array[ 0x11, 0x22, 0x33 ] // RGB
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const bytes = color.toUint8Array({ order: "argb" });
   * // bytes
   * //   → Uint8Array[ 0xFF, 0x11, 0x22, 0x33 ] // ARGB
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const bytes = color.toUint8Array({ order: "argb", discardAlpha: true });
   * // bytes
   * //   → Uint8Array[ 0xFF, 0x11, 0x22, 0x33 ] // ARGB
   * //   If the `order` is "argb", the `discardAlpha` and `omitAlphaIfOpaque` are ignored.
   * ```
   */
  toUint8Array(options?: ToArrayOptions): Uint8Array {
    return Uint8Array.from(this.#toByteArray(options));
  }

  /**
   * Returns the RGB expressed as a byte sequence.
   *
   * @param options - An options object.
   * @returns A RGB(A) byte sequence or the ARGB byte sequence.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const bytes = color.toUint8ClampedArray();
   * // bytes
   * //   → Uint8ClampedArray[ 0x11, 0x22, 0x33, 0xFF ] // RGBA
   * ```
   */
  toUint8ClampedArray(options?: ToArrayOptions): Uint8ClampedArray {
    return Uint8ClampedArray.from(this.#toByteArray(options));
  }

  /**
   * Returns the RGB expressed as a string contains hexadecimal formatted bytes.
   *
   * @param options - An options object.
   * @returns A RGB(A) byte sequence or the ARGB byte sequence.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const hex = color.toHexString();
   * // hex
   * //   → "#112233FF" // RGBA
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const hex = color.toHexString({ discardAlpha: true });
   * // hex
   * //   → "#112233" // RGB
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const hex = color.toHexString({ order: "argb" });
   * // hex
   * //   → "#FF112233" // ARGB
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#112233");
   * const hex = color.toHexString({ order: "argb", discardAlpha: true });
   * // hex
   * //   → "#FF112233" // ARGB
   * //   If the `order` is "argb", the `discardAlpha` and `omitAlphaIfOpaque` are ignored.
   * ```
   */
  toHexString(options?: ToHexStringOptions): string {
    const lowerCase = options?.lowerCase === true;

    const bytes = ByteSequence.fromArrayBufferView(this.toUint8Array(options));
    const hexString = bytes.format({ lowerCase });

    if (
      (options?.order === RgbBytes.Order.RGBA) &&
      (_isRequiredAlpha(this.#a, options) !== true)
    ) {
      return "#" + hexString.substring(0, 6);
    }
    return "#" + hexString;
  }

  /**
   * Equivalents to the `toHexString` method with no parameters.
   *
   * @returns
   */
  toString(): string {
    return this.toHexString();
  }

  toJSON(): Rgb.Normalized & { a: Color.Alpha } {
    return this.toRgb({
      mode: "precision",
    }) as (Rgb.Normalized & { a: Color.Alpha });
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

// namespace RgbColor {
type FromRgbOptions = _RgbOptions & Color.FromOptions;

type ToRgbOptions = _RgbOptions & Color.ToOptions;

type FromHslOptions = Color.FromOptions;

type FromHwbOptions = Color.FromOptions;

type FromHexStringOptions = RgbOrderOptions & Color.FromOptions;

// }

export { RgbColor };
