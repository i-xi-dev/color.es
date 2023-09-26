import { Rgb } from "../rgb.ts";
import { RgbColor } from "../rgb_color.ts";
import { _floatStringify, _FormatOptions, _Pattern } from "./utils.ts";

namespace _CssRgb {
  export function parse(source: string): RgbColor {
    if (_matchesModernRgb(source)) {
      return _parseModernRgb(source);
    } else if (_matchesLegacyRgb(source)) {
      return _parseLegacyRgb(source);
    }
    throw new RangeError("source");
  }

  //XXX 小数点以下桁数を指定可能にする？
  //XXX shortenIfPossible と alpha省略を分離する？
  //XXX numberかpercentageか指定可能にする？
  //XXX r,g,bを整数に丸めるか指定可能にする？
  export function format(
    color: RgbColor,
    options?: _FormatOptions,
  ): string {
    const shortenIfPossible = options?.shortenIfPossible === true;

    let result: string;
    if (options?.legacy === true) {
      // level 4 の定義では r,g,b が整数でなくても良いが、level 3 では整数なので整数に丸める

      const [r, g, b] = color.toUint8Array();
      const a = color.alpha;

      if ((shortenIfPossible === true) && (a === 1)) {
        result = `rgb(${r}, ${g}, ${b})`;
      } else {
        result = `rgba(${r}, ${g}, ${b}, ${
          _floatStringify(a as number, shortenIfPossible)
        })`;
      }
    } else {
      const { r, g, b, a } = color.toRgb({ mode: "precision" });
      const rS = _floatStringify(r * 255, true); //XXX 現バージョンでは小数点以下は基本的には切り捨てる
      const gS = _floatStringify(g * 255, true); //XXX 現バージョンでは小数点以下は基本的には切り捨てる
      const bS = _floatStringify(b * 255, true); //XXX 現バージョンでは小数点以下は基本的には切り捨てる

      if ((shortenIfPossible === true) && (a === 1)) {
        result = `rgb(${rS} ${gS} ${bS})`;
      } else {
        result = `rgb(${rS} ${gS} ${bS} / ${
          _floatStringify(a as number, shortenIfPossible)
        })`;
      }
    }
    return (options?.upperCase === true) ? result.toUpperCase() : result;
  }
}

// パターンは https://drafts.csswg.org/css-color-4/#rgb-functions から

// <legacy-rgb-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-rgb-syntax
// <legacy-rgba-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-rgba-syntax
const _L_RGB_N = `^rgba?\\(${_Pattern.WS}` +
  `${_Pattern.NUM}(?:${_Pattern.CMS}${_Pattern.NUM}){2}` +
  `(?:${_Pattern.CMS}${_Pattern.ALPHA})?` +
  `${_Pattern.WS}\\)$`;
const _L_RGB_P = `^rgba?\\(${_Pattern.WS}` +
  `${_Pattern.PERC}(?:${_Pattern.CMS}${_Pattern.PERC}){2}` +
  `(?:${_Pattern.CMS}${_Pattern.ALPHA})?` +
  `${_Pattern.WS}\\)$`;
const _L_RGB = `(?:${_L_RGB_N}|${_L_RGB_P})`;

// <modern-rgb-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-rgb-syntax
// <modern-rgba-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-rgba-syntax
const _NP = `${_Pattern.NUM}%?`;
const _M_RGB = `^rgba?\\(${_Pattern.WS}` +
  `${_NP}(?:${_Pattern.WHITESPACE}+${_NP}){2}` +
  `(?:${_Pattern.SLS}${_Pattern.ALPHA})?` +
  `${_Pattern.WS}\\)$`;
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

function _parseRgbComponents(
  rStr: string,
  gStr: string,
  bStr: string,
  aStr: string,
): Rgb {
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

function _parseModernRgb(source: string): RgbColor {
  const temp = source.replace(/^rgba?\(/i, "").replace(/\)$/, "");
  const [rgbStr, aStr] = temp.split("/").map((c) => _Pattern.trimWs(c));
  const [rStr, gStr, bStr] = _Pattern.normalizeWs(rgbStr).split(" ");

  return RgbColor.fromRgb(_parseRgbComponents(rStr, gStr, bStr, aStr), {
    mode: "precision",
  });
}

function _parseLegacyRgb(source: string): RgbColor {
  const temp = source.replace(/^rgba?\(/i, "").replace(/\)$/, "");
  const [
    rStr,
    gStr,
    bStr,
    aStr,
  ] = temp.split(",").map((c) => _Pattern.trimWs(c));

  return RgbColor.fromRgb(_parseRgbComponents(rStr, gStr, bStr, aStr), {
    mode: "precision",
  });
}

export { _CssRgb };
