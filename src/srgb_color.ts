import { ByteSequence, NumberUtils, Uint8 } from "../deps.ts";
import { Color } from "./color.ts";

/**
 * A color in sRGB color space
 */
class SRgbColor {
  readonly #rgb: SRgbColor.Rgb;
  readonly #alpha: Color.Alpha;
  readonly #rgbBytes: SRgbColor.RgbBytes;
  readonly #alphaByte: Uint8;
  readonly #hsl: SRgbColor.Hsl;

  private constructor(
    r: SRgbColor.RgbComponent,
    g: SRgbColor.RgbComponent,
    b: SRgbColor.RgbComponent,
    a: Color.Alpha,
  ) {
    this.#rgb = Object.freeze(SRgbColor.Rgb.normalize({ r, g, b }));
    this.#alpha = Color.Alpha.normalize(a);
    this.#rgbBytes = Object.freeze(SRgbColor.RgbBytes.fromRgb(this.#rgb));
    this.#alphaByte = Uint8.clamp(this.#alpha * Uint8.MAX_VALUE);
    this.#hsl = Object.freeze(SRgbColor.Hsl.fromRgb(this.#rgb));
    Object.freeze(this);
  }

  /**
   * The red component value.
   */
  get red(): SRgbColor.RgbComponent {
    return this.#rgb.r;
  }

  /**
   * The green component value.
   */
  get green(): SRgbColor.RgbComponent {
    return this.#rgb.g;
  }

  /**
   * The blue component value.
   */
  get blue(): SRgbColor.RgbComponent {
    return this.#rgb.b;
  }

  get alpha(): Color.Alpha {
    return this.#alpha;
  }

  get hue(): Color.Hue {
    return this.#hsl.h;
  }

  get saturation(): SRgbColor.Hsl.Saturation {
    return this.#hsl.s;
  }

  get lightness(): SRgbColor.Hsl.Lightness {
    return this.#hsl.l;
  }

  //XXX w, b

  //TODO SRgbColor.Rgb.normalize を2回実行するパスがある

  static fromRgb(rgb: { r: number; g: number; b: number }): SRgbColor {
    const { r, g, b } = SRgbColor.Rgb.normalize(rgb);
    return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
  }

  toRgb(): SRgbColor.Rgb {
    return {
      r: this.#rgb.r,
      g: this.#rgb.g,
      b: this.#rgb.b,
    };
  }

  static fromRgba(rgba: { r: number; g: number; b: number; a: number }): SRgbColor {
    const { r, g, b } = SRgbColor.Rgb.normalize(rgba);
    const a = Color.Alpha.normalize(rgba.a);
    return new SRgbColor(r, g, b, a);
  }

  toRgba(): SRgbColor.Rgb & { a: Color.Alpha } {
    return {
      r: this.#rgb.r,
      g: this.#rgb.g,
      b: this.#rgb.b,
      a: this.#alpha,
    };
  }

  static fromRgbBytes(rgbBytes: { r: number; g: number; b: number }): SRgbColor {
    const { r, g, b } = SRgbColor.RgbBytes.toRgb(rgbBytes);
    return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
  }

  toRgbBytes(): SRgbColor.RgbBytes {
    return {
      r: this.#rgbBytes.r,
      g: this.#rgbBytes.g,
      b: this.#rgbBytes.b,
    };
  }

  static fromRgbaBytes(rgbaBytes: { r: number; g: number; b: number; a: number }): SRgbColor {
    const { r, g, b } = SRgbColor.RgbBytes.toRgb(rgbaBytes);
    if (Uint8.isUint8(rgbaBytes.a)) {
      return new SRgbColor(r, g, b, rgbaBytes.a / Uint8.MAX_VALUE);
    }
    return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
  }

  toRgbaBytes(): SRgbColor.RgbBytes & { a: Uint8 } {
    return {
      r: this.#rgbBytes.r,
      g: this.#rgbBytes.g,
      b: this.#rgbBytes.b,
      a: this.#alphaByte,
    };
  }

  static fromRgbBytesWithAlpha(rgbBytesWithAlpha: { r: number; g: number; b: number; a: number }): SRgbColor {
    const { r, g, b } = SRgbColor.RgbBytes.toRgb(rgbBytesWithAlpha);
    const a = Color.Alpha.normalize(rgbBytesWithAlpha.a);
    return new SRgbColor(r, g, b, a);
  }

  toRgbBytesWithAlpha(): SRgbColor.RgbBytes & { a: Color.Alpha } {
    return {
      r: this.#rgbBytes.r,
      g: this.#rgbBytes.g,
      b: this.#rgbBytes.b,
      a: this.#alpha,
    };
  }

  //XXX options追加 並びはRGB,RGBA,ARGB,...
  static fromUint8Array(rgbaBytes: Uint8Array | Uint8ClampedArray): SRgbColor {
    if (rgbaBytes[Symbol.iterator]) {
      const bytes: [number, number, number, number] = [
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MAX_VALUE,
      ];

      let i = 0;
      for (const byte of rgbaBytes) {
        if (i >= 4) {
          break;
        }

        bytes[i] = byte;

        i = i + 1;
      }

      return SRgbColor.fromRgbaBytes({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
        a: bytes[3],
      });
    }
    throw new TypeError("rgbaBytes");
  }

  toUint8Array(): Uint8Array {
    const { r, g, b } = this.#rgbBytes;
    return Uint8Array.of(r, g, b, this.#alphaByte);
  }

  toUint8ClampedArray(): Uint8ClampedArray {
    const { r, g, b } = this.#rgbBytes;
    return Uint8ClampedArray.of(r, g, b, this.#alphaByte);
  }

  static fromHexString(input: string): SRgbColor {
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

    return SRgbColor.fromUint8Array(
      ByteSequence.parse(rrggbb + aa, { lowerCase: true }).getUint8View(),
    );
  }

  toHexString(options?: SRgbColor.ToHexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const bytes = this.toUint8ClampedArray();
    const rrggbbaa: string = ByteSequence.fromArrayBufferView(
      bytes,
    ).format({ lowerCase });

    let rrggbbaaOrRrggbb = rrggbbaa;
    if (options?.discardAlpha === true) {
      rrggbbaaOrRrggbb = rrggbbaaOrRrggbb.substring(0, 6);
    }

    // if (options?.shorten === true) {
    //   if (/^(?:([0-9a-fA-F])\1)+$/.test(rrggbbaaOrRrggbb)) {
    //     return "#" +
    //       [...rrggbbaaOrRrggbb].reduce(
    //         (s, c, i) => (i % 2 === 0) ? (s + c) : s,
    //         "",
    //       );
    //   }
    // }

    return "#" + rrggbbaaOrRrggbb;
  }

  static fromHsl(hsl: { h: number; s: number; l: number }): SRgbColor {
    const { r, g, b } = SRgbColor.Hsl.toRgb(hsl);
    return new SRgbColor(r, g, b, Color.Alpha.MAX_VALUE);
  }

  toHsl(): SRgbColor.Hsl {
    return {
      h: this.#hsl.h,
      s: this.#hsl.s,
      l: this.#hsl.l,
    };
  }

  static fromHsla(hsla: { h: number; s: number; l: number, a: number }): SRgbColor {
    const { r, g, b } = SRgbColor.Hsl.toRgb(hsla);
    const a = Color.Alpha.normalize(hsla.a);
    return new SRgbColor(r, g, b, a);
  }

  toHsla(): SRgbColor.Hsl & { a: Color.Alpha } {
    return {
      h: this.#hsl.h,
      s: this.#hsl.s,
      l: this.#hsl.l,
      a: this.#alpha,
    };
  }

  toString(): string {
    return this.toHexString({
      discardAlpha: true,
      upperCase: true,
    });
  }

  toJSON(): SRgbColor.Rgb & { a: Color.Alpha } {
    return this.toRgba();
  }

  plusHue(relativeHue: number): SRgbColor {
    const { h, s, l, a } = this.toHsla();
    return SRgbColor.fromHsla({ h: (h + relativeHue), s, l, a });
  }

  withHue(absoluteHue: number): SRgbColor {
    const { s, l, a } = this.toHsla();
    return SRgbColor.fromHsla({ h: absoluteHue, s, l, a });
  }

  plusSaturation(relativeSaturation: number): SRgbColor {
    const { h, s, l, a } = this.toHsla();
    return SRgbColor.fromHsla({ h, s: (s + relativeSaturation), l, a });
  }

  withSaturation(absoluteSaturation: number): SRgbColor {
    const { h, l, a } = this.toHsla();
    return SRgbColor.fromHsla({ h, s: absoluteSaturation, l, a });
  }

  plusLightness(relativeLightness: number): SRgbColor {
    const { h, s, l, a } = this.toHsla();
    return SRgbColor.fromHsla({ h, s, l: (l + relativeLightness), a });
  }

  withLightness(absoluteLightness: number): SRgbColor {
    const { h, s, a } = this.toHsla();
    return SRgbColor.fromHsla({ h, s, l: absoluteLightness, a });
  }

  plusAlpha(relativeAlpha: number): SRgbColor {
    const { r, g, b, a } = this.toRgba();
    return new SRgbColor(r, g, b, a + relativeAlpha);
  }

  withAlpha(absoluteAlpha: number): SRgbColor {
    const { r, g, b } = this.toRgb();
    return new SRgbColor(r, g, b, absoluteAlpha);
  }

  withoutAlpha(): SRgbColor {
    const { r, g, b } = this.toRgb();
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

namespace SRgbColor {
  // 0～1 なのでSRgbColorのメンバとする
  export type RgbComponent = Color.Component;

  export type Rgb = {
    r: RgbComponent;
    g: RgbComponent;
    b: RgbComponent;
  };

  export namespace Rgb {
    export function normalize(value: unknown): Rgb {
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
        r: Color.Component.normalize(r),
        g: Color.Component.normalize(g),
        b: Color.Component.normalize(b),
      };
    }
  }

  export type RgbBytes = {
    r: Uint8;
    g: Uint8;
    b: Uint8;
  };

  export namespace RgbBytes {
    export function normalize(value: unknown): RgbBytes {
      let r: (number | undefined) = undefined;
      let g: (number | undefined) = undefined;
      let b: (number | undefined) = undefined;
      if (value && (typeof value === "object")) {
        if (("r" in value) && Number.isFinite(value.r)) {
          r = value.r as number;
        }
        if ("g" in value) {
          g = value.g as number;
        }
        if ("b" in value) {
          b = value.b as number;
        }
      }
      return {
        r: Uint8.clamp(r),
        g: Uint8.clamp(g),
        b: Uint8.clamp(b),
      };
    }

    //XXX options.rgbIsNormalized
    export function fromRgb(rgb: unknown): RgbBytes {
      const normalizedRgb = Rgb.normalize(rgb);
      return {
        r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
        g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
        b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
      };
    }

    //XXX options.rgbBytesIsNormalized
    export function toRgb(rgbBytes: unknown): Rgb {
      const normalizedRgbBytes = RgbBytes.normalize(rgbBytes);
      return {
        r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
        g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
        b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
      };
    }
  }

  export type Hsl = {
    h: Color.Hue;
    s: Hsl.Saturation;
    l: Hsl.Lightness;
  };

  export namespace Hsl {
    // Saturation >= 0 && Saturation <= 1
    export type Saturation = Color.Component;

    // Lightness >= 0 && Lightness <= 1
    export type Lightness = Color.Component;

    export function normalize(value: unknown): Hsl {
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
        s: Color.Component.normalize(s),
        l: Color.Component.normalize(l),
      };
    }

    //XXX options.引数1はnormalize済
    export function fromRgb(rgb: unknown): Hsl {
      const { r, g, b } = Rgb.normalize(rgb);

      const maxRgb = Math.max(r, g, b);
      const minRgb = Math.min(r, g, b);

      const d = maxRgb - minRgb;

      let h = Color.Hue.ZERO_TURN;
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

    //XXX options.引数1はnormalize済
    export function toRgb(hsl: unknown): Rgb {
      const normalizedHsl = normalize(hsl);
      return {
        r: _f(0, normalizedHsl),
        g: _f(8, normalizedHsl),
        b: _f(4, normalizedHsl),
      };
    }
  }

  export type Hwb = {
    h: Color.Hue;
    w: Hwb.Whiteness;
    b: Hwb.Blackness;
  };
  
  export namespace Hwb {
    // Whiteness >= 0 && Whiteness <= 1
    export type Whiteness = number;

    // Blackness >= 0 && Blackness <= 1
    export type Blackness = number;  
  }

  export type ToHexStringOptions = {
    discardAlpha?: boolean;
    upperCase?: boolean;
  };
}

function _f(n: number, { h, s, l }: SRgbColor.Hsl): number {
  const k = (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

export { SRgbColor };
