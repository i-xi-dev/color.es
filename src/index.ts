//

import {
  type uint8,
} from "@i-xi-dev/fundamental";
import { stringify } from "querystring";

function _isRgbData(value: unknown): value is Color.Rgb {
  const r = (value as Color.Rgb).r;
  const g = (value as Color.Rgb).g;
  const b = (value as Color.Rgb).b;
  if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) {
    const a = (value as Color.Rgb).a;
    return (Number.isFinite(a) || (a === undefined));
  }
  return false;
}

// hslhue >= 0 && hslhue < 360
type hslhue = number;

// hslsaturation >= 0 && hslsaturation <= 100
type hslsaturation = number;

// hslhue >= 0 && hslhue <= 100
type hsllightness = number;

function _clamp(val: number, min: number, max: number): number {
  if (val < min) {
    return min;
  }
  else if (val > max) {
    return max;
  }
  return val;
}

class Color {
  // #scR: number;
  // #scG: number;
  // #scB: number;
  #sRgbClamped: Uint8ClampedArray;
  #alpha: number;

  private constructor(r: number, g: number, b: number, alpha: number) {
    // this.#scR = r;
    // this.#scG = g;
    // this.#scB = b;
    this.#sRgbClamped = Uint8ClampedArray.of(r, g, b, (alpha * 255));
    this.#alpha = alpha;
    Object.seal(this);
  }

  get r(): uint8 {
    return this.#sRgbClamped[0] as uint8;
  }

  get g(): uint8 {
    return this.#sRgbClamped[1] as uint8;
  }

  get b(): uint8 {
    return this.#sRgbClamped[2] as uint8;
  }

  get alpha(): number {
    return _clamp(this.#alpha, 0, 1);
  }

  get #max(): uint8 {
    return Math.max(this.r, this.g, this.b) as uint8;
  }

  get #min(): uint8 {
    return Math.min(this.r, this.g, this.b) as uint8;
  }

  get #maxMinusMin(): uint8 {
    return (this.#max - this.#min) as uint8;
  }

  get #maxPlusMin(): number /* int */ {
    return (this.#max + this.#min);
  }

  get #luminance255(): number {
    return (this.#maxPlusMin / 2);
  }

  get hue(): hslhue {
    if (this.#max === this.#min) {
      return 0;
    }
    let h: number;
    if (this.r === this.#max) {
      h = 60 * ((this.g - this.b) / this.#maxMinusMin);
    }
    else if (this.g === this.#max) {
      h = 60 * ((this.b - this.r) / this.#maxMinusMin) + 120;
    }
    else /* if (this.b === this.#max) */ {
      h = 60 * ((this.r - this.g) / this.#maxMinusMin) + 240;
    }
    return (h < 0) ? (h + 360) : h;
  }

  get saturation(): hslsaturation {
    let saturation1: number;
    if (this.#luminance255 <= 127) {
      saturation1 = this.#maxMinusMin / this.#maxPlusMin;
    } else {
      saturation1 = this.#maxMinusMin / (510 - this.#maxMinusMin);
    }
    return (saturation1 * 100);
  }

  get luminance(): hsllightness {
    return ((this.#luminance255 / 255) * 100);
  }

  setRgb(rgb: Color.Rgb): this {
    if (_isRgbData(rgb) !== true) {
      throw new TypeError("rgb");
    }

    this.#sRgbClamped[0] = rgb.r;
    this.#sRgbClamped[1] = rgb.g;
    this.#sRgbClamped[2] = rgb.b;

    const alpha = ((typeof rgb.a === "number") && Number.isFinite(rgb.a)) ? rgb.a : 1;
    this.#sRgbClamped[3] = (alpha * 255);
    this.#alpha = alpha;
    return this;
  }

  static fromRgb(rgb: Color.Rgb): Color {
    if (_isRgbData(rgb) !== true) {
      throw new TypeError("rgb");
    }

    const alpha = ((typeof rgb.a === "number") && Number.isFinite(rgb.a)) ? rgb.a : 1;
    return new Color(rgb.r, rgb.g, rgb.b, alpha);
  }

  static fromHsl(hsl: Color.Hsl): Color {
    throw new Error("not implemented"); //TODO
  }

  toRgb(): Color.Rgb {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.alpha,
    };
  }

  toHsl(): Color.Hsl {
    return {
      h: this.hue,
      s: this.saturation,
      l: this.luminance,
      a: this.alpha,
    };
  }

  //TODO
  // rotateHue(deg)
  // saturate(number)
  // lighter(number)
  // equals()
  // clone()
  // mix(blendMode): this

  static fromString(): Color {
    throw new Error("not implemented"); //TODO
  }

  static fromHexString(input: string): Color {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (/^#[0-9A-Fa-f]{3,4,6,8}$/.test(input) !== true) {
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

    return Color.fromRgb({
      r: Number.parseInt(r.join(""), 16),
      g: Number.parseInt(g.join(""), 16),
      b: Number.parseInt(b.join(""), 16),
      a: (Number.parseInt(a.join(""), 16) / 255),
    });
  }

  toString(): string {
    return this.toHexString();
  }

  toJSON(): Color.Rgb {
    return this.toRgb();
  }

  toHexString(options: Color.HexFormatOptions = {}): string {
    const [ r1, r2 ] = [ ...this.r.toString(16).padStart(2, "0") ] as [ string, string ];
    const [ g1, g2 ] = [ ...this.g.toString(16).padStart(2, "0") ] as [ string, string ];
    const [ b1, b2 ] = [ ...this.b.toString(16).padStart(2, "0") ] as [ string, string ];
    const [ a1, a2 ] = [ ...(this.#sRgbClamped[3] as uint8).toString(16).padStart(2, "0") ] as [ string, string ];

    let r: string;
    let g: string;
    let b: string;
    let a: string;
    if ((options?.shorten === true) && (r1 === r2) && (g1 === g2) && (b1 === b2) && (a1 === a2)) {
      r = r1;
      g = g1;
      b = b1;
      a = a1;
    }
    else {
      r = r1 + r2;
      g = g1 + g2;
      b = b1 + b2;
      a = a1 + a2;
    }

    let rgb: string;
    if (options?.style === Color.HexFormatStyle.RGBA) {
      rgb = r + g + b + a;
    }
    else /* if (options?.style === Color.HexFormatStyle.RGB) */ {
      rgb = r + g + b;
    }

    const str = "#" + rgb;
    if (options?.upperCase === true) {
      return str.toUpperCase();
    }
    return str;
  }

  toCssString(options: Color.CssFormatOptions = {}): string {
    const hslStyles = [
      Color.CssFormatStyle.L4_HSL,
      Color.CssFormatStyle.LEGACY_HSL,
      Color.CssFormatStyle.LEGACY_HSLA,
    ] as string[];
    if (hslStyles.includes(options?.style as string)) {
      return this.#toCssHslFunction(options?.style);
    }
    else {
      return this.#toCssRgbFunction(options?.style);
    }
  }

  #toCssRgbFunction(style?: Color.CssFormatStyle): string {
    if (style === Color.CssFormatStyle.L4_RGB) {
      return `rgb(${ this.r } ${ this.g } ${ this.b } / ${ this.alpha })`;
    }
    else if (style === Color.CssFormatStyle.LEGACY_RGB) {
      return `rgb(${ this.r }, ${ this.g }, ${ this.b })`;
    }
    else /* if (style === Color.CssFormatStyle.LEGACY_RGBA) */ {
      return `rgba(${ this.r }, ${ this.g }, ${ this.b }, ${ this.alpha })`;
    }
  }

  #toCssHslFunction(style?: Color.CssFormatStyle): string {
    if (style === Color.CssFormatStyle.L4_HSL) {
      return `hsl(${ this.hue } ${ this.saturation } ${ this.luminance } / ${ this.alpha })`;
    }
    else if (style === Color.CssFormatStyle.LEGACY_HSL) {
      return `hsl(${ this.hue }, ${ this.saturation }, ${ this.luminance })`;
    }
    else /* if (style === Color.CssFormatStyle.LEGACY_HSLA) */ {
      return `hsla(${ this.hue }, ${ this.saturation }, ${ this.luminance }, ${ this.alpha })`;
    }
  }

}

namespace Color {
  export type Rgb = {
    r: number,
    g: number,
    b: number,
    a?: number,
  };

  export type Hsl = {
    h: number,
    s: number,
    l: number,
    a?: number,
  };

  export const HexFormatStyle = {
    RGB: "rgb", // HTML, CSS(1,2,3,4,5), ...
    RGBA: "rgba", // CSS(5), ...
  } as const;
  export type HexFormatStyle = typeof HexFormatStyle[keyof typeof HexFormatStyle];

  export type HexFormatOptions = {
    style?: HexFormatStyle,
    upperCase?: boolean,
    shorten?: boolean,
  };

  export const CssFormatStyle = {
    LEGACY_RGB: "legacy-rgb", // CSS(1,2,3), ...
    LEGACY_RGBA: "legacy-rgba", // CSS(3), ...
    LEGACY_HSL: "legacy-hsl", // CSS(3), ...
    LEGACY_HSLA: "legacy-hsla", // CSS(3), ...
    L4_RGB: "l4-rgb", // CSS(4,5), ...
    L4_HSL: "l4-hsl", // CSS(4,5), ...
    // XXX lab, lch, ...
  } as const;
  export type CssFormatStyle = typeof CssFormatStyle[keyof typeof CssFormatStyle];

  export type CssFormatOptions = {
    style?: CssFormatStyle,
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
