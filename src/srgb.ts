import { ByteSequence, Uint8, type uint8 } from "../deps.ts";
import {
  type alpha,
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type NormalizedHsl,
  type NormalizedRgb,
  type NormalizedRgbBytes,
  type Rgb,
  type RgbBytes,
  type rgbcomponent,
  type saturation,
} from "./types.ts";

import {
  _hslToRgb,
  _normalizeHsl,
  _normalizeRgb,
  _normalizeRgbBytes,
  _rgbToHsl,
  _rgbToUint8ClampedArray,
  _uint8ClampedArrayToRgbBytes,
} from "./utils.ts";

namespace SRgb {
  export namespace Color {
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
  export class Color {
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
    get red(): rgbcomponent {
      return this.#rgb.r;
    }

    /**
     * The green component value.
     */
    get green(): rgbcomponent {
      return this.#rgb.g;
    }

    /**
     * The blue component value.
     */
    get blue(): rgbcomponent {
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

    static fromRgb(rgb: Rgb): Color {
      const { r, g, b, a } = _normalizeRgb(rgb);
      return new Color(r, g, b, a);
    }

    static #fromRgbBytesObject(
      rgbBytes: { r: number; g: number; b: number; a?: number },
    ): Color {
      const { r: rByte, g: gByte, b: bByte, a: aByte } = _normalizeRgbBytes(
        rgbBytes,
      );
      const r = rByte / 255;
      const g = gByte / 255;
      const b = bByte / 255;
      const a = aByte / 255;
      return new Color(r, g, b, a);
    }

    // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
    static #fromRgbByteArray(rgbBytes: Iterable<number>): Color {
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

        return Color.#fromRgbBytesObject({
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
    ): Color {
      if (rgbBytes) {
        if (
          (rgbBytes instanceof Uint8Array) ||
          (rgbBytes instanceof Uint8ClampedArray)
        ) {
          return Color.#fromRgbByteArray(rgbBytes);
        }
        if (Symbol.iterator in rgbBytes) {
          return Color.#fromRgbByteArray(rgbBytes);
        }
      }
      return Color.#fromRgbBytesObject(rgbBytes);
    }

    static fromHexString(input: string): Color {
      if (typeof input !== "string") {
        throw new TypeError("input");
      }
      if (
        /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(input) !== true
      ) {
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

      return Color.#fromRgbByteArray(
        ByteSequence.parse(rrggbb + aa, { lowerCase: true }).getUint8View(),
      );
    }

    static fromHsl(hsl: Hsl): Color {
      const { r, g, b, a } = _hslToRgb(_normalizeHsl(hsl));
      return new Color(r, g, b, a);
    }

    toUint8ClampedArray(options?: Color.ToOptions): Uint8ClampedArray {
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return this.#bytes.slice(0, 3);
      }
      return this.#bytes.slice(0);
    }

    toUint8Array(options?: Color.ToOptions): Uint8Array {
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return Uint8Array.from(this.#bytes.subarray(0, 3));
      }
      return Uint8Array.from(this.#bytes);
    }

    toRgb(options?: Color.ToOptions): Rgb {
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return {
          r: this.#rgb.r,
          g: this.#rgb.g,
          b: this.#rgb.b,
        };
      }
      return {
        r: this.#rgb.r,
        g: this.#rgb.g,
        b: this.#rgb.b,
        a: this.#rgb.a,
      };
    }

    toRgbBytes(options?: Color.ToOptions): RgbBytes {
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return {
          r: this.#rgbBytes.r,
          g: this.#rgbBytes.g,
          b: this.#rgbBytes.b,
        };
      }
      return {
        r: this.#rgbBytes.r,
        g: this.#rgbBytes.g,
        b: this.#rgbBytes.b,
        a: this.#rgbBytes.a,
      };
    }

    toHexString(options?: Color.ToHexStringOptions): string {
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

    toHsl(options?: Color.ToOptions): Hsl {
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return {
          h: this.#hsl.h,
          s: this.#hsl.s,
          l: this.#hsl.l,
        };
      }
      return {
        h: this.#hsl.h,
        s: this.#hsl.s,
        l: this.#hsl.l,
        a: this.#hsl.a,
      };
    }

    toString(): string {
      return this.toHexString({
        omitAlphaIfOpaque: true,
        upperCase: true,
      });
    }

    toJSON(): NormalizedRgb {
      return this.toRgb() as NormalizedRgb;
    }

    //XXX
    // equals(rgb: Rgb | Color): boolean {
    //   if (rgb instanceof Color) {
    //     return (this.red === rgb.red) && (this.green === rgb.green) && (this.blue === rgb.blue) && (this.alpha === rgb.alpha);
    //   }
    //   else  {

    //   }
    // }

    //XXX bytesEquals

    //XXX clone

    //XXX discardAlpha

    //XXX withHue,plusHue

    //XXX withSaturation,plusSaturation

    //XXX withLightness,plusLightness

    //XXX mix(blendMode, other: Color | *)
  }
}

export { SRgb };
