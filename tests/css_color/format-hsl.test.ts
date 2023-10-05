import { assertStrictEquals } from "../deps.ts";
import { CssColorFormat, RgbColor } from "../../mod.ts";
import { r3Cases } from "../data.ts";

Deno.test("CssColorFormat.format(object) - hsl", () => {
  const op = { notation: "hsl" } as const;

  for (const c of r3Cases) {
    const c0 = RgbColor.fromRgb({ r: c.r, g: c.g, b: c.b });

    // 冪等ではないので小数点以下1桁より下位は無視する

    const h = Number(c.h);
    const hS = h.toFixed(2).slice(0, -1);

    const s = Number(c.s) * 100;
    const sS = s.toFixed(2).slice(0, -1);

    const l = Number(c.l) * 100;
    const lS = l.toFixed(3).slice(0, -2);

    const hsl = CssColorFormat.format(c0, op)
      .replace(/[0-9]deg/, "0deg")
      .replaceAll(/[0-9]%/g, "0%");

    assertStrictEquals(hsl, `hsl(${hS}0deg ${sS}0% ${lS}0% / 1.00)`);
  }

  const c1 = RgbColor.fromHexString("#4a8b7b88");
  assertStrictEquals(
    CssColorFormat.format(c1, op),
    `hsl(165.23deg 30.52% 41.76% / 0.53)`,
  );

  const c2 = RgbColor.fromHexString("#4a8b7b00");
  assertStrictEquals(
    CssColorFormat.format(c2, op),
    `hsl(165.23deg 30.52% 41.76% / 0.00)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c2, { ...op, shortenIfPossible: true }),
    `hsl(165.23 30.52% 41.76% / 0)`,
  );

  const c3 = RgbColor.fromHexString("#ff0000");
  assertStrictEquals(
    CssColorFormat.format(c3, op),
    `hsl(0.00deg 100.00% 50.00% / 1.00)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c3, { ...op, shortenIfPossible: true }),
    `hsl(0 100% 50%)`,
  );
});

Deno.test("CssColorFormat.format(object) - hsl,legacy", () => {
  const op = { notation: "hsl", legacy: true } as const;

  const c1 = RgbColor.fromHexString("#4a8b7b88");
  assertStrictEquals(
    CssColorFormat.format(c1, op),
    `hsla(165.23deg, 30.52%, 41.76%, 0.53)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c1, { ...op, shortenIfPossible: true }),
    `hsla(165.23, 30.52%, 41.76%, 0.53)`,
  );

  const c2 = RgbColor.fromHexString("#4a8b7bff");
  assertStrictEquals(
    CssColorFormat.format(c2, op),
    `hsla(165.23deg, 30.52%, 41.76%, 1.00)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c2, { ...op, shortenIfPossible: true }),
    `hsl(165.23, 30.52%, 41.76%)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c2, { ...op, upperCase: true }),
    `HSLA(165.23DEG, 30.52%, 41.76%, 1.00)`,
  );

  const c3 = RgbColor.fromHexString("#4a8b7b00");
  assertStrictEquals(
    CssColorFormat.format(c3, op),
    `hsla(165.23deg, 30.52%, 41.76%, 0.00)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c3, { ...op, shortenIfPossible: true }),
    `hsla(165.23, 30.52%, 41.76%, 0)`,
  );

  const c4 = RgbColor.fromHexString("#ff0000");
  assertStrictEquals(
    CssColorFormat.format(c4, op),
    `hsla(0.00deg, 100.00%, 50.00%, 1.00)`,
  );
  assertStrictEquals(
    CssColorFormat.format(c4, { ...op, shortenIfPossible: true }),
    `hsl(0, 100%, 50%)`,
  );
});
