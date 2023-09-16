import { StringUtils } from "../deps.ts";
import { Color } from "./color.ts";
import { rgbFromName } from "./css_color_name.ts";

namespace CssColorFormat {
  /*
  export type Options = {

  };

  export type ParseOptions = Options & {

  };
  */

  export type FormatOptions = /* Options & */ {
    notation?: "hex" | "rgb" | "hsl";
    upperCase?: boolean;
    shortenIfPossible?: boolean;
    legacy?: boolean;
  };

  export function parse(colorString: string): Color {
    if (StringUtils.isNonEmptyString(colorString) !== true) {
      throw new TypeError("colorString");
    }

    const lowerCased = colorString.toLocaleLowerCase();
    if (lowerCased.startsWith("#")) {
      return _parseHex(colorString);
    } else if (/^rgba?\(/.test(lowerCased)) {
      return _parseRgb(colorString);
    } else if (/^hsla?\(/.test(lowerCased)) {
      return _parseHsl(colorString);
    }

    const colorFromName = _fromName(lowerCased);
    if (colorFromName) {
      return colorFromName;
    }

    if (lowerCased === "transparent") {
      return Color.fromUint8Array(Uint8Array.of(0, 0, 0, 0));
    }

    // currentcolor
    // inherit
    // initial
    // revert
    // unset
    // var()
    // ...
    throw new RangeError("colorString");
  }

  export function format(color: Color, options?: FormatOptions): string {
    if ((color instanceof Color) !== true) {
      throw new TypeError("color");
    }

    switch (options?.notation) {
      case "rgb":
        return _formatRgb(color, options);

      case "hsl":
        return _formatHsl(color, options);

      default:
        return _formatHex(color, options);
    }
  }
}

// 以下、全般的にコメントには対応しない

// ドラフトを参照しているものは注意（意外と頻繁に変わる）

// ws* https://drafts.csswg.org/css-syntax-3/#ws*-diagram
// const _WS = `[\\u0009\\u000A\\u0020]*`;
//XXX U+000C,U+000D はCSSの解析器によってU+000A に変換されるので上記仕様では除外されているが、
//    当処理はCSS解析器を通しているわけではないので U+000C,U+000D も含めることにする
const _WHITESPACE = `[\\u0009\\u000A\\u000C\\u000D\\u0020]`;
const _WS = `${_WHITESPACE}*`;

// <number> https://drafts.csswg.org/css-syntax-3/#number-token-diagram
const _NUM = `[-+]?(?:[0-9]*\\.)?[0-9]+`;
//XXX 指数表記は現バージョンでは対応しない

// <percentage> https://drafts.csswg.org/css-syntax-3/#percentage-token-diagram
const _PERC = `${_NUM}%`;

const _CMS = `${_WS},${_WS}`;

// 以下は https://drafts.csswg.org/css-color-4/#rgb-functions

// <alpha-value> https://drafts.csswg.org/css-color-4/#typedef-alpha-value
const _ALPHA = `${_NUM}%?`;

// <legacy-rgb-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-rgb-syntax
// <legacy-rgba-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-rgba-syntax
const _L_RGB_N =
  `^rgba?\\(${_WS}${_NUM}(?:${_CMS}${_NUM}){2}(?:${_CMS}${_ALPHA})?${_WS}\\)$`;
const _L_RGB_P =
  `^rgba?\\(${_WS}${_PERC}(?:${_CMS}${_PERC}){2}(?:${_CMS}${_ALPHA})?${_WS}\\)$`;
const _L_RGB = `(?:${_L_RGB_N}|${_L_RGB_P})`;

// <modern-rgb-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-rgb-syntax
// <modern-rgba-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-rgba-syntax
const _NP = `${_NUM}%?`;
const _SLS = `${_WS}\\/${_WS}`;
const _M_RGB =
  `^rgba?\\(${_WS}${_NP}(?:${_WHITESPACE}+${_NP}){2}(?:${_SLS}${_ALPHA})?${_WS}\\)$`;
//XXX `none`は現バージョンでは対応しない

let _mRgbRegex: RegExp;
function _matchesModernRgb(test: string): boolean {
  if (!_mRgbRegex) {
    _mRgbRegex = new RegExp(_M_RGB, "i");
  }
  return _mRgbRegex.test(test);
}

let _lRgbRegex: RegExp;
//XXX String.prototype.trim でも別に問題ない
function _matchesLegacyRgb(test: string): boolean {
  if (!_lRgbRegex) {
    _lRgbRegex = new RegExp(_L_RGB, "i");
  }
  return _lRgbRegex.test(test);
}

let _eWsRegex: RegExp;
function _trim(input: string): string {
  if (!_eWsRegex) {
    _eWsRegex = new RegExp(`(?:^${_WHITESPACE}+|${_WHITESPACE}+$)`, "g");
  }
  return input.replaceAll(_eWsRegex, "");
}

let _iWsRegex: RegExp;
function _normalizeWs(input: string): string {
  if (!_iWsRegex) {
    _iWsRegex = new RegExp(`${_WHITESPACE}+`, "g");
  }
  return input.replaceAll(_iWsRegex, " ");
}

function _parseRgb(source: string): Color {
  if (_matchesModernRgb(source)) {
    return _parseModernRgb(source);
  } else if (_matchesLegacyRgb(source)) {
    return _parseLegacyRgb(source);
  }
  throw new RangeError("source");
}

function _parseModernRgb(source: string): Color {
  const temp = source.replace(/^rgba?\(/i, "").replace(/\)$/, "");
  const [rgbStr, aStr] = temp.split("/").map((c) => _trim(c));
  const [rStr, gStr, bStr] = _normalizeWs(rgbStr).split(" ");

  return Color.fromRgb(_parseRgbComponents(rStr, gStr, bStr, aStr), {
    mode: "precision",
  });
}

function _parseRgbComponents(
  rStr: string,
  gStr: string,
  bStr: string,
  aStr: string,
): Color.Rgb {
  const r = Number.parseFloat(rStr) / (rStr.endsWith("%") ? 100 : 255);
  const g = Number.parseFloat(gStr) / (gStr.endsWith("%") ? 100 : 255);
  const b = Number.parseFloat(bStr) / (bStr.endsWith("%") ? 100 : 255);
  let a = 1;
  if (aStr) {
    a = Number.parseFloat(aStr);
    if (aStr.endsWith("%")) {
      a = a / 100;
    }
  }
  return { r, g, b, a };
}

function _parseLegacyRgb(source: string): Color {
  const temp = source.replace(/^rgba?\(/i, "").replace(/\)$/, "");
  const [rStr, gStr, bStr, aStr] = temp.split(",").map((c) => _trim(c));

  return Color.fromRgb(_parseRgbComponents(rStr, gStr, bStr, aStr), {
    mode: "precision",
  });
}

function _stringify(input: number): string {
  if (Number.isFinite(input)) {
    if (Number.isInteger(input)) {
      return input.toString(10);
    }
    return input.toFixed(4);
  }
  throw new RangeError("input");
}

//XXX 小数点以下桁数を指定可能にする？
//XXX shortenIfPossible と alpha省略を分離する？
//XXX numberかpercentageか指定可能にする？
//XXX r,g,bを整数に丸めるか指定可能にする？
function _formatRgb(
  color: Color,
  options?: CssColorFormat.FormatOptions,
): string {
  let result: string;
  if (options?.legacy === true) {
    // level 4 の定義では r,g,b が整数でなくても良いが、level 3 では整数なので整数に丸める

    const [r, g, b] = color.toUint8Array();
    const a = color.alpha;

    if ((options?.shortenIfPossible === true) && (a === 1)) {
      result = `rgb(${r}, ${g}, ${b})`;
    } else {
      result = `rgba(${r}, ${g}, ${b}, ${_stringify(a as number)})`;
    }
  } else {
    const { r, g, b, a } = color.toRgb({ mode: "precision" });
    const rS = _stringify(r * 255);
    const gS = _stringify(g * 255);
    const bS = _stringify(b * 255);

    if ((options?.shortenIfPossible === true) && (a === 1)) {
      result = `rgb(${rS} ${gS} ${bS})`;
    } else {
      result = `rgb(${rS} ${gS} ${bS} / ${_stringify(a as number)})`;
    }
  }
  return (options?.upperCase === true) ? result.toUpperCase() : result;
}

function _parseHex(source: string): Color {
  if (
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(source) !== true
  ) {
    throw new RangeError("source");
  }

  if ((source.length === 9) || (source.length === 7)) {
    return Color.fromHexString(source);
  }

  // #[0-9a-f]{3,4}
  const r = source.charAt(1);
  const g = source.charAt(2);
  const b = source.charAt(3);
  const a = (source.length === 5) ? source.charAt(4) : "f";
  return Color.fromHexString(
    `#${r.repeat(2)}${g.repeat(2)}${b.repeat(2)}${a.repeat(2)}`,
  );
}

function _formatHex(
  color: Color,
  options?: CssColorFormat.FormatOptions,
): string {
  let hex = color.toHexString({ upperCase: options?.upperCase });
  if (options?.shortenIfPossible === true) {
    // 不透明の場合、alphaを省略
    if (/[fF]{2}$/.test(hex)) {
      hex = hex.substring(0, 7);
    }

    // r, g, b (, a) のすべてについて1桁目と2桁目が等しい場合、略記（ex. #00112233 → #0123）
    if (/^#(?:([0-9a-fA-F])\1)+$/.test(hex)) {
      return `#${hex.charAt(1)}${hex.charAt(3)}${hex.charAt(5)}${
        hex.charAt(7)
      }`;
    }
    return hex;
  } else {
    return hex;
  }
}

/** @deprecated */
function _fromName(lowerCasedName: string): Color | null {
  const bytes = rgbFromName(lowerCasedName);
  return bytes ? Color.fromUint8Array(Uint8Array.of(...bytes)) : null;
}

function _parseHsl(source: string): Color {
  //TODO
  throw new Error("not implemented");
}

function _formatHsl(
  color: Color,
  options?: CssColorFormat.FormatOptions,
): string {
  //TODO
  throw new Error("not implemented");
}

export { CssColorFormat };
