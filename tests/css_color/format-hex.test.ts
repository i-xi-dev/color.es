import { assertStrictEquals } from "../deps.ts";
import { Color, CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.format(object) - hex", () => {
  const c1 = Color.fromHexString("#00cc22ff");
  assertStrictEquals(CssColorFormat.format(c1), "#00cc22ff");
  assertStrictEquals(
    CssColorFormat.format(c1, { upperCase: true }),
    "#00CC22FF",
  );
  assertStrictEquals(
    CssColorFormat.format(c1, { upperCase: true, shortenIfPossible: true }),
    "#0C2",
  );

  const c2 = Color.fromHexString("#00cc2288");
  assertStrictEquals(CssColorFormat.format(c2), "#00cc2288");
  assertStrictEquals(
    CssColorFormat.format(c2, { upperCase: true }),
    "#00CC2288",
  );
  assertStrictEquals(
    CssColorFormat.format(c2, { upperCase: true, shortenIfPossible: true }),
    "#0C28",
  );

  const c3 = Color.fromHexString("#aabbcdee");
  assertStrictEquals(CssColorFormat.format(c3), "#aabbcdee");
  assertStrictEquals(
    CssColorFormat.format(c3, { upperCase: true }),
    "#AABBCDEE",
  );
  assertStrictEquals(
    CssColorFormat.format(c3, { upperCase: true, shortenIfPossible: true }),
    "#AABBCDEE",
  );

  const c4 = Color.fromHexString("#aabbcdff");
  assertStrictEquals(CssColorFormat.format(c4), "#aabbcdff");
  assertStrictEquals(
    CssColorFormat.format(c4, { upperCase: true }),
    "#AABBCDFF",
  );
  assertStrictEquals(
    CssColorFormat.format(c4, { upperCase: true, shortenIfPossible: true }),
    "#AABBCD",
  );

  const c4b = Color.fromHexString("#aabbcd");
  assertStrictEquals(CssColorFormat.format(c4), "#aabbcdff");
  assertStrictEquals(
    CssColorFormat.format(c4b, { upperCase: true }),
    "#AABBCDFF",
  );
  assertStrictEquals(
    CssColorFormat.format(c4b, { upperCase: true, shortenIfPossible: true }),
    "#AABBCD",
  );
});
