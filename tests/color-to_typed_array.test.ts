import { assertStrictEquals } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.prototype.toUint8Array()", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toUint8Array();
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a[3], 255);
  assertStrictEquals(c1a.length, 4);
  c1a[0] = 0;
  assertStrictEquals(c1.red, 1);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8Array();
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("Color.prototype.toUint8Array({}) - discardAlpha", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toUint8Array({ discardAlpha: true });
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a.length, 3);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8Array({ discardAlpha: true });
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a.length, 3);
});

Deno.test("Color.prototype.toUint8Array({}) - omitAlphaIfOpaque", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toUint8Array({ omitAlphaIfOpaque: true });
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a.length, 3);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8Array({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("Color.prototype.toUint8ClampedArray()", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toUint8ClampedArray();
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a[3], 255);
  assertStrictEquals(c1a.length, 4);
  c1a[0] = 0;
  assertStrictEquals(c1.red, 1);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8ClampedArray();
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a[3], 136);
  assertStrictEquals(c2a.length, 4);
});

Deno.test("Color.prototype.toUint8ClampedArray({}) - discardAlpha", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toUint8ClampedArray({ discardAlpha: true });
  assertStrictEquals(c1a[0], 255);
  assertStrictEquals(c1a[1], 254);
  assertStrictEquals(c1a[2], 253);
  assertStrictEquals(c1a.length, 3);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toUint8ClampedArray({ discardAlpha: true });
  assertStrictEquals(c2a[0], 255);
  assertStrictEquals(c2a[1], 254);
  assertStrictEquals(c2a[2], 253);
  assertStrictEquals(c2a.length, 3);
});
