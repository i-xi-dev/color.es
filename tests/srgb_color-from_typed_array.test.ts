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

  const c3 = SRgbColor.fromUint8Array(Uint8Array.of(254, 253));
  assertStrictEquals(c3.red, 254 / 255);
  assertStrictEquals(c3.green, 253 / 255);
  assertStrictEquals(c3.blue, 0);
  assertStrictEquals(c3.alpha, 255 / 255);

  const c4 = SRgbColor.fromUint8Array(Uint8Array.of(254));
  assertStrictEquals(c4.red, 254 / 255);
  assertStrictEquals(c4.green, 0);
  assertStrictEquals(c4.blue, 0);
  assertStrictEquals(c4.alpha, 255 / 255);

  const c5 = SRgbColor.fromUint8Array(Uint8Array.of());
  assertStrictEquals(c5.red, 0);
  assertStrictEquals(c5.green, 0);
  assertStrictEquals(c5.blue, 0);
  assertStrictEquals(c5.alpha, 255 / 255);
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
