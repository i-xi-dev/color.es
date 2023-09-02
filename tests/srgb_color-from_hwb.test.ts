import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";
import { r1Cases, r2Cases } from "./data.ts";

Deno.test("SRgbColor.fromHwb({ h, w, b })", () => {
  for (const c of r1Cases) {
    console.log(c)
    const c0 = SRgbColor.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
    });
    assertStrictEquals(c0.red.toFixed(3).substring(0, 4), (c.r / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 1);
  }

  for (const c of r2Cases) {
    const c0 = SRgbColor.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(c0.green.toFixed(3).substring(0, 4), (c.x / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.blue.toFixed(3).substring(0, 4), (c.x / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.alpha, 1);
  }
});

Deno.test("SRgbColor.fromHwb({ h, w, b, a })", () => {
  for (const c of r1Cases) {
    const c0 = SRgbColor.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    });
    assertStrictEquals(c0.red.toFixed(3).substring(0, 4), (c.r / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 0.5);
  }

  for (const c of r2Cases) {
    const c0 = SRgbColor.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(c0.green.toFixed(3).substring(0, 4), (c.x / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.blue.toFixed(3).substring(0, 4), (c.x / 255).toFixed(3).substring(0, 4));
    assertStrictEquals(c0.alpha, 0.5);
  }
});
