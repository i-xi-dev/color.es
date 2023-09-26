import { ByteSequence, Uint8 } from "../deps.ts";
import { Convert } from "./convert.ts";
import { ColorSpace } from "./color_space.ts";
import { Alpha } from "./color/alpha.ts";
import { Hue } from "./color/hue.ts";
import { Rgb } from "./rgb/rgb.ts";
import { RgbBytes } from "./rgb/rgb_bytes.ts";
import { Hsl } from "./rgb/hsl.ts";
import { Hwb } from "./rgb/hwb.ts";

function _isRequiredAlpha(
  alpha: Alpha,
  options?: Convert.ToOptions,
): boolean {
  if (options?.discardAlpha === true) {
    return false;
  }
  if (
    (options?.omitAlphaIfOpaque === true) && (alpha === Alpha.MAX_VALUE)
  ) {
    return false;
  }
  return true;
}

/**
 * A color represented by red, green, and blue channels
 */
class RgbColor {
  readonly #space: ColorSpace;
  readonly #r: Rgb.Component;
  readonly #g: Rgb.Component;
  readonly #b: Rgb.Component;
  readonly #a: Alpha;

  #rgbBytesCache?: RgbBytes.Normalized;
  #alphaByteCache?: Uint8;
  #hslCache?: Hsl.Normalized;
  #hwbCache?: Hwb.Normalized;

  private constructor(
    r: Rgb.Component,
    g: Rgb.Component,
    b: Rgb.Component,
    a: Alpha,
  ) {
    this.#space = ColorSpace.SRGB; //XXX 現バージョンでは固定とする
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
  get space(): ColorSpace {
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
  get alpha(): Alpha {
    return this.#a;
  }

  get hue(): Hue {
    return this.#hsl.h;
  }

  get saturation(): Hsl.Saturation {
    return this.#hsl.s;
  }

  get lightness(): Hsl.Lightness {
    return this.#hsl.l;
  }

  get whiteness(): Hwb.Whiteness {
    return this.#hwb.w;
  }

  get blackness(): Hwb.Blackness {
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

  get #hsl(): Hsl.Normalized {
    if (!this.#hslCache) {
      this.#hslCache = Hsl.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#hslCache };
  }

  get #hwb(): Hwb.Normalized {
    if (!this.#hwbCache) {
      this.#hwbCache = Hwb.fromRgb({
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
  static fromRgb(rgba: Rgb, options?: Convert.FromRgbOptions): RgbColor {
    // sRGB固定

    if (options?.mode === "precision") {
      const { r, g, b } = Rgb.normalize(rgba);
      const a = (options?.ignoreAlpha === true)
        ? Alpha.MAX_VALUE
        : Alpha.normalize(rgba.a);
      return new RgbColor(r, g, b, a);
    } else {
      const { r, g, b } = RgbBytes.toRgb(rgba);
      let a: number = Alpha.MAX_VALUE;
      if (options?.ignoreAlpha !== true) {
        if (options?.mode === "bytes") {
          if (Number.isFinite(rgba.a)) {
            a = Uint8.clamp(rgba.a) / Uint8.MAX_VALUE;
          }
        } else {
          a = Alpha.normalize(rgba.a);
        }
      }
      return new RgbColor(r, g, b, a);
    }
  }

  static fromHsl(hsla: Hsl, options?: Convert.FromOptions): RgbColor {
    const { r, g, b } = Hsl.toRgb(hsla);
    const a = (options?.ignoreAlpha === true)
      ? Alpha.MAX_VALUE
      : Alpha.normalize(hsla.a);
    return new RgbColor(r, g, b, a);
  }

  static fromHwb(hwba: Hwb, options?: Convert.FromOptions): RgbColor {
    const { r, g, b } = Hwb.toRgb(hwba);
    const a = (options?.ignoreAlpha === true)
      ? Alpha.MAX_VALUE
      : Alpha.normalize(hwba.a);
    return new RgbColor(r, g, b, a);
  }

  static fromUint8Array(
    rgbaBytes: Uint8Array | Uint8ClampedArray,
    options?: Convert.FromArrayOptions,
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
    options?: Convert.FromHexStringOptions,
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

  toRgb(options?: Convert.ToRgbOptions): Rgb {
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
  toHsl(options?: Convert.ToOptions): Hsl {
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
  toHwb(options?: Convert.ToOptions): Hwb {
    const { h, w, b } = this.#hwb;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, w, b, a: this.#a };
    }
    return { h, w, b };
  }

  #toByteArray(
    options?: Convert.ToArrayOptions,
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
  toUint8Array(options?: Convert.ToArrayOptions): Uint8Array {
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
  toUint8ClampedArray(options?: Convert.ToArrayOptions): Uint8ClampedArray {
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
  toHexString(options?: Convert.ToHexStringOptions): string {
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

  toJSON(): Rgb.Normalized & { a: Alpha } {
    return this.toRgb({
      mode: "precision",
    }) as (Rgb.Normalized & { a: Alpha });
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
      Alpha.normalize(this.#a + relativeAlpha),
    );
  }

  withAlpha(absoluteAlpha: number): RgbColor {
    return new RgbColor(
      this.#r,
      this.#g,
      this.#b,
      Alpha.normalize(absoluteAlpha),
    );
  }

  withoutAlpha(): RgbColor {
    return new RgbColor(this.#r, this.#g, this.#b, Alpha.MAX_VALUE);
  }
}

export { RgbColor };
