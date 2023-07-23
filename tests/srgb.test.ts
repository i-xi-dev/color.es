import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgb.Color.prototype.r", () => {
  const color1 = SRgbColor.from24BitRgb({ r: 255, g: 254, b: 253 });
  assertStrictEquals(color1.r, 1);

  const color2 = SRgbColor.from24BitRgb({ r: 256, g: 254, b: 253 });
  assertStrictEquals(color2.r, 1);

  const color3 = SRgbColor.from24BitRgb({ r: 1000, g: 254, b: 253 });
  assertStrictEquals(color3.r, 1);

  const color4 = SRgbColor.from24BitRgb({ r: 0, g: 254, b: 253 });
  assertStrictEquals(color4.r, 0);

  const color5 = SRgbColor.from24BitRgb({ r: -1, g: 254, b: 253 });
  assertStrictEquals(color5.r, 0);

  const color6 = SRgbColor.from24BitRgb({
    r: 254,
    g: 254,
    b: 253,
  });
  assertStrictEquals(color6.r, 254 / 255);
});
