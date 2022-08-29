import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { SRgb } from "../mod.ts";

Deno.test("SRgb.Color.prototype.alpha", () => {
  const color1 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:1});
  assertStrictEquals(color1.alpha, 1);

  const color2 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:2});
  assertStrictEquals(color2.alpha, 1);

  const color3 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:-1});
  assertStrictEquals(color3.alpha, 0);

  const color4 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:Number.parseFloat("0.99999299")});
  assertStrictEquals(color4.alpha, Number.parseFloat("0.99999299"));

});

Deno.test("SRgb.Color.fromRgba({})", () => {
  const color1 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:1});
  assertStrictEquals(color1.red, 255 / 255);
  assertStrictEquals(color1.green, 254 / 255);
  assertStrictEquals(color1.blue, 253 / 255);
  assertStrictEquals(color1.alpha, 1);

  const color2 = SRgb.Color.fromRgba({r:256,g:256,b:256,a:1});
  assertStrictEquals(color2.red, 255 / 255);
  assertStrictEquals(color2.green, 255 / 255);
  assertStrictEquals(color2.blue, 255 / 255);
  assertStrictEquals(color2.alpha, 1);

  const color3 = SRgb.Color.fromRgba({r:-1,g:-1,b:-1,a:0.5});
  assertStrictEquals(color3.red, 0 / 255);
  assertStrictEquals(color3.green, 0 / 255);
  assertStrictEquals(color3.blue, 0 / 255);
  assertStrictEquals(color3.alpha, 0.5);

  const color4 = SRgb.Color.fromRgba({r:25.5,g:25.2,b:25.1,a:1});
  assertStrictEquals(color4.red, 25.5 / 255);
  assertStrictEquals(color4.green, 25.2 / 255);
  assertStrictEquals(color4.blue, 25.1 / 255);
  assertStrictEquals(color4.alpha, 1);

});

Deno.test("SRgb.Color.prototype.toRgba()", () => {
  const color1 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:1}).toRgba();
  assertStrictEquals(color1.r, 255);
  assertStrictEquals(color1.g, 254);
  assertStrictEquals(color1.b, 253);
  assertStrictEquals(color1.a, 1);

  const color2 = SRgb.Color.fromRgba({r:256,g:256,b:256,a:1}).toRgba();
  assertStrictEquals(color2.r, 255);
  assertStrictEquals(color2.g, 255);
  assertStrictEquals(color2.b, 255);
  assertStrictEquals(color2.a, 1);

  const color3 = SRgb.Color.fromRgba({r:-1,g:-1,b:-1,a:0.5}).toRgba();
  assertStrictEquals(color3.r, 0);
  assertStrictEquals(color3.g, 0);
  assertStrictEquals(color3.b, 0);
  assertStrictEquals(color3.a, 0.5);

  const color4 = SRgb.Color.fromRgba({r:25.5,g:25.2,b:25.1,a:1}).toRgba();
  assertStrictEquals(color4.r, Uint8ClampedArray.of(25.5)[0]);
  assertStrictEquals(color4.g, Uint8ClampedArray.of(25.2)[0]);
  assertStrictEquals(color4.b, Uint8ClampedArray.of(25.1)[0]);
  assertStrictEquals(color4.a, 1);

});

Deno.test("SRgb.Color.prototype.setRgb({})", () => {
  const color1 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:0.5});
  color1.setRgb({r:1, g:2, b:3});
  assertStrictEquals(color1.red, 1 / 255);
  assertStrictEquals(color1.green, 2 / 255);
  assertStrictEquals(color1.blue, 3 / 255);
  assertStrictEquals(color1.alpha, 0.5);
  
  color1.setRgb({r:-1, g:-2, b:-3, a:1});
  assertStrictEquals(color1.red, 0);
  assertStrictEquals(color1.green, 0);
  assertStrictEquals(color1.blue, 0);
  assertStrictEquals(color1.alpha, 0.5);
  
  color1.setRgb({r:256, g:257, b:258, a:1});
  assertStrictEquals(color1.red, 1);
  assertStrictEquals(color1.green, 1);
  assertStrictEquals(color1.blue, 1);
  assertStrictEquals(color1.alpha, 0.5);
});

Deno.test("SRgb.Color.prototype.addRgb({})", () => {
  const color1 = SRgb.Color.fromRgba({r:255,g:254,b:253,a:0.5});
  color1.addRgb({r:-1, g:-2, b:-3});
  assertStrictEquals(color1.red, 1 - (1 / 255));
  assertStrictEquals(color1.green, (254 / 255) - (2 / 255));
  assertStrictEquals(color1.blue, (253 / 255) - (3 / 255));
  assertStrictEquals(color1.alpha, 0.5);
  
  color1.addRgb({r:0, g:0, b:0, a:1});
  assertStrictEquals(color1.red, 1 - (1 / 255));
  assertStrictEquals(color1.green, (254 / 255) - (2 / 255));
  assertStrictEquals(color1.blue, (253 / 255) - (3 / 255));
  assertStrictEquals(color1.alpha, 0.5);

  color1.addRgb({r:256, g:257, b:258, a:1});
  assertStrictEquals(color1.red, 1);
  assertStrictEquals(color1.green, 1);
  assertStrictEquals(color1.blue, 1);
  assertStrictEquals(color1.alpha, 0.5);

  color1.addRgb({r:-256, g:-257, b:-258, a:1});
  assertStrictEquals(color1.red, 0);
  assertStrictEquals(color1.green, 0);
  assertStrictEquals(color1.blue, 0);
  assertStrictEquals(color1.alpha, 0.5);
});
