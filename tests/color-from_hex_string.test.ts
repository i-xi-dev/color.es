import { assertStrictEquals, assertThrows } from "./deps.ts";
import { Color } from "../mod.ts";

Deno.test("Color.fromHexString(string)", () => {
  const c1 = Color.fromHexString("#fffefd");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = Color.fromHexString("#fffefd00");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  const c1a2 = Color.fromHexString("#fffefd00", { ignoreAlpha: true });
  assertStrictEquals(c1a2.red, 255 / 255);
  assertStrictEquals(c1a2.green, 254 / 255);
  assertStrictEquals(c1a2.blue, 253 / 255);
  assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1b = Color.fromHexString("#FFFEFD00");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  const c2 = Color.fromHexString("#fed");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 238 / 255);
  assertStrictEquals(c2.blue, 221 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);

  const c2a = Color.fromHexString("#fed8");
  assertStrictEquals(c2a.red, 255 / 255);
  assertStrictEquals(c2a.green, 238 / 255);
  assertStrictEquals(c2a.blue, 221 / 255);
  assertStrictEquals(c2a.alpha, 136 / 255);

  const c2b = Color.fromHexString("#FED8");
  assertStrictEquals(c2b.red, 255 / 255);
  assertStrictEquals(c2b.green, 238 / 255);
  assertStrictEquals(c2b.blue, 221 / 255);
  assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      Color.fromHexString(255 as unknown as string);
    },
    TypeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#1");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#12");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#12345");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#1234567");
    },
    RangeError,
    "hexString",
  );

  assertThrows(
    () => {
      Color.fromHexString("#123456789");
    },
    RangeError,
    "hexString",
  );
});
