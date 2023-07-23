import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.prototype.r", () => {
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
    g: 255,
    b: 253,
  });
  assertStrictEquals(color6.r, 254 / 255);
});

Deno.test("SRgbColor.prototype.g", () => {
  const color1 = SRgbColor.from24BitRgb({ r: 254, g: 255, b: 253 });
  assertStrictEquals(color1.g, 1);

  const color2 = SRgbColor.from24BitRgb({ r: 254, g: 256, b: 253 });
  assertStrictEquals(color2.g, 1);

  const color3 = SRgbColor.from24BitRgb({ r: 254, g: 1000, b: 253 });
  assertStrictEquals(color3.g, 1);

  const color4 = SRgbColor.from24BitRgb({ r: 254, g: 0, b: 253 });
  assertStrictEquals(color4.g, 0);

  const color5 = SRgbColor.from24BitRgb({ r: 254, g: -1, b: 253 });
  assertStrictEquals(color5.g, 0);

  const color6 = SRgbColor.from24BitRgb({
    r: 255,
    g: 254,
    b: 253,
  });
  assertStrictEquals(color6.g, 254 / 255);
});

Deno.test("SRgbColor.prototype.b", () => {
  const color1 = SRgbColor.from24BitRgb({ r: 254, g: 253, b: 255 });
  assertStrictEquals(color1.b, 1);

  const color2 = SRgbColor.from24BitRgb({ r: 254, g: 253, b: 256 });
  assertStrictEquals(color2.b, 1);

  const color3 = SRgbColor.from24BitRgb({ r: 254, g: 253, b: 1000 });
  assertStrictEquals(color3.b, 1);

  const color4 = SRgbColor.from24BitRgb({ r: 254, g: 253, b: 0 });
  assertStrictEquals(color4.b, 0);

  const color5 = SRgbColor.from24BitRgb({ r: 254, g: 253, b: -1 });
  assertStrictEquals(color5.b, 0);

  const color6 = SRgbColor.from24BitRgb({
    r: 255,
    g: 253,
    b: 254,
  });
  assertStrictEquals(color6.b, 254 / 255);
});
