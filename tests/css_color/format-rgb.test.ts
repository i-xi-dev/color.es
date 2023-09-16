import { assertStrictEquals } from "../deps.ts";
import { Color, CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.format(object) - rgb", () => {
  const op = { notation: "rgb" } as const;

  const c1 = Color.fromHexString("#00cc22ff");
  assertStrictEquals(CssColorFormat.format(c1, op), "rgb(0 204 34 / 1)");
  assertStrictEquals(
    CssColorFormat.format(c1, { ...op, upperCase: true }),
    "RGB(0 204 34 / 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c1, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(0 204 34)",
  );

  const c2 = Color.fromHexString("#00cc2288");
  assertStrictEquals(CssColorFormat.format(c2, op), "rgb(0 204 34 / 0.5333)");
  assertStrictEquals(
    CssColorFormat.format(c2, { ...op, upperCase: true }),
    "RGB(0 204 34 / 0.5333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c2, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(0 204 34 / 0.5333)",
  );

  const c3 = Color.fromHexString("#aabbcdee");
  assertStrictEquals(
    CssColorFormat.format(c3, op),
    "rgb(170 187 205 / 0.9333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c3, { ...op, upperCase: true }),
    "RGB(170 187 205 / 0.9333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c3, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(170 187 205 / 0.9333)",
  );

  const c4 = Color.fromHexString("#aabbcdff");
  assertStrictEquals(CssColorFormat.format(c4, op), "rgb(170 187 205 / 1)");
  assertStrictEquals(
    CssColorFormat.format(c4, { ...op, upperCase: true }),
    "RGB(170 187 205 / 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c4, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(170 187 205)",
  );

  const c4b = Color.fromHexString("#aabbcd");
  assertStrictEquals(CssColorFormat.format(c4, op), "rgb(170 187 205 / 1)");
  assertStrictEquals(
    CssColorFormat.format(c4b, { ...op, upperCase: true }),
    "RGB(170 187 205 / 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c4b, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(170 187 205)",
  );
});

Deno.test("CssColorFormat.format(object) - rgb,legacy", () => {
  const op = { notation: "rgb", legacy: true } as const;

  const c1 = Color.fromHexString("#00cc22ff");
  assertStrictEquals(CssColorFormat.format(c1, op), "rgba(0, 204, 34, 1)");
  assertStrictEquals(
    CssColorFormat.format(c1, { ...op, upperCase: true }),
    "RGBA(0, 204, 34, 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c1, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(0, 204, 34)",
  );

  const c2 = Color.fromHexString("#00cc2288");
  assertStrictEquals(CssColorFormat.format(c2, op), "rgba(0, 204, 34, 0.5333)");
  assertStrictEquals(
    CssColorFormat.format(c2, { ...op, upperCase: true }),
    "RGBA(0, 204, 34, 0.5333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c2, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGBA(0, 204, 34, 0.5333)",
  );

  const c3 = Color.fromHexString("#aabbcdee");
  assertStrictEquals(
    CssColorFormat.format(c3, op),
    "rgba(170, 187, 205, 0.9333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c3, { ...op, upperCase: true }),
    "RGBA(170, 187, 205, 0.9333)",
  );
  assertStrictEquals(
    CssColorFormat.format(c3, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGBA(170, 187, 205, 0.9333)",
  );

  const c4 = Color.fromHexString("#aabbcdff");
  assertStrictEquals(CssColorFormat.format(c4, op), "rgba(170, 187, 205, 1)");
  assertStrictEquals(
    CssColorFormat.format(c4, { ...op, upperCase: true }),
    "RGBA(170, 187, 205, 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c4, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(170, 187, 205)",
  );

  const c4b = Color.fromHexString("#aabbcd");
  assertStrictEquals(CssColorFormat.format(c4, op), "rgba(170, 187, 205, 1)");
  assertStrictEquals(
    CssColorFormat.format(c4b, { ...op, upperCase: true }),
    "RGBA(170, 187, 205, 1)",
  );
  assertStrictEquals(
    CssColorFormat.format(c4b, {
      ...op,
      upperCase: true,
      shortenIfPossible: true,
    }),
    "RGB(170, 187, 205)",
  );
});
