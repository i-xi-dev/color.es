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





// Deno.test("SRgbColor.prototype.toHsl()", () => {

// });
