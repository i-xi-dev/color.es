import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.fromUint8Array(Uint8Array)", () => {
  const c1 = SRgbColor.fromUint8Array(Uint8Array.of(254, 253, 252));
  assertStrictEquals(c1.red, 254 / 255);
  assertStrictEquals(c1.green, 253 / 255);
  assertStrictEquals(c1.blue, 252 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c2 = SRgbColor.fromUint8Array(Uint8Array.of(255, 254, 253, 252));
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 254 / 255);
  assertStrictEquals(c2.blue, 253 / 255);
  assertStrictEquals(c2.alpha, 252 / 255);
});

Deno.test("SRgbColor.fromUint8Array(Uint8ClampedArray)", () => {
  const c1 = SRgbColor.fromUint8Array(Uint8ClampedArray.of(254, 253, 252));
  assertStrictEquals(c1.red, 254 / 255);
  assertStrictEquals(c1.green, 253 / 255);
  assertStrictEquals(c1.blue, 252 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c2 = SRgbColor.fromUint8Array(Uint8ClampedArray.of(255, 254, 253, 252));
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 254 / 255);
  assertStrictEquals(c2.blue, 253 / 255);
  assertStrictEquals(c2.alpha, 252 / 255);
});
