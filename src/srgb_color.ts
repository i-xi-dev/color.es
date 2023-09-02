import { ByteSequence, Uint8 } from "../deps.ts";
import { Color } from "./color.ts";

/**
 * A color in sRGB color space
 */
class SRgbColor {
  readonly #rgb: _Rgb.Normalized;
  readonly #alpha: Color.Alpha;
  readonly #rgbBytes: _RgbBytes.Normalized;
  readonly #alphaByte: Uint8;
  readonly #hsl: _Hsl.Normalized;
  readonly #hwb: _Hwb.Normalized;

  private constructor(
    r: _Rgb.Component,
    g: _Rgb.Component,
    b: _Rgb.Component,
    a: Color.Alpha,
  ) {
    this.#rgb = Object.freeze(_Rgb.normalize({ r, g, b }));
    this.#alpha = Color.Alpha.normalize(a);
    this.#rgbBytes = Object.freeze(_RgbBytes.fromRgb(this.#rgb));
    this.#alphaByte = Uint8.clamp(this.#alpha * Uint8.MAX_VALUE);
    this.#hsl = Object.freeze(_Hsl.fromRgb(this.#rgb));
    this.#hwb = Object.freeze(_Hwb.fromRgb(this.#rgb));
    Object.freeze(this);
  }

  /**
   * The red component value.
   */
  get red(): _Rgb.Component {
    return this.#rgb.r;
  }

  /**
   * The green component value.
   */
  get green(): _Rgb.Component {
    return this.#rgb.g;
  }

  /**
   * The blue component value.
   */
  get blue(): _Rgb.Component {
    return this.#rgb.b;
  }

  get alpha(): Color.Alpha {
    return this.#alpha;
  }

  get hue(): Color.Hue {
    return this.#hsl.h;
  }

  get saturation(): _Hsl.Saturation {
    return this.#hsl.s;
  }

  get lightness(): _Hsl.Lightness {
    return this.#hsl.l;
  }

  get whiteness(): _Hwb.Whiteness {
    return this.#hwb.w;
  }

  get blackness(): _Hwb.Blackness {
    return this.#hwb.b;
  }

  static fromRgb(rgb: Color.Rgb, options?: SRgbColor.RgbOptions): SRgbColor {
    if (options?.mode === "precision") {
      const { r, g, b } = _Rgb.normalize(rgb);
      const a = Color.Alpha.normalize(rgb.a ?? Color.Alpha.MAX_VALUE);
      return new SRgbColor(r, g, b, a);
    } else {
      const { r, g, b } = _RgbBytes.toRgb(rgb);
      let a: number;
      if (options?.mode === "uint8") {
        if (Number.isFinite(rgb.a)) {
          a = Uint8.clamp(rgb.a) / Uint8.MAX_VALUE;
        } else {
          a = Color.Alpha.MAX_VALUE;
        }
      } else {
        a = Color.Alpha.normalize(rgb.a);
      }
      return new SRgbColor(r, g, b, a);
    }
  }

  toRgb(options?: SRgbColor.ToRgbOptions): Color.Rgb {
    let r: number;
    let g: number;
    let b: number;
    let a: number;
    if (options?.mode === "precision") {
      r = this.#rgb.r;
      g = this.#rgb.g;
      b = this.#rgb.b;
      a = this.#alpha;
    } else {
      r = this.#rgbBytes.r;
      g = this.#rgbBytes.g;
      b = this.#rgbBytes.b;
      if (options?.mode === "uint8") {
        a = this.#alphaByte;
      } else {
        a = this.#alpha;
      }
    }

    if (options?.discardAlpha === true) {
      return { r, g, b };
    }
    return { r, g, b, a };
  }

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

      return SRgbColor.fromRgb({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
        a: bytes[3],
      }, { mode: "uint8" });
    }
    throw new TypeError("rgbaBytes");
  }

  toUint8Array(options?: SRgbColor.ToUint8ArrayOptions): Uint8Array {
    const { r, g, b } = this.#rgbBytes;
    if (options?.discardAlpha === true) {
      return Uint8Array.of(r, g, b);
    }
    return Uint8Array.of(r, g, b, this.#alphaByte);
  }

  toUint8ClampedArray(
    options?: SRgbColor.ToUint8ArrayOptions,
  ): Uint8ClampedArray {
    const { r, g, b } = this.#rgbBytes;
    if (options?.discardAlpha === true) {
      return Uint8ClampedArray.of(r, g, b);
    }
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
    //XXX 他のfromXXXに合わせるなら無視して0扱い

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

  static fromHsl(hsl: Color.Hsl): SRgbColor {
    const { r, g, b } = _Hsl.toRgb(hsl);
    const a = Color.Alpha.normalize(hsl.a);
    return new SRgbColor(r, g, b, a);
  }

  toHsl(options?: SRgbColor.ToHslOptions): Color.Hsl {
    const { h, s, l } = this.#hsl;
    if (options?.discardAlpha === true) {
      return { h, s, l };
    }
    return { h, s, l, a: this.#alpha };
  }

  static fromHwb(hwb: Color.Hwb): SRgbColor {
    const { r, g, b } = _Hwb.toRgb(hwb);
    const a = Color.Alpha.normalize(hwb.a);
    return new SRgbColor(r, g, b, a);
  }

  toHwb(options?: SRgbColor.ToHwbOptions): Color.Hwb {
    const { h, w, b } = this.#hwb;
    if (options?.discardAlpha === true) {
      return { h, w, b };
    }
    return { h, w, b, a: this.#alpha };
  }

  toString(): string {
    return this.toHexString({
      // omitAlphaIfOpaque: true,
      upperCase: true,
    });
  }

  toJSON(): _Rgb.Normalized & { a: Color.Alpha } {
    return this.toRgb({
      mode: "precision",
    }) as (_Rgb.Normalized & { a: Color.Alpha });
  }

  plusHue(relativeHue: number): SRgbColor {
    const { h, s, l } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h: (h + relativeHue), s, l, a });
  }

  withHue(absoluteHue: number): SRgbColor {
    const { s, l } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h: absoluteHue, s, l, a });
  }

  plusSaturation(relativeSaturation: number): SRgbColor {
    const { h, s, l } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h, s: (s + relativeSaturation), l, a });
  }

  withSaturation(absoluteSaturation: number): SRgbColor {
    const { h, l } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h, s: absoluteSaturation, l, a });
  }

  plusLightness(relativeLightness: number): SRgbColor {
    const { h, s, l } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h, s, l: (l + relativeLightness), a });
  }

  withLightness(absoluteLightness: number): SRgbColor {
    const { h, s } = this.#hsl;
    const a = this.#alpha;
    return SRgbColor.fromHsl({ h, s, l: absoluteLightness, a });
  }

  plusAlpha(relativeAlpha: number): SRgbColor {
    const { r, g, b } = this.#rgb;
    const a = this.#alpha;
    return new SRgbColor(r, g, b, (a as number) + relativeAlpha);
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

namespace SRgbColor {
  //XXX
  // export type FromOptions = {
  //   ignoreAlpha: boolean;
  // }

  export type ToOptions = {
    discardAlpha?: boolean;
    //XXX omitAlphaIfOpaque: boolean
  };

  export type RgbOptions = {
    mode?: "auto" | "uint8" | "precision";
  };

  export type ToRgbOptions = RgbOptions & ToOptions;

  export type ToHslOptions = ToOptions;

  export type ToHwbOptions = ToOptions;

  export type ToHexStringOptions = {
    upperCase?: boolean;
  } & ToOptions;

  export type ToUint8ArrayOptions = ToOptions;
}

namespace _Rgb {
  // sRGBでは 0～1
  export type Component = Color.Component;

  export type Normalized = {
    r: Component;
    g: Component;
    b: Component;
  };

  export function normalize(value: unknown): Normalized {//TODO unknownやめる（処理内容は変えない）
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

namespace _RgbBytes {
  export type Normalized = {
    r: Uint8;
    g: Uint8;
    b: Uint8;
  };

  export function normalize(value: unknown): Normalized {
    let r: number | undefined = undefined;
    let g: number | undefined = undefined;
    let b: number | undefined = undefined;
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

  export function fromRgb(rgb: unknown): Normalized {
    const normalizedRgb = _Rgb.normalize(rgb);
    return {
      r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
      g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
      b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
    };
  }

  export function toRgb(rgbBytes: unknown): _Rgb.Normalized {
    const normalizedRgbBytes = normalize(rgbBytes);
    return {
      r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
      g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
      b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
    };
  }
}

namespace _Hsl {
  // Saturation >= 0 && Saturation <= 1
  export type Saturation = Color.Component;

  // Lightness >= 0 && Lightness <= 1
  export type Lightness = Color.Component;

  export type Normalized = {
    h: Color.Hue;
    s: Saturation;
    l: Lightness;
  };

  export function normalize(value: unknown): Normalized {
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

  export function fromRgb(rgb: unknown): Normalized {
    const { r, g, b } = _Rgb.normalize(rgb);

    const maxRgb = Math.max(r, g, b);
    const minRgb = Math.min(r, g, b);

    const d = maxRgb - minRgb;

    let h = Color.Hue.ZERO_TURN; // Number.NaN;
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

  export function toRgb(hsl: unknown): _Rgb.Normalized {
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
  // Whiteness >= 0 && Whiteness <= 1
  export type Whiteness = Color.Component;

  // Blackness >= 0 && Blackness <= 1
  export type Blackness = Color.Component;

  export type Normalized = {
    h: Color.Hue;
    w: Whiteness;
    b: Blackness;
  };

  export function normalize(value: unknown): Normalized {
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
      w: Color.Component.normalize(w),
      b: Color.Component.normalize(b),
    };
  }

  export function fromRgb(rgb: unknown): Normalized {
    const { r, g, b } = _Rgb.normalize(rgb);
    const { h } = _Hsl.fromRgb(rgb);
    const w = Math.min(r, g, b);
    const blackness = 1 - Math.max(r, g, b);
    return { h, w, b: blackness };
  }

  export function toRgb(hwb: unknown): _Rgb.Normalized {
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

export { SRgbColor };
