import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";
import { r1Cases, r2Cases } from "./data.ts";

Deno.test("SRgbColor.prototype.toHwb()", () => {
  for (const c of r1Cases) {
    const hsl = SRgbColor.fromRgb({ r: c.r, g: 0, b: 0 }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  for (const c of r2Cases) {
    const hsl = SRgbColor.fromRgb({ r: 255, g: c.x, b: c.x }).toHwb();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.w.toFixed(4), c.wt);
    assertStrictEquals(hsl.b.toFixed(4), c.bk);
  }

  const c0 = SRgbColor.fromHexString("#fffefd");
  const c1 = c0.toHwb();
  c1.h = 120;
  assertStrictEquals(c0.red, 1);
});

Deno.test("SRgbColor.prototype.toHwb({}) - discardAlpha", () => {
  const c1 = SRgbColor.fromHexString("#fffefd");
  const c1a = c1.toHwb({ discardAlpha: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = SRgbColor.fromHexString("#fffefd88");
  const c2a = c2.toHwb({ discardAlpha: true });
  assertStrictEquals("a" in c2a, false);
});
