import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColor } from "../../mod.ts";

Deno.test("CssColor.parse(string)", () => {
  assertThrows(
    () => {
      CssColor.parse("");
    },
    TypeError,
    "colorString",
  );
});

Deno.test("CssColor.parse(string) - hex", () => {
  const c1 = CssColor.parse("#fffefd");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = CssColor.parse("#fffefd00");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  // const c1a2 = CssColor.parse("#fffefd00");
  // assertStrictEquals(c1a2.red, 255 / 255);
  // assertStrictEquals(c1a2.green, 254 / 255);
  // assertStrictEquals(c1a2.blue, 253 / 255);
  // assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1b = CssColor.parse("#FFFEFD00");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  const c2 = CssColor.parse("#fed");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 238 / 255);
  assertStrictEquals(c2.blue, 221 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);

  const c2a = CssColor.parse("#fed8");
  assertStrictEquals(c2a.red, 255 / 255);
  assertStrictEquals(c2a.green, 238 / 255);
  assertStrictEquals(c2a.blue, 221 / 255);
  assertStrictEquals(c2a.alpha, 136 / 255);

  const c2b = CssColor.parse("#FED8");
  assertStrictEquals(c2b.red, 255 / 255);
  assertStrictEquals(c2b.green, 238 / 255);
  assertStrictEquals(c2b.blue, 221 / 255);
  assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      CssColor.parse(255 as unknown as string);
    },
    TypeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColor.parse("#");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColor.parse("#1");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColor.parse("#12");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColor.parse("#12345");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColor.parse("#1234567");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColor.parse("#123456789");
    },
    RangeError,
    "hexString",
  );
});
