import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.toString()", () => {
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd").toString(),
    "#FFFEFDFF",
  );
  assertStrictEquals(
    RgbColor.fromHexString("#fffefd88").toString(),
    "#FFFEFD88",
  );
});

Deno.test("RgbColor.prototype.toJSON()", () => {
  const c1 = RgbColor.fromHexString("#fffefd");
  const c1a = c1.toJSON();
  assertStrictEquals(c1a.r, 1);
  assertStrictEquals(c1a.g, 254 / 255);
  assertStrictEquals(c1a.b, 253 / 255);
  assertStrictEquals(c1a.a, 1);
  c1a.r = 0;
  assertStrictEquals(c1.red, 1);

  const c2 = RgbColor.fromHexString("#01020388");
  const c2a = c2.toJSON();
  assertStrictEquals(c2a.r, 1 / 255);
  assertStrictEquals(c2a.g, 2 / 255);
  assertStrictEquals(c2a.b, 3 / 255);
  assertStrictEquals(c2a.a, 136 / 255);
});

Deno.test("RgbColor.prototype.plusHue()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.plusHue(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);
  assertStrictEquals(c1a.alpha, c1.alpha);

  const c2 = RgbColor.fromHsl({ h: 12, s: 0.5, l: 0.5 });
  const c2a = c2.plusHue(-1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue.toFixed(6), (11).toFixed(6));
  assertStrictEquals(c2a.saturation, c2.saturation);

  const c2b = c2.plusHue(1);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue.toFixed(6), (13).toFixed(6));
  assertStrictEquals(c2b.saturation, c2.saturation);

  const c2c = c2.plusHue(20000);
  assertStrictEquals(c2c.lightness, c2.lightness);
  assertStrictEquals(c2c.hue.toFixed(6), (212).toFixed(6));
  assertStrictEquals(c2c.saturation, c2.saturation);
});

Deno.test("RgbColor.prototype.withHue()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.withHue(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.withHue(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue.toFixed(6), (359).toFixed(6));
  assertStrictEquals(c1b.saturation, c1.saturation);

  const c2 = RgbColor.fromHexString("#11213188");
  const c2a = c2.withHue(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue.toFixed(6), (1).toFixed(6));
  assertStrictEquals(c2a.saturation, c2.saturation);

  const c2b = c2.withHue(20000);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue.toFixed(6), (200).toFixed(6));
  assertStrictEquals(c2b.saturation, c2.saturation);
  assertStrictEquals(c2b.alpha, c2.alpha);
});

Deno.test("RgbColor.prototype.plusSaturation()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.plusSaturation(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.plusSaturation(-1);
  assertStrictEquals(c1b.lightness, c1.lightness);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = RgbColor.fromHexString("#11213188");
  const c2a = c2.plusSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.plusSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = RgbColor.fromHexString("#030203");
  const c3a = c3.plusSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(
    c3a.saturation.toFixed(6),
    (c3.saturation + 0.5).toFixed(6),
  );
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("RgbColor.prototype.withSaturation()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.withSaturation(0);
  //assertStrictEquals(c1a.lightness, 0); 連動して変わる
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withSaturation(-1);
  //assertStrictEquals(c1b.lightness, 0); 連動して変わる
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = RgbColor.fromHexString("#11213188");
  const c2a = c2.withSaturation(1);
  assertStrictEquals(c2a.lightness, c2.lightness);
  assertStrictEquals(c2a.hue, c2.hue);
  assertStrictEquals(c2a.saturation, 1);

  const c2b = c2.withSaturation(2);
  assertStrictEquals(c2b.lightness, c2.lightness);
  assertStrictEquals(c2b.hue, c2.hue);
  assertStrictEquals(c2b.saturation, 1);

  const c3 = RgbColor.fromHexString("#fffefd88");
  const c3a = c3.withSaturation(0.5);
  assertStrictEquals(c3a.lightness, c3.lightness);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, 0.5);
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("RgbColor.prototype.plusLightness()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.plusLightness(0);
  assertStrictEquals(c1a.lightness, c1.lightness);
  assertStrictEquals(c1a.hue, c1.hue);
  assertStrictEquals(c1a.saturation, c1.saturation);

  const c1b = c1.plusLightness(-1);
  assertStrictEquals(c1b.lightness, 0);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = RgbColor.fromHexString("#11213188");
  const c2a = c2.plusLightness(1);
  assertStrictEquals(c2a.lightness, 1);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.plusLightness(2);
  assertStrictEquals(c2b.lightness, 1);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = RgbColor.fromHexString("#881122");
  const c3a = c3.plusLightness(0.5);
  assertStrictEquals(c3a.lightness.toFixed(6), (c3.lightness + 0.5).toFixed(6));
  assertStrictEquals(c3a.hue, c3.hue);
  //assertStrictEquals(c3a.saturation, c3.saturation); 連動して変わる
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("RgbColor.prototype.withLightness()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.withLightness(0);
  assertStrictEquals(c1a.lightness, 0);
  assertStrictEquals(c1a.hue, 0);
  assertStrictEquals(c1a.saturation, 0);

  const c1b = c1.withLightness(-1);
  assertStrictEquals(c1b.lightness, 0);
  assertStrictEquals(c1b.hue, 0);
  assertStrictEquals(c1b.saturation, 0);

  const c2 = RgbColor.fromHexString("#11213188");
  const c2a = c2.withLightness(1);
  assertStrictEquals(c2a.lightness, 1);
  assertStrictEquals(c2a.hue, 0);
  assertStrictEquals(c2a.saturation, 0);

  const c2b = c2.withLightness(2);
  assertStrictEquals(c2b.lightness, 1);
  assertStrictEquals(c2b.hue, 0);
  assertStrictEquals(c2b.saturation, 0);

  const c3 = RgbColor.fromHexString("#fffefd88");
  const c3a = c3.withLightness(0.5);
  assertStrictEquals(c3a.lightness, 0.5);
  assertStrictEquals(c3a.hue, c3.hue);
  assertStrictEquals(c3a.saturation, c3.saturation);
  assertStrictEquals(c3a.alpha, c3.alpha);
});

Deno.test("RgbColor.prototype.plusAlpha()", () => {
  const c1 = RgbColor.fromHexString("#fffefd88");
  const c1a = c1.plusAlpha(0);
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 136 / 255);

  const c2 = RgbColor.fromHexString("#01020388");
  const c2a = c2.plusAlpha(-2);
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 0);

  const c2x = RgbColor.fromHexString("#01020388");
  const c2xa = c2x.plusAlpha((0x44 / 255) * -1);
  assertStrictEquals(c2xa.red, 1 / 255);
  assertStrictEquals(c2xa.green, 2 / 255);
  assertStrictEquals(c2xa.blue, 3 / 255);
  assertStrictEquals(c2xa.alpha, (136 - 68) / 255);

  const c3 = RgbColor.fromHexString("#01020388");
  const c3a = c3.plusAlpha(2);
  assertStrictEquals(c3a.red, 1 / 255);
  assertStrictEquals(c3a.green, 2 / 255);
  assertStrictEquals(c3a.blue, 3 / 255);
  assertStrictEquals(c3a.alpha, 1);

  const c3x = RgbColor.fromHexString("#01020388");
  const c3xa = c3x.plusAlpha(0x44 / 255);
  assertStrictEquals(c3xa.red, 1 / 255);
  assertStrictEquals(c3xa.green, 2 / 255);
  assertStrictEquals(c3xa.blue, 3 / 255);
  assertStrictEquals(c3xa.alpha, (136 + 68) / 255);
});

Deno.test("RgbColor.prototype.withAlpha()", () => {
  const c1 = RgbColor.fromHexString("#fffefd");
  const c1a = c1.withAlpha(0);
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0);

  const c2 = RgbColor.fromHexString("#01020388");
  const c2a = c2.withAlpha(-1);
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 0);

  const c3 = RgbColor.fromHexString("#01020388");
  const c3a = c3.withAlpha(2);
  assertStrictEquals(c3a.red, 1 / 255);
  assertStrictEquals(c3a.green, 2 / 255);
  assertStrictEquals(c3a.blue, 3 / 255);
  assertStrictEquals(c3a.alpha, 1);
});

Deno.test("RgbColor.prototype.withoutAlpha()", () => {
  const c1 = RgbColor.fromHexString("#fffefd");
  const c1a = c1.withoutAlpha();
  assertStrictEquals(c1a.red, 1);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 1);

  const c2 = RgbColor.fromHexString("#01020388");
  const c2a = c2.withoutAlpha();
  assertStrictEquals(c2a.red, 1 / 255);
  assertStrictEquals(c2a.green, 2 / 255);
  assertStrictEquals(c2a.blue, 3 / 255);
  assertStrictEquals(c2a.alpha, 1);
});
