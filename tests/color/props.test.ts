import { assertStrictEquals } from "../deps.ts";
import { Color } from "../../mod.ts";

Deno.test("Color.prototype.red", () => {
  assertStrictEquals(Color.fromRgb({ r: 1000, g: 0, b: 0 }).red, 1);
  assertStrictEquals(Color.fromRgb({ r: 256, g: 0, b: 0 }).red, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      Color.fromRgb({ r: i, g: 0, b: 0 }).red,
      i / 255,
    );
  }
  assertStrictEquals(Color.fromRgb({ r: -1, g: 0, b: 0 }).red, 0);
});

Deno.test("Color.prototype.green", () => {
  assertStrictEquals(Color.fromRgb({ r: 0, g: 1000, b: 0 }).green, 1);
  assertStrictEquals(Color.fromRgb({ r: 0, g: 256, b: 0 }).green, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      Color.fromRgb({ r: 0, g: i, b: 0 }).green,
      i / 255,
    );
  }
  assertStrictEquals(Color.fromRgb({ r: 0, g: -1, b: 0 }).green, 0);
});

Deno.test("Color.prototype.blue", () => {
  assertStrictEquals(Color.fromRgb({ r: 0, g: 0, b: 1000 }).blue, 1);
  assertStrictEquals(Color.fromRgb({ r: 0, g: 0, b: 256 }).blue, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      Color.fromRgb({ r: 0, g: 0, b: i }).blue,
      i / 255,
    );
  }
  assertStrictEquals(Color.fromRgb({ r: 0, g: 0, b: -1 }).blue, 0);
});

Deno.test("Color.prototype.alpha", () => {
  assertStrictEquals(
    Color.fromRgb({ r: 10, g: 100, b: 1000 }, { mode: "bytes" }).alpha,
    1,
  );
  assertStrictEquals(
    Color.fromRgb({ r: 0, g: 0, b: 0, a: 256 }, { mode: "bytes" }).alpha,
    1,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      Color.fromRgb({ r: 0, g: 0, b: 0, a: i }, { mode: "bytes" }).alpha,
      i / 255,
    );
  }
  assertStrictEquals(
    Color.fromRgb({ r: 0, g: 0, b: 0, a: -1 }, { mode: "bytes" }).alpha,
    0,
  );
});

Deno.test("Color.prototype.hue", () => {
  assertStrictEquals(Color.fromRgb({ r: 255, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(Color.fromRgb({ r: 0, g: 255, b: 0 }).hue, 120);
  assertStrictEquals(Color.fromRgb({ r: 0, g: 0, b: 255 }).hue, 240);
  assertStrictEquals(Color.fromRgb({ r: 0, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(
    Color.fromRgb({ r: 255, g: 255, b: 255 }).hue,
    0,
  );
});

Deno.test("Color.prototype.saturation", () => {
  assertStrictEquals(
    Color.fromRgb({ r: 255, g: 0, b: 0 }).saturation,
    1,
  );
  assertStrictEquals(
    Color.fromRgb({ r: 0, g: 0, b: 0 }).saturation,
    0,
  );
  assertStrictEquals(
    Color.fromRgb({ r: 255, g: 255, b: 255 }).saturation,
    0,
  );
});

Deno.test("Color.prototype.lightness", () => {
  assertStrictEquals(
    Color.fromRgb({ r: 255, g: 0, b: 0 }).lightness,
    0.5,
  );
  assertStrictEquals(
    Color.fromRgb({ r: 0, g: 0, b: 0 }).lightness,
    0,
  );
  assertStrictEquals(
    Color.fromRgb({ r: 255, g: 255, b: 255 }).lightness,
    1,
  );
});
