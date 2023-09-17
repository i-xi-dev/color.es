import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";
import { r1Cases, r2Cases, r3Cases } from "../data.ts";

Deno.test("RgbColor.prototype.toHsl()", () => {
  for (const c of r1Cases) {
    const hsl = RgbColor.fromRgb({ r: c.r, g: 0, b: 0 }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of r2Cases) {
    const hsl = RgbColor.fromRgb({ r: 255, g: c.x, b: c.x }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of r3Cases) {
    const hsl = RgbColor.fromRgb({ r: c.r, g: c.g, b: c.b }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(4), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  const c0 = RgbColor.fromHexString("#fffefd");
  const c1 = c0.toHsl();
  c1.h = 120;
  assertStrictEquals(c0.red, 1);
});

Deno.test("RgbColor.prototype.toHsl({}) - discardAlpha", () => {
  const c1 = RgbColor.fromHexString("#fffefd");
  const c1a = c1.toHsl({ discardAlpha: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = RgbColor.fromHexString("#fffefd88");
  const c2a = c2.toHsl({ discardAlpha: true });
  assertStrictEquals("a" in c2a, false);
});

Deno.test("RgbColor.prototype.toHsl({}) - omitAlphaIfOpaque", () => {
  const c3 = RgbColor.fromHexString("#fffefd");
  const c3a = c3.toHsl({ omitAlphaIfOpaque: true });
  assertStrictEquals("a" in c3a, false);

  const c4 = RgbColor.fromHexString("#fffefd88");
  const c4a = c4.toHsl({ omitAlphaIfOpaque: true });
  assertStrictEquals(c4a.a, 136 / 255);
});
