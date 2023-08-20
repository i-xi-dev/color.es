import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.prototype.red", () => {
  assertStrictEquals(SRgbColor.fromRgb({ r: 1000, g: 0, b: 0 }).red, 1);
  assertStrictEquals(SRgbColor.fromRgb({ r: 256, g: 0, b: 0 }).red, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgbColor.fromRgb({ r: i, g: 0, b: 0 }).red,
      i / 255,
    );
  }
  assertStrictEquals(SRgbColor.fromRgb({ r: -1, g: 0, b: 0 }).red, 0);
});

Deno.test("SRgbColor.prototype.green", () => {
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 1000, b: 0 }).green, 1);
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 256, b: 0 }).green, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgbColor.fromRgb({ r: 0, g: i, b: 0 }).green,
      i / 255,
    );
  }
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: -1, b: 0 }).green, 0);
});

Deno.test("SRgbColor.prototype.blue", () => {
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 0, b: 1000 }).blue, 1);
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 0, b: 256 }).blue, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgbColor.fromRgb({ r: 0, g: 0, b: i }).blue,
      i / 255,
    );
  }
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 0, b: -1 }).blue, 0);
});

Deno.test("SRgbColor.prototype.alpha", () => {
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 10, g: 100, b: 1000 }, { mode: "uint8" }).alpha,
    1,
  );
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 0, g: 0, b: 0, a: 256 }, { mode: "uint8" }).alpha,
    1,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      SRgbColor.fromRgb({ r: 0, g: 0, b: 0, a: i }, { mode: "uint8" }).alpha,
      i / 255,
    );
  }
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 0, g: 0, b: 0, a: -1 }, { mode: "uint8" }).alpha,
    0,
  );
});

Deno.test("SRgbColor.prototype.hue", () => {
  assertStrictEquals(SRgbColor.fromRgb({ r: 255, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 255, b: 0 }).hue, 120);
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 0, b: 255 }).hue, 240);
  assertStrictEquals(SRgbColor.fromRgb({ r: 0, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 255, g: 255, b: 255 }).hue,
    0,
  );
});

Deno.test("SRgbColor.prototype.saturation", () => {
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 255, g: 0, b: 0 }).saturation,
    1,
  );
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 0, g: 0, b: 0 }).saturation,
    0,
  );
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 255, g: 255, b: 255 }).saturation,
    0,
  );
});

Deno.test("SRgbColor.prototype.lightness", () => {
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 255, g: 0, b: 0 }).lightness,
    0.5,
  );
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 0, g: 0, b: 0 }).lightness,
    0,
  );
  assertStrictEquals(
    SRgbColor.fromRgb({ r: 255, g: 255, b: 255 }).lightness,
    1,
  );
});
