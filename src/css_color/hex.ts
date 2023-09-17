import { RgbColor } from "../rgb_color.ts";
import { _FormatOptions } from "./utils.ts";

namespace _CssHex {
  export function parse(source: string): RgbColor {
    if (
      /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(source) !== true
    ) {
      throw new RangeError("source");
    }

    if ((source.length === 9) || (source.length === 7)) {
      return RgbColor.fromHexString(source);
    }

    // #[0-9a-f]{3,4}
    const r = source.charAt(1);
    const g = source.charAt(2);
    const b = source.charAt(3);
    const a = (source.length === 5) ? source.charAt(4) : "f";
    return RgbColor.fromHexString(
      `#${r.repeat(2)}${g.repeat(2)}${b.repeat(2)}${a.repeat(2)}`,
    );
  }

  export function format(
    color: RgbColor,
    options?: _FormatOptions,
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
}

export { _CssHex };
