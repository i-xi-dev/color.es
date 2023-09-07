import { assertStrictEquals } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.prototype.toHexString()", () => {
  assertStrictEquals(
    Color.fromHexString("#fffefd").toHexString(),
    "#fffefdff",
  );
  assertStrictEquals(
    Color.fromHexString("#fffefd").toHexString({ upperCase: true }),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    Color.fromHexString("#fffefd").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    Color.fromHexString("#fffefd88").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    Color.fromHexString("#ffeedd").toHexString({
      upperCase: true,
      discardAlpha: false,
    }),
    "#FFEEDDFF",
  );
  assertStrictEquals(
    Color.fromHexString("#ffeedd").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeeddff",
  );
  assertStrictEquals(
    Color.fromHexString("#ffeedd88").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeedd88",
  );
});
