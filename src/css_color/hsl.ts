import { Hsl } from "../rgb/hsl.ts";
import { RgbColor } from "../rgb_color.ts";
import { _floatStringify, _Pattern } from "./utils.ts";
import { CssOptions } from "./options.ts";

namespace _CssHsl {
  export function parse(source: string): RgbColor {
    if (_matchesModernHsl(source)) {
      return _parseModernHsl(source);
    } else if (_matchesLegacyHsl(source)) {
      return _parseLegacyHsl(source);
    }
    throw new RangeError("source");
  }

  //XXX !legacy の場合に s,l を<number>にする記法は chrome が未実装なので、現バージョンでは対応しない
  export function format(
    color: RgbColor,
    options?: CssOptions.FormatOptions,
  ): string {
    const shortenIfPossible = options?.shortenIfPossible === true;

    const { h, s, l, a } = color.toHsl();
    const hS = (shortenIfPossible === true)
      ? _floatStringify(h, shortenIfPossible)
      : `${_floatStringify(h, shortenIfPossible)}deg`;
    const spS = `${_floatStringify(s * 100, shortenIfPossible)}%`;
    const lpS = `${_floatStringify(l * 100, shortenIfPossible)}%`;
    const aS = _floatStringify(a as number, shortenIfPossible);

    let result: string;
    if (options?.legacy === true) {
      if ((shortenIfPossible === true) && (a === 1)) {
        result = `hsl(${hS}, ${spS}, ${lpS})`;
      } else {
        result = `hsla(${hS}, ${spS}, ${lpS}, ${aS})`;
      }
    } else {
      if ((shortenIfPossible === true) && (a === 1)) {
        result = `hsl(${hS} ${spS} ${lpS})`;
      } else {
        result = `hsl(${hS} ${spS} ${lpS} / ${aS})`;
      }
    }
    return (options?.upperCase === true) ? result.toUpperCase() : result;
  }
}

// パターンは https://drafts.csswg.org/css-color-4/#the-hsl-notation から

// <legacy-hsl-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-hsl-syntax
// <legacy-hsla-syntax> https://drafts.csswg.org/css-color-4/#typedef-legacy-hsla-syntax
const _L_HSL = `^hsla?\\(${_Pattern.WS}` +
  `${_Pattern.HUE}(?:${_Pattern.CMS}${_Pattern.PERC}){2}` +
  `(?:${_Pattern.CMS}${_Pattern.ALPHA})?` +
  `${_Pattern.WS}\\)$`;

// <modern-hsl-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-hsl-syntax
// <modern-hsla-syntax> https://drafts.csswg.org/css-color-4/#typedef-modern-hsla-syntax
//const _SL = `${_Pattern.NUM}%?`;
const _SL = _Pattern.PERC;
const _M_HSL = `^hsla?\\(${_Pattern.WS}` +
  `${_Pattern.HUE}(?:${_Pattern.WHITESPACE}+${_SL}){2}` +
  `(?:${_Pattern.SLS}${_Pattern.ALPHA})?` +
  `${_Pattern.WS}\\)$`;
//XXX s,lの<number>は、実装ブラウザが存在しないと思われるので、現バージョンでは対応しない
//XXX `none`は現バージョンでは対応しない

let _mHslRegex: RegExp;
function _matchesModernHsl(test: string): boolean {
  if (!_mHslRegex) {
    _mHslRegex = new RegExp(_M_HSL, "i");
  }
  return _mHslRegex.test(test);
}

let _lHslRegex: RegExp;
//XXX String.prototype.trim でも別に問題ない
function _matchesLegacyHsl(test: string): boolean {
  if (!_lHslRegex) {
    _lHslRegex = new RegExp(_L_HSL, "i");
  }
  return _lHslRegex.test(test);
}

function _parseHslComponents(
  hStr: string,
  sStr: string,
  lStr: string,
  aStr: string,
): Hsl {
  //XXX s,l の<number>は実装しているブラウザが無いとおもわれるので、現バージョンでは対応しない
  const h = _Pattern.parseHue(hStr);
  const s = Number.parseFloat(sStr) / 100;
  const l = Number.parseFloat(lStr) / 100;
  let a = 1;
  if (aStr) {
    a = Number.parseFloat(aStr);
    if (aStr.endsWith("%")) {
      a = a / 100;
    }
  }
  return { h, s, l, a };
}

function _parseModernHsl(source: string): RgbColor {
  const temp = source.replace(/^hsla?\(/i, "").replace(/\)$/, "");
  const [hslStr, aStr] = temp.split("/").map((c) => _Pattern.trimWs(c));
  const [hStr, sStr, lStr] = _Pattern.normalizeWs(hslStr).split(" ");

  return RgbColor.fromHsl(_parseHslComponents(hStr, sStr, lStr, aStr));
}

function _parseLegacyHsl(source: string): RgbColor {
  const temp = source.replace(/^hsla?\(/i, "").replace(/\)$/, "");
  const [
    hStr,
    sStr,
    lStr,
    aStr,
  ] = temp.split(",").map((c) => _Pattern.trimWs(c));

  return RgbColor.fromHsl(_parseHslComponents(hStr, sStr, lStr, aStr));
}

export { _CssHsl };
