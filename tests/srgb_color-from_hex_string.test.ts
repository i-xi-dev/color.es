import { assertStrictEquals, assertThrows } from "./deps.ts";
import { SRgbColor } from "../mod.ts";

Deno.test("SRgbColor.fromHexString(string)", () => {
  const c1 = SRgbColor.fromHexString("#fffefd");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = SRgbColor.fromHexString("#fffefd00");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  const c1b = SRgbColor.fromHexString("#FFFEFD00");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  const c2 = SRgbColor.fromHexString("#fed");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 238 / 255);
  assertStrictEquals(c2.blue, 221 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);

  const c2a = SRgbColor.fromHexString("#fed8");
  assertStrictEquals(c2a.red, 255 / 255);
  assertStrictEquals(c2a.green, 238 / 255);
  assertStrictEquals(c2a.blue, 221 / 255);
  assertStrictEquals(c2a.alpha, 136 / 255);

  const c2b = SRgbColor.fromHexString("#FED8");
  assertStrictEquals(c2b.red, 255 / 255);
  assertStrictEquals(c2b.green, 238 / 255);
  assertStrictEquals(c2b.blue, 221 / 255);
  assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      SRgbColor.fromHexString(255 as unknown as string);
    },
    TypeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#1");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#12");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#12345");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#1234567");
    },
    RangeError,
    "input",
  );

  assertThrows(
    () => {
      SRgbColor.fromHexString("#123456789");
    },
    RangeError,
    "input",
  );
});
