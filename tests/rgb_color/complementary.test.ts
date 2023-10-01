import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.complementary()", () => {
  const c1 = RgbColor.fromHexString("#010203");
  const c1i = c1.complementary().toHexString();
  assertStrictEquals(c1i, "#030201FF");

  const c2 = RgbColor.fromHexString("#FEFDFC48");
  const c2i = c2.complementary().toHexString();
  assertStrictEquals(c2i, "#FCFDFE48");

  const c3 = RgbColor.fromHexString("#000000");
  const c3i = c3.complementary().toHexString();
  assertStrictEquals(c3i, "#000000FF");

  const c4 = RgbColor.fromHexString("#FFFFFF");
  const c4i = c4.complementary().toHexString();
  assertStrictEquals(c4i, "#FFFFFFFF");

  const c5 = RgbColor.fromHexString("#27E87C");
  const c5i = c5.complementary().toHexString();
  assertStrictEquals(c5i, "#E82793FF");
});
