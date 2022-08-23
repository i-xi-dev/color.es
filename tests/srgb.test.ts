import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { SRgb } from "../mod.ts";

Deno.test("SRgb.Color.fromRgb({})", () => {
  const color1 = SRgb.Color.fromRgb({r:255,g:254,b:253,a:1}).toRgb();
  assertStrictEquals(color1.r, 255);
  assertStrictEquals(color1.g, 254);
  assertStrictEquals(color1.b, 253);
  assertStrictEquals(color1.a, 1);
});
