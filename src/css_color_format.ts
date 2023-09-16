import { StringUtils } from "../deps.ts";
import { Color } from "./color.ts";

namespace CssColorFormat {
  /*
  export type Options = {

  };

  export type ParseOptions = Options & {

  };
  */

  export type FormatOptions = /* Options & */ {
    notation?: "hex";
    upperCase?: boolean;
    shortenIfPossible?: boolean;
    //legacy?: boolean;
  };

  export function parse(colorString: string): Color {
    if (StringUtils.isNonEmptyString(colorString) !== true) {
      throw new TypeError("colorString");
    }

    if (colorString.startsWith("#")) {
      return _parseHexString(colorString);
    }

    throw new Error("not implemented");
  }

  export function format(color: Color, options?: FormatOptions): string {
    if ((color instanceof Color) !== true) {
      throw new TypeError("color");
    }

    switch (options?.notation) {
      default:
        return _formatHexString(color, options);
    }
  }
}

function _parseHexString(hexString: string): Color {
  if (
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hexString) !== true
  ) {
    throw new RangeError("hexString");
  }

  if ((hexString.length === 9) || (hexString.length === 7)) {
    return Color.fromHexString(hexString);
  }

  // #[0-9a-f]{3,4}
  const r = hexString.charAt(1);
  const g = hexString.charAt(2);
  const b = hexString.charAt(3);
  const a = (hexString.length === 5) ? hexString.charAt(4) : "f";
  return Color.fromHexString(
    `#${r.repeat(2)}${g.repeat(2)}${b.repeat(2)}${a.repeat(2)}`,
  );
}

function _formatHexString(
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

export { CssColorFormat };
