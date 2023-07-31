import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.prototype.r", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 1000, g: 0, b: 0 }).r, 1);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 256, g: 0, b: 0 }).r, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: i, g: 0, b: 0 }).r, i / 255);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: -1, g: 0, b: 0 }).r, 0);
});

Deno.test("SRgbColor.prototype.g", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 1000, b: 0 }).g, 1);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 256, b: 0 }).g, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: i, b: 0 }).g, i / 255);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: -1, b: 0 }).g, 0);
});

Deno.test("SRgbColor.prototype.b", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 1000 }).b, 1);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 256 }).b, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: i }).b, i / 255);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: -1 }).b, 0);
});

Deno.test("SRgbColor.prototype.rByte", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 1000, g: 0, b: 0 }).rByte, 255);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 256, g: 0, b: 0 }).rByte, 255);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: i, g: 0, b: 0 }).rByte, i);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: -1, g: 0, b: 0 }).rByte, 0);
});

Deno.test("SRgbColor.prototype.gByte", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 1000, b: 0 }).gByte, 255);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 256, b: 0 }).gByte, 255);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: i, b: 0 }).gByte, i);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: -1, b: 0 }).gByte, 0);
});

Deno.test("SRgbColor.prototype.bByte", () => {
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 1000 }).bByte, 255);
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: 256 }).bByte, 255);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: i }).bByte, i);
  }
  assertStrictEquals(SRgbColor.fromRgbBytes({ r: 0, g: 0, b: -1 }).bByte, 0);
});

Deno.test("SRgbColor.prototype.toHsl()", () => {
  const cases = [
    /* ChromeのF12から */
    { r: 0, h: "0.00", s: "0.00", l: "0.00" },
    //{ r: 5, h: "0.00", s: "0.00", l: "0.01"/*0.98*/ }, chromeのF12だとこれは彩度0。なんで？ firefoxのF12は形式変換できないのでわからんが赤のところにカーソルあるから多分1
    { r: 6, h: "0.00", s: "1.00", l: "0.01"/*1.18*/ },
    // { r: 7, h: "0.00", s: "1.00", l: "0.01"/*1.37*/ },
    // { r: 8, h: "0.00", s: "1.00", l: "0.02"/*1.57*/ },
    // { r: 9, h: "0.00", s: "1.00", l: "0.02"/*1.76*/ },
    // { r: 10, h: "0.00", s: "1.00", l: "0.02"/*1.96*/ },
    // { r: 11, h: "0.00", s: "1.00", l: "0.02"/*2.16*/ },
    // { r: 12, h: "0.00", s: "1.00", l: "0.02"/*2.35*/ },
    // { r: 13, h: "0.00", s: "1.00", l: "0.03"/*2.55*/ },
    // { r: 14, h: "0.00", s: "1.00", l: "0.03"/*2.75*/ },
    // { r: 15, h: "0.00", s: "1.00", l: "0.03"/*2.94*/ },
    // { r: 16, h: "0.00", s: "1.00", l: "0.03"/*3.14*/ },
    // { r: 17, h: "0.00", s: "1.00", l: "0.03"/*3.33*/ },
    // { r: 18, h: "0.00", s: "1.00", l: "0.04"/*3.53*/ },
    // { r: 19, h: "0.00", s: "1.00", l: "0.04"/*3.73*/ },
    // { r: 20, h: "0.00", s: "1.00", l: "0.04"/*3.92*/ },
    // { r: 21, h: "0.00", s: "1.00", l: "0.04"/*4.12*/ },
    // { r: 22, h: "0.00", s: "1.00", l: "0.04"/*4.31*/ },
    // { r: 23, h: "0.00", s: "1.00", l: "0.05"/*4.51*/ },
    // { r: 24, h: "0.00", s: "1.00", l: "0.05"/*4.71*/ },
    // { r: 25, h: "0.00", s: "1.00", l: "0.05"/*4.90*/ },
    // { r: 26, h: "0.00", s: "1.00", l: "0.05"/*5.10*/ },
    // { r: 27, h: "0.00", s: "1.00", l: "0.05"/*5.29*/ },
    // { r: 28, h: "0.00", s: "1.00", l: "0.05"/*5.49*/ },
    // { r: 29, h: "0.00", s: "1.00", l: "0.06"/*5.69*/ },
    // { r: 30, h: "0.00", s: "1.00", l: "0.06"/*5.88*/ },
    // { r: 31, h: "0.00", s: "1.00", l: "0.06"/*6.08*/ },
    // { r: 32, h: "0.00", s: "1.00", l: "0.06"/*6.27*/ },
    // { r: 33, h: "0.00", s: "1.00", l: "0.06"/*6.47*/ },
    // { r: 34, h: "0.00", s: "1.00", l: "0.07"/*6.67*/ },
    // { r: 35, h: "0.00", s: "1.00", l: "0.07"/*6.86*/ },
    // { r: 36, h: "0.00", s: "1.00", l: "0.07"/*7.06*/ },
    // { r: 37, h: "0.00", s: "1.00", l: "0.07"/*7.25*/ },
    // { r: 38, h: "0.00", s: "1.00", l: "0.07"/*7.45*/ },
    // { r: 39, h: "0.00", s: "1.00", l: "0.08"/*7.65*/ },
    // { r: 40, h: "0.00", s: "1.00", l: "0.08"/*7.84*/ },
    // { r: 41, h: "0.00", s: "1.00", l: "0.08"/*8.04*/ },
    // { r: 42, h: "0.00", s: "1.00", l: "0.08"/*8.24*/ },
    // { r: 43, h: "0.00", s: "1.00", l: "0.08"/*8.43*/ },
    // { r: 44, h: "0.00", s: "1.00", l: "0.09"/*8.63*/ },
    // { r: 45, h: "0.00", s: "1.00", l: "0.09"/*8.82*/ },
    // { r: 46, h: "0.00", s: "1.00", l: "0.09"/*9.02*/ },
    // { r: 47, h: "0.00", s: "1.00", l: "0.09"/*9.22*/ },
    // { r: 48, h: "0.00", s: "1.00", l: "0.09"/*9.41*/ },
    // { r: 49, h: "0.00", s: "1.00", l: "0.10"/*9.61*/ },
    { r: 50, h: "0.00", s: "1.00", l: "0.10"/*9.80*/ },
    //{ r: , h: "0.00", s: "1.00", l: "0."/*.*/ },

    { r: 100, h: "0.00", s: "1.00", l: "0.20"/*19.61*/ },

    { r: 150, h: "0.00", s: "1.00", l: "0.29"/*29.41*/ },

    { r: 200, h: "0.00", s: "1.00", l: "0.39"/*39.22*/ },

    { r: 255, h: "0.00", s: "1.00", l: "0.50" },
  ];

  for (const c of cases) {
    const hsl = SRgbColor.fromRgbBytes({ r: c.r, g: 0, b: 0 }).toHsl();
    console.log(hsl)
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(2), c.l);
  }
});
