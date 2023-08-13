import { ByteSequence, Uint8, type uint8 } from "../deps.ts";
import {
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type Rgb,
  type RgbBytes,
  type rgbcomponent,
  type saturation,
} from "./color.ts";

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

function _normalizeRgb(value: unknown): Rgb {
  let srcR = 0;
  let srcG = 0;
  let srcB = 0;
  if (value && (typeof value === "object")) {
    srcR = (("r" in value) && Number.isFinite(value.r))
      ? (value.r as number)
      : 0;
    srcG = (("g" in value) && Number.isFinite(value.g))
      ? (value.g as number)
      : 0;
    srcB = (("b" in value) && Number.isFinite(value.b))
      ? (value.b as number)
      : 0;
  }

  return {
    r: _clamp(srcR, 0, 1),
    g: _clamp(srcG, 0, 1),
    b: _clamp(srcB, 0, 1),
  };
}

function _normalizeRgbBytes(value: unknown): RgbBytes {
  let srcRByte = 0;
  let srcGByte = 0;
  let srcBByte = 0;
  if (value && (typeof value === "object")) {
    srcRByte = (("r" in value) && Number.isFinite(value.r))
      ? (value.r as number)
      : 0;
    srcGByte = (("g" in value) && Number.isFinite(value.g))
      ? (value.g as number)
      : 0;
    srcBByte = (("b" in value) && Number.isFinite(value.b))
      ? (value.b as number)
      : 0;
  }
  //const [r, g, b] = Uint8ClampedArray.of(srcRByte, srcGByte, srcBByte);
  return {
    r: _clamp(Math.round(srcRByte), Uint8.MIN_VALUE, Uint8.MAX_VALUE),
    g: _clamp(Math.round(srcGByte), Uint8.MIN_VALUE, Uint8.MAX_VALUE),
    b: _clamp(Math.round(srcBByte), Uint8.MIN_VALUE, Uint8.MAX_VALUE),
  } as RgbBytes;
}

function _normalizeHue(h: number): number {
  const t = h % 360;
  return (t < 0) ? (t + 360) : t;
}

function _f(n: number, { h, s, l }: Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

function _hslToRgb({ h, s, l }: Hsl): Rgb {
  const normalizedHsl = {
    h: _normalizeHue(h),
    s,
    l,
  };

  return {
    r: _f(0, normalizedHsl),
    g: _f(8, normalizedHsl),
    b: _f(4, normalizedHsl),
  };
}

function _rgbToUint8ClampedArray({ r, g, b }: Rgb): Uint8ClampedArray {
  return Uint8ClampedArray.of(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  );
}

function _uint8ClampedArrayToRgbBytes([r, g, b]: Uint8ClampedArray): RgbBytes {
  return {
    r,
    g,
    b,
  } as RgbBytes;
}

function _rgbToHsl({ r, g, b }: Rgb): Hsl {
  const maxRgb = Math.max(r, g, b);
  const minRgb = Math.min(r, g, b);

  const d = maxRgb - minRgb;

  let h = 0;
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
    h = _normalizeHue(h * 60);
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

type _HexStringOptions = {
  shorten?: boolean;
  upperCase?: boolean;
};

/**
 * RGBA color in sRGB color space
 */
class SRgbColor implements Rgb {
  readonly #r: rgbcomponent;
  readonly #g: rgbcomponent;
  readonly #b: rgbcomponent;
  #bytes: Uint8ClampedArray;
  #rgbBytes: RgbBytes;
  #hsl: Hsl;

  private constructor(r: rgbcomponent, g: rgbcomponent, b: rgbcomponent) {
    const normalizedRgb = _normalizeRgb({ r, g, b });
    this.#r = normalizedRgb.r;
    this.#g = normalizedRgb.g;
    this.#b = normalizedRgb.b;

    this.#bytes = _rgbToUint8ClampedArray(normalizedRgb);
    this.#rgbBytes = _uint8ClampedArrayToRgbBytes(this.#bytes);
    this.#hsl = _rgbToHsl(normalizedRgb);

    Object.freeze(this);
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

  get rByte(): uint8 {
    return this.#rgbBytes.r;
  }

  get gByte(): uint8 {
    return this.#rgbBytes.g;
  }

  get bByte(): uint8 {
    return this.#rgbBytes.b;
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

  static #fromRgbBytesObject(
    rgbBytes: { r: number; g: number; b: number },
  ): SRgbColor {
    const { r: rByte, g: gByte, b: bByte } = _normalizeRgbBytes(rgbBytes);
    const r = rByte / 255;
    const g = gByte / 255;
    const b = bByte / 255;
    return new SRgbColor(r, g, b);
  }

  // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
  static #fromRgbByteArray(rgbBytes: Iterable<number>): SRgbColor {
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

      return SRgbColor.fromRgbBytes({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
      });
    }
    throw new TypeError("rgbBytes");
  }

  static fromRgbBytes(
    rgbBytes: { r: number; g: number; b: number } | Iterable<number>,
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

    return SRgbColor.#fromRgbByteArray(
      ByteSequence.parse(rrggbb, { lowerCase: true }).getUint8View(),
    );
  }

  static fromHsl(hsl: Hsl): SRgbColor {
    const { r, g, b } = _hslToRgb(hsl);
    return new SRgbColor(r, g, b);
  }

  toUint8ClampedArray(): Uint8ClampedArray {
    return this.#bytes.slice(0);
  }

  toRgbBytes(): RgbBytes {
    return Object.assign({}, this.#rgbBytes);
  }

  toHexString(options?: _HexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const rrggbb: string = ByteSequence.fromArrayBufferView(
      this.toUint8ClampedArray(),
    ).format({ lowerCase });

    const shorten = (options?.shorten === true) &&
      /^(?:([0-9a-fA-F])\1)+$/.test(rrggbb);

    if (shorten === true) {
      return "#" +
        [...rrggbb].reduce((s, c, i) => (i % 2 === 0) ? (s + c) : s, "");
    }
    return "#" + rrggbb;
  }

  toString(): string {
    return this.toHexString();
  }

  //XXX toJSON

  //XXX equals
  //XXX clone
  //XXX mix(blendMode, other: SrgbColor | *)

  toHsl(): Hsl {
    return Object.assign({}, this.#hsl);
  }

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
