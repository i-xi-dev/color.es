import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string) - hex", () => {
  const c1 = CssColorFormat.parse("#fffefd");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = CssColorFormat.parse("#fffefd00");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  // const c1a2 = CssColorFormat.parse("#fffefd00");
  // assertStrictEquals(c1a2.red, 255 / 255);
  // assertStrictEquals(c1a2.green, 254 / 255);
  // assertStrictEquals(c1a2.blue, 253 / 255);
  // assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1b = CssColorFormat.parse("#FFFEFD00");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  const c2 = CssColorFormat.parse("#fed");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 238 / 255);
  assertStrictEquals(c2.blue, 221 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);

  const c2a = CssColorFormat.parse("#fed8");
  assertStrictEquals(c2a.red, 255 / 255);
  assertStrictEquals(c2a.green, 238 / 255);
  assertStrictEquals(c2a.blue, 221 / 255);
  assertStrictEquals(c2a.alpha, 136 / 255);

  const c2b = CssColorFormat.parse("#FED8");
  assertStrictEquals(c2b.red, 255 / 255);
  assertStrictEquals(c2b.green, 238 / 255);
  assertStrictEquals(c2b.blue, 221 / 255);
  assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      CssColorFormat.parse(255 as unknown as string);
    },
    TypeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#1");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#12");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#12345");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#1234567");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("#123456789");
    },
    RangeError,
    "hexString",
  );
});
