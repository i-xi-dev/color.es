import { Angle } from "../../deps.ts";

/*
export type _Options =
export type _ParseOptions = _Options & {
*/

export type _FormatOptions = /* _Options & */ {
  notation?: "hex" | "rgb" | "hsl"; //TODO hwb
  upperCase?: boolean;
  shortenIfPossible?: boolean;
  legacy?: boolean;
};

export function _floatStringify(
  input: number,
  shortenIfPossible: boolean,
): string {
  if (Number.isFinite(input)) {
    const str = input.toFixed(2);
    return ((shortenIfPossible === true) && str.endsWith(".00"))
      ? str.replace(/\.00$/, "")
      : str;
  }
  throw new RangeError("input");
}

//XXX css-utils とかに外出しする
export namespace _Pattern {
  // 以下、全般的にコメントには対応しない

  //XXX ドラフトを参照しているものは注意（意外と頻繁に変わる）

  // ws* https://drafts.csswg.org/css-syntax-3/#ws*-diagram
  // const WS = `[\\u0009\\u000A\\u0020]*`;
  //XXX U+000C,U+000D はCSSの解析器によってU+000A に変換されるので上記仕様では除外されているが、
  //    当処理はCSS解析器を通しているわけではないので U+000C,U+000D も含めることにする
  export const WHITESPACE = `[\\u0009\\u000A\\u000C\\u000D\\u0020]`;
  export const WS = `${WHITESPACE}*`;

  let _iWsRegex: RegExp;
  export function normalizeWs(input: string): string {
    if (!_iWsRegex) {
      _iWsRegex = new RegExp(`${WHITESPACE}+`, "g");
    }
    return input.replaceAll(_iWsRegex, " ");
  }

  let _eWsRegex: RegExp;
  export function trimWs(input: string): string {
    if (!_eWsRegex) {
      _eWsRegex = new RegExp(`(?:^${WHITESPACE}+|${WHITESPACE}+$)`, "g");
    }
    return input.replaceAll(_eWsRegex, "");
  }

  // <number> https://drafts.csswg.org/css-syntax-3/#number-token-diagram
  export const NUM = `[-+]?(?:[0-9]*\\.)?[0-9]+`;
  //XXX 指数表記は現バージョンでは対応しない

  // <percentage> https://drafts.csswg.org/css-syntax-3/#percentage-token-diagram
  export const PERC = `${NUM}%`;

  export const CMS = `${WS},${WS}`;

  export const SLS = `${WS}\\/${WS}`;

  // <alpha-value> https://drafts.csswg.org/css-color-4/#typedef-alpha-value
  export const ALPHA = `${_Pattern.NUM}%?`;

  // <hue> https://drafts.csswg.org/css-color-4/#typedef-hue
  export const HUE = `${_Pattern.NUM}(?:deg|grad|rad|turn)?`;

  export function parseHue(input: string): number {
    // 形式チェック済の前提
    const lowerCased = input.toLowerCase();
    const numberValue = Number.parseFloat(input);
    if (lowerCased.endsWith("grad")) {
      return Angle.Degrees.fromGradians(numberValue);
    } else if (lowerCased.endsWith("rad")) {
      return Angle.Degrees.fromRadians(numberValue);
    } else if (lowerCased.endsWith("turn")) {
      return Angle.Degrees.fromTurns(numberValue);
    } else {
      return numberValue;
    }
  }
}
