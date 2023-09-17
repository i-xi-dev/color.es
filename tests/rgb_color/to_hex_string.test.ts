import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.toHexString()", () => {
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString(),
    "#fffefdff",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({ upperCase: true }),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      upperCase: true,
      omitAlphaIfOpaque: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toHexString({
      upperCase: true,
      discardAlpha: true,
      omitAlphaIfOpaque: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      upperCase: true,
      discardAlpha: true,
      omitAlphaIfOpaque: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toHexString({
      upperCase: true,
      omitAlphaIfOpaque: true,
    }),
    "#FFFEFD88",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd").toHexString({
      upperCase: true,
      discardAlpha: false,
    }),
    "#FFEEDDFF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeeddff",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#ffeedd88").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeedd88",
  );
});
