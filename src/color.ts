import {
  type uint8,
  ByteSequence,
  Uint8,
} from "../deps.ts";
import {
  type hsl_l,
  type hsl_s,
  type hue,
} from "./base.ts";

type _24BitRgbBytes = {
  r: uint8;
  g: uint8;
  b: uint8;
};

function _normalize24BitRgb(value: unknown): _24BitRgbBytes {
  let srcR = 0;
  let srcG = 0;
  let srcB = 0;
  if (value && (typeof value === "object")) {
    srcR = (("r" in value) && Number.isFinite(value.r)) ? (value.r as number) : 0;
    srcG = (("g" in value) && Number.isFinite(value.g)) ? (value.g as number) : 0;
    srcB = (("b" in value) && Number.isFinite(value.b)) ? (value.b as number) : 0;
  }
  const [r, g, b] = [...Uint8ClampedArray.of(srcR, srcG, srcB)] as [uint8, uint8, uint8];
  return { r, g, b };
}

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

type _HexStringOptions = {
  shorten?: boolean;
  upperCase?: boolean;
};

namespace Color {
  export type _24BitRgb = {
    r: number;
    g: number;
    b: number;
  };

  export type Rgb = {
    r: number;
    g: number;
    b: number;
  };

  export type Hsl = {
    h: hue;
    s: hsl_s;
    l: hsl_l;
  };

  /**
   * RGBA color in sRGB color space
   */
  export class SRgb {
    #r: number;
    #g: number;
    #b: number;

    private constructor(r: number, g: number, b: number) {
      this.#r = r;
      this.#g = g;
      this.#b = b;
      Object.seal(this);
    }

    // /**
    //  * The red component value.
    //  */
    // get r(): number {
    //   return this.#r;
    // }

    // /**
    //  * The green component value.
    //  */
    // get g(): number {
    //   return this.#g;
    // }

    // /**
    //  * The blue component value.
    //  */
    // get b(): number {
    //   return this.#b;
    // }

    static from24BitRgb(rgbBytes: _24BitRgb): SRgb {
      const { r: rByte, g: gByte, b: bByte } = _normalize24BitRgb(rgbBytes);
      const r = _clamp((rByte / 255), 0, 1);
      const g = _clamp((gByte / 255), 0, 1);
      const b = _clamp((bByte / 255), 0, 1);
      return new SRgb(r, g, b);
    }

    // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
    static fromRgbBytes(rgbBytes: Iterable<number>): SRgb {
      if (rgbBytes[Symbol.iterator]) {
        const bytes: [number, number, number] = [0, 0, 0];

        let i = 0;
        for (const byte of rgbBytes) {
          if (i >= 3) {
            break;
          }

          bytes[i] = byte;

          i = i + 1;
        }

        const [rByte, gByte, bByte] = bytes;
        return SRgb.from24BitRgb({
          r: rByte,
          g: gByte,
          b: bByte,
        });
      }
      throw new TypeError("rgbBytes");
    }

    toUint8ClampedArray(): Uint8ClampedArray {
      return Uint8ClampedArray.of(
        this.#r * 255,
        this.#g * 255,
        this.#b * 255,
      );
    }

    to24BitRgb(): _24BitRgb {
      const [r, g, b] = this.toUint8ClampedArray();
      return {
        r,
        g,
        b,
      };
    }

    toHexString(options?: _HexStringOptions): string {
      const lowerCase = (options?.upperCase !== true);

      const rrggbb: string = ByteSequence.fromArrayBufferView(
        this.toUint8ClampedArray(),
      ).format({ lowerCase });

      const shorten = (options?.shorten === true) &&
        /^(?:([0-9a-fA-F])\1)+$/.test(rrggbb);

      if (shorten === true) {
        return "#" + [...rrggbb].reduce((s, c, i) => (i % 2 === 0) ? (s + c) : s, "");
      }
      return "#" + rrggbb;
    }

    toString(): string {
      return this.toHexString();
    }






  }

}
Object.freeze(Color);

export {
  Color,
};
