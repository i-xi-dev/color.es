import { assertStrictEquals } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.prototype.toRgb()", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb();
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 1);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb();
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("Color.prototype.toRgb({}) - discardAlpha:true", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ discardAlpha: true });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals("a" in c1r, false);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ discardAlpha: true });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals("a" in c2r, false);
});

Deno.test("Color.prototype.toRgb() - mode:auto", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "compat" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 1);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "compat" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("Color.prototype.toRgb({}) - mode:precision", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "precision" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128 / 255);
  assertStrictEquals(c1r.b, 64 / 255);
  assertStrictEquals(c1r.a, 1);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "precision" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128 / 255);
  assertStrictEquals(c2r.b, 64 / 255);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("Color.prototype.toRgb({}) - mode:precision,discardAlpha:true", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ discardAlpha: true, mode: "precision" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128 / 255);
  assertStrictEquals(c1r.b, 64 / 255);
  assertStrictEquals("a" in c1r, false);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ discardAlpha: true, mode: "precision" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128 / 255);
  assertStrictEquals(c2r.b, 64 / 255);
  assertStrictEquals("a" in c2r, false);
});

Deno.test("Color.prototype.toRgb() - mode:uint8", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "bytes" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 255);
  c1r.r = 255;
  assertStrictEquals(c1.red, 0);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "bytes" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6 * 255);
});

Deno.test("Color.prototype.toRgb() - mode:uint8,discardAlpha:true", () => {
  const c1 = Color.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "bytes", discardAlpha: true });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals("a" in c1r, false);

  const c2 = Color.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "bytes", discardAlpha: true });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals("a" in c2r, false);
});
