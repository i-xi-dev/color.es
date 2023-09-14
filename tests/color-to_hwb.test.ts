import { assertStrictEquals } from "./deps.ts";
import { Color } from "../mod.ts";
import { r1Cases, r2Cases, r3Cases } from "./data.ts";

Deno.test("Color.prototype.toHwb()", () => {
  for (const c of r1Cases) {
    const hsl = Color.fromRgb({ r: c.r, g: 0, b: 0 }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of r2Cases) {
    const hsl = Color.fromRgb({ r: 255, g: c.x, b: c.x }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of r3Cases) {
    const hsl = Color.fromRgb({ r: c.r, g: c.g, b: c.b }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  const c0 = Color.fromHexString("#fffefd");
  const c1 = c0.toHwb();
  c1.h = 120;
  assertStrictEquals(c0.red, 1);
});

Deno.test("Color.prototype.toHwb({}) - discardAlpha", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toHwb({ discardAlpha: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toHwb({ discardAlpha: true });
  assertStrictEquals("a" in c2a, false);
});

Deno.test("Color.prototype.toHwb({}) - omitAlphaIfOpaque", () => {
  const c1 = Color.fromHexString("#fffefd");
  const c1a = c1.toHwb({ omitAlphaIfOpaque: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = Color.fromHexString("#fffefd88");
  const c2a = c2.toHwb({ omitAlphaIfOpaque: true });
  assertStrictEquals(c2a.a, 136 / 255);
});
