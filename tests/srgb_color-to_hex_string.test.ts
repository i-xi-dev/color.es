import { assertStrictEquals } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.prototype.toHexString()", () => {
  assertStrictEquals(
    SRgbColor.fromHexString("#fffefd").toHexString(),
    "#fffefdff",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#fffefd").toHexString({ upperCase: true }),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#fffefd").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#fffefd88").toHexString({
      upperCase: true,
      discardAlpha: true,
    }),
    "#FFFEFD",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#ffeedd").toHexString({
      upperCase: true,
      discardAlpha: false,
    }),
    "#FFEEDDFF",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#ffeedd").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeeddff",
  );
  assertStrictEquals(
    SRgbColor.fromHexString("#ffeedd88").toHexString({
      upperCase: false,
      discardAlpha: false,
    }),
    "#ffeedd88",
  );
});
