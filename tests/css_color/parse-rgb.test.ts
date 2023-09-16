import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string) - rgb", () => {
  const c1 = CssColorFormat.parse("rgb(255 254 253)");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = CssColorFormat.parse("rgb(255 254 253 / 0)");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  // const c1a2 = CssColorFormat.parse("#fffefd00");
  // assertStrictEquals(c1a2.red, 255 / 255);
  // assertStrictEquals(c1a2.green, 254 / 255);
  // assertStrictEquals(c1a2.blue, 253 / 255);
  // assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1b = CssColorFormat.parse("RGB(255 254 253 / 0)");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  // const c2 = CssColorFormat.parse("#fed");
  // assertStrictEquals(c2.red, 255 / 255);
  // assertStrictEquals(c2.green, 238 / 255);
  // assertStrictEquals(c2.blue, 221 / 255);
  // assertStrictEquals(c2.alpha, 255 / 255);

  // const c2a = CssColorFormat.parse("#fed8");
  // assertStrictEquals(c2a.red, 255 / 255);
  // assertStrictEquals(c2a.green, 238 / 255);
  // assertStrictEquals(c2a.blue, 221 / 255);
  // assertStrictEquals(c2a.alpha, 136 / 255);

  // const c2b = CssColorFormat.parse("#FED8");
  // assertStrictEquals(c2b.red, 255 / 255);
  // assertStrictEquals(c2b.green, 238 / 255);
  // assertStrictEquals(c2b.blue, 221 / 255);
  // assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      CssColorFormat.parse("rgb()");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1 2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1 2 3 4)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1 / 2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1 2 / 3)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1 2 3 4 / 5)");
    },
    RangeError,
    "source",
  );

  const x1 = CssColorFormat.parse("rgb(  255  254  253  /  0  )");
  assertStrictEquals(x1.red, 255 / 255);
  assertStrictEquals(x1.green, 254 / 255);
  assertStrictEquals(x1.blue, 253 / 255);
  assertStrictEquals(x1.alpha, 0 / 255);

  const x1b = CssColorFormat.parse("rgba(  0255  0254  0253  /  00  )");
  assertStrictEquals(x1b.red, 255 / 255);
  assertStrictEquals(x1b.green, 254 / 255);
  assertStrictEquals(x1b.blue, 253 / 255);
  assertStrictEquals(x1b.alpha, 0 / 255);

  const x2 = CssColorFormat.parse("rgb(  255  254  253/0  )");
  assertStrictEquals(x2.red, 255 / 255);
  assertStrictEquals(x2.green, 254 / 255);
  assertStrictEquals(x2.blue, 253 / 255);
  assertStrictEquals(x2.alpha, 0 / 255);

  const x2b = CssColorFormat.parse("rgBa(  255.0  254.0  253.0/0.0  )");
  assertStrictEquals(x2b.red, 255 / 255);
  assertStrictEquals(x2b.green, 254 / 255);
  assertStrictEquals(x2b.blue, 253 / 255);
  assertStrictEquals(x2b.alpha, 0 / 255);

  const x3 = CssColorFormat.parse("rgb(  255  254  253  )");
  assertStrictEquals(x3.red, 255 / 255);
  assertStrictEquals(x3.green, 254 / 255);
  assertStrictEquals(x3.blue, 253 / 255);
  assertStrictEquals(x3.alpha, 255 / 255);

  const x3b = CssColorFormat.parse("rgbA(  +255  +254  +253  )");
  assertStrictEquals(x3b.red, 255 / 255);
  assertStrictEquals(x3b.green, 254 / 255);
  assertStrictEquals(x3b.blue, 253 / 255);
  assertStrictEquals(x3b.alpha, 255 / 255);

  const x4 = CssColorFormat.parse("rgb(  2000  -23  253.5  /  0  )");
  assertStrictEquals(x4.red, 255 / 255);
  assertStrictEquals(x4.green, 0 / 255);
  assertStrictEquals(x4.blue, 253.5 / 255);
  assertStrictEquals(x4.alpha, 0 / 255);

});

Deno.test("CssColorFormat.parse(string) - rgb,legacy", () => {
  const c1 = CssColorFormat.parse("rgb(255, 254, 253)");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 254 / 255);
  assertStrictEquals(c1.blue, 253 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c1a = CssColorFormat.parse("rgba(255, 254, 253, 0)");
  assertStrictEquals(c1a.red, 255 / 255);
  assertStrictEquals(c1a.green, 254 / 255);
  assertStrictEquals(c1a.blue, 253 / 255);
  assertStrictEquals(c1a.alpha, 0 / 255);

  // const c1a2 = CssColorFormat.parse("#fffefd00");
  // assertStrictEquals(c1a2.red, 255 / 255);
  // assertStrictEquals(c1a2.green, 254 / 255);
  // assertStrictEquals(c1a2.blue, 253 / 255);
  // assertStrictEquals(c1a2.alpha, 255 / 255);

  const c1b = CssColorFormat.parse("RGBA(255, 254, 253, 0)");
  assertStrictEquals(c1b.red, 255 / 255);
  assertStrictEquals(c1b.green, 254 / 255);
  assertStrictEquals(c1b.blue, 253 / 255);
  assertStrictEquals(c1b.alpha, 0 / 255);

  // const c2 = CssColorFormat.parse("#fed");
  // assertStrictEquals(c2.red, 255 / 255);
  // assertStrictEquals(c2.green, 238 / 255);
  // assertStrictEquals(c2.blue, 221 / 255);
  // assertStrictEquals(c2.alpha, 255 / 255);

  // const c2a = CssColorFormat.parse("#fed8");
  // assertStrictEquals(c2a.red, 255 / 255);
  // assertStrictEquals(c2a.green, 238 / 255);
  // assertStrictEquals(c2a.blue, 221 / 255);
  // assertStrictEquals(c2a.alpha, 136 / 255);

  // const c2b = CssColorFormat.parse("#FED8");
  // assertStrictEquals(c2b.red, 255 / 255);
  // assertStrictEquals(c2b.green, 238 / 255);
  // assertStrictEquals(c2b.blue, 221 / 255);
  // assertStrictEquals(c2b.alpha, 136 / 255);

  assertThrows(
    () => {
      CssColorFormat.parse("rgba()");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgba(1)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("rgb(1, 2)");
    },
    RangeError,
    "source",
  );

  // assertThrows(
  //   () => {
  //     CssColorFormat.parse("rgb(1, 2, 3, 4)");
  //   },
  //   RangeError,
  //   "source",
  // );

  assertThrows(
    () => {
      CssColorFormat.parse("rgba(1, 2)");
    },
    RangeError,
    "source",
  );

  // assertThrows(
  //   () => {
  //     CssColorFormat.parse("rgba(1, 2, 3)");
  //   },
  //   RangeError,
  //   "source",
  // );

  assertThrows(
    () => {
      CssColorFormat.parse("rgba(1, 2, 3, 4, 5)");
    },
    RangeError,
    "source",
  );

  const x1 = CssColorFormat.parse("rgb(  255  ,  254  ,  253  ,  0  )");
  assertStrictEquals(x1.red, 255 / 255);
  assertStrictEquals(x1.green, 254 / 255);
  assertStrictEquals(x1.blue, 253 / 255);
  assertStrictEquals(x1.alpha, 0 / 255);

  const x1b = CssColorFormat.parse("rgba(  0255  ,  0254  ,  0253  ,  00  )");
  assertStrictEquals(x1b.red, 255 / 255);
  assertStrictEquals(x1b.green, 254 / 255);
  assertStrictEquals(x1b.blue, 253 / 255);
  assertStrictEquals(x1b.alpha, 0 / 255);

  const x2 = CssColorFormat.parse("rgb(  255,254,253,0  )");
  assertStrictEquals(x2.red, 255 / 255);
  assertStrictEquals(x2.green, 254 / 255);
  assertStrictEquals(x2.blue, 253 / 255);
  assertStrictEquals(x2.alpha, 0 / 255);

  const x2b = CssColorFormat.parse("rgBa(  255.0 , 254.0 , 253.0,0.0  )");
  assertStrictEquals(x2b.red, 255 / 255);
  assertStrictEquals(x2b.green, 254 / 255);
  assertStrictEquals(x2b.blue, 253 / 255);
  assertStrictEquals(x2b.alpha, 0 / 255);

  const x3 = CssColorFormat.parse("rgb(  255 , 254 , 253  )");
  assertStrictEquals(x3.red, 255 / 255);
  assertStrictEquals(x3.green, 254 / 255);
  assertStrictEquals(x3.blue, 253 / 255);
  assertStrictEquals(x3.alpha, 255 / 255);

  const x3b = CssColorFormat.parse("rgbA(  +255 , +254 , +253  )");
  assertStrictEquals(x3b.red, 255 / 255);
  assertStrictEquals(x3b.green, 254 / 255);
  assertStrictEquals(x3b.blue, 253 / 255);
  assertStrictEquals(x3b.alpha, 255 / 255);

  const x4 = CssColorFormat.parse("rgb(  2000 , -23 , 253.5  ,  0  )");
  assertStrictEquals(x4.red, 255 / 255);
  assertStrictEquals(x4.green, 0 / 255);
  assertStrictEquals(x4.blue, 253.5 / 255);
  assertStrictEquals(x4.alpha, 0 / 255);

});

//TODO コンマスペース混在（chromeだとokになるケースがあるが）
