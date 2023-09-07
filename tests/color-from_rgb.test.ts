import { assertStrictEquals } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.fromRgb({})", () => {
  const c1 = Color.fromRgb({ r: 2, g: 3, b: 4 });
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = Color.fromRgb({ r: -1, g: 256, b: 100 });
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = Color.fromRgb({ r: 100, g: -1, b: 256 });
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = Color.fromRgb({ r: 256, g: 100, b: -1 });
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0 });
  assertStrictEquals(c5.alpha, 0);

  const c6 = Color.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 });
  assertStrictEquals(c6.alpha, 0);

  const c7 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1 });
  assertStrictEquals(c7.alpha, 1);

  const c8 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 });
  assertStrictEquals(c8.alpha, 1);

  const c9 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 });
  assertStrictEquals(c9.alpha, 0.5);

  const x1 = Color.fromRgb(
    { r: 2, g: 128 } as { r: number; g: number; b: number },
  );
  const x1r = x1.toRgb();
  assertStrictEquals(x1r.r, 2);
  assertStrictEquals(x1r.g, 128);
  assertStrictEquals(x1r.b, 0);
  assertStrictEquals(x1r.a, 1);

  const x2 = Color.fromRgb({ r: 2 } as { r: number; g: number; b: number });
  const x2r = x2.toRgb();
  assertStrictEquals(x2r.r, 2);
  assertStrictEquals(x2r.g, 0);
  assertStrictEquals(x2r.b, 0);
  assertStrictEquals(x2r.a, 1);

  const x3 = Color.fromRgb({} as { r: number; g: number; b: number });
  const x3r = x3.toRgb();
  assertStrictEquals(x3r.r, 0);
  assertStrictEquals(x3r.g, 0);
  assertStrictEquals(x3r.b, 0);
  assertStrictEquals(x3r.a, 1);
});

Deno.test("Color.fromRgb({}, {}) - mode:compat", () => {
  const op = { mode: "compat" } as const;
  const c1 = Color.fromRgb({ r: 2, g: 3, b: 4 }, op);
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = Color.fromRgb({ r: -1, g: 256, b: 100 }, op);
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = Color.fromRgb({ r: 100, g: -1, b: 256 }, op);
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = Color.fromRgb({ r: 256, g: 100, b: -1 }, op);
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = Color.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 }, op);
  assertStrictEquals(c9.alpha, 0.5);
});

Deno.test("Color.fromRgb({}, {}) - mode:precision", () => {
  const op = { mode: "precision" } as const;
  const c1 = Color.fromRgb({ r: 1, g: 0.9, b: 0.1 }, op);
  assertStrictEquals(c1.red, 1);
  assertStrictEquals(c1.green, 0.9);
  assertStrictEquals(c1.blue, 0.1);
  assertStrictEquals(c1.alpha, 1);

  const c2 = Color.fromRgb({ r: -0.1, g: 1.1, b: 0.5 }, op);
  assertStrictEquals(c2.red, 0);
  assertStrictEquals(c2.green, 1);
  assertStrictEquals(c2.blue, 0.5);
  assertStrictEquals(c2.alpha, 1);

  const c3 = Color.fromRgb({ r: 0.5, g: -0.1, b: 1.1 }, op);
  assertStrictEquals(c3.red, 0.5);
  assertStrictEquals(c3.green, 0);
  assertStrictEquals(c3.blue, 1);
  assertStrictEquals(c3.alpha, 1);

  const c4 = Color.fromRgb({ r: 1.1, g: 0.5, b: -0.1 }, op);
  assertStrictEquals(c4.red, 1);
  assertStrictEquals(c4.green, 0.5);
  assertStrictEquals(c4.blue, 0);
  assertStrictEquals(c4.alpha, 1);

  const c5 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = Color.fromRgb({ r: 1, g: 1, b: 1, a: -0.9 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 1.1 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0.5 }, op);
  assertStrictEquals(c9.alpha, 0.5);

  const c10 = Color.fromRgb({ r: 0.11, g: 0.12, b: 0.13 }, op);
  assertStrictEquals(c10.red, 0.11);
  assertStrictEquals(c10.green, 0.12);
  assertStrictEquals(c10.blue, 0.13);
  assertStrictEquals(c10.alpha, 1);

  const c12 = Color.fromRgb({ r: 0.11, g: 0.12, b: 0.13, a: 0.14 }, op);
  assertStrictEquals(c12.red, 0.11);
  assertStrictEquals(c12.green, 0.12);
  assertStrictEquals(c12.blue, 0.13);
  assertStrictEquals(c12.alpha, 0.14);
});

Deno.test("Color.fromRgb({}, {}) - mode:bytes", () => {
  const op = { mode: "bytes" } as const;
  const c1 = Color.fromRgb({ r: 2, g: 3, b: 4 }, op);
  assertStrictEquals(c1.red, 2 / 255);
  assertStrictEquals(c1.green, 3 / 255);
  assertStrictEquals(c1.blue, 4 / 255);
  assertStrictEquals(c1.alpha, 1);

  const c2 = Color.fromRgb({ r: -1, g: 256, b: 100 }, op);
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 100 / 255);
  assertStrictEquals(c2.alpha, 1);

  const c3 = Color.fromRgb({ r: 100, g: -1, b: 256 }, op);
  assertStrictEquals(c3.red, 100 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 255 / 255);
  assertStrictEquals(c3.alpha, 1);

  const c4 = Color.fromRgb({ r: 256, g: 100, b: -1 }, op);
  assertStrictEquals(c4.red, 255 / 255);
  assertStrictEquals(c4.green, 100 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 1);

  const c5 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 0 }, op);
  assertStrictEquals(c5.alpha, 0);

  const c6 = Color.fromRgb({ r: 1, g: 1, b: 1, a: -1 }, op);
  assertStrictEquals(c6.alpha, 0);

  const c7 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 255 }, op);
  assertStrictEquals(c7.alpha, 1);

  const c8 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 256 }, op);
  assertStrictEquals(c8.alpha, 1);

  const c9 = Color.fromRgb({ r: 1, g: 1, b: 1, a: 127 }, op);
  assertStrictEquals(c9.alpha, 127 / 255);
});
