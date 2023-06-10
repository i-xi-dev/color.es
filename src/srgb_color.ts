import {
  type uint8,
  ByteSequence,
  Uint8,
} from "../deps.ts";
import {
  type Hsl,
  type Hwb,
  type Rgb,
  type Rgb24Bit,
  type rgbcomponent,
} from "./color.ts";

function _normalizeRgb24Bit(value: unknown): Rgb24Bit {
  let srcR = 0;
  let srcG = 0;
  let srcB = 0;
  if (value && (typeof value === "object")) {
    srcR = (("r" in value) && Number.isFinite(value.r)) ? (value.r as number) : 0;
    srcG = (("g" in value) && Number.isFinite(value.g)) ? (value.g as number) : 0;
    srcB = (("b" in value) && Number.isFinite(value.b)) ? (value.b as number) : 0;
  }
  const [r, g, b] = Uint8ClampedArray.of(srcR, srcG, srcB);
  return { r, g, b } as Rgb24Bit;
}

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

function _normalizeHue(h: number): number {
  const t = h % 360;
  return (t < 0) ? (t + 360) : t;
} 

function _hslToRgb({ h, s, l }: Hsl): Rgb {
  const normalizedH = _normalizeHue(h);

}

function _rgbToHsl({ r, g, b }: Rgb): Hsl {
  const maxRgb = Math.max(r, g, b);
  const minRgb = Math.min(r, g, b);

  const d = maxRgb - minRgb;

  let h = 0;
  if (d !== 0) {
    switch (maxRgb) {
      case r:
        h = ((g - b) / d);
        break;

      case g:
        h = ((b - r) / d) + 2;
        break;

      // case b:
      default:
        h = ((r - g) / d) + 4;
        break;
    }
    h = _normalizeHue(h * 60);
  }

  const l = (minRgb + maxRgb) / 2;

  let s = 0;
  if ((d !== 0) && (l !== 0) && (l !== 1)) {
    s = (maxRgb - l) / Math.min(l, 1 - l);
  }

  return { h, s, l };
}

type _HexStringOptions = {
  shorten?: boolean;
  upperCase?: boolean;
};

/**
 * RGBA color in sRGB color space
 */
class SRgbColor implements Rgb {
  #r: rgbcomponent;
  #g: rgbcomponent;
  #b: rgbcomponent;

  private constructor(r: rgbcomponent, g: rgbcomponent, b: rgbcomponent) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    Object.seal(this);
  }

  /**
   * The red component value.
   */
  get r(): rgbcomponent {
    return this.#r;
  }

  /**
   * The green component value.
   */
  get g(): rgbcomponent {
    return this.#g;
  }

  /**
   * The blue component value.
   */
  get b(): rgbcomponent {
    return this.#b;
  }

  //XXX h, s, l, w, b

  static fromRgb24Bit(rgbBytes: { r: number, g: number, b: number }): SRgbColor {
    const { r: rByte, g: gByte, b: bByte } = _normalizeRgb24Bit(rgbBytes);
    const r = (rByte / 255);
    const g = (gByte / 255);
    const b = (bByte / 255);
    return new SRgbColor(r, g, b);
  }

  // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
  static fromRgbBytes(rgbBytes: Iterable<number>): SRgbColor {
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

      return SRgbColor.fromRgb24Bit({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
      });
    }
    throw new TypeError("rgbBytes");
  }

  static fromHexString(input: string): SRgbColor {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})?$/i.test(input) !== true) {
      throw new RangeError("input");
    }

    const inputHex = input.substring(1);
    let rrggbb: string;
    switch (inputHex.length) {
      case 8:
      case 6:
        rrggbb = inputHex.substring(0, 6);
        break;

      // case 4:
      // case 3:
      default:
        rrggbb = [...inputHex].map((h, index) => {
          return (index <= 2) ? h.repeat(2) : "";
        }).join("");
        break;
    }
    rrggbb = rrggbb.toLowerCase();

    return SRgbColor.fromRgbBytes(ByteSequence.parse(rrggbb, { lowerCase: true }).getUint8View());
  }

  toUint8ClampedArray(): Uint8ClampedArray {
    return Uint8ClampedArray.of(
      this.#r * 255,
      this.#g * 255,
      this.#b * 255,
    );
  }

  toRgb24Bit(): Rgb24Bit {
    const [r, g, b] = this.toUint8ClampedArray();
    return {
      r,
      g,
      b,
    } as Rgb24Bit;
  }

  toHexString(options?: _HexStringOptions): string {
    const lowerCase = (options?.upperCase !== true);

    const rrggbb: string = ByteSequence.fromArrayBufferView(this.toUint8ClampedArray()).format({ lowerCase });

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

  //XXX toJSON

  toHsl(): Hsl {
    return _rgbToHsl(this);
  }





}

export {
  SRgbColor,
};
