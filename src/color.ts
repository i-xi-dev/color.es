import { Angle, ByteSequence, NumberUtils, Uint8 } from "../deps.ts";

type _Component = number;

const _COMPONENT_MIN = 0;
const _COMPONENT_MAX = 1;

function _normalizeComponent(value: unknown): _Component {
  if (Number.isFinite(value)) {
    return NumberUtils.clamp(value as number, _COMPONENT_MIN, _COMPONENT_MAX);
  }
  return _COMPONENT_MIN;
}

type _Alpha = number;

const _ALPHA_MIN = 0;
const _ALPHA_MAX = 1;

function _normalizeAlpha(value: unknown): _Alpha {
  if (Number.isFinite(value)) {
    return NumberUtils.clamp(value as number, _ALPHA_MIN, _ALPHA_MAX);
  }
  return _ALPHA_MAX;
}

type _Hue = Angle.Degrees;

const _HUE_ZERO = 0;

function _normalizeHue(value: unknown): _Hue {
  if (Number.isFinite(value)) {
    return Angle.Degrees.normalize(value as number);
  }
  return _HUE_ZERO; //XXX Number.NaN にするか？
}

// _Saturation >= 0 && _Saturation <= 1
type _Saturation = _Component;

// _Lightness >= 0 && _Lightness <= 1
type _Lightness = _Component;

// _Whiteness >= 0 && _Whiteness <= 1
type _Whiteness = _Component;

// _Blackness >= 0 && _Blackness <= 1
type _Blackness = _Component;

namespace _SRgb {
  export namespace Rgb {
    // sRGBでは 0～1
    export type Component = _Component;

    export type Normalized = {
      r: Component;
      g: Component;
      b: Component;
    };

    export function normalize(value: Color.Rgb): Normalized {
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
        r: _normalizeComponent(r),
        g: _normalizeComponent(g),
        b: _normalizeComponent(b),
      };
    }
  }

  export namespace RgbBytes {
    export type Normalized = {
      r: Uint8;
      g: Uint8;
      b: Uint8;
    };

    export function normalize(value: Color.Rgb): Normalized {
      let r: number | undefined = undefined;
      let g: number | undefined = undefined;
      let b: number | undefined = undefined;
      if (value && (typeof value === "object")) {
        if (("r" in value) && Number.isFinite(value.r)) {
          r = value.r as number;
        }
        if (("g" in value) && Number.isFinite(value.g)) {
          g = value.g as number;
        }
        if (("b" in value) && Number.isFinite(value.b)) {
          b = value.b as number;
        }
      }
      return {
        r: Uint8.clamp(r),
        g: Uint8.clamp(g),
        b: Uint8.clamp(b),
      };
    }

    export function fromRgb(rgb: Color.Rgb): Normalized {
      const normalizedRgb = Rgb.normalize(rgb);
      return {
        r: Uint8.clamp(normalizedRgb.r * Uint8.MAX_VALUE),
        g: Uint8.clamp(normalizedRgb.g * Uint8.MAX_VALUE),
        b: Uint8.clamp(normalizedRgb.b * Uint8.MAX_VALUE),
      };
    }

    export function toRgb(rgbBytes: Color.Rgb): Rgb.Normalized {
      const normalizedRgbBytes = normalize(rgbBytes);
      return {
        r: normalizedRgbBytes.r / Uint8.MAX_VALUE,
        g: normalizedRgbBytes.g / Uint8.MAX_VALUE,
        b: normalizedRgbBytes.b / Uint8.MAX_VALUE,
      };
    }
  }

  export namespace Hsl {
    export type Normalized = {
      h: _Hue;
      s: _Saturation;
      l: _Lightness;
    };

    export function normalize(value: Color.Hsl): Normalized {
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
        h: _normalizeHue(h),
        s: _normalizeComponent(s),
        l: _normalizeComponent(l),
      };
    }

    export function fromRgb(rgb: Color.Rgb): Normalized {
      const { r, g, b } = Rgb.normalize(rgb);

      const maxRgb = Math.max(r, g, b);
      const minRgb = Math.min(r, g, b);

      const d = maxRgb - minRgb;

      let h = _HUE_ZERO; //XXX Number.NaN;
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

    export function toRgb(hsl: Color.Hsl): Rgb.Normalized {
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

  export namespace Hwb {
    export type Normalized = {
      h: _Hue;
      w: _Whiteness;
      b: _Blackness;
    };

    export function normalize(value: Color.Hwb): Normalized {
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
        h: _normalizeHue(h),
        w: _normalizeComponent(w),
        b: _normalizeComponent(b),
        //XXX w+bに上限制約があるが…
      };
    }

    export function fromRgb(rgb: Color.Rgb): Normalized {
      const { r, g, b } = Rgb.normalize(rgb);
      const { h } = Hsl.fromRgb(rgb);
      const w = Math.min(r, g, b);
      const blackness = 1 - Math.max(r, g, b);
      return { h, w, b: blackness };
    }

    export function toRgb(hwb: Color.Hwb): Rgb.Normalized {
      const { h, w, b } = normalize(hwb);
      if (w + b >= 1) {
        const g = w / (w + b);
        return {
          r: g,
          g: g,
          b: g,
        };
      }

      const rgb = _SRgb.Hsl.toRgb({ h, s: 1, l: 0.5 });
      rgb.r = (rgb.r * (1 - w - b)) + w;
      rgb.g = (rgb.g * (1 - w - b)) + w;
      rgb.b = (rgb.b * (1 - w - b)) + w;
      return rgb;
    }
  }
}

/**
 * A color in sRGB color space
 */
class Color {
  readonly #r: _Component;
  readonly #g: _Component;
  readonly #b: _Component;
  readonly #a: _Alpha;

  #rgbBytesCache?: _SRgb.RgbBytes.Normalized;
  #alphaByteCache?: Uint8;
  #hslCache?: _SRgb.Hsl.Normalized;
  #hwbCache?: _SRgb.Hwb.Normalized;

  private constructor(
    r: _Component,
    g: _Component,
    b: _Component,
    a: _Alpha,
  ) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#a = a;
    Object.freeze(this);
  }

  /**
   * The red component value.
   */
  get red(): _Component {
    return this.#r;
  }

  /**
   * The green component value.
   */
  get green(): _Component {
    return this.#g;
  }

  /**
   * The blue component value.
   */
  get blue(): _Component {
    return this.#b;
  }

  get alpha(): _Alpha {
    return this.#a;
  }

  get hue(): _Hue {
    return this.#hsl.h;
  }

  get saturation(): _Saturation {
    return this.#hsl.s;
  }

  get lightness(): _Lightness {
    return this.#hsl.l;
  }

  get whiteness(): _Whiteness {
    return this.#hwb.w;
  }

  get blackness(): _Blackness {
    return this.#hwb.b;
  }

  get #rgbBytes(): _SRgb.RgbBytes.Normalized {
    if (!this.#rgbBytesCache) {
      this.#rgbBytesCache = _SRgb.RgbBytes.fromRgb({
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

  get #hsl(): _SRgb.Hsl.Normalized {
    if (!this.#hslCache) {
      this.#hslCache = _SRgb.Hsl.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#hslCache };
  }

  get #hwb(): _SRgb.Hwb.Normalized {
    if (!this.#hwbCache) {
      this.#hwbCache = _SRgb.Hwb.fromRgb({
        r: this.#r,
        g: this.#g,
        b: this.#b,
      });
    }
    return { ...this.#hwbCache };
  }

  static fromRgb(rgba: Color.Rgb, options?: Color.RgbOptions): Color {
    // sRGB固定

    if (options?.mode === "precision") {
      const { r, g, b } = _SRgb.Rgb.normalize(rgba);
      const a = _normalizeAlpha(rgba.a);
      return new Color(r, g, b, a);
    } else {
      const { r, g, b } = _SRgb.RgbBytes.toRgb(rgba);
      let a: number;
      if (options?.mode === "bytes") {
        if (Number.isFinite(rgba.a)) {
          a = Uint8.clamp(rgba.a) / Uint8.MAX_VALUE;
        } else {
          a = _ALPHA_MAX;
        }
      } else {
        a = _normalizeAlpha(rgba.a);
      }
      return new Color(r, g, b, a);
    }
  }

  static fromHsl(hsla: Color.Hsl): Color {
    const { r, g, b } = _SRgb.Hsl.toRgb(hsla);
    const a = _normalizeAlpha(hsla.a);
    return new Color(r, g, b, a);
  }

  static fromHwb(hwba: Color.Hwb): Color {
    const { r, g, b } = _SRgb.Hwb.toRgb(hwba);
    const a = _normalizeAlpha(hwba.a);
    return new Color(r, g, b, a);
  }

  static fromUint8Array(rgbaBytes: Uint8Array | Uint8ClampedArray): Color {
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

      return Color.fromRgb({
        r: bytes[0],
        g: bytes[1],
        b: bytes[2],
        a: bytes[3],
      }, { mode: "bytes" });
    }
    throw new TypeError("rgbaBytes");
  }

  static fromHexString(hexString: string): Color {
    if (typeof hexString !== "string") {
      throw new TypeError("hexString");
    }
    if (
      /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hexString) !== true
    ) {
      throw new RangeError("hexString");
    }
    // 他のfromXXXに合わせるなら無視して0扱い？
    // → と思ったが、3,4,6,8桁のうちどれなのかを判別する必要があるのでエラーとする

    const inputHex = hexString.substring(1);
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

    return Color.fromUint8Array(
      ByteSequence.parse(rrggbb + aa, { lowerCase: true }).getUint8View(),
    );
  }

  toRgb(options?: Color.ToRgbOptions): Color.Rgb {
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

    if (options?.discardAlpha === true) {
      return { r, g, b };
    }
    return { r, g, b, a };
  }

  toHsl(options?: Color.ToHslOptions): Color.Hsl {
    const { h, s, l } = this.#hsl;
    if (options?.discardAlpha === true) {
      return { h, s, l };
    }
    return { h, s, l, a: this.#a };
  }

  toHwb(options?: Color.ToHwbOptions): Color.Hwb {
    const { h, w, b } = this.#hwb;
    if (options?.discardAlpha === true) {
      return { h, w, b };
    }
    return { h, w, b, a: this.#a };
  }

  toUint8Array(options?: Color.ToUint8ArrayOptions): Uint8Array {
    const { r, g, b } = this.#rgbBytes;
    if (options?.discardAlpha === true) {
      return Uint8Array.of(r, g, b);
    }
    return Uint8Array.of(r, g, b, this.#alphaByte);
  }

  toUint8ClampedArray(options?: Color.ToUint8ArrayOptions): Uint8ClampedArray {
    const { r, g, b } = this.#rgbBytes;
    if (options?.discardAlpha === true) {
      return Uint8ClampedArray.of(r, g, b);
    }
    return Uint8ClampedArray.of(r, g, b, this.#alphaByte);
  }

  toHexString(options?: Color.ToHexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const bytes = ByteSequence.fromArrayBufferView(this.toUint8Array());
    const rrggbbaa: string = bytes.format({ lowerCase });

    let rrggbbaaOrRrggbb = rrggbbaa;
    if (options?.discardAlpha === true) {
      rrggbbaaOrRrggbb = rrggbbaaOrRrggbb.substring(0, 6);
    }

    //TODO ColorCssFormatに移す fromHexStringの3,4桁も移す？
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

  toString(): string {
    return this.toHexString({
      // omitAlphaIfOpaque: true,
      upperCase: true,
    });
  }

  toJSON(): _SRgb.Rgb.Normalized & { a: _Alpha } {
    return this.toRgb({
      mode: "precision",
    }) as (_SRgb.Rgb.Normalized & { a: _Alpha });
  }

  plusHue(relativeHue: number): Color {
    const { h, s, l } = this.#hsl;
    return Color.fromHsl({
      h: (h + relativeHue),
      s,
      l,
      a: this.#a,
    });
  }

  withHue(absoluteHue: number): Color {
    const { s, l } = this.#hsl;
    return Color.fromHsl({
      h: absoluteHue,
      s,
      l,
      a: this.#a,
    });
  }

  plusSaturation(relativeSaturation: number): Color {
    const { h, s, l } = this.#hsl;
    return Color.fromHsl({
      h,
      s: (s + relativeSaturation),
      l,
      a: this.#a,
    });
  }

  withSaturation(absoluteSaturation: number): Color {
    const { h, l } = this.#hsl;
    return Color.fromHsl({
      h,
      s: absoluteSaturation,
      l,
      a: this.#a,
    });
  }

  plusLightness(relativeLightness: number): Color {
    const { h, s, l } = this.#hsl;
    return Color.fromHsl({
      h,
      s,
      l: (l + relativeLightness),
      a: this.#a,
    });
  }

  withLightness(absoluteLightness: number): Color {
    const { h, s } = this.#hsl;
    return Color.fromHsl({
      h,
      s,
      l: absoluteLightness,
      a: this.#a,
    });
  }

  plusAlpha(relativeAlpha: number): Color {
    return new Color(
      this.#r,
      this.#g,
      this.#b,
      _normalizeAlpha(this.#a + relativeAlpha),
    );
  }

  withAlpha(absoluteAlpha: number): Color {
    return new Color(this.#r, this.#g, this.#b, _normalizeAlpha(absoluteAlpha));
  }

  withoutAlpha(): Color {
    return new Color(this.#r, this.#g, this.#b, _ALPHA_MAX);
  }
}

namespace Color {
  // 以下いずれか
  // ・r,g,bはバイト表現 0～255、aは0～1（多分一般的VuetifyとかReactの形式）
  // ・r,g,b,aすべてバイト表現 0～255
  // ・r,g,b,aすべて0～1
  export type Rgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  //TODO s,lは0～1が一般的？
  export type Hsl = {
    h: number;
    s: number;
    l: number;
    a?: number;
  };

  //TODO w,bは0～1が一般的？
  export type Hwb = {
    h: number;
    w: number;
    b: number;
    a?: number;
  };

  //XXX
  // export type FromOptions = {
  //   ignoreAlpha: boolean;
  // }

  //XXX space?: "srgb";

  export type ToOptions = {
    discardAlpha?: boolean;
    //XXX omitAlphaIfOpaque?: boolean
  };

  export type RgbOptions = {
    mode?: "compat" | "bytes" | "precision";
  };

  export type FromRgbOptions = RgbOptions;

  export type ToRgbOptions = RgbOptions & ToOptions;

  export type ToHslOptions = ToOptions;

  export type ToHwbOptions = ToOptions;

  export type ToUint8ArrayOptions = ToOptions;

  export type ToHexStringOptions = {
    upperCase?: boolean;
  } & ToOptions;
}

export { Color };
