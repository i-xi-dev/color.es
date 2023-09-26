import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.toHexString()", () => {
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString(),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#010203").toHexString({ order: "argb" }),
    "#FF010203",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#010203").toHexString({ order: "rgba" }),
    "#010203FF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#010203").toHexString({
      order: "argb",
      discardAlpha: true,
    }),
    "#FF010203",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#010203").toHexString({
      order: "rgba",
      discardAlpha: true,
    }),
    "#010203",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({ lowerCase: true }),
    "#fffefdff",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      lowerCase: true,
      discardAlpha: true,
    }),
    "#fffefd",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      lowerCase: true,
      omitAlphaIfOpaque: true,
    }),
    "#fffefd",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      lowerCase: true,
      discardAlpha: true,
      omitAlphaIfOpaque: true,
    }),
    "#fffefd",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      lowerCase: true,
      discardAlpha: true,
    }),
    "#fffefd",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      lowerCase: true,
      discardAlpha: true,
      omitAlphaIfOpaque: true,
    }),
    "#fffefd",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      lowerCase: true,
      omitAlphaIfOpaque: true,
    }),
    "#fffefd88",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd").toHexString({
      lowerCase: true,
      discardAlpha: false,
    }),
    "#ffeeddff",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd").toHexString({
      lowerCase: false,
      discardAlpha: false,
    }),
    "#FFEEDDFF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd88").toHexString({
      lowerCase: false,
      discardAlpha: false,
    }),
    "#FFEEDD88",
  );
});
