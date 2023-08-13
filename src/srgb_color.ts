import { ByteSequence, Uint8, type uint8 } from "../deps.ts";
import {
  type alpha,
  type Hsl,
  type hue,
  type Hwb,
  type lightness,
  type Rgb,
  type rgbcomponent,
  type saturation,
} from "./color.ts";

function _clamp(c: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, c));
}

function _normalizeRgbComponent(value: unknown): rgbcomponent {
  if (Number.isFinite(value)) {
    return _clamp(value as number, 0, 1);
  }
  return 0;
}

function _normalizeAlpha(value: unknown): alpha {
  if (Number.isFinite(value)) {
    return _clamp(value as number, 0, 1);
  }
  return 1;
}

type NormalizedRgb = {
  r: rgbcomponent;
  g: rgbcomponent;
  b: rgbcomponent;
  a: alpha;
};

function _normalizeRgb(value: unknown): NormalizedRgb {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;
  if (value && (typeof value === "object")) {
    if ("r" in value) {
      r = _normalizeRgbComponent(value.r);
    }
    if ("g" in value) {
      g = _normalizeRgbComponent(value.g);
    }
    if ("b" in value) {
      b = _normalizeRgbComponent(value.b);
    }
    if ("a" in value) {
      a = _normalizeAlpha(value.a);
    }
  }
  return {
    r,
    g,
    b,
    a,
  };
}

function _normalizeRgbByte(value: unknown): uint8 {
  if (Number.isFinite(value)) {
    return _clamp(
      Math.round(value as number),
      Uint8.MIN_VALUE,
      Uint8.MAX_VALUE,
    ) as uint8;
  }
  return Uint8.MIN_VALUE;
}

function _normalizeAlphaByte(value: unknown): uint8 {
  if (Number.isFinite(value)) {
    return _clamp(
      Math.round(value as number),
      Uint8.MIN_VALUE,
      Uint8.MAX_VALUE,
    ) as uint8;
  }
  return Uint8.MAX_VALUE;
}

type NormalizedRgbBytes = {
  r: uint8;
  g: uint8;
  b: uint8;
  a: uint8;
};

function _normalizeRgbBytes(value: unknown): NormalizedRgbBytes {
  let rByte: uint8 = Uint8.MIN_VALUE;
  let gByte: uint8 = Uint8.MIN_VALUE;
  let bByte: uint8 = Uint8.MIN_VALUE;
  let aByte: uint8 = Uint8.MAX_VALUE;
  if (value && (typeof value === "object")) {
    if ("r" in value) {
      rByte = _normalizeRgbByte(value.r);
    }
    if ("g" in value) {
      gByte = _normalizeRgbByte(value.g);
    }
    if ("b" in value) {
      bByte = _normalizeRgbByte(value.b);
    }
    if ("a" in value) {
      aByte = _normalizeAlphaByte(value.a);
    }
  }
  return {
    r: rByte,
    g: gByte,
    b: bByte,
    a: aByte,
  };
}

type NormalizedHsl = {
  h: hue;
  s: saturation;
  l: lightness;
  a: alpha;
};

function _normalizeHsl(value: unknown): NormalizedHsl {
  let h = 0;
  let s = 0;
  let l = 0;
  let a = 1;
  if (value && (typeof value === "object")) {
    if ("h" in value) {
      h = _normalizeHue(value.h);
    }
    if ("s" in value) {
      s = _normalizeSaturation(value.s);
    }
    if ("l" in value) {
      l = _normalizeLightness(value.l);
    }
    if ("a" in value) {
      a = _normalizeAlpha(value.a);
    }
  }
  return {
    h,
    s,
    l,
    a,
  };
}

function _normalizeHue(value: unknown): hue {
  if (Number.isFinite(value)) {
    const t = (value as number) % 360;
    return (t < 0) ? (t + 360) : t;
  }
  return 0;
}

function _normalizeSaturation(value: unknown): saturation {
  if (Number.isFinite(value)) {
    return _clamp(value as number, 0, 1);
  }
  return 0;
}

function _normalizeLightness(value: unknown): lightness {
  if (Number.isFinite(value)) {
    return _clamp(value as number, 0, 1);
  }
  return 0;
}

function _f(n: number, { h, s, l }: Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

function _hslToRgb(normalizedHsl: NormalizedHsl): NormalizedRgb {
  return {
    r: _f(0, normalizedHsl),
    g: _f(8, normalizedHsl),
    b: _f(4, normalizedHsl),
    a: normalizedHsl.a,
  };
}

function _rgbToUint8ClampedArray(
  { r, g, b, a }: NormalizedRgb,
): Uint8ClampedArray {
  return Uint8ClampedArray.of(
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
    Math.round(a * 255),
  );
}

function _uint8ClampedArrayToRgbBytes(
  [r, g, b, a]: Uint8ClampedArray,
): NormalizedRgbBytes {
  return {
    r,
    g,
    b,
    a,
  } as NormalizedRgbBytes;
}

function _rgbToHsl({ r, g, b, a }: NormalizedRgb): NormalizedHsl {
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
  return { h, s, l, a };
}

type _HexStringOptions = {
  omitAlphaIfOpaque?: boolean;
  shorten?: boolean;
  upperCase?: boolean;
};

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

  //XXX options追加 lengthを3にするか4にするか
  toUint8ClampedArray(): Uint8ClampedArray {
    return this.#bytes.slice(0);
  }

  //XXX options追加 lengthを3にするか4にするか
  toUint8Array(): Uint8Array {
    return Uint8Array.from(this.#bytes);
  }

  //XXX options追加 aを省くか
  toRgbBytes(): NormalizedRgbBytes {
    return Object.assign({}, this.#rgbBytes);
  }

  toHexString(options?: _HexStringOptions): string {
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
