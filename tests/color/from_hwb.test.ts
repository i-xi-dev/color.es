import { assertStrictEquals } from "../deps.ts";
import { Color } from "../../mod.ts";
import { r1Cases, r2Cases, r3Cases } from "../data.ts";

Deno.test("Color.fromHwb({ h, w, b })", () => {
  for (const c of r1Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
    });
    assertStrictEquals(
      c0.red.toFixed(3).substring(0, 4),
      (c.r / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 1);
  }

  for (const c of r2Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(
      c0.green.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.blue.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.alpha, 1);
  }

  for (const c of r3Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
    });
    assertStrictEquals(
      c0.red.toFixed(3).substring(0, 4),
      (c.r / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.green.toFixed(3).substring(0, 4),
      (c.g / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.blue.toFixed(3).substring(0, 4),
      (c.b / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.alpha, 1);
  }
});

Deno.test("Color.fromHwb({ h, w, b, a })", () => {
  for (const c of r1Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    });
    assertStrictEquals(
      c0.red.toFixed(3).substring(0, 4),
      (c.r / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 0.5);
  }

  for (const c of r2Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(
      c0.green.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.blue.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.alpha, 0.5);
  }
});

Deno.test("Color.fromHwb({ h, w, b, a }) - ignoreAlpha", () => {
  for (const c of r1Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    }, { ignoreAlpha: true });
    assertStrictEquals(
      c0.red.toFixed(3).substring(0, 4),
      (c.r / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.green, 0);
    assertStrictEquals(c0.blue, 0);
    assertStrictEquals(c0.alpha, 1);
  }

  for (const c of r2Cases) {
    const c0 = Color.fromHwb({
      h: Number(c.h),
      w: Number(c.wt),
      b: Number(c.bk),
      a: 0.5,
    }, { ignoreAlpha: true });
    assertStrictEquals(c0.red, 1);
    assertStrictEquals(
      c0.green.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(
      c0.blue.toFixed(3).substring(0, 4),
      (c.x / 255).toFixed(3).substring(0, 4),
    );
    assertStrictEquals(c0.alpha, 1);
  }
});
