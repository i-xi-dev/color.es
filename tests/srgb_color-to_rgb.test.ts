import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.prototype.toRgb()", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb();
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 1);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb();
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("SRgbColor.prototype.toRgb({}) - discardAlpha:true", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ discardAlpha: true });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals("a" in c1r, false);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ discardAlpha: true });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals("a" in c2r, false);
});

Deno.test("SRgbColor.prototype.toRgb() - mode:auto", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "auto" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 1);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "auto" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("SRgbColor.prototype.toRgb({}) - mode:precision", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "precision" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128 / 255);
  assertStrictEquals(c1r.b, 64 / 255);
  assertStrictEquals(c1r.a, 1);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "precision" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128 / 255);
  assertStrictEquals(c2r.b, 64 / 255);
  assertStrictEquals(c2r.a, 0.6);
});

Deno.test("SRgbColor.prototype.toRgb({}) - mode:precision,discardAlpha:true", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ discardAlpha: true, mode: "precision" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128 / 255);
  assertStrictEquals(c1r.b, 64 / 255);
  assertStrictEquals("a" in c1r, false);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ discardAlpha: true, mode: "precision" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128 / 255);
  assertStrictEquals(c2r.b, 64 / 255);
  assertStrictEquals("a" in c2r, false);
});

Deno.test("SRgbColor.prototype.toRgb() - mode:uint8", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "uint8" });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals(c1r.a, 255);
  c1r.r = 255;
  assertStrictEquals(c1.red, 0);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "uint8" });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals(c2r.a, 0.6 * 255);
});

Deno.test("SRgbColor.prototype.toRgb() - mode:uint8,discardAlpha:true", () => {
  const c1 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64 });
  const c1r = c1.toRgb({ mode: "uint8", discardAlpha: true });
  assertStrictEquals(c1r.r, 0);
  assertStrictEquals(c1r.g, 128);
  assertStrictEquals(c1r.b, 64);
  assertStrictEquals("a" in c1r, false);

  const c2 = SRgbColor.fromRgb({ r: 0, g: 128, b: 64, a: 0.6 });
  const c2r = c2.toRgb({ mode: "uint8", discardAlpha: true });
  assertStrictEquals(c2r.r, 0);
  assertStrictEquals(c2r.g, 128);
  assertStrictEquals(c2r.b, 64);
  assertStrictEquals("a" in c2r, false);
});
