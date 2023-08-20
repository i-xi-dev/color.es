import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.fromRgb({})", () => {
  const c1 = SRgbColor.fromRgb({ r: 2, g: 3, b: 4 });
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = SRgbColor.fromRgb({ r: -1, g: 256, b: 100 });
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = SRgbColor.fromRgb({ r: 100, g: -1, b: 256 });
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = SRgbColor.fromRgb({ r: 256, g: 100, b: -1 });
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0 });
  assertStrictEquals(c5.alpha, 0);

  const c6 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 });
  assertStrictEquals(c6.alpha, 0);

  const c7 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1 });
  assertStrictEquals(c7.alpha, 1);

  const c8 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 });
  assertStrictEquals(c8.alpha, 1);

  const c9 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 });
  assertStrictEquals(c9.alpha, 0.5);
});

Deno.test("SRgbColor.fromRgb({}, {}) - mode:auto", () => {
  const op = { mode: "auto" } as const;
  const c1 = SRgbColor.fromRgb({ r: 2, g: 3, b: 4 }, op);
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = SRgbColor.fromRgb({ r: -1, g: 256, b: 100 }, op);
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = SRgbColor.fromRgb({ r: 100, g: -1, b: 256 }, op);
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = SRgbColor.fromRgb({ r: 256, g: 100, b: -1 }, op);
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 }, op);
  assertStrictEquals(c9.alpha, 0.5);
});

Deno.test("SRgbColor.fromRgb({}, {}) - mode:precision", () => {
  const op = { mode: "precision" } as const;
  const c1 = SRgbColor.fromRgb({ r: 1, g: 0.9, b: 0.1 }, op);
  assertStrictEquals(c1.red, 1);
  assertStrictEquals(c1.green, 0.9);
  assertStrictEquals(c1.blue, 0.1);
  assertStrictEquals(c1.alpha, 1);

  const c2 = SRgbColor.fromRgb({ r: -0.1, g: 1.1, b: 0.5 }, op);
  assertStrictEquals(c2.red, 0);
  assertStrictEquals(c2.green, 1);
  assertStrictEquals(c2.blue, 0.5);
  assertStrictEquals(c2.alpha, 1);

  const c3 = SRgbColor.fromRgb({ r: 0.5, g: -0.1, b: 1.1 }, op);
  assertStrictEquals(c3.red, 0.5);
  assertStrictEquals(c3.green, 0);
  assertStrictEquals(c3.blue, 1);
  assertStrictEquals(c3.alpha, 1);

  const c4 = SRgbColor.fromRgb({ r: 1.1, g: 0.5, b: -0.1 }, op);
  assertStrictEquals(c4.red, 1);
  assertStrictEquals(c4.green, 0.5);
  assertStrictEquals(c4.blue, 0);
  assertStrictEquals(c4.alpha, 1);

  const c5 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 }, op);
  assertStrictEquals(c9.alpha, 0.5);
});

Deno.test("SRgbColor.fromRgb({}, {}) - mode:uint8", () => {
  const op = { mode: "uint8" } as const;
  const c1 = SRgbColor.fromRgb({ r: 2, g: 3, b: 4 }, op);
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = SRgbColor.fromRgb({ r: -1, g: 256, b: 100 }, op);
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = SRgbColor.fromRgb({ r: 100, g: -1, b: 256 }, op);
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = SRgbColor.fromRgb({ r: 256, g: 100, b: -1 }, op);
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: -1 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 255 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 256 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = SRgbColor.fromRgb({ r: 1, g: 1, b: 1, a: 127 }, op);
  assertStrictEquals(c9.alpha, 127 / 255);
});
