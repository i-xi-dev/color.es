import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.invert()", () => {
  const c1 = RgbColor.fromHexString("#010203");
  const c1i = c1.invert().toHexString();
  assertStrictEquals(c1i, "#FEFDFCFF");

  const c2 = RgbColor.fromHexString("#FEFDFC48");
  const c2i = c2.invert().toHexString();
  assertStrictEquals(c2i, "#01020348");

  const c3 = RgbColor.fromHexString("#000000");
  const c3i = c3.invert().toHexString();
  assertStrictEquals(c3i, "#FFFFFFFF");

  const c4 = RgbColor.fromHexString("#FFFFFF");
  const c4i = c4.invert().toHexString();
  assertStrictEquals(c4i, "#000000FF");

  const c5 = RgbColor.fromHexString("#FF0000");
  const c5i = c5.invert().toHexString();
  assertStrictEquals(c5i, "#00FFFFFF");

  const c6 = RgbColor.fromHexString("#20206080");
  const c6i = c6.invert().toHexString();
  assertStrictEquals(c6i, "#DFDF9F80");
});
