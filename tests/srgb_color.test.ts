import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgb } from "../mod.ts";

Deno.test("SRgb.Color.prototype.red", () => {
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 1000, g: 0, b: 0 }).red, 1);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 256, g: 0, b: 0 }).red, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgb.Color.fromRgbBytes({ r: i, g: 0, b: 0 }).red,
      i / 255,
    );
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: -1, g: 0, b: 0 }).red, 0);
});

Deno.test("SRgb.Color.prototype.green", () => {
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 1000, b: 0 }).green, 1);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 256, b: 0 }).green, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgb.Color.fromRgbBytes({ r: 0, g: i, b: 0 }).green,
      i / 255,
    );
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: -1, b: 0 }).green, 0);
});

Deno.test("SRgb.Color.prototype.blue", () => {
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 1000 }).blue, 1);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 256 }).blue, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: i }).blue,
      i / 255,
    );
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: -1 }).blue, 0);
});

Deno.test("SRgb.Color.prototype.alpha", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 10, g: 100, b: 1000 }).alpha,
    1,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: 256 }).alpha,
    1,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: i }).alpha,
      i / 255,
    );
  }
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: -1 }).alpha,
    0,
  );
});

Deno.test("SRgb.Color.prototype.rByte", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 1000, g: 0, b: 0 }).rByte,
    255,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 256, g: 0, b: 0 }).rByte,
    255,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgb.Color.fromRgbBytes({ r: i, g: 0, b: 0 }).rByte, i);
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: -1, g: 0, b: 0 }).rByte, 0);
});

Deno.test("SRgb.Color.prototype.gByte", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 1000, b: 0 }).gByte,
    255,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 256, b: 0 }).gByte,
    255,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: i, b: 0 }).gByte, i);
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: -1, b: 0 }).gByte, 0);
});

Deno.test("SRgb.Color.prototype.bByte", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 1000 }).bByte,
    255,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 256 }).bByte,
    255,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: i }).bByte, i);
  }
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: -1 }).bByte, 0);
});

Deno.test("SRgb.Color.prototype.aByte", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 10, g: 100, b: 1000 }).aByte,
    255,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: 256 }).aByte,
    255,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: i }).aByte,
      i,
    );
  }
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0, a: -1 }).aByte,
    0,
  );
});

Deno.test("SRgb.Color.prototype.hue", () => {
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 255, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 255, b: 0 }).hue, 120);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 255 }).hue, 240);
  assertStrictEquals(SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 255, g: 255, b: 255 }).hue,
    0,
  );
});

Deno.test("SRgb.Color.prototype.saturation", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 255, g: 0, b: 0 }).saturation,
    1,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0 }).saturation,
    0,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 255, g: 255, b: 255 }).saturation,
    0,
  );
});

Deno.test("SRgb.Color.prototype.lightness", () => {
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 255, g: 0, b: 0 }).lightness,
    0.5,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 0, g: 0, b: 0 }).lightness,
    0,
  );
  assertStrictEquals(
    SRgb.Color.fromRgbBytes({ r: 255, g: 255, b: 255 }).lightness,
    1,
  );
});

Deno.test("SRgb.Color.fromRgb()", () => {
  const c1 = SRgb.Color.fromRgb({ r: 0.11, g: 0.12, b: 0.13 });
  assertStrictEquals(c1.red, 0.11);
  assertStrictEquals(c1.green, 0.12);
  assertStrictEquals(c1.blue, 0.13);
  assertStrictEquals(c1.alpha, 1);

  const c2 = SRgb.Color.fromRgb({ r: 0.11, g: 0.12, b: 0.13, a: 0.14 });
  assertStrictEquals(c2.red, 0.11);
  assertStrictEquals(c2.green, 0.12);
  assertStrictEquals(c2.blue, 0.13);
  assertStrictEquals(c2.alpha, 0.14);
});

Deno.test("SRgb.Color.fromRgbBytes(Uint8Array)", () => {
  const c1 = SRgb.Color.fromRgbBytes(Uint8Array.of(254, 253, 252));
  assertStrictEquals(c1.rByte, 254);
  assertStrictEquals(c1.gByte, 253);
  assertStrictEquals(c1.bByte, 252);
  assertStrictEquals(c1.aByte, 255);

  const c2 = SRgb.Color.fromRgbBytes(Uint8Array.of(255, 254, 253, 252));
  assertStrictEquals(c2.rByte, 255);
  assertStrictEquals(c2.gByte, 254);
  assertStrictEquals(c2.bByte, 253);
  assertStrictEquals(c2.aByte, 252);
});

Deno.test("SRgb.Color.fromRgbBytes(Uint8ClampedArray)", () => {
  const c1 = SRgb.Color.fromRgbBytes(Uint8ClampedArray.of(254, 253, 252));
  assertStrictEquals(c1.rByte, 254);
  assertStrictEquals(c1.gByte, 253);
  assertStrictEquals(c1.bByte, 252);
  assertStrictEquals(c1.aByte, 255);

  const c2 = SRgb.Color.fromRgbBytes(Uint8ClampedArray.of(255, 254, 253, 252));
  assertStrictEquals(c2.rByte, 255);
  assertStrictEquals(c2.gByte, 254);
  assertStrictEquals(c2.bByte, 253);
  assertStrictEquals(c2.aByte, 252);
});

Deno.test("SRgb.Color.fromRgbBytes(Array)", () => {
  const c1 = SRgb.Color.fromRgbBytes([255, 254, 253]);
  assertStrictEquals(c1.rByte, 255);
  assertStrictEquals(c1.gByte, 254);
  assertStrictEquals(c1.bByte, 253);

  const c2 = SRgb.Color.fromRgbBytes([1000, ""] as Array<number>);
  assertStrictEquals(c2.rByte, 255);
  assertStrictEquals(c2.gByte, 0);
  assertStrictEquals(c2.bByte, 0);

  const c3 = SRgb.Color.fromRgbBytes(undefined as unknown as Array<number>);
  assertStrictEquals(c3.rByte, 0);
  assertStrictEquals(c3.gByte, 0);
  assertStrictEquals(c3.bByte, 0);
});

Deno.test("SRgb.Color.fromRgbBytes({r, g, b})", () => {
  const c1 = SRgb.Color.fromRgbBytes({ r: 255, g: 254, b: 253 });
  assertStrictEquals(c1.rByte, 255);
  assertStrictEquals(c1.gByte, 254);
  assertStrictEquals(c1.bByte, 253);

  const c2 = SRgb.Color.fromRgbBytes(
    { r: 1000, g: "" } as unknown as { r: number; g: number; b: number },
  );
  assertStrictEquals(c2.rByte, 255);
  assertStrictEquals(c2.gByte, 0);
  assertStrictEquals(c2.bByte, 0);
});

Deno.test("SRgb.Color.fromHexString(string)", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  assertStrictEquals(c1.rByte, 255);
  assertStrictEquals(c1.gByte, 254);
  assertStrictEquals(c1.bByte, 253);
  assertStrictEquals(c1.aByte, 255);

  const c1a = SRgb.Color.fromHexString("#fffefd00");
  assertStrictEquals(c1a.rByte, 255);
  assertStrictEquals(c1a.gByte, 254);
  assertStrictEquals(c1a.bByte, 253);
  assertStrictEquals(c1a.aByte, 0);

  const c1b = SRgb.Color.fromHexString("#FFFEFD00");
  assertStrictEquals(c1b.rByte, 255);
  assertStrictEquals(c1b.gByte, 254);
  assertStrictEquals(c1b.bByte, 253);
  assertStrictEquals(c1b.aByte, 0);

  const c2 = SRgb.Color.fromHexString("#fed");
  assertStrictEquals(c2.rByte, 255);
  assertStrictEquals(c2.gByte, 238);
  assertStrictEquals(c2.bByte, 221);
  assertStrictEquals(c2.aByte, 255);

  const c2a = SRgb.Color.fromHexString("#fed8");
  assertStrictEquals(c2a.rByte, 255);
  assertStrictEquals(c2a.gByte, 238);
  assertStrictEquals(c2a.bByte, 221);
  assertStrictEquals(c2a.aByte, 136);

  const c2b = SRgb.Color.fromHexString("#FED8");
  assertStrictEquals(c2b.rByte, 255);
  assertStrictEquals(c2b.gByte, 238);
  assertStrictEquals(c2b.bByte, 221);
  assertStrictEquals(c2b.aByte, 136);

  assertThrows(
    () => {
      SRgb.Color.fromHexString(255 as unknown as string);
    },
    TypeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#1");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#12");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#12345");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#1234567");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgb.Color.fromHexString("#123456789");
    },
    RangeError,
    "input",
  );
});

const r1Cases = [
  /* ChromeのF12から */
  // $01 chromeのF12だとこれは彩度0。なんで？ firefoxのF12は形式変換できないのでわからんが赤のところにカーソルあるから多分1
  { r: 0, h: "0.00", s: "0.00", l: "0.0000" },
  { r: 1, h: "0.00", s: "1.00", l: "0.0020" }, // $01
  { r: 2, h: "0.00", s: "1.00", l: "0.0039" }, // $01
  { r: 3, h: "0.00", s: "1.00", l: "0.0059" }, // $01
  { r: 4, h: "0.00", s: "1.00", l: "0.0078" }, // $01
  { r: 5, h: "0.00", s: "1.00", l: "0.0098" }, // $01
  { r: 6, h: "0.00", s: "1.00", l: "0.0118" },
  { r: 7, h: "0.00", s: "1.00", l: "0.0137" },
  { r: 8, h: "0.00", s: "1.00", l: "0.0157" },
  { r: 9, h: "0.00", s: "1.00", l: "0.0176" },
  { r: 10, h: "0.00", s: "1.00", l: "0.0196" },
  { r: 11, h: "0.00", s: "1.00", l: "0.0216" },
  { r: 12, h: "0.00", s: "1.00", l: "0.0235" },
  { r: 13, h: "0.00", s: "1.00", l: "0.0255" },
  { r: 14, h: "0.00", s: "1.00", l: "0.0275" },
  { r: 15, h: "0.00", s: "1.00", l: "0.0294" },
  { r: 16, h: "0.00", s: "1.00", l: "0.0314" },
  { r: 17, h: "0.00", s: "1.00", l: "0.0333" },
  { r: 18, h: "0.00", s: "1.00", l: "0.0353" },
  { r: 19, h: "0.00", s: "1.00", l: "0.0373" },
  { r: 20, h: "0.00", s: "1.00", l: "0.0392" },
  { r: 21, h: "0.00", s: "1.00", l: "0.0412" },
  { r: 22, h: "0.00", s: "1.00", l: "0.0431" },
  { r: 23, h: "0.00", s: "1.00", l: "0.0451" },
  { r: 24, h: "0.00", s: "1.00", l: "0.0471" },
  { r: 25, h: "0.00", s: "1.00", l: "0.0490" },
  { r: 26, h: "0.00", s: "1.00", l: "0.0510" },
  { r: 27, h: "0.00", s: "1.00", l: "0.0529" },
  { r: 28, h: "0.00", s: "1.00", l: "0.0549" },
  { r: 29, h: "0.00", s: "1.00", l: "0.0569" },
  { r: 30, h: "0.00", s: "1.00", l: "0.0588" },
  { r: 31, h: "0.00", s: "1.00", l: "0.0608" },
  { r: 32, h: "0.00", s: "1.00", l: "0.0627" },
  { r: 33, h: "0.00", s: "1.00", l: "0.0647" },
  { r: 34, h: "0.00", s: "1.00", l: "0.0667" },
  { r: 35, h: "0.00", s: "1.00", l: "0.0686" },
  { r: 36, h: "0.00", s: "1.00", l: "0.0706" },
  { r: 37, h: "0.00", s: "1.00", l: "0.0725" },
  { r: 38, h: "0.00", s: "1.00", l: "0.0745" },
  { r: 39, h: "0.00", s: "1.00", l: "0.0765" },
  { r: 40, h: "0.00", s: "1.00", l: "0.0784" },
  { r: 41, h: "0.00", s: "1.00", l: "0.0804" },
  { r: 42, h: "0.00", s: "1.00", l: "0.0824" },
  { r: 43, h: "0.00", s: "1.00", l: "0.0843" },
  { r: 44, h: "0.00", s: "1.00", l: "0.0863" },
  { r: 45, h: "0.00", s: "1.00", l: "0.0882" },
  { r: 46, h: "0.00", s: "1.00", l: "0.0902" },
  { r: 47, h: "0.00", s: "1.00", l: "0.0922" },
  { r: 48, h: "0.00", s: "1.00", l: "0.0941" },
  { r: 49, h: "0.00", s: "1.00", l: "0.0961" },
  { r: 50, h: "0.00", s: "1.00", l: "0.0980" },
  { r: 51, h: "0.00", s: "1.00", l: "0.1000" },
  { r: 52, h: "0.00", s: "1.00", l: "0.1020" },
  { r: 53, h: "0.00", s: "1.00", l: "0.1039" },
  { r: 54, h: "0.00", s: "1.00", l: "0.1059" },
  { r: 55, h: "0.00", s: "1.00", l: "0.1078" },
  { r: 56, h: "0.00", s: "1.00", l: "0.1098" },
  { r: 57, h: "0.00", s: "1.00", l: "0.1118" },
  { r: 58, h: "0.00", s: "1.00", l: "0.1137" },
  { r: 59, h: "0.00", s: "1.00", l: "0.1157" },
  { r: 60, h: "0.00", s: "1.00", l: "0.1176" },
  { r: 61, h: "0.00", s: "1.00", l: "0.1196" },
  { r: 62, h: "0.00", s: "1.00", l: "0.1216" },
  { r: 63, h: "0.00", s: "1.00", l: "0.1235" },
  { r: 64, h: "0.00", s: "1.00", l: "0.1255" },
  { r: 65, h: "0.00", s: "1.00", l: "0.1275" },
  { r: 66, h: "0.00", s: "1.00", l: "0.1294" },
  { r: 67, h: "0.00", s: "1.00", l: "0.1314" },
  { r: 68, h: "0.00", s: "1.00", l: "0.1333" },
  { r: 69, h: "0.00", s: "1.00", l: "0.1353" },
  { r: 70, h: "0.00", s: "1.00", l: "0.1373" },
  { r: 71, h: "0.00", s: "1.00", l: "0.1392" },
  { r: 72, h: "0.00", s: "1.00", l: "0.1412" },
  { r: 73, h: "0.00", s: "1.00", l: "0.1431" },
  { r: 74, h: "0.00", s: "1.00", l: "0.1451" },
  { r: 75, h: "0.00", s: "1.00", l: "0.1471" },
  { r: 76, h: "0.00", s: "1.00", l: "0.1490" },
  { r: 77, h: "0.00", s: "1.00", l: "0.1510" },
  { r: 78, h: "0.00", s: "1.00", l: "0.1529" },
  { r: 79, h: "0.00", s: "1.00", l: "0.1549" },
  { r: 80, h: "0.00", s: "1.00", l: "0.1569" },
  { r: 81, h: "0.00", s: "1.00", l: "0.1588" },
  { r: 82, h: "0.00", s: "1.00", l: "0.1608" },
  { r: 83, h: "0.00", s: "1.00", l: "0.1627" },
  { r: 84, h: "0.00", s: "1.00", l: "0.1647" },
  { r: 85, h: "0.00", s: "1.00", l: "0.1667" },
  { r: 86, h: "0.00", s: "1.00", l: "0.1686" },
  { r: 87, h: "0.00", s: "1.00", l: "0.1706" },
  { r: 88, h: "0.00", s: "1.00", l: "0.1725" },
  { r: 89, h: "0.00", s: "1.00", l: "0.1745" },
  { r: 90, h: "0.00", s: "1.00", l: "0.1765" },
  { r: 91, h: "0.00", s: "1.00", l: "0.1784" },
  { r: 92, h: "0.00", s: "1.00", l: "0.1804" },
  { r: 93, h: "0.00", s: "1.00", l: "0.1824" },
  { r: 94, h: "0.00", s: "1.00", l: "0.1843" },
  { r: 95, h: "0.00", s: "1.00", l: "0.1863" },
  { r: 96, h: "0.00", s: "1.00", l: "0.1882" },
  { r: 97, h: "0.00", s: "1.00", l: "0.1902" },
  { r: 98, h: "0.00", s: "1.00", l: "0.1922" },
  { r: 99, h: "0.00", s: "1.00", l: "0.1941" },
  { r: 100, h: "0.00", s: "1.00", l: "0.1961" },
  { r: 101, h: "0.00", s: "1.00", l: "0.1980" },
  { r: 102, h: "0.00", s: "1.00", l: "0.2000" },
  { r: 103, h: "0.00", s: "1.00", l: "0.2020" },
  { r: 104, h: "0.00", s: "1.00", l: "0.2039" },
  { r: 105, h: "0.00", s: "1.00", l: "0.2059" },
  { r: 106, h: "0.00", s: "1.00", l: "0.2078" },
  { r: 107, h: "0.00", s: "1.00", l: "0.2098" },
  { r: 108, h: "0.00", s: "1.00", l: "0.2118" },
  { r: 109, h: "0.00", s: "1.00", l: "0.2137" },
  { r: 110, h: "0.00", s: "1.00", l: "0.2157" },
  { r: 111, h: "0.00", s: "1.00", l: "0.2176" },
  { r: 112, h: "0.00", s: "1.00", l: "0.2196" },
  { r: 113, h: "0.00", s: "1.00", l: "0.2216" },
  { r: 114, h: "0.00", s: "1.00", l: "0.2235" },
  { r: 115, h: "0.00", s: "1.00", l: "0.2255" },
  { r: 116, h: "0.00", s: "1.00", l: "0.2275" },
  { r: 117, h: "0.00", s: "1.00", l: "0.2294" },
  { r: 118, h: "0.00", s: "1.00", l: "0.2314" },
  { r: 119, h: "0.00", s: "1.00", l: "0.2333" },
  { r: 120, h: "0.00", s: "1.00", l: "0.2353" },
  { r: 121, h: "0.00", s: "1.00", l: "0.2373" },
  { r: 122, h: "0.00", s: "1.00", l: "0.2392" },
  { r: 123, h: "0.00", s: "1.00", l: "0.2412" },
  { r: 124, h: "0.00", s: "1.00", l: "0.2431" },
  { r: 125, h: "0.00", s: "1.00", l: "0.2451" },
  { r: 126, h: "0.00", s: "1.00", l: "0.2471" },
  { r: 127, h: "0.00", s: "1.00", l: "0.2490" },
  { r: 128, h: "0.00", s: "1.00", l: "0.2510" },
  { r: 129, h: "0.00", s: "1.00", l: "0.2529" },
  { r: 130, h: "0.00", s: "1.00", l: "0.2549" },
  { r: 131, h: "0.00", s: "1.00", l: "0.2569" },
  { r: 132, h: "0.00", s: "1.00", l: "0.2588" },
  { r: 133, h: "0.00", s: "1.00", l: "0.2608" },
  { r: 134, h: "0.00", s: "1.00", l: "0.2627" },
  { r: 135, h: "0.00", s: "1.00", l: "0.2647" },
  { r: 136, h: "0.00", s: "1.00", l: "0.2667" },
  { r: 137, h: "0.00", s: "1.00", l: "0.2686" },
  { r: 138, h: "0.00", s: "1.00", l: "0.2706" },
  { r: 139, h: "0.00", s: "1.00", l: "0.2725" },
  { r: 140, h: "0.00", s: "1.00", l: "0.2745" },
  { r: 141, h: "0.00", s: "1.00", l: "0.2765" },
  { r: 142, h: "0.00", s: "1.00", l: "0.2784" },
  { r: 143, h: "0.00", s: "1.00", l: "0.2804" },
  { r: 144, h: "0.00", s: "1.00", l: "0.2824" },
  { r: 145, h: "0.00", s: "1.00", l: "0.2843" },
  { r: 146, h: "0.00", s: "1.00", l: "0.2863" },
  { r: 147, h: "0.00", s: "1.00", l: "0.2882" },
  { r: 148, h: "0.00", s: "1.00", l: "0.2902" },
  { r: 149, h: "0.00", s: "1.00", l: "0.2922" },
  { r: 150, h: "0.00", s: "1.00", l: "0.2941" },
  { r: 151, h: "0.00", s: "1.00", l: "0.2961" },
  { r: 152, h: "0.00", s: "1.00", l: "0.2980" },
  { r: 153, h: "0.00", s: "1.00", l: "0.3000" },
  { r: 154, h: "0.00", s: "1.00", l: "0.3020" },
  { r: 155, h: "0.00", s: "1.00", l: "0.3039" },
  { r: 156, h: "0.00", s: "1.00", l: "0.3059" },
  { r: 157, h: "0.00", s: "1.00", l: "0.3078" },
  { r: 158, h: "0.00", s: "1.00", l: "0.3098" },
  { r: 159, h: "0.00", s: "1.00", l: "0.3118" },
  { r: 160, h: "0.00", s: "1.00", l: "0.3137" },
  { r: 161, h: "0.00", s: "1.00", l: "0.3157" },
  { r: 162, h: "0.00", s: "1.00", l: "0.3176" },
  { r: 163, h: "0.00", s: "1.00", l: "0.3196" },
  { r: 164, h: "0.00", s: "1.00", l: "0.3216" },
  { r: 165, h: "0.00", s: "1.00", l: "0.3235" },
  { r: 166, h: "0.00", s: "1.00", l: "0.3255" },
  { r: 167, h: "0.00", s: "1.00", l: "0.3275" },
  { r: 168, h: "0.00", s: "1.00", l: "0.3294" },
  { r: 169, h: "0.00", s: "1.00", l: "0.3314" },
  { r: 170, h: "0.00", s: "1.00", l: "0.3333" },
  { r: 171, h: "0.00", s: "1.00", l: "0.3353" },
  { r: 172, h: "0.00", s: "1.00", l: "0.3373" },
  { r: 173, h: "0.00", s: "1.00", l: "0.3392" },
  { r: 174, h: "0.00", s: "1.00", l: "0.3412" },
  { r: 175, h: "0.00", s: "1.00", l: "0.3431" },
  { r: 176, h: "0.00", s: "1.00", l: "0.3451" },
  { r: 177, h: "0.00", s: "1.00", l: "0.3471" },
  { r: 178, h: "0.00", s: "1.00", l: "0.3490" },
  { r: 179, h: "0.00", s: "1.00", l: "0.3510" },
  { r: 180, h: "0.00", s: "1.00", l: "0.3529" },
  { r: 181, h: "0.00", s: "1.00", l: "0.3549" },
  { r: 182, h: "0.00", s: "1.00", l: "0.3569" },
  { r: 183, h: "0.00", s: "1.00", l: "0.3588" },
  { r: 184, h: "0.00", s: "1.00", l: "0.3608" },
  { r: 185, h: "0.00", s: "1.00", l: "0.3627" },
  { r: 186, h: "0.00", s: "1.00", l: "0.3647" },
  { r: 187, h: "0.00", s: "1.00", l: "0.3667" },
  { r: 188, h: "0.00", s: "1.00", l: "0.3686" },
  { r: 189, h: "0.00", s: "1.00", l: "0.3706" },
  { r: 190, h: "0.00", s: "1.00", l: "0.3725" },
  { r: 191, h: "0.00", s: "1.00", l: "0.3745" },
  { r: 192, h: "0.00", s: "1.00", l: "0.3765" },
  { r: 193, h: "0.00", s: "1.00", l: "0.3784" },
  { r: 194, h: "0.00", s: "1.00", l: "0.3804" },
  { r: 195, h: "0.00", s: "1.00", l: "0.3824" },
  { r: 196, h: "0.00", s: "1.00", l: "0.3843" },
  { r: 197, h: "0.00", s: "1.00", l: "0.3863" },
  { r: 198, h: "0.00", s: "1.00", l: "0.3882" },
  { r: 199, h: "0.00", s: "1.00", l: "0.3902" },
  { r: 200, h: "0.00", s: "1.00", l: "0.3922" },
  { r: 201, h: "0.00", s: "1.00", l: "0.3941" },
  { r: 202, h: "0.00", s: "1.00", l: "0.3961" },
  { r: 203, h: "0.00", s: "1.00", l: "0.3980" },
  { r: 204, h: "0.00", s: "1.00", l: "0.4000" },
  { r: 205, h: "0.00", s: "1.00", l: "0.4020" },
  { r: 206, h: "0.00", s: "1.00", l: "0.4039" },
  { r: 207, h: "0.00", s: "1.00", l: "0.4059" },
  { r: 208, h: "0.00", s: "1.00", l: "0.4078" },
  { r: 209, h: "0.00", s: "1.00", l: "0.4098" },
  { r: 210, h: "0.00", s: "1.00", l: "0.4118" },
  { r: 211, h: "0.00", s: "1.00", l: "0.4137" },
  { r: 212, h: "0.00", s: "1.00", l: "0.4157" },
  { r: 213, h: "0.00", s: "1.00", l: "0.4176" },
  { r: 214, h: "0.00", s: "1.00", l: "0.4196" },
  { r: 215, h: "0.00", s: "1.00", l: "0.4216" },
  { r: 216, h: "0.00", s: "1.00", l: "0.4235" },
  { r: 217, h: "0.00", s: "1.00", l: "0.4255" },
  { r: 218, h: "0.00", s: "1.00", l: "0.4275" },
  { r: 219, h: "0.00", s: "1.00", l: "0.4294" },
  { r: 220, h: "0.00", s: "1.00", l: "0.4314" },
  { r: 221, h: "0.00", s: "1.00", l: "0.4333" },
  { r: 222, h: "0.00", s: "1.00", l: "0.4353" },
  { r: 223, h: "0.00", s: "1.00", l: "0.4373" },
  { r: 224, h: "0.00", s: "1.00", l: "0.4392" },
  { r: 225, h: "0.00", s: "1.00", l: "0.4412" },
  { r: 226, h: "0.00", s: "1.00", l: "0.4431" },
  { r: 227, h: "0.00", s: "1.00", l: "0.4451" },
  { r: 228, h: "0.00", s: "1.00", l: "0.4471" },
  { r: 229, h: "0.00", s: "1.00", l: "0.4490" },
  { r: 230, h: "0.00", s: "1.00", l: "0.4510" },
  { r: 231, h: "0.00", s: "1.00", l: "0.4529" },
  { r: 232, h: "0.00", s: "1.00", l: "0.4549" },
  { r: 233, h: "0.00", s: "1.00", l: "0.4569" },
  { r: 234, h: "0.00", s: "1.00", l: "0.4588" },
  { r: 235, h: "0.00", s: "1.00", l: "0.4608" },
  { r: 236, h: "0.00", s: "1.00", l: "0.4627" },
  { r: 237, h: "0.00", s: "1.00", l: "0.4647" },
  { r: 238, h: "0.00", s: "1.00", l: "0.4667" },
  { r: 239, h: "0.00", s: "1.00", l: "0.4686" },
  { r: 240, h: "0.00", s: "1.00", l: "0.4706" },
  { r: 241, h: "0.00", s: "1.00", l: "0.4725" },
  { r: 242, h: "0.00", s: "1.00", l: "0.4745" },
  { r: 243, h: "0.00", s: "1.00", l: "0.4765" },
  { r: 244, h: "0.00", s: "1.00", l: "0.4784" },
  { r: 245, h: "0.00", s: "1.00", l: "0.4804" },
  { r: 246, h: "0.00", s: "1.00", l: "0.4824" },
  { r: 247, h: "0.00", s: "1.00", l: "0.4843" },
  { r: 248, h: "0.00", s: "1.00", l: "0.4863" },
  { r: 249, h: "0.00", s: "1.00", l: "0.4882" },
  { r: 250, h: "0.00", s: "1.00", l: "0.4902" },
  { r: 251, h: "0.00", s: "1.00", l: "0.4922" },
  { r: 252, h: "0.00", s: "1.00", l: "0.4941" },
  { r: 253, h: "0.00", s: "1.00", l: "0.4961" },
  { r: 254, h: "0.00", s: "1.00", l: "0.4980" },
  { r: 255, h: "0.00", s: "1.00", l: "0.5000" },
];

const r2Cases = [
  { x: 0, h: "0.00", s: "1.00", l: "0.5000" },
  { x: 1, h: "0.00", s: "1.00", l: "0.5020" },
  { x: 2, h: "0.00", s: "1.00", l: "0.5039" },
  { x: 3, h: "0.00", s: "1.00", l: "0.5059" },
  { x: 4, h: "0.00", s: "1.00", l: "0.5078" },
  { x: 5, h: "0.00", s: "1.00", l: "0.5098" },
  { x: 6, h: "0.00", s: "1.00", l: "0.5118" },
  { x: 7, h: "0.00", s: "1.00", l: "0.5137" },
  { x: 8, h: "0.00", s: "1.00", l: "0.5157" },
  { x: 9, h: "0.00", s: "1.00", l: "0.5176" },
  { x: 10, h: "0.00", s: "1.00", l: "0.5196" },
  { x: 11, h: "0.00", s: "1.00", l: "0.5216" },
  { x: 12, h: "0.00", s: "1.00", l: "0.5235" },
  { x: 13, h: "0.00", s: "1.00", l: "0.5255" },
  { x: 14, h: "0.00", s: "1.00", l: "0.5275" },
  { x: 15, h: "0.00", s: "1.00", l: "0.5294" },
  { x: 16, h: "0.00", s: "1.00", l: "0.5314" },
  { x: 17, h: "0.00", s: "1.00", l: "0.5333" },
  { x: 18, h: "0.00", s: "1.00", l: "0.5353" },
  { x: 19, h: "0.00", s: "1.00", l: "0.5373" },
  { x: 20, h: "0.00", s: "1.00", l: "0.5392" },
  { x: 21, h: "0.00", s: "1.00", l: "0.5412" },
  { x: 22, h: "0.00", s: "1.00", l: "0.5431" },
  { x: 23, h: "0.00", s: "1.00", l: "0.5451" },
  { x: 24, h: "0.00", s: "1.00", l: "0.5471" },
  { x: 25, h: "0.00", s: "1.00", l: "0.5490" },
  { x: 26, h: "0.00", s: "1.00", l: "0.5510" },
  { x: 27, h: "0.00", s: "1.00", l: "0.5529" },
  { x: 28, h: "0.00", s: "1.00", l: "0.5549" },
  { x: 29, h: "0.00", s: "1.00", l: "0.5569" },
  { x: 30, h: "0.00", s: "1.00", l: "0.5588" },
  { x: 31, h: "0.00", s: "1.00", l: "0.5608" },
  { x: 32, h: "0.00", s: "1.00", l: "0.5627" },
  { x: 33, h: "0.00", s: "1.00", l: "0.5647" },
  { x: 34, h: "0.00", s: "1.00", l: "0.5667" },
  { x: 35, h: "0.00", s: "1.00", l: "0.5686" },
  { x: 36, h: "0.00", s: "1.00", l: "0.5706" },
  { x: 37, h: "0.00", s: "1.00", l: "0.5725" },
  { x: 38, h: "0.00", s: "1.00", l: "0.5745" },
  { x: 39, h: "0.00", s: "1.00", l: "0.5765" },
  { x: 40, h: "0.00", s: "1.00", l: "0.5784" },
  { x: 41, h: "0.00", s: "1.00", l: "0.5804" },
  { x: 42, h: "0.00", s: "1.00", l: "0.5824" },
  { x: 43, h: "0.00", s: "1.00", l: "0.5843" },
  { x: 44, h: "0.00", s: "1.00", l: "0.5863" },
  { x: 45, h: "0.00", s: "1.00", l: "0.5882" },
  { x: 46, h: "0.00", s: "1.00", l: "0.5902" },
  { x: 47, h: "0.00", s: "1.00", l: "0.5922" },
  { x: 48, h: "0.00", s: "1.00", l: "0.5941" },
  { x: 49, h: "0.00", s: "1.00", l: "0.5961" },
  { x: 50, h: "0.00", s: "1.00", l: "0.5980" },
  { x: 51, h: "0.00", s: "1.00", l: "0.6000" },
  { x: 52, h: "0.00", s: "1.00", l: "0.6020" },
  { x: 53, h: "0.00", s: "1.00", l: "0.6039" },
  { x: 54, h: "0.00", s: "1.00", l: "0.6059" },
  { x: 55, h: "0.00", s: "1.00", l: "0.6078" },
  { x: 56, h: "0.00", s: "1.00", l: "0.6098" },
  { x: 57, h: "0.00", s: "1.00", l: "0.6118" },
  { x: 58, h: "0.00", s: "1.00", l: "0.6137" },
  { x: 59, h: "0.00", s: "1.00", l: "0.6157" },
  { x: 60, h: "0.00", s: "1.00", l: "0.6176" },
  { x: 61, h: "0.00", s: "1.00", l: "0.6196" },
  { x: 62, h: "0.00", s: "1.00", l: "0.6216" },
  { x: 63, h: "0.00", s: "1.00", l: "0.6235" },
  { x: 64, h: "0.00", s: "1.00", l: "0.6255" },
  { x: 65, h: "0.00", s: "1.00", l: "0.6275" },
  { x: 66, h: "0.00", s: "1.00", l: "0.6294" },
  { x: 67, h: "0.00", s: "1.00", l: "0.6314" },
  { x: 68, h: "0.00", s: "1.00", l: "0.6333" },
  { x: 69, h: "0.00", s: "1.00", l: "0.6353" },
  { x: 70, h: "0.00", s: "1.00", l: "0.6373" },
  { x: 71, h: "0.00", s: "1.00", l: "0.6392" },
  { x: 72, h: "0.00", s: "1.00", l: "0.6412" },
  { x: 73, h: "0.00", s: "1.00", l: "0.6431" },
  { x: 74, h: "0.00", s: "1.00", l: "0.6451" },
  { x: 75, h: "0.00", s: "1.00", l: "0.6471" },
  { x: 76, h: "0.00", s: "1.00", l: "0.6490" },
  { x: 77, h: "0.00", s: "1.00", l: "0.6510" },
  { x: 78, h: "0.00", s: "1.00", l: "0.6529" },
  { x: 79, h: "0.00", s: "1.00", l: "0.6549" },
  { x: 80, h: "0.00", s: "1.00", l: "0.6569" },
  { x: 81, h: "0.00", s: "1.00", l: "0.6588" },
  { x: 82, h: "0.00", s: "1.00", l: "0.6608" },
  { x: 83, h: "0.00", s: "1.00", l: "0.6627" },
  { x: 84, h: "0.00", s: "1.00", l: "0.6647" },
  { x: 85, h: "0.00", s: "1.00", l: "0.6667" },
  { x: 86, h: "0.00", s: "1.00", l: "0.6686" },
  { x: 87, h: "0.00", s: "1.00", l: "0.6706" },
  { x: 88, h: "0.00", s: "1.00", l: "0.6725" },
  { x: 89, h: "0.00", s: "1.00", l: "0.6745" },
  { x: 90, h: "0.00", s: "1.00", l: "0.6765" },
  { x: 91, h: "0.00", s: "1.00", l: "0.6784" },
  { x: 92, h: "0.00", s: "1.00", l: "0.6804" },
  { x: 93, h: "0.00", s: "1.00", l: "0.6824" },
  { x: 94, h: "0.00", s: "1.00", l: "0.6843" },
  { x: 95, h: "0.00", s: "1.00", l: "0.6863" },
  { x: 96, h: "0.00", s: "1.00", l: "0.6882" },
  { x: 97, h: "0.00", s: "1.00", l: "0.6902" },
  { x: 98, h: "0.00", s: "1.00", l: "0.6922" },
  { x: 99, h: "0.00", s: "1.00", l: "0.6941" },
  { x: 100, h: "0.00", s: "1.00", l: "0.6961" },
  { x: 101, h: "0.00", s: "1.00", l: "0.6980" },
  { x: 102, h: "0.00", s: "1.00", l: "0.7000" },
  { x: 103, h: "0.00", s: "1.00", l: "0.7020" },
  { x: 104, h: "0.00", s: "1.00", l: "0.7039" },
  { x: 105, h: "0.00", s: "1.00", l: "0.7059" },
  { x: 106, h: "0.00", s: "1.00", l: "0.7078" },
  { x: 107, h: "0.00", s: "1.00", l: "0.7098" },
  { x: 108, h: "0.00", s: "1.00", l: "0.7118" },
  { x: 109, h: "0.00", s: "1.00", l: "0.7137" },
  { x: 110, h: "0.00", s: "1.00", l: "0.7157" },
  { x: 111, h: "0.00", s: "1.00", l: "0.7176" },
  { x: 112, h: "0.00", s: "1.00", l: "0.7196" },
  { x: 113, h: "0.00", s: "1.00", l: "0.7216" },
  { x: 114, h: "0.00", s: "1.00", l: "0.7235" },
  { x: 115, h: "0.00", s: "1.00", l: "0.7255" },
  { x: 116, h: "0.00", s: "1.00", l: "0.7275" },
  { x: 117, h: "0.00", s: "1.00", l: "0.7294" },
  { x: 118, h: "0.00", s: "1.00", l: "0.7314" },
  { x: 119, h: "0.00", s: "1.00", l: "0.7333" },
  { x: 120, h: "0.00", s: "1.00", l: "0.7353" },
  { x: 121, h: "0.00", s: "1.00", l: "0.7373" },
  { x: 122, h: "0.00", s: "1.00", l: "0.7392" },
  { x: 123, h: "0.00", s: "1.00", l: "0.7412" },
  { x: 124, h: "0.00", s: "1.00", l: "0.7431" },
  { x: 125, h: "0.00", s: "1.00", l: "0.7451" },
  { x: 126, h: "0.00", s: "1.00", l: "0.7471" },
  { x: 127, h: "0.00", s: "1.00", l: "0.7490" },
  { x: 128, h: "0.00", s: "1.00", l: "0.7510" },
  { x: 129, h: "0.00", s: "1.00", l: "0.7529" },
  { x: 130, h: "0.00", s: "1.00", l: "0.7549" },
  { x: 131, h: "0.00", s: "1.00", l: "0.7569" },
  { x: 132, h: "0.00", s: "1.00", l: "0.7588" },
  { x: 133, h: "0.00", s: "1.00", l: "0.7608" },
  { x: 134, h: "0.00", s: "1.00", l: "0.7627" },
  { x: 135, h: "0.00", s: "1.00", l: "0.7647" },
  { x: 136, h: "0.00", s: "1.00", l: "0.7667" },
  { x: 137, h: "0.00", s: "1.00", l: "0.7686" },
  { x: 138, h: "0.00", s: "1.00", l: "0.7706" },
  { x: 139, h: "0.00", s: "1.00", l: "0.7725" },
  { x: 140, h: "0.00", s: "1.00", l: "0.7745" },
  { x: 141, h: "0.00", s: "1.00", l: "0.7765" },
  { x: 142, h: "0.00", s: "1.00", l: "0.7784" },
  { x: 143, h: "0.00", s: "1.00", l: "0.7804" },
  { x: 144, h: "0.00", s: "1.00", l: "0.7824" },
  { x: 145, h: "0.00", s: "1.00", l: "0.7843" },
  { x: 146, h: "0.00", s: "1.00", l: "0.7863" },
  { x: 147, h: "0.00", s: "1.00", l: "0.7882" },
  { x: 148, h: "0.00", s: "1.00", l: "0.7902" },
  { x: 149, h: "0.00", s: "1.00", l: "0.7922" },
  { x: 150, h: "0.00", s: "1.00", l: "0.7941" },
  { x: 151, h: "0.00", s: "1.00", l: "0.7961" },
  { x: 152, h: "0.00", s: "1.00", l: "0.7980" },
  { x: 153, h: "0.00", s: "1.00", l: "0.8000" },
  { x: 154, h: "0.00", s: "1.00", l: "0.8020" },
  { x: 155, h: "0.00", s: "1.00", l: "0.8039" },
  { x: 156, h: "0.00", s: "1.00", l: "0.8059" },
  { x: 157, h: "0.00", s: "1.00", l: "0.8078" },
  { x: 158, h: "0.00", s: "1.00", l: "0.8098" },
  { x: 159, h: "0.00", s: "1.00", l: "0.8118" },
  { x: 160, h: "0.00", s: "1.00", l: "0.8137" },
  { x: 161, h: "0.00", s: "1.00", l: "0.8157" },
  { x: 162, h: "0.00", s: "1.00", l: "0.8176" },
  { x: 163, h: "0.00", s: "1.00", l: "0.8196" },
  { x: 164, h: "0.00", s: "1.00", l: "0.8216" },
  { x: 165, h: "0.00", s: "1.00", l: "0.8235" },
  { x: 166, h: "0.00", s: "1.00", l: "0.8255" },
  { x: 167, h: "0.00", s: "1.00", l: "0.8275" },
  { x: 168, h: "0.00", s: "1.00", l: "0.8294" },
  { x: 169, h: "0.00", s: "1.00", l: "0.8314" },
  { x: 170, h: "0.00", s: "1.00", l: "0.8333" },
  { x: 171, h: "0.00", s: "1.00", l: "0.8353" },
  { x: 172, h: "0.00", s: "1.00", l: "0.8373" },
  { x: 173, h: "0.00", s: "1.00", l: "0.8392" },
  { x: 174, h: "0.00", s: "1.00", l: "0.8412" },
  { x: 175, h: "0.00", s: "1.00", l: "0.8431" },
  { x: 176, h: "0.00", s: "1.00", l: "0.8451" },
  { x: 177, h: "0.00", s: "1.00", l: "0.8471" },
  { x: 178, h: "0.00", s: "1.00", l: "0.8490" },
  { x: 179, h: "0.00", s: "1.00", l: "0.8510" },
  { x: 180, h: "0.00", s: "1.00", l: "0.8529" },
  { x: 181, h: "0.00", s: "1.00", l: "0.8549" },
  { x: 182, h: "0.00", s: "1.00", l: "0.8569" },
  { x: 183, h: "0.00", s: "1.00", l: "0.8588" },
  { x: 184, h: "0.00", s: "1.00", l: "0.8608" },
  { x: 185, h: "0.00", s: "1.00", l: "0.8627" },
  { x: 186, h: "0.00", s: "1.00", l: "0.8647" },
  { x: 187, h: "0.00", s: "1.00", l: "0.8667" },
  { x: 188, h: "0.00", s: "1.00", l: "0.8686" },
  { x: 189, h: "0.00", s: "1.00", l: "0.8706" },
  { x: 190, h: "0.00", s: "1.00", l: "0.8725" },
  { x: 191, h: "0.00", s: "1.00", l: "0.8745" },
  { x: 192, h: "0.00", s: "1.00", l: "0.8765" },
  { x: 193, h: "0.00", s: "1.00", l: "0.8784" },
  { x: 194, h: "0.00", s: "1.00", l: "0.8804" },
  { x: 195, h: "0.00", s: "1.00", l: "0.8824" },
  { x: 196, h: "0.00", s: "1.00", l: "0.8843" },
  { x: 197, h: "0.00", s: "1.00", l: "0.8863" },
  { x: 198, h: "0.00", s: "1.00", l: "0.8882" },
  { x: 199, h: "0.00", s: "1.00", l: "0.8902" },
  { x: 200, h: "0.00", s: "1.00", l: "0.8922" },
  { x: 201, h: "0.00", s: "1.00", l: "0.8941" },
  { x: 202, h: "0.00", s: "1.00", l: "0.8961" },
  { x: 203, h: "0.00", s: "1.00", l: "0.8980" },
  { x: 204, h: "0.00", s: "1.00", l: "0.9000" },
  { x: 205, h: "0.00", s: "1.00", l: "0.9020" },
  { x: 206, h: "0.00", s: "1.00", l: "0.9039" },
  { x: 207, h: "0.00", s: "1.00", l: "0.9059" },
  { x: 208, h: "0.00", s: "1.00", l: "0.9078" },
  { x: 209, h: "0.00", s: "1.00", l: "0.9098" },
  { x: 210, h: "0.00", s: "1.00", l: "0.9118" },
  { x: 211, h: "0.00", s: "1.00", l: "0.9137" },
  { x: 212, h: "0.00", s: "1.00", l: "0.9157" },
  { x: 213, h: "0.00", s: "1.00", l: "0.9176" },
  { x: 214, h: "0.00", s: "1.00", l: "0.9196" },
  { x: 215, h: "0.00", s: "1.00", l: "0.9216" },
  { x: 216, h: "0.00", s: "1.00", l: "0.9235" },
  { x: 217, h: "0.00", s: "1.00", l: "0.9255" },
  { x: 218, h: "0.00", s: "1.00", l: "0.9275" },
  { x: 219, h: "0.00", s: "1.00", l: "0.9294" },
  { x: 220, h: "0.00", s: "1.00", l: "0.9314" },
  { x: 221, h: "0.00", s: "1.00", l: "0.9333" },
  { x: 222, h: "0.00", s: "1.00", l: "0.9353" },
  { x: 223, h: "0.00", s: "1.00", l: "0.9373" },
  { x: 224, h: "0.00", s: "1.00", l: "0.9392" },
  { x: 225, h: "0.00", s: "1.00", l: "0.9412" },
  { x: 226, h: "0.00", s: "1.00", l: "0.9431" },
  { x: 227, h: "0.00", s: "1.00", l: "0.9451" },
  { x: 228, h: "0.00", s: "1.00", l: "0.9471" },
  { x: 229, h: "0.00", s: "1.00", l: "0.9490" },
  { x: 230, h: "0.00", s: "1.00", l: "0.9510" },
  { x: 231, h: "0.00", s: "1.00", l: "0.9529" },
  { x: 232, h: "0.00", s: "1.00", l: "0.9549" },
  { x: 233, h: "0.00", s: "1.00", l: "0.9569" },
  { x: 234, h: "0.00", s: "1.00", l: "0.9588" },
  { x: 235, h: "0.00", s: "1.00", l: "0.9608" },
  { x: 236, h: "0.00", s: "1.00", l: "0.9627" },
  { x: 237, h: "0.00", s: "1.00", l: "0.9647" },
  { x: 238, h: "0.00", s: "1.00", l: "0.9667" },
  { x: 239, h: "0.00", s: "1.00", l: "0.9686" },
  { x: 240, h: "0.00", s: "1.00", l: "0.9706" },
  { x: 241, h: "0.00", s: "1.00", l: "0.9725" },
  { x: 242, h: "0.00", s: "1.00", l: "0.9745" },
  { x: 243, h: "0.00", s: "1.00", l: "0.9765" },
  { x: 244, h: "0.00", s: "1.00", l: "0.9784" },
  { x: 245, h: "0.00", s: "1.00", l: "0.9804" },
  { x: 246, h: "0.00", s: "1.00", l: "0.9824" },
  { x: 247, h: "0.00", s: "1.00", l: "0.9843" },
  { x: 248, h: "0.00", s: "1.00", l: "0.9863" },
  { x: 249, h: "0.00", s: "1.00", l: "0.9882" },
  { x: 250, h: "0.00", s: "1.00", l: "0.9902" }, // $01
  { x: 251, h: "0.00", s: "1.00", l: "0.9922" }, // $01
  { x: 252, h: "0.00", s: "1.00", l: "0.9941" }, // $01
  { x: 253, h: "0.00", s: "1.00", l: "0.9961" }, // $01
  { x: 254, h: "0.00", s: "1.00", l: "0.9980" }, // $01
  { x: 255, h: "0.00", s: "0.00", l: "1.0000" },
];

Deno.test("SRgb.Color.fromHsl({ h, s, l })", () => {
  for (const c of r1Cases) {
    const c0 = SRgb.Color.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
    });
    assertStrictEquals(c0.rByte, c.r);
    assertStrictEquals(c0.gByte, 0);
    assertStrictEquals(c0.bByte, 0);
  }

  for (const c of r2Cases) {
    const c0 = SRgb.Color.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
    });
    assertStrictEquals(c0.rByte, 255);
    assertStrictEquals(c0.gByte, c.x);
    assertStrictEquals(c0.bByte, c.x);
  }
});

Deno.test("SRgb.Color.prototype.toHsl()", () => {
  for (const c of r1Cases) {
    const hsl = SRgb.Color.fromRgbBytes({ r: c.r, g: 0, b: 0 }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of r2Cases) {
    const hsl = SRgb.Color.fromRgbBytes({ r: 255, g: c.x, b: c.x }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  const c0 = SRgb.Color.fromHexString("#fffefd");
  const c1 = c0.toHsl();
  c1.h = 120;
  assertStrictEquals(c0.rByte, 255);
});

Deno.test("SRgb.Color.prototype.toHsl({})", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toHsl({ omitAlphaIfOpaque: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = SRgb.Color.fromHexString("#fffefd88");
  const c2a = c2.toHsl({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a.a, 0x88 / 255);
});

Deno.test("SRgb.Color.prototype.toUint8ClampedArray()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toUint8ClampedArray();
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a[3], 255);
  assertStrictEquals(c1a.length, 4);
  c1a[0] = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8ClampedArray();
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("SRgb.Color.prototype.toUint8ClampedArray({})", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toUint8ClampedArray({ omitAlphaIfOpaque: true });
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a.length, 3);
  c1a[0] = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8ClampedArray({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("SRgb.Color.prototype.toUint8Array()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toUint8Array();
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a[3], 255);
  assertStrictEquals(c1a.length, 4);
  c1a[0] = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8Array();
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("SRgb.Color.prototype.toUint8Array({})", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toUint8Array({ omitAlphaIfOpaque: true });
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a.length, 3);
  c1a[0] = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8Array({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("SRgb.Color.prototype.toRgb()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toRgb();
  assertStrictEquals(c1a.r, 1);
  assertStrictEquals(c1a.g, 254 / 255);
  assertStrictEquals(c1a.b, 253 / 255);
  assertStrictEquals(c1a.a, 1);
  c1a.r = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.toRgb();
  assertStrictEquals(c2a.r, 1 / 255);
  assertStrictEquals(c2a.g, 2 / 255);
  assertStrictEquals(c2a.b, 3 / 255);
  assertStrictEquals(c2a.a, 136 / 255);
});

Deno.test("SRgb.Color.prototype.toRgb({})", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toRgb({ omitAlphaIfOpaque: true });
  assertStrictEquals(c1a.r, 1);
  assertStrictEquals(c1a.g, 254 / 255);
  assertStrictEquals(c1a.b, 253 / 255);
  assertStrictEquals("a" in c1a, false);
  c1a.r = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.toRgb({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a.r, 1 / 255);
  assertStrictEquals(c2a.g, 2 / 255);
  assertStrictEquals(c2a.b, 3 / 255);
  assertStrictEquals(c2a.a, 136 / 255);
});

Deno.test("SRgb.Color.prototype.toJSON()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toJSON();
  assertStrictEquals(c1a.r, 1);
  assertStrictEquals(c1a.g, 254 / 255);
  assertStrictEquals(c1a.b, 253 / 255);
  assertStrictEquals(c1a.a, 1);
  c1a.r = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.toJSON();
  assertStrictEquals(c2a.r, 1 / 255);
  assertStrictEquals(c2a.g, 2 / 255);
  assertStrictEquals(c2a.b, 3 / 255);
  assertStrictEquals(c2a.a, 136 / 255);
});

Deno.test("SRgb.Color.prototype.toRgbBytes()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toRgbBytes();
  assertStrictEquals(c1a.r, 255);
  assertStrictEquals(c1a.g, 254);
  assertStrictEquals(c1a.b, 253);
  assertStrictEquals(c1a.a, 255);
  c1a.r = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.toRgbBytes();
  assertStrictEquals(c2a.r, 1);
  assertStrictEquals(c2a.g, 2);
  assertStrictEquals(c2a.b, 3);
  assertStrictEquals(c2a.a, 136);
});

Deno.test("SRgb.Color.prototype.toRgbBytes({})", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.toRgbBytes({ omitAlphaIfOpaque: true });
  assertStrictEquals(c1a.r, 255);
  assertStrictEquals(c1a.g, 254);
  assertStrictEquals(c1a.b, 253);
  assertStrictEquals("a" in c1a, false);
  c1a.r = 0;
  assertStrictEquals(c1.rByte, 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.toRgbBytes({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a.r, 1);
  assertStrictEquals(c2a.g, 2);
  assertStrictEquals(c2a.b, 3);
  assertStrictEquals(c2a.a, 136);
});

Deno.test("SRgb.Color.prototype.toHexString()", () => {
  assertStrictEquals(
    SRgb.Color.fromHexString("#fffefd").toHexString(),
    "#fffefdff",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#fffefd").toHexString({ upperCase: true }),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#fffefd").toHexString({
      upperCase: true,
      shorten: true,
    }),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#fffefd").toHexString({
      upperCase: true,
      shorten: true,
      omitAlphaIfOpaque: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#ffeedd").toHexString({
      upperCase: true,
      shorten: true,
    }),
    "#FEDF",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#ffeedd").toHexString({
      upperCase: true,
      shorten: false,
    }),
    "#FFEEDDFF",
  );
  assertStrictEquals(
    SRgb.Color.fromHexString("#ffeedd").toHexString({
      upperCase: false,
      shorten: false,
      omitAlphaIfOpaque: false,
    }),
    "#ffeeddff",
  );
});

Deno.test("SRgb.Color.prototype.toString()", () => {
  assertStrictEquals(SRgb.Color.fromHexString("#fffefd").toString(), "#FFFEFD");
});

Deno.test("SRgb.Color.prototype.clone()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.clone();
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 1);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.clone();
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 136 / 255);
});

Deno.test("SRgb.Color.prototype.withHue()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.withHue(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.withHue(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue.toFixed(6), (359).toFixed(6));
  assertStrictEquals(c1b.saturation, c1.saturation);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.withHue(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue.toFixed(6), (1).toFixed(6));
  assertStrictEquals(c2a.saturation, c2.saturation);

  const c2b = c2.withHue(20000);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue.toFixed(6), (200).toFixed(6));
  assertStrictEquals(c2b.saturation, c2.saturation);
  assertStrictEquals(c2b.alpha, c2.alpha);
});

Deno.test("SRgb.Color.prototype.plusSaturation()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.plusSaturation(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.plusSaturation(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.plusSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.plusSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = SRgb.Color.fromHexString("#030203");
  const c3a = c3.plusSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(
    c3a.saturation.toFixed(6),
    (c3.saturation + 0.5).toFixed(6),
  );
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.minusSaturation()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.minusSaturation(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.minusSaturation(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue, c1.hue);
  assertStrictEquals(c1b.saturation, 1);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.minusSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.minusSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = SRgb.Color.fromHexString("#ff0203");
  const c3a = c3.minusSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(
    c3a.saturation.toFixed(6),
    (c3.saturation - 0.5).toFixed(6),
  );
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.withSaturation()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.withSaturation(0);
  //assertStrictEquals(c1a.lightness, 0); 連動して変わる
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withSaturation(-1);
  //assertStrictEquals(c1b.lightness, 0); 連動して変わる
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.withSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.withSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = SRgb.Color.fromHexString("#fffefd88");
  const c3a = c3.withSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, 0.5);
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.plusLightness()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.plusLightness(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.plusLightness(-1);
  assertStrictEquals(c1b.lightness, 0);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.plusLightness(1);
  assertStrictEquals(c2a.lightness, 1);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.plusLightness(2);
  assertStrictEquals(c2b.lightness, 1);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = SRgb.Color.fromHexString("#881122");
  const c3a = c3.plusLightness(0.5);
  assertStrictEquals(c3a.lightness.toFixed(6), (c3.lightness + 0.5).toFixed(6));
  assertStrictEquals(c3a.hue, c3.hue);
  //assertStrictEquals(c3a.saturation, c3.saturation); 連動して変わる
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.minusLightness()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.minusLightness(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.minusLightness(-1);
  assertStrictEquals(c1b.lightness, 1);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.minusLightness(1);
  assertStrictEquals(c2a.lightness, 0);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.minusLightness(2);
  assertStrictEquals(c2b.lightness, 0);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = SRgb.Color.fromHexString("#ff8899");
  const c3a = c3.minusLightness(0.5);
  assertStrictEquals(c3a.lightness.toFixed(6), (c3.lightness - 0.5).toFixed(6));
  assertStrictEquals(c3a.hue, c3.hue);
  //assertStrictEquals(c3a.saturation, c3.saturation); 連動して変わる
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.withLightness()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.withLightness(0);
  assertStrictEquals(c1a.lightness, 0);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withLightness(-1);
  assertStrictEquals(c1b.lightness, 0);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = SRgb.Color.fromHexString("#11213188");
  const c2a = c2.withLightness(1);
  assertStrictEquals(c2a.lightness, 1);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.withLightness(2);
  assertStrictEquals(c2b.lightness, 1);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = SRgb.Color.fromHexString("#fffefd88");
  const c3a = c3.withLightness(0.5);
  assertStrictEquals(c3a.lightness, 0.5);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, c3.saturation);
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("SRgb.Color.prototype.plusAlpha()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.plusAlpha(0);
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 136 / 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.plusAlpha(-2);
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 0);

  const c2x = SRgb.Color.fromHexString("#01020388");
  const c2xa = c2x.plusAlpha((0x44 / 255) * -1);
  assertStrictEquals(c2xa.red, 1 / 255);
  assertStrictEquals(c2xa.green, 2 / 255);
  assertStrictEquals(c2xa.blue, 3 / 255);
  assertStrictEquals(c2xa.alpha, (136 - 68) / 255);

  const c3 = SRgb.Color.fromHexString("#01020388");
  const c3a = c3.plusAlpha(2);
  assertStrictEquals(c3a.red, 1 / 255);
  assertStrictEquals(c3a.green, 2 / 255);
  assertStrictEquals(c3a.blue, 3 / 255);
  assertStrictEquals(c3a.alpha, 1);

  const c3x = SRgb.Color.fromHexString("#01020388");
  const c3xa = c3x.plusAlpha(0x44 / 255);
  assertStrictEquals(c3xa.red, 1 / 255);
  assertStrictEquals(c3xa.green, 2 / 255);
  assertStrictEquals(c3xa.blue, 3 / 255);
  assertStrictEquals(c3xa.alpha, (136 + 68) / 255);
});

Deno.test("SRgb.Color.prototype.minusAlpha()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd88");
  const c1a = c1.minusAlpha(0);
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 136 / 255);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.minusAlpha(-2);
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 1);

  const c2x = SRgb.Color.fromHexString("#01020388");
  const c2xa = c2x.minusAlpha((0x44 / 255) * -1);
  assertStrictEquals(c2xa.red, 1 / 255);
  assertStrictEquals(c2xa.green, 2 / 255);
  assertStrictEquals(c2xa.blue, 3 / 255);
  assertStrictEquals(c2xa.alpha, (136 + 68) / 255);

  const c3 = SRgb.Color.fromHexString("#01020388");
  const c3a = c3.minusAlpha(2);
  assertStrictEquals(c3a.red, 1 / 255);
  assertStrictEquals(c3a.green, 2 / 255);
  assertStrictEquals(c3a.blue, 3 / 255);
  assertStrictEquals(c3a.alpha, 0);

  const c3x = SRgb.Color.fromHexString("#01020388");
  const c3xa = c3x.minusAlpha(0x44 / 255);
  assertStrictEquals(c3xa.red, 1 / 255);
  assertStrictEquals(c3xa.green, 2 / 255);
  assertStrictEquals(c3xa.blue, 3 / 255);
  assertStrictEquals(c3xa.alpha, (136 - 68) / 255);
});

Deno.test("SRgb.Color.prototype.withAlpha()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.withAlpha(0);
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.withAlpha(-1);
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 0);

  const c3 = SRgb.Color.fromHexString("#01020388");
  const c3a = c3.withAlpha(2);
  assertStrictEquals(c3a.red, 1 / 255);
  assertStrictEquals(c3a.green, 2 / 255);
  assertStrictEquals(c3a.blue, 3 / 255);
  assertStrictEquals(c3a.alpha, 1);
});

Deno.test("SRgb.Color.prototype.opaque()", () => {
  const c1 = SRgb.Color.fromHexString("#fffefd");
  const c1a = c1.opaque();
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 1);

  const c2 = SRgb.Color.fromHexString("#01020388");
  const c2a = c2.opaque();
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 1);
});
