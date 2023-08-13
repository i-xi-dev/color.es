import { ByteSequence, Uint8, type uint8 } from "../deps.ts";
import {
  _hslToRgb,
  _normalizeHsl,
  _normalizeRgb,
  _normalizeRgbBytes,
  _rgbToHsl,
  _rgbToUint8ClampedArray,
  _uint8ClampedArrayToRgbBytes,
  type alpha,
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type NormalizedHsl,
  type NormalizedRgb,
  type NormalizedRgbBytes,
  type rgbcomponent,
  type saturation,
} from "./color.ts";

namespace SRgbColor {
  export type ToOptions = {
    omitAlphaIfOpaque?: boolean;
  };
  
  export type ToHexStringOptions = ToOptions & {
    shorten?: boolean;
    upperCase?: boolean;
  };
}

/**
 * RGBA color in sRGB color space
 */
class SRgbColor {
  readonly #rgb: NormalizedRgb;
  readonly #bytes: Uint8ClampedArray;
  readonly #rgbBytes: NormalizedRgbBytes;
  readonly #hsl: NormalizedHsl;

  private constructor(
    r: rgbcomponent,
    g: rgbcomponent,
    b: rgbcomponent,
    a: alpha,
  ) {
    this.#rgb = Object.freeze(_normalizeRgb({ r, g, b, a }));
    this.#bytes = _rgbToUint8ClampedArray(this.#rgb);
    this.#rgbBytes = Object.freeze(_uint8ClampedArrayToRgbBytes(this.#bytes));
    this.#hsl = Object.freeze(_rgbToHsl(this.#rgb));
    Object.freeze(this);
  }

  /**
   * The red component value.
   */
  get r(): rgbcomponent {
    return this.#rgb.r;
  }

  /**
   * The green component value.
   */
  get g(): rgbcomponent {
    return this.#rgb.g;
  }

  /**
   * The blue component value.
   */
  get b(): rgbcomponent {
    return this.#rgb.b;
  }

  get alpha(): alpha {
    return this.#rgb.a;
  }

  get rByte(): uint8 {
    return this.#rgbBytes.r;
  }

  get gByte(): uint8 {
    return this.#rgbBytes.g;
  }

  get bByte(): uint8 {
    return this.#rgbBytes.b;
  }

  get aByte(): uint8 {
    return this.#rgbBytes.a;
  }

  get hue(): hue {
    return this.#hsl.h;
  }

  get saturation(): saturation {
    return this.#hsl.s;
  }

  get lightness(): lightness {
    return this.#hsl.l;
  }

  //XXX w, b

  //XXX fromRgb

  static #fromRgbBytesObject(
    rgbBytes: { r: number; g: number; b: number; a?: number },
  ): SRgbColor {
    const { r: rByte, g: gByte, b: bByte, a: aByte } = _normalizeRgbBytes(
      rgbBytes,
    );
    const r = rByte / 255;
    const g = gByte / 255;
    const b = bByte / 255;
    const a = aByte / 255;
    return new SRgbColor(r, g, b, a);
  }

  // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
  static #fromRgbByteArray(rgbBytes: Iterable<number>): SRgbColor {
    if (rgbBytes[Symbol.iterator]) {
      const bytes: [number, number, number, number] = [
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MAX_VALUE,
      ];

      let i = 0;
      for (const byte of rgbBytes) {
        if (i >= 4) {
          break;
        }

        bytes[i] = byte;

        i = i + 1;
      }

      return SRgbColor.#fromRgbBytesObject({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
        a: bytes[3],
      });
    }
    throw new TypeError("rgbBytes");
  }

  static fromRgbBytes(
    rgbBytes:
      | { r: number; g: number; b: number; a?: number }
      | Iterable<number>,
  ): SRgbColor {
    if (rgbBytes) {
      if (
        (rgbBytes instanceof Uint8Array) ||
        (rgbBytes instanceof Uint8ClampedArray)
      ) {
        return SRgbColor.#fromRgbByteArray(rgbBytes);
      }
      if (Symbol.iterator in rgbBytes) {
        return SRgbColor.#fromRgbByteArray(rgbBytes);
      }
    }
    return SRgbColor.#fromRgbBytesObject(rgbBytes);
  }

  static fromHexString(input: string): SRgbColor {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(input) !== true) {
      throw new RangeError("input");
    }

    const inputHex = input.substring(1);
    let rrggbb: string;
    let aa: string;
    switch (inputHex.length) {
      case 8:
        rrggbb = inputHex.substring(0, 6);
        aa = inputHex.substring(6, 8);
        break;

      case 6:
        rrggbb = inputHex.substring(0, 6);
        aa = "ff";
        break;

      case 4:
        rrggbb = [...inputHex].map((h, index) => {
          return (index <= 2) ? h.repeat(2) : "";
        }).join("");
        aa = inputHex.substring(3, 4).repeat(2);
        break;

      // case 3:
      default:
        rrggbb = [...inputHex].map((h, index) => {
          return (index <= 2) ? h.repeat(2) : "";
        }).join("");
        aa = "ff";
        break;
    }
    rrggbb = rrggbb.toLowerCase();
    aa = aa.toLowerCase();

    return SRgbColor.#fromRgbByteArray(
      ByteSequence.parse(rrggbb + aa, { lowerCase: true }).getUint8View(),
    );
  }

  static fromHsl(hsl: Hsl): SRgbColor {
    const { r, g, b, a } = _hslToRgb(_normalizeHsl(hsl));
    return new SRgbColor(r, g, b, a);
  }

  toUint8ClampedArray(options?: SRgbColor.ToOptions): Uint8ClampedArray {
    if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
      return this.#bytes.slice(0, 3);
    }
    return this.#bytes.slice(0);
  }

  toUint8Array(options?: SRgbColor.ToOptions): Uint8Array {
    if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
      return Uint8Array.from(this.#bytes.subarray(0, 3));
    }
    return Uint8Array.from(this.#bytes);
  }

  //XXX toRgb

  //XXX options追加 aを省くか
  toRgbBytes(): NormalizedRgbBytes {
    return Object.assign({}, this.#rgbBytes);
  }

  toHexString(options?: SRgbColor.ToHexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const bytes = this.toUint8ClampedArray();
    const rrggbbaa: string = ByteSequence.fromArrayBufferView(
      bytes,
    ).format({ lowerCase });

    let rrggbbaaOrRrggbb = rrggbbaa;
    if (options?.omitAlphaIfOpaque === true) {
      if (bytes[3] === Uint8.MAX_VALUE) {
        rrggbbaaOrRrggbb = rrggbbaaOrRrggbb.substring(0, 6);
      }
    }

    if (options?.shorten === true) {
      if (/^(?:([0-9a-fA-F])\1)+$/.test(rrggbbaaOrRrggbb)) {
        return "#" +
          [...rrggbbaaOrRrggbb].reduce(
            (s, c, i) => (i % 2 === 0) ? (s + c) : s,
            "",
          );
      }
    }

    return "#" + rrggbbaaOrRrggbb;
  }

  toString(): string {
    return this.toHexString({
      omitAlphaIfOpaque: true,
      upperCase: true,
    });
  }

  toHsl(): NormalizedHsl {
    return Object.assign({}, this.#hsl);
  }

  /*




TODO alpha

  */

  //XXX toJSON

  //XXX equals
  //XXX clone
  //XXX mix(blendMode, other: SrgbColor | *)
  //XXX discardAlpha

  // withHue(absoluteHue: number): SRgbColor {
  //   if (Number.isFinite(absoluteHue) !== true) {
  //     throw new TypeError("absoluteHue");
  //   }

  //   const { r, g, b } = _hslToRgb({ h: absoluteHue, s: this.#s, l: this.#l });
  //   return new SRgbColor(r, g, b);
  // }

  // xxxHue(relativeHue: number): SRgbColor {

  // withLightness(absoluteLightness: number): SRgbColor {
  //   if (Number.isFinite(absoluteLightness) !== true) {
  //     throw new TypeError("absoluteLightness");
  //   }

  //   const { r, g, b } = _hslToRgb({
  //     h: this.#h,
  //     s: this.#s,
  //     l: absoluteLightness,
  //   });
  //   return new SRgbColor(r, g, b);
  // }

  // xxxLightness(relativeLightness: number): SRgbColor {

  // withSaturation(absoluteSaturation: number): SRgbColor {
  //   if (Number.isFinite(absoluteSaturation) !== true) {
  //     throw new TypeError("absoluteSaturation");
  //   }

  //   const { r, g, b } = _hslToRgb({
  //     h: this.#h,
  //     s: absoluteSaturation,
  //     l: this.#l,
  //   });
  //   return new SRgbColor(r, g, b);
  // }
}

export { SRgbColor };
