import { ByteSequence, NumberUtils, Uint8 } from "../deps.ts";
import { Color } from "./color.ts";

function _normalizeRgbByte(value: unknown): Uint8 {
  if (Number.isFinite(value)) {
    return Uint8.clamp(value as number);
  }
  return Uint8.MIN_VALUE;
}

function _normalizeAlphaByte(value: unknown): Uint8 {
  if (Number.isFinite(value)) {
    return Uint8.clamp(value as number);
  }
  return Uint8.MAX_VALUE;
}

function _f(n: number, { h, s, l }: SRgb.Hsl.Normalized): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

function _hslToRgb(normalizedHsl: SRgb.Hsl.Normalized): SRgb.Rgb.Normalized {
  return {
    r: _f(0, normalizedHsl),
    g: _f(8, normalizedHsl),
    b: _f(4, normalizedHsl),
    a: normalizedHsl.a,
  };
}

function _rgbToHsl({ r, g, b, a }: SRgb.Rgb.Normalized): SRgb.Hsl.Normalized {
  const maxRgb = Math.max(r, g, b);
  const minRgb = Math.min(r, g, b);

  const d = maxRgb - minRgb;

  let h = SRgb.Hue.ZERO_TURN;
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
    h = SRgb.Hue.normalize(h * 60);
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

namespace SRgb {
  // RgbComponent >= 0 && RgbComponent <= 1
  export type RgbComponent = number;

  export namespace RgbComponent {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): RgbComponent {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export namespace Rgb {
    export type Normalized = {
      r: RgbComponent;
      g: RgbComponent;
      b: RgbComponent;
      a: Color.Alpha;
    };

    export function normalize(value: unknown): Normalized {
      let r = RgbComponent.MIN_VALUE;
      let g = RgbComponent.MIN_VALUE;
      let b = RgbComponent.MIN_VALUE;
      let a = Color.Alpha.MAX_VALUE;
      if (value && (typeof value === "object")) {
        if ("r" in value) {
          r = RgbComponent.normalize(value.r);
        }
        if ("g" in value) {
          g = RgbComponent.normalize(value.g);
        }
        if ("b" in value) {
          b = RgbComponent.normalize(value.b);
        }
        if ("a" in value) {
          a = Color.Alpha.normalize(value.a);
        }
      }
      return { r, g, b, a };
    }
  }

  export type RgbBytes = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  export namespace RgbBytes {
    export type Normalized = {
      r: Uint8;
      g: Uint8;
      b: Uint8;
      a: Uint8;
    };

    export function normalize(value: unknown): Normalized {
      let rByte: Uint8 = Uint8.MIN_VALUE;
      let gByte: Uint8 = Uint8.MIN_VALUE;
      let bByte: Uint8 = Uint8.MIN_VALUE;
      let aByte: Uint8 = Uint8.MAX_VALUE;
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

    export function fromRgb(rgb: Color.Rgb): Normalized {
      const normalizedRgb = Rgb.normalize(rgb);
      return {
        r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
        g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
        b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
        a: Uint8.clamp(normalizedRgb.a * Uint8.MAX_VALUE),
      };
    }

    export function toRgb(rgbBytes: RgbBytes): Rgb.Normalized {
      const normalizedRgbBytes = normalize(rgbBytes);
      return {
        r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
        g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
        b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
        a: normalizedRgbBytes.a / Uint8.MAX_VALUE,
      };
    }
  }

  // angle
  export type Hue = number;

  export namespace Hue {
    export const ZERO_TURN = 0;
    export const ONE_TURN = 360;

    export function normalize(value: unknown): Hue {
      if (Number.isFinite(value)) {
        const t = (value as number) % ONE_TURN;
        return (t < ZERO_TURN) ? (t + ONE_TURN) : t;
      }
      return ZERO_TURN;
    }
  }

  // Saturation >= 0 && Saturation <= 1
  export type Saturation = number;

  export namespace Saturation {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Saturation {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  // Lightness >= 0 && Lightness <= 1
  export type Lightness = number;

  export namespace Lightness {
    export const MIN_VALUE = 0;
    export const MAX_VALUE = 1;

    export function normalize(value: unknown): Lightness {
      if (Number.isFinite(value)) {
        return NumberUtils.clamp(value as number, MIN_VALUE, MAX_VALUE);
      }
      return MIN_VALUE;
    }
  }

  export type Hsl = {
    h: number;
    s: number;
    l: number;
    a?: number;
  };

  export namespace Hsl {
    export type Normalized = {
      h: Hue;
      s: Saturation;
      l: Lightness;
      a: Color.Alpha;
    };

    export function normalize(value: unknown): Normalized {
      let h = Hue.ZERO_TURN;
      let s = Saturation.MIN_VALUE;
      let l = Lightness.MIN_VALUE;
      let a = Color.Alpha.MAX_VALUE;
      if (value && (typeof value === "object")) {
        if ("h" in value) {
          h = Hue.normalize(value.h);
        }
        if ("s" in value) {
          s = Saturation.normalize(value.s);
        }
        if ("l" in value) {
          l = Lightness.normalize(value.l);
        }
        if ("a" in value) {
          a = Color.Alpha.normalize(value.a);
        }
      }
      return { h, s, l, a };
    }
  }

  // // Whiteness >= 0 && Whiteness <= 1
  // type Whiteness = number;

  // // Blackness >= 0 && Blackness <= 1
  // type Blackness = number;

  // type Hwb = {
  //   h: Hue;
  //   w: Whiteness;
  //   b: Blackness;
  //   a?: Alpha;
  // };

  export namespace SRgbColor {
    export type ToHexStringOptions = Color.ToOptions & {
      shorten?: boolean;
      upperCase?: boolean;
    };
  }

  /**
   * A color in sRGB color space
   */
  export class SRgbColor {
    readonly #rgb: Rgb.Normalized;
    readonly #rgbBytes: RgbBytes.Normalized;
    readonly #hsl: Hsl.Normalized;

    private constructor(
      r: RgbComponent,
      g: RgbComponent,
      b: RgbComponent,
      a: Color.Alpha,
    ) {
      this.#rgb = Object.freeze(Rgb.normalize({ r, g, b, a }));
      this.#rgbBytes = Object.freeze(RgbBytes.fromRgb(this.#rgb));
      this.#hsl = Object.freeze(_rgbToHsl(this.#rgb));
      Object.freeze(this);
    }

    /**
     * The red component value.
     */
    get red(): RgbComponent {
      return this.#rgb.r;
    }

    /**
     * The green component value.
     */
    get green(): RgbComponent {
      return this.#rgb.g;
    }

    /**
     * The blue component value.
     */
    get blue(): RgbComponent {
      return this.#rgb.b;
    }

    get alpha(): Color.Alpha {
      return this.#rgb.a;
    }

    get hue(): Hue {
      return this.#hsl.h;
    }

    get saturation(): Saturation {
      return this.#hsl.s;
    }

    get lightness(): Lightness {
      return this.#hsl.l;
    }

    //XXX w, b

    static fromRgb(rgb: Color.Rgb, options?: Color.FromOptions): SRgbColor {
      const { r, g, b, a } = Rgb.normalize(rgb);
      if (options?.discardAlpha === true) {
        return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
      }
      return new SRgbColor(r, g, b, a);
    }

    static #fromRgbBytesObject(
      rgbBytes: { r: number; g: number; b: number; a?: number },
      options?: Color.FromOptions,
    ): SRgbColor {
      const { r, g, b, a } = RgbBytes.toRgb(rgbBytes);

      if (options?.discardAlpha === true) {
        return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
      }
      return new SRgbColor(r, g, b, a);
    }

    // rgbBytes: Uint8Array | Uint8ClampedArray | Array<uint8>
    static #fromRgbByteArray(
      rgbBytes: Iterable<number>,
      options?: Color.FromOptions,
    ): SRgbColor {
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
        }, options);
      }
      throw new TypeError("rgbBytes");
    }

    static fromRgbBytes(
      rgbBytes:
        | { r: number; g: number; b: number; a?: number }
        | Iterable<number>,
      options?: Color.FromOptions,
    ): SRgbColor {
      if (rgbBytes) {
        if (
          (rgbBytes instanceof Uint8Array) ||
          (rgbBytes instanceof Uint8ClampedArray)
        ) {
          return SRgbColor.#fromRgbByteArray(rgbBytes, options);
        }
        if (Symbol.iterator in rgbBytes) {
          return SRgbColor.#fromRgbByteArray(rgbBytes, options);
        }
      }
      return SRgbColor.#fromRgbBytesObject(rgbBytes, options);
    }

    static fromHexString(
      input: string,
      options?: Color.FromOptions,
    ): SRgbColor {
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

      return SRgbColor.#fromRgbByteArray(
        ByteSequence.parse(rrggbb + aa, { lowerCase: true }).getUint8View(),
        options,
      );
    }

    static fromHsl(hsl: Hsl, options?: Color.FromOptions): SRgbColor {
      const { r, g, b, a } = _hslToRgb(Hsl.normalize(hsl));
      if (options?.discardAlpha === true) {
        return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
      }
      return new SRgbColor(r, g, b, a);
    }

    toUint8ClampedArray(options?: Color.ToOptions): Uint8ClampedArray {
      const { r, g, b, a } = this.#rgbBytes;
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return Uint8ClampedArray.of(r, g, b);
      }
      return Uint8ClampedArray.of(r, g, b, a);
    }

    toUint8Array(options?: Color.ToOptions): Uint8Array {
      const { r, g, b, a } = this.#rgbBytes;
      if ((options?.omitAlphaIfOpaque === true) && (this.#rgb.a === 1)) {
        return Uint8Array.of(r, g, b);
      }
      return Uint8Array.of(r, g, b, a);
    }

    toRgb(options?: Color.ToOptions): Rgb.Normalized {
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

    toHsl(options?: Color.ToOptions): Hsl.Normalized {
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

    toJSON(): Rgb.Normalized {
      return this.toRgb() as Rgb.Normalized;
    }

    clone(): SRgbColor {
      const { r, g, b, a } = this.#rgb;
      return new SRgbColor(r, g, b, a);
    }

    rotateHue(relativeHue: number): SRgbColor {
      const { h, s, l, a } = this.#hsl;
      return SRgbColor.fromHsl({ h: (h + relativeHue), s, l, a });
    }

    withHue(absoluteHue: number): SRgbColor {
      const { s, l, a } = this.#hsl;
      return SRgbColor.fromHsl({ h: absoluteHue, s, l, a });
    }

    plusSaturation(relativeSaturation: number): SRgbColor {
      const { h, s, l, a } = this.#hsl;
      return SRgbColor.fromHsl({ h, s: (s + relativeSaturation), l, a });
    }

    withSaturation(absoluteSaturation: number): SRgbColor {
      const { h, l, a } = this.#hsl;
      return SRgbColor.fromHsl({ h, s: absoluteSaturation, l, a });
    }

    plusLightness(relativeLightness: number): SRgbColor {
      const { h, s, l, a } = this.#hsl;
      return SRgbColor.fromHsl({ h, s, l: (l + relativeLightness), a });
    }

    withLightness(absoluteLightness: number): SRgbColor {
      const { h, s, a } = this.#hsl;
      return SRgbColor.fromHsl({ h, s, l: absoluteLightness, a });
    }

    plusAlpha(relativeAlpha: number): SRgbColor {
      const { r, g, b, a } = this.#rgb;
      return new SRgbColor(r, g, b, a + relativeAlpha);
    }

    withAlpha(absoluteAlpha: number): SRgbColor {
      const { r, g, b } = this.#rgb;
      return new SRgbColor(r, g, b, absoluteAlpha);
    }

    withoutAlpha(): SRgbColor {
      const { r, g, b } = this.#rgb;
      return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
    }

    //XXX
    // xxxHsl(func): Iterable<hsl>
    // xxxRgb(func): Iterable<rgb>

    //XXX complementaryColor() 補色を返す

    // lighter(percentage): SRgbColor {
    // }

    // darker(percentage): SRgbColor {
    // }

    // contrast,saturate,sepia,...

    // grayscale(): SRgbColor {
    // }

    // invert(): SRgbColor {
    // }

    //XXX
    // equals(rgb: Rgb | SRgbColor): boolean {
    //   if (rgb instanceof SRgbColor) {
    //     return (this.red === rgb.red) && (this.green === rgb.green) && (this.blue === rgb.blue) && (this.alpha === rgb.alpha);
    //   }
    //   else  {

    //   }
    // }

    //XXX bytesEquals

    //XXX mix(blendMode, other: SRgbColor | *)
  }
}

export { SRgb };
