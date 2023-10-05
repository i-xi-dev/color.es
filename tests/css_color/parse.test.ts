import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string)", () => {
  assertThrows(
    () => {
      CssColorFormat.parse("");
    },
    TypeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse(255 as unknown as string);
    },
    TypeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("inherit");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("initial");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("unset");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("revert");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("currentcolor");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("var(--x)");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("Var(--x)");
    },
    RangeError,
    "cssColor",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("calc(1)");
    },
    RangeError,
    "cssColor",
  );

  const c1 = CssColorFormat.parse("transparent");
  assertStrictEquals(c1.red, 0 / 255);
  assertStrictEquals(c1.green, 0 / 255);
  assertStrictEquals(c1.blue, 0 / 255);
  assertStrictEquals(c1.alpha, 0 / 255);
});
