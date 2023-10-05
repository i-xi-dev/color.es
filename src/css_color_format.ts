import { StringUtils } from "../deps.ts";
import { RgbColor } from "./rgb_color.ts";
import { CssOptions } from "./css_color/options.ts";
import { _CssHex } from "./css_color/hex.ts";
import { _CssRgb } from "./css_color/rgb.ts";
import { _CssHsl } from "./css_color/hsl.ts";
import { _rgbFromName } from "./css_color/name.ts";

/**
 * The CSS color value format.
 *
 * CSS Color Level 3 values are supported except for the following values:
 * - `<system-color>`
 * - `currentcolor`
 * - `inherit`
 * - `initial`
 * - `revert`
 * - `unset`
 * - `var()`
 * - ...
 */
namespace CssColorFormat {
  export type FormatOptions = CssOptions.FormatOptions;

  /**
   * Creates a new instance of `RgbColor` from a CSS color value.
   *
   * The following CSS Color Level 3 values are supported:
   * - `<hex-color>`
   * - `<named-color>`
   * - `transparent`
   * - `<rgb()>`
   * - `<rgba()>`
   * - `<hsl()>`
   * - `<hsla()>`
   *
   * The following CSS Color Level 4 values are experimentally supported:
   * - `<rgb()>`
   * - `<hsl()>`
   *
   * @param cssColor - A text representation of CSS color value.
   * @returns A `RgbColor`
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("#ff0000");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("#f00");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("#ff0000ff");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("rgb(255, 0, 0)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("rgba(255, 0, 0, 1)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * // parse the notation for CSS color level 4
   * const color = CssColorFormat.parse("rgb(255 0 0 / 1)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("hsl(0, 100%, 50%)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("hsla(0, 100%, 50%, 1)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * // parse the notation for CSS color level 4
   * const color = CssColorFormat.parse("hsl(0 100% 50% / 1)");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("red");
   * // color.toHexString()
   * //   → "#FF0000FF"
   * ```
   * @example
   * ```javascript
   * const color = CssColorFormat.parse("transparent");
   * // color.toHexString()
   * //   → "#00000000"
   * ```
   */
  export function parse(cssColor: string): RgbColor {
    if (StringUtils.isNonEmptyString(cssColor) !== true) {
      throw new TypeError("cssColor");
    }

    const lowerCased = cssColor.toLowerCase();
    if (lowerCased.startsWith("#")) {
      return _CssHex.parse(cssColor);
    } else if (/^rgba?\(/.test(lowerCased)) {
      return _CssRgb.parse(cssColor);
    } else if (/^hsla?\(/.test(lowerCased)) {
      return _CssHsl.parse(cssColor);
    }

    const bytesFromName = _rgbFromName(lowerCased);
    if (bytesFromName) {
      return RgbColor.fromUint8Array(Uint8Array.of(...bytesFromName));
    }

    if (lowerCased === "transparent") {
      return RgbColor.fromUint8Array(Uint8Array.of(0, 0, 0, 0));
    }

    throw new RangeError("cssColor");
  }

  /**
   * Creates CSS color value from an instance of `RgbColor`.
   *
   * The following CSS Color Level 3 values are supported:
   * - `<hex-color>`
   * - `<rgb()>`
   * - `<rgba()>`
   * - `<hsl()>`
   * - `<hsla()>`
   *
   * The following CSS Color Level 4 values are experimentally supported:
   * - `<rgb()>`
   * - `<hsl()>`
   *
   * @param color - A `RgbColor`
   * @param options - A `FormatOptions` dictionary.
   * @returns A text representation of CSS color value.
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color);
   * // cssText
   * //   → "#ff0000ff"
   * ```
   * @example
   * ```javascript
   * // format to the notation for CSS color level 4
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "rgb" });
   * // cssText
   * //   → "rgb(255 0 0 / 1.00)"
   * ```
   * @example
   * ```javascript
   * // format to the notation for CSS color level 4
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "rgb", shortenIfPossible: true });
   * // cssText
   * //   → "rgb(255 0 0)"
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "rgb", legacy: true });
   * // cssText
   * //   → "rgba(255, 0, 0, 1.00)"
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "rgb", legacy: true, shortenIfPossible: true });
   * // cssText
   * //   → "rgb(255, 0, 0)"
   * ```
   * @example
   * ```javascript
   * // format to the notation for CSS color level 4
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "hsl" });
   * // cssText
   * //   → "hsl(0.00deg 100.00% 50.00% / 1.00)"
   * ```
   * @example
   * ```javascript
   * // format to the notation for CSS color level 4
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "hsl", shortenIfPossible: true });
   * // cssText
   * //   → "hsl(0 100% 50%)"
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "hsl", legacy: true });
   * // cssText
   * //   → "hsla(0.00deg, 100.00%, 50.00%, 1.00)"
   * ```
   * @example
   * ```javascript
   * const color = RgbColor.fromHexString("#ff0000");
   * const cssText = CssColorFormat.format(color, { notation: "hsl", legacy: true, shortenIfPossible: true });
   * // cssText
   * //   → "hsl(0, 100%, 50%)"
   * ```
   */
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
