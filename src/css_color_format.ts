import { StringUtils } from "../deps.ts";
import { RgbColor } from "./rgb_color.ts";
import { CssOptions } from "./css_color/options.ts";
import { _CssHex } from "./css_color/hex.ts";
import { _CssRgb } from "./css_color/rgb.ts";
import { _CssHsl } from "./css_color/hsl.ts";
import { _rgbFromName } from "./css_color/name.ts";

namespace CssColorFormat {
  export type FormatOptions = CssOptions.FormatOptions;

  export function parse(colorString: string): RgbColor {
    if (StringUtils.isNonEmptyString(colorString) !== true) {
      throw new TypeError("colorString");
    }

    const lowerCased = colorString.toLocaleLowerCase();
    if (lowerCased.startsWith("#")) {
      return _CssHex.parse(colorString);
    } else if (/^rgba?\(/.test(lowerCased)) {
      return _CssRgb.parse(colorString);
    } else if (/^hsla?\(/.test(lowerCased)) {
      return _CssHsl.parse(colorString);
    }

    const bytesFromName = _rgbFromName(lowerCased);
    if (bytesFromName) {
      return RgbColor.fromUint8Array(Uint8Array.of(...bytesFromName));
    }

    if (lowerCased === "transparent") {
      return RgbColor.fromUint8Array(Uint8Array.of(0, 0, 0, 0));
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

  export function format(color: RgbColor, options?: FormatOptions): string {
    if ((color instanceof RgbColor) !== true) {
      throw new TypeError("color");
    }

    switch (options?.notation) {
      case "rgb":
        return _CssRgb.format(color, options);

      case "hsl":
        return _CssHsl.format(color, options);

      default:
        return _CssHex.format(color, options);
    }
  }
}

export { CssColorFormat };
