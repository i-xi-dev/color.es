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

type _FromOptions = {
  ignoreAlpha?: boolean;
};

type _ToOptions = {
  discardAlpha?: boolean;
  omitAlphaIfOpaque?: boolean;
};

function _isRequiredAlpha(alpha: _Alpha, options?: _ToOptions): boolean {
  if (options?.discardAlpha === true) {
    return false;
  }
  if ((options?.omitAlphaIfOpaque === true) && (alpha === _ALPHA_MAX)) {
    return false;
  }
  return true;
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

  static fromRgb(rgba: Color.Rgb, options?: Color.FromRgbOptions): Color {
    // sRGB固定

    if (options?.mode === "precision") {
      const { r, g, b } = _SRgb.Rgb.normalize(rgba);
      const a = (options?.ignoreAlpha === true)
        ? _ALPHA_MAX
        : _normalizeAlpha(rgba.a);
      return new Color(r, g, b, a);
    } else {
      const { r, g, b } = _SRgb.RgbBytes.toRgb(rgba);
      let a: number = _ALPHA_MAX;
      if (options?.ignoreAlpha !== true) {
        if (options?.mode === "bytes") {
          if (Number.isFinite(rgba.a)) {
            a = Uint8.clamp(rgba.a) / Uint8.MAX_VALUE;
          }
        } else {
          a = _normalizeAlpha(rgba.a);
        }
      }
      return new Color(r, g, b, a);
    }
  }

  static fromHsl(hsla: Color.Hsl, options?: Color.FromHslOptions): Color {
    const { r, g, b } = _SRgb.Hsl.toRgb(hsla);
    const a = (options?.ignoreAlpha === true)
      ? _ALPHA_MAX
      : _normalizeAlpha(hsla.a);
    return new Color(r, g, b, a);
  }

  static fromHwb(hwba: Color.Hwb, options?: Color.FromHwbOptions): Color {
    const { r, g, b } = _SRgb.Hwb.toRgb(hwba);
    const a = (options?.ignoreAlpha === true)
      ? _ALPHA_MAX
      : _normalizeAlpha(hwba.a);
    return new Color(r, g, b, a);
  }

  static fromUint8Array(
    rgbaBytes: Uint8Array | Uint8ClampedArray,
    options?: Color.FromUint8ArrayOptions,
  ): Color {
    if (rgbaBytes[Symbol.iterator]) {
      const bytes: [number, number, number, number] = [
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MIN_VALUE,
        Uint8.MAX_VALUE,
      ];

      let i = 0;
      for (const byte of rgbaBytes) {
        if ((options?.ignoreAlpha === true) && (i >= 3)) {
          break;
        }
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

  static fromHexString(
    hexString: string,
    options?: Color.FromHexStringOptions,
  ): Color {
    if (typeof hexString !== "string") {
      throw new TypeError("hexString");
    }

    let rr = "00";
    let gg = "00";
    let bb = "00";
    let aa = "ff";
    if (options?.order === "argb") {
      if (/^#[0-9a-f]{8}$/i.test(hexString)) {
        if (options?.ignoreAlpha !== true) {
          aa = hexString.substring(1, 3);
        }
        rr = hexString.substring(3, 5);
        gg = hexString.substring(5, 7);
        bb = hexString.substring(7, 9);
      }
    } else {
      if (/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hexString)) {
        rr = hexString.substring(1, 3);
        gg = hexString.substring(3, 5);
        bb = hexString.substring(5, 7);
        if ((hexString.length === 9) && (options?.ignoreAlpha !== true)) {
          aa = hexString.substring(7, 9);
        }
      }
    }

    return Color.fromUint8Array(
      ByteSequence.parse(rr + gg + bb + aa).getUint8View(),
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

    if (_isRequiredAlpha(this.#a, options)) {
      return { r, g, b, a };
    }
    return { r, g, b };
  }

  toHsl(options?: Color.ToHslOptions): Color.Hsl {
    const { h, s, l } = this.#hsl;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, s, l, a: this.#a };
    }
    return { h, s, l };
  }

  toHwb(options?: Color.ToHwbOptions): Color.Hwb {
    const { h, w, b } = this.#hwb;
    if (_isRequiredAlpha(this.#a, options)) {
      return { h, w, b, a: this.#a };
    }
    return { h, w, b };
  }

  toUint8Array(options?: Color.ToUint8ArrayOptions): Uint8Array {
    const { r, g, b } = this.#rgbBytes;
    if (_isRequiredAlpha(this.#a, options)) {
      return Uint8Array.of(r, g, b, this.#alphaByte);
    }
    return Uint8Array.of(r, g, b);
  }

  toUint8ClampedArray(options?: Color.ToUint8ArrayOptions): Uint8ClampedArray {
    const { r, g, b } = this.#rgbBytes;
    if (_isRequiredAlpha(this.#a, options)) {
      return Uint8ClampedArray.of(r, g, b, this.#alphaByte);
    }
    return Uint8ClampedArray.of(r, g, b);
  }

  toHexString(options?: Color.ToHexStringOptions): string {
    const lowerCase = options?.upperCase !== true;

    const bytes = ByteSequence.fromArrayBufferView(this.toUint8Array());
    const rrggbbaa: string = bytes.format({ lowerCase });
    const rrggbb = rrggbbaa.substring(0, 6);
    const aa = rrggbbaa.substring(6);

    if (_isRequiredAlpha(this.#a, options) !== true) {
      return "#" + rrggbb;
    }

    if (options?.order === "argb") {
      return "#" + aa + rrggbb;
    }
    return "#" + rrggbb + aa;
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
  // ・r,g,bはバイト表現 0～255、aは0～1（多分一般的。VuetifyとかReactの形式）
  // ・r,g,b,aすべてバイト表現 0～255
  // ・r,g,b,aすべて0～1
  export type Rgb = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  export type Hsl = {
    h: number;
    s: number;
    l: number;
    a?: number;
  };

  export type Hwb = {
    h: number;
    w: number;
    b: number;
    a?: number;
  };

  //XXX space?: "srgb";

  type RgbOptions = {
    mode?: "compat" | "bytes" | "precision";
  };

  type HexStringOptions = {
    order?: "rgba" | "argb";
  };

  export type FromRgbOptions = RgbOptions & _FromOptions;

  export type ToRgbOptions = RgbOptions & _ToOptions;

  export type FromHslOptions = _FromOptions;

  export type ToHslOptions = _ToOptions;

  export type FromHwbOptions = _FromOptions;

  export type ToHwbOptions = _ToOptions;

  export type FromUint8ArrayOptions = _FromOptions;

  export type ToUint8ArrayOptions = _ToOptions;

  export type FromHexStringOptions = HexStringOptions & _FromOptions;

  export type ToHexStringOptions = HexStringOptions & {
    upperCase?: boolean;
  } & _ToOptions;
}

export { Color };
