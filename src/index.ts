//

import {
  type uint8,
} from "@i-xi-dev/fundamental";

function _isRgbData(value: unknown): value is Color.RgbData {
  const r = (value as Color.RgbData).r;
  const g = (value as Color.RgbData).g;
  const b = (value as Color.RgbData).b;
  if (Number.isFinite(r) && Number.isFinite(g) && Number.isFinite(b)) {
    const a = (value as Color.RgbData).a;
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

function _clampAsUint8(val: number): uint8 {
  return Math.trunc(_clamp(val, 0, 255)) as uint8;
}

class Color {
  #red: number;
  #green: number;
  #blue: number;
  #alpha: number;

  private constructor(r: number, g: number, b: number, a?: number) {
    this.#red = r;
    this.#green = g;
    this.#blue = b;
    this.#alpha = (typeof a === "number") ? a : 1;
    //TODO 不変の方が良い？
  }

  static fromRgb(rgb: Color.RgbData): Color {
    if (_isRgbData(rgb) !== true) {
      throw new TypeError("rgb");
    }

    return new Color(rgb.r, rgb.g, rgb.b, rgb.a);
  }

  toRgb(): Color.RgbData {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a,
    };
  }

  get r(): uint8 {
    return _clampAsUint8(this.#red);
  }

  get g(): uint8 {
    return _clampAsUint8(this.#green);
  }

  get b(): uint8 {
    return _clampAsUint8(this.#blue);
  }

  get a(): number {
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

  //TODO
  // addR,addG,addB/plusA,minusA,...
  // rotateHue(deg)
  // saturate(number)
  // lighter(number)
  // equals()
  // clone()
  // fromString()
  // toString()
  // toJSON()
  // toCssString(options)

}

namespace Color {
  export type RgbData = {
    r: number,
    g: number,
    b: number,
    a?: number,
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
