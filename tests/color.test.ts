import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.Component.normalize()", () => {
  assertStrictEquals(Color.Component.normalize(undefined), 0);
  assertStrictEquals(Color.Component.normalize(0), 0);
  assertStrictEquals(Color.Component.normalize(-0), 0);
  assertStrictEquals(Color.Component.normalize(-0.1), 0);
  assertStrictEquals(Color.Component.normalize(0.1), 0.1);
  assertStrictEquals(Color.Component.normalize(0.9), 0.9);
  assertStrictEquals(Color.Component.normalize(1), 1);
  assertStrictEquals(Color.Component.normalize(1.1), 1);

  assertStrictEquals(Color.Component.normalize("0"), 0);
  assertStrictEquals(Color.Component.normalize("1"), 0);
});

Deno.test("Color.Alpha.normalize()", () => {
  assertStrictEquals(Color.Alpha.normalize(undefined), 1);
  assertStrictEquals(Color.Alpha.normalize(0), 0);
  assertStrictEquals(Color.Alpha.normalize(-0), 0);
  assertStrictEquals(Color.Alpha.normalize(-0.1), 0);
  assertStrictEquals(Color.Alpha.normalize(0.1), 0.1);
  assertStrictEquals(Color.Alpha.normalize(0.9), 0.9);
  assertStrictEquals(Color.Alpha.normalize(1), 1);
  assertStrictEquals(Color.Alpha.normalize(1.1), 1);

  assertStrictEquals(Color.Alpha.normalize("0"), 1);
  assertStrictEquals(Color.Alpha.normalize("1"), 1);
});

Deno.test("Color.Hue.normalize()", () => {
  assertStrictEquals(Color.Hue.normalize(undefined), Number.NaN);
  assertStrictEquals(Color.Hue.normalize(0), 0);
  assertStrictEquals(Color.Hue.normalize(-0.1), 359.9);
  assertStrictEquals(Color.Hue.normalize(-1), 359);
  assertStrictEquals(Color.Hue.normalize(359), 359);
  assertStrictEquals(Color.Hue.normalize(360), 0);
  assertStrictEquals(Color.Hue.normalize(360.1).toFixed(6), (0.1).toFixed(6));
  assertStrictEquals(Color.Hue.normalize(361), 1);

  assertStrictEquals(Color.Hue.normalize(Number.POSITIVE_INFINITY), Number.NaN);
  assertStrictEquals(Color.Hue.normalize("1"), Number.NaN);
});
