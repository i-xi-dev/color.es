import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

// Deno.test("SRgb.SRgbColor.prototype.red", () => {
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 1000, g: 0, b: 0 }).red, 1);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 256, g: 0, b: 0 }).red, 1);
//   for (let i = 0; i <= 255; i++) {
//     assertStrictEquals(
//       SRgb.SRgbColor.fromRgbBytes({ r: i, g: 0, b: 0 }).red,
//       i / 255,
//     );
//   }
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: -1, g: 0, b: 0 }).red, 0);
// });

// Deno.test("SRgb.SRgbColor.prototype.green", () => {
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 1000, b: 0 }).green, 1);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 256, b: 0 }).green, 1);
//   for (let i = 0; i <= 255; i++) {
//     assertStrictEquals(
//       SRgb.SRgbColor.fromRgbBytes({ r: 0, g: i, b: 0 }).green,
//       i / 255,
//     );
//   }
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: -1, b: 0 }).green, 0);
// });

// Deno.test("SRgb.SRgbColor.prototype.blue", () => {
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 1000 }).blue, 1);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 256 }).blue, 1);
//   for (let i = 0; i <= 255; i++) {
//     assertStrictEquals(
//       SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: i }).blue,
//       i / 255,
//     );
//   }
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: -1 }).blue, 0);
// });

// Deno.test("SRgb.SRgbColor.prototype.alpha", () => {
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 10, g: 100, b: 1000 }).alpha,
//     1,
//   );
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0, a: 256 }).alpha,
//     1,
//   );
//   for (let i = 0; i <= 255; i++) {
//     assertStrictEquals(
//       SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0, a: i }).alpha,
//       i / 255,
//     );
//   }
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0, a: -1 }).alpha,
//     0,
//   );
// });

// Deno.test("SRgb.SRgbColor.prototype.hue", () => {
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 0, b: 0 }).hue, 0);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 255, b: 0 }).hue, 120);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 255 }).hue, 240);
//   assertStrictEquals(SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0 }).hue, 0);
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 255, b: 255 }).hue,
//     0,
//   );
// });

// Deno.test("SRgb.SRgbColor.prototype.saturation", () => {
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 0, b: 0 }).saturation,
//     1,
//   );
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0 }).saturation,
//     0,
//   );
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 255, b: 255 }).saturation,
//     0,
//   );
// });

// Deno.test("SRgb.SRgbColor.prototype.lightness", () => {
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 0, b: 0 }).lightness,
//     0.5,
//   );
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 0 }).lightness,
//     0,
//   );
//   assertStrictEquals(
//     SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 255, b: 255 }).lightness,
//     1,
//   );
// });

// Deno.test("SRgb.SRgbColor.fromRgbBytes({r, g, b})", () => {
//   const c1 = SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 254, b: 253, a: 252 });
//   assertStrictEquals(c1.red, 255 / 255);
//   assertStrictEquals(c1.green, 254 / 255);
//   assertStrictEquals(c1.blue, 253 / 255);
//   assertStrictEquals(c1.alpha, 252 / 255);

//   const c2 = SRgb.SRgbColor.fromRgbBytes(
//     { r: 1000, g: "" } as unknown as { r: number; g: number; b: number },
//   );
//   assertStrictEquals(c2.red, 255 / 255);
//   assertStrictEquals(c2.green, 0 / 255);
//   assertStrictEquals(c2.blue, 0 / 255);
//   assertStrictEquals(c2.alpha, 255 / 255);
// });

// Deno.test("SRgb.SRgbColor.fromRgbBytes({r, g, b}, {})", () => {
//   const c1 = SRgb.SRgbColor.fromRgbBytes({ r: 255, g: 254, b: 253, a: 252 }, {
//     ignoreAlpha: true,
//   });
//   assertStrictEquals(c1.red, 255 / 255);
//   assertStrictEquals(c1.green, 254 / 255);
//   assertStrictEquals(c1.blue, 253 / 255);
//   assertStrictEquals(c1.alpha, 255 / 255);

//   const c2 = SRgb.SRgbColor.fromRgbBytes(
//     { r: 1000, g: "" } as unknown as { r: number; g: number; b: number },
//     { ignoreAlpha: true },
//   );
//   assertStrictEquals(c2.red, 255 / 255);
//   assertStrictEquals(c2.green, 0 / 255);
//   assertStrictEquals(c2.blue, 0 / 255);
//   assertStrictEquals(c2.alpha, 255 / 255);
// });

// Deno.test("SRgb.SRgbColor.prototype.toHsl()", () => {
//   for (const c of r1Cases) {
//     const hsl = SRgb.SRgbColor.fromRgbBytes({ r: c.r, g: 0, b: 0 }).toHsl();
//     assertStrictEquals(hsl.h.toFixed(2), c.h);
//     assertStrictEquals(hsl.s.toFixed(2), c.s);
//     assertStrictEquals(hsl.l.toFixed(4), c.l);
//   }

//   for (const c of r2Cases) {
//     const hsl = SRgb.SRgbColor.fromRgbBytes({ r: 255, g: c.x, b: c.x }).toHsl();
//     assertStrictEquals(hsl.h.toFixed(2), c.h);
//     assertStrictEquals(hsl.s.toFixed(2), c.s);
//     assertStrictEquals(hsl.l.toFixed(4), c.l);
//   }

//   const c0 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1 = c0.toHsl();
//   c1.h = 120;
//   assertStrictEquals(c0.red, 1);
// });

// Deno.test("SRgb.SRgbColor.prototype.toHsl({}) - omitAlphaIfOpaque", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toHsl({ omitAlphaIfOpaque: true });
//   assertStrictEquals("a" in c1a, false);

//   const c2 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c2a = c2.toHsl({ omitAlphaIfOpaque: true });
//   assertStrictEquals(c2a.a, 0x88 / 255);
// });

// Deno.test("SRgb.SRgbColor.prototype.toHsl({}) - discardAlpha", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toHsl({ discardAlpha: true });
//   assertStrictEquals("a" in c1a, false);

//   const c2 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c2a = c2.toHsl({ discardAlpha: true });
//   assertStrictEquals("a" in c2a, false);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgb()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgb();
//   assertStrictEquals(c1a.r, 1);
//   assertStrictEquals(c1a.g, 254 / 255);
//   assertStrictEquals(c1a.b, 253 / 255);
//   assertStrictEquals(c1a.a, 1);
//   c1a.r = 0;
//   assertStrictEquals(c1.red, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgb();
//   assertStrictEquals(c2a.r, 1 / 255);
//   assertStrictEquals(c2a.g, 2 / 255);
//   assertStrictEquals(c2a.b, 3 / 255);
//   assertStrictEquals(c2a.a, 136 / 255);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgb({}) - omitAlphaIfOpaque", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgb({ omitAlphaIfOpaque: true });
//   assertStrictEquals(c1a.r, 1);
//   assertStrictEquals(c1a.g, 254 / 255);
//   assertStrictEquals(c1a.b, 253 / 255);
//   assertStrictEquals("a" in c1a, false);
//   c1a.r = 0;
//   assertStrictEquals(c1.red, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgb({ omitAlphaIfOpaque: true });
//   assertStrictEquals(c2a.r, 1 / 255);
//   assertStrictEquals(c2a.g, 2 / 255);
//   assertStrictEquals(c2a.b, 3 / 255);
//   assertStrictEquals(c2a.a, 136 / 255);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgb({}) - discardAlpha", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgb({ discardAlpha: true });
//   assertStrictEquals(c1a.r, 1);
//   assertStrictEquals(c1a.g, 254 / 255);
//   assertStrictEquals(c1a.b, 253 / 255);
//   assertStrictEquals("a" in c1a, false);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgb({ discardAlpha: true });
//   assertStrictEquals(c2a.r, 1 / 255);
//   assertStrictEquals(c2a.g, 2 / 255);
//   assertStrictEquals(c2a.b, 3 / 255);
//   assertStrictEquals("a" in c2a, false);
// });

// Deno.test("SRgb.SRgbColor.prototype.toJSON()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toJSON();
//   assertStrictEquals(c1a.r, 1);
//   assertStrictEquals(c1a.g, 254 / 255);
//   assertStrictEquals(c1a.b, 253 / 255);
//   assertStrictEquals(c1a.a, 1);
//   c1a.r = 0;
//   assertStrictEquals(c1.red, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toJSON();
//   assertStrictEquals(c2a.r, 1 / 255);
//   assertStrictEquals(c2a.g, 2 / 255);
//   assertStrictEquals(c2a.b, 3 / 255);
//   assertStrictEquals(c2a.a, 136 / 255);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgbBytes()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgbBytes();
//   assertStrictEquals(c1a.r, 255);
//   assertStrictEquals(c1a.g, 254);
//   assertStrictEquals(c1a.b, 253);
//   assertStrictEquals(c1a.a, 255);
//   c1a.r = 0;
//   assertStrictEquals(c1.red, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgbBytes();
//   assertStrictEquals(c2a.r, 1);
//   assertStrictEquals(c2a.g, 2);
//   assertStrictEquals(c2a.b, 3);
//   assertStrictEquals(c2a.a, 136);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgbBytes({}) - omitAlphaIfOpaque", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgbBytes({ omitAlphaIfOpaque: true });
//   assertStrictEquals(c1a.r, 255);
//   assertStrictEquals(c1a.g, 254);
//   assertStrictEquals(c1a.b, 253);
//   assertStrictEquals("a" in c1a, false);
//   c1a.r = 0;
//   assertStrictEquals(c1.red, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgbBytes({ omitAlphaIfOpaque: true });
//   assertStrictEquals(c2a.r, 1);
//   assertStrictEquals(c2a.g, 2);
//   assertStrictEquals(c2a.b, 3);
//   assertStrictEquals(c2a.a, 136);
// });

// Deno.test("SRgb.SRgbColor.prototype.toRgbBytes({}) - discardAlpha", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.toRgbBytes({ discardAlpha: true });
//   assertStrictEquals(c1a.r, 255);
//   assertStrictEquals(c1a.g, 254);
//   assertStrictEquals(c1a.b, 253);
//   assertStrictEquals("a" in c1a, false);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.toRgbBytes({ discardAlpha: true });
//   assertStrictEquals(c2a.r, 1);
//   assertStrictEquals(c2a.g, 2);
//   assertStrictEquals(c2a.b, 3);
//   assertStrictEquals("a" in c2a, false);
// });

// Deno.test("SRgb.SRgbColor.prototype.toString()", () => {
//   assertStrictEquals(SRgb.SRgbColor.fromHexString("#fffefd").toString(), "#FFFEFD");
// });

// Deno.test("SRgb.SRgbColor.prototype.rotateHue()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.rotateHue(0);
//   assertStrictEquals(c1a.lightness, c1.lightness);
//   assertStrictEquals(c1a.hue, c1.hue);
//   assertStrictEquals(c1a.saturation, c1.saturation);
//   assertStrictEquals(c1a.alpha, c1.alpha);

//   const c2 = SRgb.SRgbColor.fromHsl({ h: 12, s: 0.5, l: 0.5 });
//   const c2a = c2.rotateHue(-1);
//   assertStrictEquals(c2a.lightness, c2.lightness);
//   assertStrictEquals(c2a.hue.toFixed(6), (11).toFixed(6));
//   assertStrictEquals(c2a.saturation, c2.saturation);

//   const c2b = c2.rotateHue(1);
//   assertStrictEquals(c2b.lightness, c2.lightness);
//   assertStrictEquals(c2b.hue.toFixed(6), (13).toFixed(6));
//   assertStrictEquals(c2b.saturation, c2.saturation);

//   const c2c = c2.rotateHue(20000);
//   assertStrictEquals(c2c.lightness, c2.lightness);
//   assertStrictEquals(c2c.hue.toFixed(6), (212).toFixed(6));
//   assertStrictEquals(c2c.saturation, c2.saturation);
// });

// Deno.test("SRgb.SRgbColor.prototype.withHue()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.withHue(0);
//   assertStrictEquals(c1a.lightness, c1.lightness);
//   assertStrictEquals(c1a.hue, 0);
//   assertStrictEquals(c1a.saturation, c1.saturation);

//   const c1b = c1.withHue(-1);
//   assertStrictEquals(c1b.lightness, c1.lightness);
//   assertStrictEquals(c1b.hue.toFixed(6), (359).toFixed(6));
//   assertStrictEquals(c1b.saturation, c1.saturation);

//   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
//   const c2a = c2.withHue(1);
//   assertStrictEquals(c2a.lightness, c2.lightness);
//   assertStrictEquals(c2a.hue.toFixed(6), (1).toFixed(6));
//   assertStrictEquals(c2a.saturation, c2.saturation);

//   const c2b = c2.withHue(20000);
//   assertStrictEquals(c2b.lightness, c2.lightness);
//   assertStrictEquals(c2b.hue.toFixed(6), (200).toFixed(6));
//   assertStrictEquals(c2b.saturation, c2.saturation);
//   assertStrictEquals(c2b.alpha, c2.alpha);
// });

// Deno.test("SRgb.SRgbColor.prototype.plusSaturation()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.plusSaturation(0);
//   assertStrictEquals(c1a.lightness, c1.lightness);
//   assertStrictEquals(c1a.hue, c1.hue);
//   assertStrictEquals(c1a.saturation, c1.saturation);

//   const c1b = c1.plusSaturation(-1);
//   assertStrictEquals(c1b.lightness, c1.lightness);
//   assertStrictEquals(c1b.hue, 0);
//   assertStrictEquals(c1b.saturation, 0);

//   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
//   const c2a = c2.plusSaturation(1);
//   assertStrictEquals(c2a.lightness, c2.lightness);
//   assertStrictEquals(c2a.hue, c2.hue);
//   assertStrictEquals(c2a.saturation, 1);

//   const c2b = c2.plusSaturation(2);
//   assertStrictEquals(c2b.lightness, c2.lightness);
//   assertStrictEquals(c2b.hue, c2.hue);
//   assertStrictEquals(c2b.saturation, 1);

//   const c3 = SRgb.SRgbColor.fromHexString("#030203");
//   const c3a = c3.plusSaturation(0.5);
//   assertStrictEquals(c3a.lightness, c3.lightness);
//   assertStrictEquals(c3a.hue, c3.hue);
//   assertStrictEquals(
//     c3a.saturation.toFixed(6),
//     (c3.saturation + 0.5).toFixed(6),
//   );
//   assertStrictEquals(c3a.alpha, c3.alpha);
// });

// // Deno.test("SRgb.SRgbColor.prototype.minusSaturation()", () => {
// //   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
// //   const c1a = c1.minusSaturation(0);
// //   assertStrictEquals(c1a.lightness, c1.lightness);
// //   assertStrictEquals(c1a.hue, c1.hue);
// //   assertStrictEquals(c1a.saturation, c1.saturation);

// //   const c1b = c1.minusSaturation(-1);
// //   assertStrictEquals(c1b.lightness, c1.lightness);
// //   assertStrictEquals(c1b.hue, c1.hue);
// //   assertStrictEquals(c1b.saturation, 1);

// //   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
// //   const c2a = c2.minusSaturation(1);
// //   assertStrictEquals(c2a.lightness, c2.lightness);
// //   assertStrictEquals(c2a.hue, 0);
// //   assertStrictEquals(c2a.saturation, 0);

// //   const c2b = c2.minusSaturation(2);
// //   assertStrictEquals(c2b.lightness, c2.lightness);
// //   assertStrictEquals(c2b.hue, 0);
// //   assertStrictEquals(c2b.saturation, 0);

// //   const c3 = SRgb.SRgbColor.fromHexString("#ff0203");
// //   const c3a = c3.minusSaturation(0.5);
// //   assertStrictEquals(c3a.lightness, c3.lightness);
// //   assertStrictEquals(c3a.hue, c3.hue);
// //   assertStrictEquals(
// //     c3a.saturation.toFixed(6),
// //     (c3.saturation - 0.5).toFixed(6),
// //   );
// //   assertStrictEquals(c3a.alpha, c3.alpha);
// // });

// Deno.test("SRgb.SRgbColor.prototype.withSaturation()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.withSaturation(0);
//   //assertStrictEquals(c1a.lightness, 0); 連動して変わる
//   assertStrictEquals(c1a.hue, 0);
//   assertStrictEquals(c1a.saturation, 0);

//   const c1b = c1.withSaturation(-1);
//   //assertStrictEquals(c1b.lightness, 0); 連動して変わる
//   assertStrictEquals(c1b.hue, 0);
//   assertStrictEquals(c1b.saturation, 0);

//   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
//   const c2a = c2.withSaturation(1);
//   assertStrictEquals(c2a.lightness, c2.lightness);
//   assertStrictEquals(c2a.hue, c2.hue);
//   assertStrictEquals(c2a.saturation, 1);

//   const c2b = c2.withSaturation(2);
//   assertStrictEquals(c2b.lightness, c2.lightness);
//   assertStrictEquals(c2b.hue, c2.hue);
//   assertStrictEquals(c2b.saturation, 1);

//   const c3 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c3a = c3.withSaturation(0.5);
//   assertStrictEquals(c3a.lightness, c3.lightness);
//   assertStrictEquals(c3a.hue, c3.hue);
//   assertStrictEquals(c3a.saturation, 0.5);
//   assertStrictEquals(c3a.alpha, c3.alpha);
// });

// Deno.test("SRgb.SRgbColor.prototype.plusLightness()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.plusLightness(0);
//   assertStrictEquals(c1a.lightness, c1.lightness);
//   assertStrictEquals(c1a.hue, c1.hue);
//   assertStrictEquals(c1a.saturation, c1.saturation);

//   const c1b = c1.plusLightness(-1);
//   assertStrictEquals(c1b.lightness, 0);
//   assertStrictEquals(c1b.hue, 0);
//   assertStrictEquals(c1b.saturation, 0);

//   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
//   const c2a = c2.plusLightness(1);
//   assertStrictEquals(c2a.lightness, 1);
//   assertStrictEquals(c2a.hue, 0);
//   assertStrictEquals(c2a.saturation, 0);

//   const c2b = c2.plusLightness(2);
//   assertStrictEquals(c2b.lightness, 1);
//   assertStrictEquals(c2b.hue, 0);
//   assertStrictEquals(c2b.saturation, 0);

//   const c3 = SRgb.SRgbColor.fromHexString("#881122");
//   const c3a = c3.plusLightness(0.5);
//   assertStrictEquals(c3a.lightness.toFixed(6), (c3.lightness + 0.5).toFixed(6));
//   assertStrictEquals(c3a.hue, c3.hue);
//   //assertStrictEquals(c3a.saturation, c3.saturation); 連動して変わる
//   assertStrictEquals(c3a.alpha, c3.alpha);
// });

// // Deno.test("SRgb.SRgbColor.prototype.minusLightness()", () => {
// //   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
// //   const c1a = c1.minusLightness(0);
// //   assertStrictEquals(c1a.lightness, c1.lightness);
// //   assertStrictEquals(c1a.hue, c1.hue);
// //   assertStrictEquals(c1a.saturation, c1.saturation);

// //   const c1b = c1.minusLightness(-1);
// //   assertStrictEquals(c1b.lightness, 1);
// //   assertStrictEquals(c1b.hue, 0);
// //   assertStrictEquals(c1b.saturation, 0);

// //   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
// //   const c2a = c2.minusLightness(1);
// //   assertStrictEquals(c2a.lightness, 0);
// //   assertStrictEquals(c2a.hue, 0);
// //   assertStrictEquals(c2a.saturation, 0);

// //   const c2b = c2.minusLightness(2);
// //   assertStrictEquals(c2b.lightness, 0);
// //   assertStrictEquals(c2b.hue, 0);
// //   assertStrictEquals(c2b.saturation, 0);

// //   const c3 = SRgb.SRgbColor.fromHexString("#ff8899");
// //   const c3a = c3.minusLightness(0.5);
// //   assertStrictEquals(c3a.lightness.toFixed(6), (c3.lightness - 0.5).toFixed(6));
// //   assertStrictEquals(c3a.hue, c3.hue);
// //   //assertStrictEquals(c3a.saturation, c3.saturation); 連動して変わる
// //   assertStrictEquals(c3a.alpha, c3.alpha);
// // });

// Deno.test("SRgb.SRgbColor.prototype.withLightness()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.withLightness(0);
//   assertStrictEquals(c1a.lightness, 0);
//   assertStrictEquals(c1a.hue, 0);
//   assertStrictEquals(c1a.saturation, 0);

//   const c1b = c1.withLightness(-1);
//   assertStrictEquals(c1b.lightness, 0);
//   assertStrictEquals(c1b.hue, 0);
//   assertStrictEquals(c1b.saturation, 0);

//   const c2 = SRgb.SRgbColor.fromHexString("#11213188");
//   const c2a = c2.withLightness(1);
//   assertStrictEquals(c2a.lightness, 1);
//   assertStrictEquals(c2a.hue, 0);
//   assertStrictEquals(c2a.saturation, 0);

//   const c2b = c2.withLightness(2);
//   assertStrictEquals(c2b.lightness, 1);
//   assertStrictEquals(c2b.hue, 0);
//   assertStrictEquals(c2b.saturation, 0);

//   const c3 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c3a = c3.withLightness(0.5);
//   assertStrictEquals(c3a.lightness, 0.5);
//   assertStrictEquals(c3a.hue, c3.hue);
//   assertStrictEquals(c3a.saturation, c3.saturation);
//   assertStrictEquals(c3a.alpha, c3.alpha);
// });

// Deno.test("SRgb.SRgbColor.prototype.plusAlpha()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
//   const c1a = c1.plusAlpha(0);
//   assertStrictEquals(c1a.red, 1);
//   assertStrictEquals(c1a.green, 254 / 255);
//   assertStrictEquals(c1a.blue, 253 / 255);
//   assertStrictEquals(c1a.alpha, 136 / 255);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.plusAlpha(-2);
//   assertStrictEquals(c2a.red, 1 / 255);
//   assertStrictEquals(c2a.green, 2 / 255);
//   assertStrictEquals(c2a.blue, 3 / 255);
//   assertStrictEquals(c2a.alpha, 0);

//   const c2x = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2xa = c2x.plusAlpha((0x44 / 255) * -1);
//   assertStrictEquals(c2xa.red, 1 / 255);
//   assertStrictEquals(c2xa.green, 2 / 255);
//   assertStrictEquals(c2xa.blue, 3 / 255);
//   assertStrictEquals(c2xa.alpha, (136 - 68) / 255);

//   const c3 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c3a = c3.plusAlpha(2);
//   assertStrictEquals(c3a.red, 1 / 255);
//   assertStrictEquals(c3a.green, 2 / 255);
//   assertStrictEquals(c3a.blue, 3 / 255);
//   assertStrictEquals(c3a.alpha, 1);

//   const c3x = SRgb.SRgbColor.fromHexString("#01020388");
//   const c3xa = c3x.plusAlpha(0x44 / 255);
//   assertStrictEquals(c3xa.red, 1 / 255);
//   assertStrictEquals(c3xa.green, 2 / 255);
//   assertStrictEquals(c3xa.blue, 3 / 255);
//   assertStrictEquals(c3xa.alpha, (136 + 68) / 255);
// });

// // Deno.test("SRgb.SRgbColor.prototype.minusAlpha()", () => {
// //   const c1 = SRgb.SRgbColor.fromHexString("#fffefd88");
// //   const c1a = c1.minusAlpha(0);
// //   assertStrictEquals(c1a.red, 1);
// //   assertStrictEquals(c1a.green, 254 / 255);
// //   assertStrictEquals(c1a.blue, 253 / 255);
// //   assertStrictEquals(c1a.alpha, 136 / 255);

// //   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
// //   const c2a = c2.minusAlpha(-2);
// //   assertStrictEquals(c2a.red, 1 / 255);
// //   assertStrictEquals(c2a.green, 2 / 255);
// //   assertStrictEquals(c2a.blue, 3 / 255);
// //   assertStrictEquals(c2a.alpha, 1);

// //   const c2x = SRgb.SRgbColor.fromHexString("#01020388");
// //   const c2xa = c2x.minusAlpha((0x44 / 255) * -1);
// //   assertStrictEquals(c2xa.red, 1 / 255);
// //   assertStrictEquals(c2xa.green, 2 / 255);
// //   assertStrictEquals(c2xa.blue, 3 / 255);
// //   assertStrictEquals(c2xa.alpha, (136 + 68) / 255);

// //   const c3 = SRgb.SRgbColor.fromHexString("#01020388");
// //   const c3a = c3.minusAlpha(2);
// //   assertStrictEquals(c3a.red, 1 / 255);
// //   assertStrictEquals(c3a.green, 2 / 255);
// //   assertStrictEquals(c3a.blue, 3 / 255);
// //   assertStrictEquals(c3a.alpha, 0);

// //   const c3x = SRgb.SRgbColor.fromHexString("#01020388");
// //   const c3xa = c3x.minusAlpha(0x44 / 255);
// //   assertStrictEquals(c3xa.red, 1 / 255);
// //   assertStrictEquals(c3xa.green, 2 / 255);
// //   assertStrictEquals(c3xa.blue, 3 / 255);
// //   assertStrictEquals(c3xa.alpha, (136 - 68) / 255);
// // });

// Deno.test("SRgb.SRgbColor.prototype.withAlpha()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.withAlpha(0);
//   assertStrictEquals(c1a.red, 1);
//   assertStrictEquals(c1a.green, 254 / 255);
//   assertStrictEquals(c1a.blue, 253 / 255);
//   assertStrictEquals(c1a.alpha, 0);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.withAlpha(-1);
//   assertStrictEquals(c2a.red, 1 / 255);
//   assertStrictEquals(c2a.green, 2 / 255);
//   assertStrictEquals(c2a.blue, 3 / 255);
//   assertStrictEquals(c2a.alpha, 0);

//   const c3 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c3a = c3.withAlpha(2);
//   assertStrictEquals(c3a.red, 1 / 255);
//   assertStrictEquals(c3a.green, 2 / 255);
//   assertStrictEquals(c3a.blue, 3 / 255);
//   assertStrictEquals(c3a.alpha, 1);
// });

// Deno.test("SRgb.SRgbColor.prototype.withoutAlpha()", () => {
//   const c1 = SRgb.SRgbColor.fromHexString("#fffefd");
//   const c1a = c1.withoutAlpha();
//   assertStrictEquals(c1a.red, 1);
//   assertStrictEquals(c1a.green, 254 / 255);
//   assertStrictEquals(c1a.blue, 253 / 255);
//   assertStrictEquals(c1a.alpha, 1);

//   const c2 = SRgb.SRgbColor.fromHexString("#01020388");
//   const c2a = c2.withoutAlpha();
//   assertStrictEquals(c2a.red, 1 / 255);
//   assertStrictEquals(c2a.green, 2 / 255);
//   assertStrictEquals(c2a.blue, 3 / 255);
//   assertStrictEquals(c2a.alpha, 1);
// });
