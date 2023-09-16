import { assertStrictEquals, assertThrows } from "../deps.ts";
import { Color } from "../../mod.ts";

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
  assertStrictEquals(c2.red, 0 / 255);
  assertStrictEquals(c2.green, 0 / 255);
  assertStrictEquals(c2.blue, 0 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);

  const c2a = Color.fromHexString("#fed8");
  assertStrictEquals(c2a.red, 0 / 255);
  assertStrictEquals(c2a.green, 0 / 255);
  assertStrictEquals(c2a.blue, 0 / 255);
  assertStrictEquals(c2a.alpha, 255 / 255);

  const c2b = Color.fromHexString("#FED8");
  assertStrictEquals(c2b.red, 0 / 255);
  assertStrictEquals(c2b.green, 0 / 255);
  assertStrictEquals(c2b.blue, 0 / 255);
  assertStrictEquals(c2b.alpha, 255 / 255);

  const c3 = Color.fromHexString("#");
  assertStrictEquals(c3.red, 0 / 255);
  assertStrictEquals(c3.green, 0 / 255);
  assertStrictEquals(c3.blue, 0 / 255);
  assertStrictEquals(c3.alpha, 255 / 255);

  const c4 = Color.fromHexString("");
  assertStrictEquals(c4.red, 0 / 255);
  assertStrictEquals(c4.green, 0 / 255);
  assertStrictEquals(c4.blue, 0 / 255);
  assertStrictEquals(c4.alpha, 255 / 255);

  const c5 = Color.fromHexString("#1");
  assertStrictEquals(c5.red, 0 / 255);
  assertStrictEquals(c5.green, 0 / 255);
  assertStrictEquals(c5.blue, 0 / 255);
  assertStrictEquals(c5.alpha, 255 / 255);

  const c6 = Color.fromHexString("#12");
  assertStrictEquals(c6.red, 0 / 255);
  assertStrictEquals(c6.green, 0 / 255);
  assertStrictEquals(c6.blue, 0 / 255);
  assertStrictEquals(c6.alpha, 255 / 255);

  const c7 = Color.fromHexString("#12345");
  assertStrictEquals(c7.red, 0 / 255);
  assertStrictEquals(c7.green, 0 / 255);
  assertStrictEquals(c7.blue, 0 / 255);
  assertStrictEquals(c7.alpha, 255 / 255);

  const c8 = Color.fromHexString("#1234567");
  assertStrictEquals(c8.red, 0 / 255);
  assertStrictEquals(c8.green, 0 / 255);
  assertStrictEquals(c8.blue, 0 / 255);
  assertStrictEquals(c8.alpha, 255 / 255);

  const c9 = Color.fromHexString("#123456789");
  assertStrictEquals(c9.red, 0 / 255);
  assertStrictEquals(c9.green, 0 / 255);
  assertStrictEquals(c9.blue, 0 / 255);
  assertStrictEquals(c9.alpha, 255 / 255);

  assertThrows(
    () => {
      Color.fromHexString(255 as unknown as string);
    },
    TypeError,
    "hexString",
  );
});

Deno.test("Color.fromHexString(string, {})", () => {
  const op = { order: "argb" } as const;

  const c1 = Color.fromHexString("#fffefd", op);
  assertStrictEquals(c1.red, 0 / 255);
  assertStrictEquals(c1.green, 0 / 255);
  assertStrictEquals(c1.blue, 0 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = Color.fromHexString("#fffefd00", op);
  assertStrictEquals(c1a.red, 254 / 255);
  assertStrictEquals(c1a.green, 253 / 255);
  assertStrictEquals(c1a.blue, 0 / 255);
  assertStrictEquals(c1a.alpha, 255 / 255);

  const c1a2 = Color.fromHexString("#00fffefd", { ...op, ignoreAlpha: true });
  assertStrictEquals(c1a2.red, 255 / 255);
  assertStrictEquals(c1a2.green, 254 / 255);
  assertStrictEquals(c1a2.blue, 253 / 255);
  assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1ab = Color.fromHexString("#00fffefd", { ...op, ignoreAlpha: false });
  assertStrictEquals(c1ab.red, 255 / 255);
  assertStrictEquals(c1ab.green, 254 / 255);
  assertStrictEquals(c1ab.blue, 253 / 255);
  assertStrictEquals(c1ab.alpha, 0 / 255);

  const c1b = Color.fromHexString("#FFFEFD00", op);
  assertStrictEquals(c1b.red, 254 / 255);
  assertStrictEquals(c1b.green, 253 / 255);
  assertStrictEquals(c1b.blue, 0 / 255);
  assertStrictEquals(c1b.alpha, 255 / 255);
});
