import {
  Uint8,
  type uint8,
} from "https://raw.githubusercontent.com/i-xi-dev/int.es/1.1.1/mod.ts";
import { BufferUtils } from "https://raw.githubusercontent.com/i-xi-dev/buffer-utils.es/1.1.0/mod.ts";
import { ByteSequence } from "https://raw.githubusercontent.com/i-xi-dev/bytes.es/4.0.3/mod.ts";

/** RGB component as a real number between 0 and 255 */
type rgbcomponent = number;

/** Opacity as a real number between 0 and 1 */
type alpha = number;

// angle
type hue = number;

// hsl_s >= 0 && hsl_s <= 1
type hsl_s = number;

// hsl_l >= 0 && hsl_l <= 1
type hsl_l = number;

// hwb_w >= 0 && hwb_w <= 1
type hwb_w = number;

// hwb_b >= 0 && hwb_b <= 1
type hwb_b = number;

function _clamp(c: number): number {
  return (c < 0) ? 0 : ((c > 1) ? 1 : c);
}

function _isRgbComponents(value: unknown): value is SRgb.RgbComponents {
  const { r, g, b, a } = value as SRgb.RgbComponents;
  const rValid = Number.isFinite(r); // Uint8.isUint8(r);
  const gValid = Number.isFinite(g); // Uint8.isUint8(g);
  const bValid = Number.isFinite(b); // Uint8.isUint8(b);
  const aValid = Number.isFinite(a) || (a === undefined);
  return (rValid && gValid && bValid && aValid);
}

function _rgbToHsl(rgb: SRgb.RgbComponents): SRgb.Hsl {
  void rgb;
  throw new Error("TODO");
}

function _hslToRgb(hsl: SRgb.Hsl): SRgb.RgbComponents {
  void hsl;
  throw new Error("TODO");
}

namespace ColorFormat {
  export const OmitAlpha = {
    IF_OPAQUE: "if-opaque",
    ALWAYS: "always",
    NEVER: "never",
  } as const;
  export type OmitAlpha = typeof OmitAlpha[keyof typeof OmitAlpha];

  export type HexOptions = {
    omitAlpha?: OmitAlpha;
    upperCase?: boolean;
    shorten?: boolean;
  };

  export const CssFunction = {
    LEGACY_RGB: "legacy-rgb",
    LEGACY_HSL: "legacy-hsl",
    L4_RGB: "l4-rgb",
    L4_HSL: "l4-hsl",
    // XXX lab, lch, ...
  } as const;
  export type CssFunction = typeof CssFunction[keyof typeof CssFunction];

  export type CssNotation = CssFunction | "hex";

  export type CssOptions = {
    omitAlpha?: OmitAlpha;
    type?: CssNotation;
    //XXX nameIfExists
  };
}
Object.freeze(ColorFormat);

namespace SRgb {
  export type RgbComponents = {
    r: rgbcomponent;
    g: rgbcomponent;
    b: rgbcomponent;
    a?: alpha;
  };

  export type Hsl = {
    h: hue;
    s: hsl_s;
    l: hsl_l;
    a?: alpha;
  };

  /**
   * RGBA color in sRGB color space
   */
  export class Color {
    #r: number;
    #g: number;
    #b: number;
    #a: number;

    private constructor(r: number, g: number, b: number, a: number) {
      this.#r = r;
      this.#g = g;
      this.#b = b;
      this.#a = a;
      Object.seal(this);
    }

    //XXX get red 0-1にすべきか0-255にすべきか
    //XXX get green 同上
    //XXX get blue 同上

    get alpha(): number {
      return this.#a;
    }

    static fromBytes(rgbaBytes: Iterable<number>): Color {
      if (rgbaBytes[Symbol.iterator]) {
        const rgba: [number, number, number, number] = [0, 0, 0, 1];

        let i = 0;
        for (const byte of rgbaBytes) {
          if (i >= 4) {
            // throw new TypeError("rgbaBytes");
            break;
          }

          if (Uint8.isUint8(byte)) {
            rgba[i] = byte / 255;
          } else {
            throw new TypeError("rgbaBytes");
          }

          i = i + 1;
        }
        // if (i < 4) {
        //   throw new TypeError("rgbaBytes");
        // }

        return new Color(...rgba);
      }
      throw new TypeError("rgbaBytes");
    }

    //XXX static fromUint8ClampedArray()

    static fromArray(rgbaBytes: [number, number, number, number]): Color {
      if (BufferUtils.isArrayOfUint8(rgbaBytes) !== true) {
        throw new TypeError("rgbaBytes");
      }
      return Color.fromBytes(rgbaBytes);
    }

    static fromRgb(rgba: RgbComponents): Color {
      if (_isRgbComponents(rgba) !== true) {
        throw new TypeError("rgba");
      }
      const { r: rByte, g: gByte, b: bByte, a } = rgba;
      // const aByte = a ? (a * 255) : 255;
      // return SrgbColor.fromBytes(Uint8ClampedArray.of(rByte, gByte, bByte, aByte)); // 丸めないことにする
      const r = rByte / 255;
      const g = gByte / 255;
      const b = bByte / 255;
      return new Color(r, g, b, a ?? 1);
    }

    //XXX static fromHsl()

    static fromHexString(input: string): Color {
      if (typeof input !== "string") {
        throw new TypeError("input");
      }
      if (
        /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})?$/i.test(input) !== true
      ) {
        throw new RangeError("input");
      }

      const inputHex = input.substring(1);
      let rrggbbaa: string;
      switch (inputHex.length) {
        case 8:
        case 6:
          rrggbbaa = inputHex;
          break;
        case 4:
        case 3:
        default:
          rrggbbaa = [...inputHex].map((h) => h.repeat(2)).join("");
          break;
      }
      if (rrggbbaa.length < 8) {
        rrggbbaa = rrggbbaa + "ff";
      }
      rrggbbaa = rrggbbaa.toLowerCase();

      return Color.fromBytes(
        ByteSequence.parse(rrggbbaa, { lowerCase: true }).getView(Uint8Array),
      );
    }

    setRgb(rgba: RgbComponents): this {
      if (_isRgbComponents(rgba) !== true) {
        throw new TypeError("rgba");
      }
      const { r: rByte, g: gByte, b: bByte, a } = rgba;
      this.#r = rByte / 255;
      this.#g = gByte / 255;
      this.#b = bByte / 255;
      this.#a = _clamp(a ?? 1);
      return this;
    }

    setAlpha(absoluteAlpha: number): this {
      if (Number.isFinite(absoluteAlpha) !== true) {
        throw new TypeError("absoluteAlpha");
      }
      this.#a = _clamp(absoluteAlpha);
      return this;
    }

    //XXX addRgb()

    addAlpha(relativeAlpha: number): this {
      if (Number.isFinite(relativeAlpha) !== true) {
        throw new TypeError("relativeAlpha");
      }
      return this.setAlpha(this.alpha + relativeAlpha);
    }

    discardAlpha(): this {
      return this.setAlpha(1);
    }

    toUint8ClampedArray(): Uint8ClampedArray { //XXX 引数追加：rgbにするかrgbaにするか
      return Uint8ClampedArray.of(
        this.#r * 255,
        this.#g * 255,
        this.#b * 255,
        this.#a * 255,
      );
    }

    toArray(): [number, number, number, number] {
      return [...this.toUint8ClampedArray()] as [uint8, uint8, uint8, uint8];
    }

    toRgb(): RgbComponents {
      const [r, g, b] = this.toUint8ClampedArray();
      return {
        r,
        g,
        b,
        a: this.#a,
      };
    }

    toHsl(): Hsl {
      const { h, s, l } = _rgbToHsl(this.toRgb());
      return {
        h,
        s,
        l,
        a: this.#a,
      };
    }

    toHexString(options: ColorFormat.HexOptions = {}): string {
      const omitAlphaMode = options?.omitAlpha
        ? options.omitAlpha
        : ColorFormat.OmitAlpha.IF_OPAQUE;
      const omitAlpha = (
        (omitAlphaMode === ColorFormat.OmitAlpha.ALWAYS) ||
        ((omitAlphaMode === ColorFormat.OmitAlpha.IF_OPAQUE) && (this.#a === 1))
      );

      const lowerCase = (options?.upperCase !== true);

      const rrggbbaa = ByteSequence.fromArrayBufferView(
        this.toUint8ClampedArray(),
      ).format({ lowerCase });
      let str = (omitAlpha === true) ? rrggbbaa.substring(0, 6) : rrggbbaa;

      const shorten = (options?.shorten === true) &&
        /^(?:([0-9a-fA-F])\1)+$/.test(str);

      if (shorten === true) {
        str = [...str].reduce((s, c, i) => (i % 2 === 0) ? (s + c) : s, "");
      }

      return "#" + str;
    }

    toString(): string {
      return this.toHexString();
    }
  }
  Object.freeze(Color);
}
Object.freeze(SRgb);

export { ColorFormat, SRgb };
