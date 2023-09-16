import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string)", () => {
  assertThrows(
    () => {
      CssColorFormat.parse("");
    },
    TypeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse(255 as unknown as string);
    },
    TypeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("inherit");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("initial");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("unset");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("revert");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("currentcolor");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("var(--x)");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("Var(--x)");
    },
    RangeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("calc(1)");
    },
    RangeError,
    "colorString",
  );

  const c1 = CssColorFormat.parse("transparent");
  assertStrictEquals(c1.red, 0 / 255);
  assertStrictEquals(c1.green, 0 / 255);
  assertStrictEquals(c1.blue, 0 / 255);
  assertStrictEquals(c1.alpha, 0 / 255);
});
