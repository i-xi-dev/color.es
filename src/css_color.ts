import { StringUtils } from "../deps.ts";
import { Color } from "./color.ts";

namespace CssColor {
  /*
  export type Options = {

  };

  export type ParseOptions = Options & {

  };
  */

  export type FormatOptions = /* Options & */ {
    notation?: "hex";
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

  //   export function format(options?: Options): string {
  //   }
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

// function _formatHexString(): string {
//       //TODO ColorCssFormatに移す fromHexStringの3,4桁も移す？
//     // if (options?.shorten === true) {
//     //   if (/^(?:([0-9a-fA-F])\1)+$/.test(rrggbbaaOrRrggbb)) {
//     //     return "#" +
//     //       [...rrggbbaaOrRrggbb].reduce(
//     //         (s, c, i) => (i % 2 === 0) ? (s + c) : s,
//     //         "",
//     //       );
//     //   }
//     // }

// }

export { CssColor };
