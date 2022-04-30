//

import {
  type uint8,
  segment,
} from "@i-xi-dev/fundamental";
import { ByteSequence } from "@i-xi-dev/bytes";

// alpha >= 0 && alpha <= 1
type alpha = number;

// hue >= 0 && hue < 360
type hue = number;

// hsl_s >= 0 && hsl_s <= 1
type hsl_s = number;

// hsl_l >= 0 && hsl_l <= 1
type hsl_l = number;

type _AlphaChannel = {
  a: alpha,
}

type _ClampedRgb = {
  r: uint8,
  g: uint8,
  b: uint8,
};

function _isRgb(value: unknown): value is Color.Rgb {
  const r = (value as Color.Rgb).r;
  const g = (value as Color.Rgb).g;
  const b = (value as Color.Rgb).b;
  return (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b));
}

function _isRgba(value: unknown): value is Color.Rgba {
  if (_isRgb(value) !== true) {
    return false;
  }
  const a = (value as Color.Rgba).a;
  return Number.isFinite(a);
}

function _clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min;
  }
  else if (val > max) {
    return max;
  }
  return val;
}

const _RgbComponentIndex = {
  R: 0,
  G: 1,
  B: 2,
} as const;
export type _RgbComponentIndex = typeof _RgbComponentIndex[keyof typeof _RgbComponentIndex];

const _alphaIndex = 3;

function _rgbToHsl(rgb: _ClampedRgb): Color.Hsl {
  const { r, g, b } = rgb;
  const rgbMin = Math.min(r, g, b) as uint8;
  const rgbMax = Math.max(r, g, b) as uint8;
  const rgbMaxMinusMin = (rgbMax - rgbMin);
  const rgbMaxPlusMin = (rgbMax + rgbMin);
  const l255 = (rgbMaxPlusMin / 2);

  // h
  const hue: hue = (() => {
    if (rgbMax === rgbMin) {
      return 0;
    }
    let h: number;
    switch (rgbMax) {
      case r:
        h = 60 * ((g - b) / rgbMaxMinusMin);
        break;
      case g:
        h = 60 * ((b - r) / rgbMaxMinusMin) + 120;
        break;
      //case b:
      default:
        h = 60 * ((r - g) / rgbMaxMinusMin) + 240;
        break;
    }
    return (h < 0) ? (h + 360) : h;
  })();

  // s
  const saturation: hsl_s = (() => {
    let s: number;
    if (l255 <= 127) {
      s = rgbMaxMinusMin / rgbMaxPlusMin;
    } else {
      s = rgbMaxMinusMin / (510 - rgbMaxMinusMin);
    }
    return s;
  })();

  // l
  const lightness: hsl_l = (() => {
    return (l255 / 255);
  })();

  return {
    h: hue,
    s: saturation,
    l: lightness,
  };
}

/**
 * RGBA color in sRGB color space
 */
class Color {
  #rgba: [ number, number, number, number ];
  #rgbaBytes: Uint8ClampedArray;

  private constructor(rgba: Color.Rgba) {
    this.#rgba = [ 0, 0, 0, 255 ];
    this.#rgbaBytes = Uint8ClampedArray.of(0, 0, 0, 255);
    Object.seal(this);

    this.setRgb(rgba);
    this.setOpacity(rgba.a);
  }

  get r(): uint8 {
    return this.#rgbaBytes[_RgbComponentIndex.R] as uint8;
  }

  get g(): uint8 {
    return this.#rgbaBytes[_RgbComponentIndex.G] as uint8;
  }

  get b(): uint8 {
    return this.#rgbaBytes[_RgbComponentIndex.B] as uint8;
  }

  get #sR(): number {
    return _clamp(this.#rgba[_RgbComponentIndex.R], 0, 255);
  }

  get #sG(): number {
    return _clamp(this.#rgba[_RgbComponentIndex.G], 0, 255);
  }

  get #sB(): number {
    return _clamp(this.#rgba[_RgbComponentIndex.B], 0, 255);
  }

  get opacity(): alpha {
    return _clamp(this.#rgba[_alphaIndex], 0, 1);
  }

  #setRgbComponent(index: _RgbComponentIndex, value: number): void {
    this.#rgba[index] = value;
    this.#rgbaBytes[index] = value;
  }

  setRgb(absoluteRgb: Color.Rgb): this {
    if (_isRgb(absoluteRgb) !== true) {
      throw new TypeError("absoluteRgb");
    }
    this.#setRgbComponent(_RgbComponentIndex.R, absoluteRgb.r);
    this.#setRgbComponent(_RgbComponentIndex.G, absoluteRgb.g);
    this.#setRgbComponent(_RgbComponentIndex.B, absoluteRgb.b);
    return this;
  }

  addRgb(relativeRgb: Color.Rgb): this {
    if (_isRgb(relativeRgb) !== true) {
      throw new TypeError("relativeRgb");
    }
    return this.setRgb({
      r: this.#sR + relativeRgb.r,
      g: this.#sG + relativeRgb.g,
      b: this.#sB + relativeRgb.b,
    });
  }

  setOpacity(absoluteAlpha: number): this {
    if (Number.isFinite(absoluteAlpha) !== true) {
      throw new TypeError("absoluteAlpha");
    }
    this.#rgba[_alphaIndex] = absoluteAlpha;
    this.#rgbaBytes[_alphaIndex] = (absoluteAlpha * 255);
    return this;
  }

  addOpacity(relativeAlpha: number): this {
    if (Number.isFinite(relativeAlpha) !== true) {
      throw new TypeError("relativeAlpha");
    }
    return this.setOpacity(this.opacity + relativeAlpha);
  }

  discardTransparency(): this {
    return this.setOpacity(1);
  }

  static fromRgb(rgb: Color.Rgb): Color {
    if (_isRgb(rgb) !== true) {
      throw new TypeError("rgb");
    }
    return Color.fromRgba(Object.assign({
      a: 1,
    }, rgb));
  }

  toRgb(): Color.Rgb {
    const rgb: _ClampedRgb = {
      r: this.r,
      g: this.g,
      b: this.b,
    };
    return rgb;
  }

  static fromRgba(rgba: Color.Rgba): Color {
    if (_isRgba(rgba) !== true) {
      throw new TypeError("rgba");
    }
    return new Color(rgba);
  }

  toRgba(): Color.Rgba {
    const rgba: _ClampedRgb & { a: number } = {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.opacity,
    };
    return rgba;
  }

  static fromHsl(hsl: Color.Hsl): Color {
    throw new Error("not implemented"); //TODO
  }

  toHsl(): Color.Hsl {
    return _rgbToHsl(this);
  }

  static fromHsla(hsla: Color.Hsla): Color {
    throw new Error("not implemented"); //TODO
  }

  toHsla(): Color.Hsla {
    const hsl = this.toHsl();
    return {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l,
      a: this.opacity,
    };
  }

  static fromHexString(input: string): Color {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})?$/i.test(input) !== true) {
      throw new RangeError("input");
    }

    const chars = [ ...input.substring(1) ];
    let r: [ string, string ];
    let g: [ string, string ];
    let b: [ string, string ];
    let a: [ string, string ] = [ "f", "f" ];
    if (chars.length < 4) {
      r = [ chars[0] as string, chars[0] as string ];
      g = [ chars[1] as string, chars[1] as string ];
      b = [ chars[2] as string, chars[2] as string ];
      if (chars.length === 4) {
        a = [ chars[3] as string, chars[3] as string ];
      }
    }
    else {
      r = [ chars[0] as string, chars[1] as string ];
      g = [ chars[2] as string, chars[3] as string ];
      b = [ chars[4] as string, chars[5] as string ];
      if (chars.length === 8) {
        a = [ chars[6] as string, chars[7] as string ];
      }
    }

    return Color.fromRgba({
      r: Number.parseInt(r.join(""), 16),
      g: Number.parseInt(g.join(""), 16),
      b: Number.parseInt(b.join(""), 16),
      a: (Number.parseInt(a.join(""), 16) / 255),
    });
  }

  toHexString(options: Color.HexFormatOptions = {}): string {
    const bytes = ByteSequence.fromArrayBufferView(this.#rgbaBytes);
    const hexRgba = bytes.format({ lowerCase: true });
    const [ hexR, hexG, hexB, hexA ] = segment(hexRgba, { count: 2, unit: "char" }) as [ string, string, string, string ];

    const omitAlphaMode = options?.omitAlpha ? options.omitAlpha : Color.OmitAlpha.IF_OPAQUE;
    const omitAlpha = (
      (omitAlphaMode === Color.OmitAlpha.ALWAYS) ||
      ((omitAlphaMode === Color.OmitAlpha.IF_OPAQUE) && (hexA === "ff"))
    );
    const hexComponents = (omitAlpha === true) ? [ hexR, hexG, hexB ] : [ hexR, hexG, hexB, hexA ];

    const shorten = (
      (options?.shorten === true) &&
      (hexComponents.every((str) => /^([0-9a-z])\1$/.test(str)))
    );

    return "#" + hexComponents.map((c) => {
      if (shorten === true) {
        c = c.substring(0, 1);
      }
      if (options?.upperCase === true) {
        c = c.toUpperCase();
      }
      return c;
    }).join("");
  }

  //TODO
  // 色相セット(absoluteHue): this
  // 色相加算(relativeHue): this
  // 彩度セット(absoluteS): this
  // 彩度加算(relativeS): this
  // 明度セット(absoluteL): this
  // 明度加算(relativeL): this
  // equals(other: Color): boolean
  // 
  // clone(): Color
  // mix(blendMode, other: Color): this

  static fromString(): Color {
    throw new Error("not implemented"); //TODO
  }

  toString(): string {
    return this.toHexString();
  }

  toJSON(): Color.Rgb {
    return this.toRgb();
  }

  toCssString(options: Color.CssFormatOptions = {}): string {
    const omitAlphaMode = options.omitAlpha ? options.omitAlpha : Color.OmitAlpha.IF_OPAQUE;
    const omitAlpha = (
      (omitAlphaMode === Color.OmitAlpha.ALWAYS) ||
      ((omitAlphaMode === Color.OmitAlpha.IF_OPAQUE) && (this.opacity === 1))
    );

    switch (options?.style) {
      case Color.CssFormatStyle.L4_HSL:
      case Color.CssFormatStyle.LEGACY_HSL:
        return this.#toCssHslFunction(omitAlpha, options.style);

      default:
        return this.#toCssRgbFunction(omitAlpha, options.style);
    }
  }

  #toCssRgbFunction(omitAlpha: boolean, style: Color.CssFormatStyle = Color.CssFormatStyle.LEGACY_RGB): string {
    const { r, g, b } = this;
    if (style === Color.CssFormatStyle.L4_RGB) {
      if (omitAlpha === true) {
        return `rgb(${ r } ${ g } ${ b })`;
      }
      return `rgb(${ r } ${ g } ${ b } / ${ this.opacity })`;
    }
    else /* Color.CssFormatStyle.LEGACY_RGB */ {
      if (omitAlpha === true) {
        return `rgb(${ r }, ${ g }, ${ b })`;
      }
      return `rgba(${ r }, ${ g }, ${ b }, ${ this.opacity })`;
    }
  }

  #toCssHslFunction(omitAlpha: boolean, style: Color.CssFormatStyle = Color.CssFormatStyle.LEGACY_HSL): string {
    const hsl = this.toHsl();
    const sp = (hsl.s * 100);
    const lp = (hsl.l * 100);
    if (style === Color.CssFormatStyle.L4_HSL) {
      if (omitAlpha === true) {
        return `hsl(${ hsl.h }deg ${ sp }% ${ lp }%)`;
      }
      return `hsl(${ hsl.h }deg ${ sp }% ${ lp }% / ${ this.opacity })`;
    }
    else /* Color.CssFormatStyle.LEGACY_HSL */ {
      if (omitAlpha === true) {
        return `hsl(${ hsl.h }, ${ sp }%, ${ lp }%)`;
      }
      return `hsl(${ hsl.h }, ${ sp }%, ${ lp }%, ${ this.opacity })`;
    }
  }

}

namespace Color {
  export type Rgb = {
    r: number,
    g: number,
    b: number,
  };

  export type Rgba = Rgb & _AlphaChannel;

  export type Hsl = {
    h: hue,
    s: hsl_s,
    l: hsl_l,
  };

  export type Hsla = Hsl & _AlphaChannel;

  export const OmitAlpha = {
    IF_OPAQUE: "if-opaque",
    ALWAYS: "always",
    NEVER: "never",
  } as const;
  export type OmitAlpha = typeof OmitAlpha[keyof typeof OmitAlpha];

  export type HexFormatOptions = {
    omitAlpha?: OmitAlpha,
    upperCase?: boolean,
    shorten?: boolean,
  };

  export const CssFormatStyle = {
    LEGACY_RGB: "legacy-rgb",
    LEGACY_HSL: "legacy-hsl",
    L4_RGB: "l4-rgb",
    L4_HSL: "l4-hsl",
    // XXX lab, lch, ...
  } as const;
  export type CssFormatStyle = typeof CssFormatStyle[keyof typeof CssFormatStyle];

  export type CssFormatOptions = {
    style?: CssFormatStyle,
    omitAlpha?: OmitAlpha,
    // XXX percentage
  };
}

Object.freeze(Color);




/*
static fromCssString(cssString: string): RgbColor {
  // computed valueを使うならrgb(a)関数以外の値にはならないはず
  if (typeof cssString === "string") {
    const trimmed = cssString.trim().toLowerCase();
    if (trimmed.startsWith("#")) {
      return RgbColor.#parseCssHexColor(trimmed);
    }
    else if (trimmed === "transparent") {
      return RgbColor.fromRgb(0, 0, 0); // XXX グラデーションやアニメーションで補完されるときはalpha以外無視する仕様
    }
    else if (trimmed.startsWith("rgb(") || trimmed.startsWith("rgba(")) {
      return RgbColor.#parseCssRgbFunction(trimmed);
    }
    else if (trimmed.startsWith("hsl(") || trimmed.startsWith("hsla(")) {
      return RgbColor.#parseCssHslFunction(trimmed);
    }
    else if (trimmed.startsWith("var(")) {
      throw new RangeError("cssString");
    }
    else if ([ "inherit", "initial", "unset", "revert", "currentcolor" ].includes(trimmed)) {
      throw new RangeError("cssString");
    }
    else {
      // XXX: not implemented: color names, hwb(), システム色L4, deprecatedシステム色, ...
    }
  }
  throw new TypeError("cssString");
}

static #parseCssHexColor(cssString: string): RgbColor {
  void cssString;
  throw new Error("not implemented");
}

static #parseCssRgbFunction(cssString: string): RgbColor {
  const result = (new RegExp(RGBFUNC, "i")).exec(cssString);
  
}

static #parseCssHslFunction(cssString: string): RgbColor {
  void cssString;
  throw new Error("not implemented");
}
*/
// }

const SP = "[\\u0009\\u000A\\u000D\\u0020]*";
const CM = `${SP},${SP}`;
const SL = `${SP}/${SP}`;
const NUM = `\\-?(?:[0-9]*\\.)?[0-9]+`;
const PERCENT = `\\-?(?:[0-9]*\\.)?[0-9]+%`;
const NUM_L4 = `(?:\\-?(?:[0-9]*\\.)?[0-9]+|none)`;
const PERCENT_L4 = `(?:\\-?(?:[0-9]*\\.)?[0-9]+%|none)`;
const ALPHA_L4 = `(?:\\-?(?:[0-9]*\\.)?[0-9]+%?|none)`;
const ALPHA_L4L = `(?:\\-?(?:[0-9]*\\.)?[0-9]+%?)`;

const RGB_NUM_L4 = `rgb\\(${SP}(${NUM_L4})${SP}(${NUM_L4})${SP}(${NUM_L4})(?:${SL}(${ALPHA_L4}))?${SP}\\)`;
const RGB_PERCENT_L4 = `rgb\\(${SP}(${PERCENT_L4})${SP}(${PERCENT_L4})${SP}(${PERCENT_L4})(?:${SL}(${ALPHA_L4}))?${SP}\\)`;

const RGB_NUM_L4L = `rgba?\\(${SP}(${NUM})${CM}(${NUM})${CM}(${NUM})(?:${CM}(${ALPHA_L4L}))?${SP}\\)`;
const RGB_PERCENT_L4L = `rgba?\\(${SP}(${PERCENT})${CM}(${PERCENT})${CM}(${PERCENT})(?:${CM}(${ALPHA_L4L}))?${SP}\\)`;

const RGBFUNC = `^(?:${RGB_NUM_L4}|${RGB_PERCENT_L4}|${RGB_NUM_L4L}|${RGB_PERCENT_L4L})$`;
