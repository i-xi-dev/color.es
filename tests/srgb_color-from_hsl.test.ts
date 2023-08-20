import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";
import { r1Cases, r2Cases } from "./data.ts";

Deno.test("SRgbColor.fromHsl({ h, s, l })", () => {
  for (const c of r1Cases) {
    const c0 = SRgbColor.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
    });
    assertStrictEquals(c0.red.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 1);
  }

  for (const c of r2Cases) {
    const c0 = SRgbColor.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(c0.green.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.blue.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.alpha, 1);
  }
});

Deno.test("SRgbColor.fromHsl({ h, s, l, a })", () => {
  for (const c of r1Cases) {
    const c0 = SRgbColor.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
      a: 0.5,
    });
    assertStrictEquals(c0.red.toFixed(3), (c.r / 255).toFixed(3));
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 0.5);
  }

  for (const c of r2Cases) {
    const c0 = SRgbColor.fromHsl({
      h: Number(c.h),
      s: Number(c.s),
      l: Number(c.l),
      a: 0.5,
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(c0.green.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.blue.toFixed(3), (c.x / 255).toFixed(3));
    assertStrictEquals(c0.alpha, 0.5);
  }
});
