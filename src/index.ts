//

import {
  type uint8,
  segment,
  Uint8,
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

// hwb_w >= 0 && hwb_w <= 1
type hwb_w = number;

// hwb_b >= 0 && hwb_b <= 1
type hwb_b = number;




type _ClampedRgb = {
  r: uint8,
  g: uint8,
  b: uint8,
};

function _clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min;
  }
  else if (val > max) {
    return max;
  }
  return val;
}

function _isRgbParams(value: unknown): value is SrgbColor.RgbParams {
  const { r, g, b, a } = value as SrgbColor.RgbParams;
  const rValid = Number.isFinite(r);
  const gValid = Number.isFinite(g);
  const bValid = Number.isFinite(b);
  const aValid = Number.isFinite(a) || (a === undefined);
  return (rValid && gValid && bValid && aValid);
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
class SrgbColor {
  #r: number;
  #g: number;
  #b: number;
  #a: number;

  private constructor(r: number, g: number, b: number, a: number) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
    this.#a = a;
    Object.seal(this);
  }

  get opacity(): alpha {
    return this.#a;
  }

  setOpacity(absoluteAlpha: number): this {
    if (Number.isFinite(absoluteAlpha) !== true) {
      throw new TypeError("absoluteAlpha");
    }
    this.#a = absoluteAlpha;
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

  static fromRgb(rgba: SrgbColor.RgbParams): SrgbColor {
    if (_isRgbParams(rgba) !== true) {
      throw new TypeError("rgb");
    }
    const { r: rByte, g: gByte, b: bByte, a } = rgba;
    const aByte = Uint8ClampedArray.of(a ? (a * 255) : 255)[0] as uint8;
    return SrgbColor.fromBytes([ rByte, gByte, bByte, aByte ]);
  }

  toRgb(): SrgbColor.RgbParams {
    const [ r, g, b ] = this.toBytes() ;
    return {
      r,
      g,
      b,
      a: this.#a,
    };
  }

  static fromBytes(rgbaBytes: Iterable<number>): SrgbColor {
    if (rgbaBytes[Symbol.iterator]) {
      const rgba: [ number, number, number, number ] = [ 0, 0, 0, 1 ];

      let i = 0;
      for (const byte of rgbaBytes) {
        if (Uint8.isUint8(byte)) {
          rgba[i] = byte / 255;
        }
        if (i >= 3) {
          break;
        }
        i = i + 1;
      }
      return new SrgbColor(...rgba);
    }
    throw new TypeError("rgbaBytes");
  }

  static fromArray

  toArray(): [ number, number, number, number ] {
    return [ ...Uint8ClampedArray.of(
      this.#r * 255,
      this.#g * 255,
      this.#b * 255,
      this.#a * 255,
    ) ] as [ uint8, uint8, uint8, uint8 ];
  }

  //TODO static fromHsl(hsla: Color.Hsl): SrgbColor

  toHsl(): Color.Hsl {
    const { h, s, l } = this.toHsl();
    return {
      h,
      s,
      l,
      a: this.#a,
    };
  }

  static fromHexString(input: string): SrgbColor {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (/^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})?$/i.test(input) !== true) {
      throw new RangeError("input");
    }

    const inputHex = input.substring(1);
    let rrggbbaa: string;
    switch (inputHex.length) {
      case 8:
      case 6:
        rrggbbaa = inputHex;
        break;
      case 4:
      case 3:
      default:
        rrggbbaa = [ ...inputHex ].map(h => h.repeat(2)).join("");
        break;
    }
    if (rrggbbaa.length < 8) {
      rrggbbaa = rrggbbaa + "ff";
    }
    rrggbbaa = rrggbbaa.toLowerCase();

    return SrgbColor.fromBytes(ByteSequence.parse(rrggbbaa, { lowerCase: true }).getUint8View());
  }

  toHexString(options: Color.HexFormatOptions = {}): string {
    const bytes = this.toArray();
    const rrggbbaa = ByteSequence.fromArray(bytes).format({ lowerCase: true });

    const [ rr, gg, bb, aa ] = segment(rrggbbaa, { count: 2, unit: "char" }) as [ string, string, string, string ];

    const omitAlphaMode = options?.omitAlpha ? options.omitAlpha : Color.OmitAlpha.IF_OPAQUE;
    const omitAlpha = (
      (omitAlphaMode === Color.OmitAlpha.ALWAYS) ||
      ((omitAlphaMode === Color.OmitAlpha.IF_OPAQUE) && (aa === "ff"))
    );
    const hexComponents = (omitAlpha === true) ? [ rr, gg, bb ] : [ rr, gg, bb, aa ];

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
  // HSL彩度セット(absoluteS): this
  // HSL彩度加算(relativeS): this
  // HSL明度セット(absoluteL): this
  // HSL明度加算(relativeL): this
  // HWB白セット(absoluteW): this
  // HWB白加算(relativeW): this
  // HWB黒セット(absoluteB): this
  // HWB黒加算(relativeB): this
  // equals(other: SrgbColor | *): boolean
  // 
  // clone(): SrgbColor
  // mix(blendMode, other: SrgbColor | *): this

  //TODO static fromString(): SrgbColor {

  toString(): string {
    return this.toHexString();
  }

  // toJSON(): Color.Rgb {
  //   return this.toRgb(); // rgbは0-255の方が一般的か？
  // }

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

namespace SrgbColor {
  export type RgbParams = {
    r: number, // 0-255
    g: number, // 0-255
    b: number, // 0-255
    a?: alpha, // 0-1
  };
}

namespace Color {
  // 


  export type Hsl = {
    h: hue, // angle
    s: hsl_s, // 0-1
    l: hsl_l, // 0-1
    a?: alpha, // 0-1
  };

  export type Hwb = {
    h: hue, // angle
    w: hwb_w, // 0-1
    b: hwb_b, // 0-1
    a?: alpha, // 0-1
  };

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
