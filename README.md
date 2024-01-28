# @i-xi-dev/color

A JavaScript immutable object that represents the color.


## Requirement

| Chrome | Edge | Firefox | Safari | Deno | Node.js |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |


## Installation

### npm

```console
$ npm i @i-xi-dev/color@5.2.8
```

```javascript
import { RgbColor, CssColorFormat } from "@i-xi-dev/color";
```

### CDN

Example for Skypack
```javascript
import { RgbColor, CssColorFormat } from "https://cdn.skypack.dev/@i-xi-dev/color@5.2.8";
```

## Usage

### [`RgbColor`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/color.es/5.2.8/mod.ts/~/RgbColor) class

```javascript
const red = RgbColor.fromRgb({ r: 255, g: 0, b: 0 });

// red.red
//   → 1
// red.green
//   → 0
// red.blue
//   → 0
// red.alpha
//   → 1
// red.hue
//   → 0
// red.saturation
//   → 1
// red.lightness
//   → 0.5
// red.whiteness
//   → 0
// red.blackness
//   → 0

const hex = red.toHexString();
// hex
//   → "#FF000000"

const hsl = red.toHsl();
// hsl.h
//   → 0
// hsl.s
//   → 1
// hsl.l
//   → 0.5
// hsl.a
//   → 1

const hwb = red.toHwb();
// hwb.h
//   → 0
// hwb.w
//   → 0
// hwb.b
//   → 0
// hwb.a
//   → 1

const rgb = red.toRgb();
// rgb.r
//   → 255
// rgb.g
//   → 0
// rgb.b
//   → 0
// rgb.a
//   → 1

const rgbAsRealNumbers = red.toRgb({ mode: "precision" });
// rgbAsRealNumbers.r
//   → 1
// rgbAsRealNumbers.g
//   → 0
// rgbAsRealNumbers.b
//   → 0
// rgbAsRealNumbers.a
//   → 1

const rgbAsBytes = red.toRgb({ mode: "bytes" });
// rgbAsBytes.r
//   → 255
// rgbAsBytes.g
//   → 0
// rgbAsBytes.b
//   → 0
// rgbAsBytes.a
//   → 255

const bytes = red.toUint8ClampedArray();
// bytes
//   → Uint8ClampedArray[ 255, 0, 0, 255 ]

const bytes2 = red.toUint8Array();
// bytes2
//   → Uint8Array[ 255, 0, 0, 255 ]

// red.equalsBytes(RgbColor.fromHexString("#FF0000"))
//   → true
// red.equalsBytes(RgbColor.fromHsl({ h: 0, s: 1, l: 0.5 }))
//   → true
// red.equalsBytes(RgbColor.fromHwb({ h: 0, w: 0, b: 0 }))
//   → true

const blue = red.plusHue(-120);
// blue.toHexString()
//   → "#0000FFFF"
// blue.equalsBytes(red.withHue(240))
//   → true

const aqua = blue.plusHue(660);
// aqua.toHexString()
//   → "#00FFFFFF"

const navy = blue.plusLightness(-0.25);
// navy.toHexString()
//   → "#000080FF"
// navy.equalsBytes(blue.withLightness(0.25))
//   → true

const paleNavy = navy.withSaturation(0.5);
// paleNavy.toHexString()
//   → "#202060FF"
// paleNavy.equalsBytes(navy.plusSaturation(-0.5))
//   → true

const translucentPaleNavy = paleNavy.withAlpha(0.5);
// translucentPaleNavy.toHexString()
//   → "#20206080"
// translucentPaleNavy.equalsBytes(paleNavy.plusAlpha(-0.5))
//   → true
// paleNavy.equalsBytes(translucentPaleNavy.withoutAlpha())
//   → true

const invertedTranslucentPaleNavy = translucentPaleNavy.invert();
// invertedTranslucentPaleNavy.toHexString()
//   → "#DFDF9F80"

const complementaryColorOfTranslucentPaleNavy = translucentPaleNavy.complementary();
// complementaryColorOfTranslucentPaleNavy.toHexString()
//   → "#60602080"

```


### [`CssColorFormat`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/color.es/5.2.8/mod.ts/~/CssColorFormat) static class

```javascript
const red = CssColorFormat.parse("#ff0000");
// red.equalsBytes(CssColorFormat.parse("red"))
//   → true
// red.equalsBytes(CssColorFormat.parse("rgb(255, 0, 0)"))
//   → true
// red.equalsBytes(CssColorFormat.parse("rgba(255, 0, 0, 1)"))
//   → true
// red.equalsBytes(CssColorFormat.parse("hsl(0, 100%, 50%)"))
//   → true
// red.equalsBytes(CssColorFormat.parse("hsla(0, 100%, 50%, 1)"))
//   → true

const cssHexString = CssColorFormat.format(red);
// cssHexString
//   → "#ff0000ff"

```
