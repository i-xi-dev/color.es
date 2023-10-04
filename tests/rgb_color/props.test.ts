import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.red", () => {
  assertStrictEquals(RgbColor.fromRgb({ r: 1000, g: 0, b: 0 }).red, 1);
  assertStrictEquals(RgbColor.fromRgb({ r: 256, g: 0, b: 0 }).red, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      RgbColor.fromRgb({ r: i, g: 0, b: 0 }).red,
      i / 255,
    );
  }
  assertStrictEquals(RgbColor.fromRgb({ r: -1, g: 0, b: 0 }).red, 0);
});

Deno.test("RgbColor.prototype.green", () => {
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 1000, b: 0 }).green, 1);
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 256, b: 0 }).green, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      RgbColor.fromRgb({ r: 0, g: i, b: 0 }).green,
      i / 255,
    );
  }
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: -1, b: 0 }).green, 0);
});

Deno.test("RgbColor.prototype.blue", () => {
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 0, b: 1000 }).blue, 1);
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 0, b: 256 }).blue, 1);
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      RgbColor.fromRgb({ r: 0, g: 0, b: i }).blue,
      i / 255,
    );
  }
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 0, b: -1 }).blue, 0);
});

Deno.test("RgbColor.prototype.alpha", () => {
  assertStrictEquals(
    RgbColor.fromRgb({ r: 10, g: 100, b: 1000 }, { mode: "bytes" }).alpha,
    1,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0, a: 256 }, { mode: "bytes" }).alpha,
    1,
  );
  for (let i = 0; i <= 255; i++) {
    assertStrictEquals(
      RgbColor.fromRgb({ r: 0, g: 0, b: 0, a: i }, { mode: "bytes" }).alpha,
      i / 255,
    );
  }
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0, a: -1 }, { mode: "bytes" }).alpha,
    0,
  );
});

Deno.test("RgbColor.prototype.hue", () => {
  assertStrictEquals(RgbColor.fromRgb({ r: 255, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 255, b: 0 }).hue, 120);
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 0, b: 255 }).hue, 240);
  assertStrictEquals(RgbColor.fromRgb({ r: 0, g: 0, b: 0 }).hue, 0);
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 255, b: 255 }).hue,
    0,
  );
  assertStrictEquals(
    RgbColor.fromHexString("#598910").hue.toFixed(6),
    "83.801653",
  );
});

Deno.test("RgbColor.prototype.saturation", () => {
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 0, b: 0 }).saturation,
    1,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0 }).saturation,
    0,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 255, b: 255 }).saturation,
    0,
  );
  assertStrictEquals(
    RgbColor.fromHexString("#598910").saturation.toFixed(6),
    "0.790850",
  );
});

Deno.test("RgbColor.prototype.lightness", () => {
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 0, b: 0 }).lightness,
    0.5,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0 }).lightness,
    0,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 255, b: 255 }).lightness,
    1,
  );
  assertStrictEquals(
    RgbColor.fromHexString("#598910").lightness.toFixed(6),
    "0.300000",
  );
});

Deno.test("RgbColor.prototype.whiteness", () => {
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 0, b: 0 }).whiteness,
    0,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0 }).whiteness,
    0,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 255, b: 255 }).whiteness,
    1,
  );
  assertStrictEquals(
    RgbColor.fromHexString("#598910").whiteness.toFixed(6),
    "0.062745",
  );
});

Deno.test("RgbColor.prototype.blackness", () => {
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 0, b: 0 }).blackness,
    0,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 0, g: 0, b: 0 }).blackness,
    1,
  );
  assertStrictEquals(
    RgbColor.fromRgb({ r: 255, g: 255, b: 255 }).blackness,
    0,
  );
  assertStrictEquals(
    RgbColor.fromHexString("#598910").blackness.toFixed(6),
    "0.462745",
  );
});
