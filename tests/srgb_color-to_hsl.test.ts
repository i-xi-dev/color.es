import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";
import { r1Cases, r2Cases, r3Cases } from "./data.ts";

Deno.test("SRgbColor.prototype.toHsl()", () => {
  for (const c of r1Cases) {
    const hsl = SRgbColor.fromRgb({ r: c.r, g: 0, b: 0 }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of r2Cases) {
    const hsl = SRgbColor.fromRgb({ r: 255, g: c.x, b: c.x }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(2), c.s);
    assertStrictEquals(hsl.l.toFixed(4), c.l);
  }

  for (const c of r3Cases) {
    const hsl = SRgbColor.fromRgb({ r: c.r, g: c.g, b: c.b }).toHsl();
    assertStrictEquals(hsl.h.toFixed(2), c.h);
    assertStrictEquals(hsl.s.toFixed(0), c.s);
    assertStrictEquals(hsl.l.toFixed(1), c.l);
  }

  const c0 = SRgbColor.fromHexString("#fffefd");
  const c1 = c0.toHsl();
  c1.h = 120;
  assertStrictEquals(c0.red, 1);
});

Deno.test("SRgbColor.prototype.toHsl({}) - discardAlpha", () => {
  const c1 = SRgbColor.fromHexString("#fffefd");
  const c1a = c1.toHsl({ discardAlpha: true });
  assertStrictEquals("a" in c1a, false);

  const c2 = SRgbColor.fromHexString("#fffefd88");
  const c2a = c2.toHsl({ discardAlpha: true });
  assertStrictEquals("a" in c2a, false);
});
