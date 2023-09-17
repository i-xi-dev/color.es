import { assertStrictEquals, assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string) - hsl", () => {
  const c1 = CssColorFormat.parse("hsl(0 100% 50%)");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 0 / 255);
  assertStrictEquals(c1.blue, 0 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c2 = CssColorFormat.parse("hsl(60 100% 50% / 0)");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 0 / 255);
  assertStrictEquals(c2.alpha, 0 / 255);

  const c3 = CssColorFormat.parse("HSL(120 100% 50% / 0)");
  assertStrictEquals(c3.red, 0 / 255);
  assertStrictEquals(c3.green, 255 / 255);
  assertStrictEquals(c3.blue, 0 / 255);
  assertStrictEquals(c3.alpha, 0 / 255);

  assertThrows(
    () => {
      CssColorFormat.parse("hsl()");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2%)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2 3)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2 3 4)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2% 3% 4)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 / 2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2% / 3)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1 2% 3% 4% / 5)");
    },
    RangeError,
    "source",
  );

  const x1 = CssColorFormat.parse("hsl(  60deg  100%  50%  /  0  )");
  assertStrictEquals(x1.red, 255 / 255);
  assertStrictEquals(x1.green, 255 / 255);
  assertStrictEquals(x1.blue, 0 / 255);
  assertStrictEquals(x1.alpha, 0 / 255);

  const x2 = CssColorFormat.parse(
    "hsla(  180.00deg  100.00%  50.00%  /  0.00  )",
  );
  assertStrictEquals(x2.red, 0 / 255);
  assertStrictEquals(x2.green, 255 / 255);
  assertStrictEquals(x2.blue, 255 / 255);
  assertStrictEquals(x2.alpha, 0 / 255);

  const x2b = CssColorFormat.parse(
    "hsla(  -180.00deg  100.00%  50.00%  /  0.00  )",
  );
  assertStrictEquals(x2b.red, 0 / 255);
  assertStrictEquals(x2b.green, 255 / 255);
  assertStrictEquals(x2b.blue, 255 / 255);
  assertStrictEquals(x2b.alpha, 0 / 255);

  const x3 = CssColorFormat.parse(
    "hsla(  540.00  100.00%  50.00%  /  -40.00  )",
  );
  assertStrictEquals(x3.red, 0 / 255);
  assertStrictEquals(x3.green, 255 / 255);
  assertStrictEquals(x3.blue, 255 / 255);
  assertStrictEquals(x3.alpha, 0 / 255);

  const x4 = CssColorFormat.parse(
    "HSLA(  0.50TURN  1400.00%  50.00%  /  0.00  )",
  );
  assertStrictEquals(x4.red, 0 / 255);
  assertStrictEquals(x4.green, 255 / 255);
  assertStrictEquals(x4.blue, 255 / 255);
  assertStrictEquals(x4.alpha, 0 / 255);

  const x5 = CssColorFormat.parse(
    "HSL(  +200.0000GRAD  +100.00%  +50.00%/+0.00  )",
  );
  assertStrictEquals(x5.red, 0 / 255);
  assertStrictEquals(x5.green, 255 / 255);
  assertStrictEquals(x5.blue, 255 / 255);
  assertStrictEquals(x5.alpha, 0 / 255);

  const x6 = CssColorFormat.parse(
    "HSL(  " + Math.PI + "RAD  100.00%  50.00%    )",
  );
  assertStrictEquals(x6.red, 0 / 255);
  assertStrictEquals(x6.green, 255 / 255);
  assertStrictEquals(x6.blue, 255 / 255);
  assertStrictEquals(x6.alpha, 255 / 255);

  const x7 = CssColorFormat.parse("HSL(  -540  100.00%  500.00%  /  +2  )");
  assertStrictEquals(x7.red, 255 / 255);
  assertStrictEquals(x7.green, 255 / 255);
  assertStrictEquals(x7.blue, 255 / 255);
  assertStrictEquals(x7.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - hsl,legacy", () => {
  const c1 = CssColorFormat.parse("hsl(0, 100%, 50%)");
  assertStrictEquals(c1.red, 255 / 255);
  assertStrictEquals(c1.green, 0 / 255);
  assertStrictEquals(c1.blue, 0 / 255);
  assertStrictEquals(c1.alpha, 255 / 255);

  const c2 = CssColorFormat.parse("hsl(60, 100%, 50%, 0)");
  assertStrictEquals(c2.red, 255 / 255);
  assertStrictEquals(c2.green, 255 / 255);
  assertStrictEquals(c2.blue, 0 / 255);
  assertStrictEquals(c2.alpha, 0 / 255);

  const c3 = CssColorFormat.parse("HSL(120, 100%, 50%, 0)");
  assertStrictEquals(c3.red, 0 / 255);
  assertStrictEquals(c3.green, 255 / 255);
  assertStrictEquals(c3.blue, 0 / 255);
  assertStrictEquals(c3.alpha, 0 / 255);

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2%)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2, 3)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2, 3,4)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1,2)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2%, 3)");
    },
    RangeError,
    "source",
  );

  assertThrows(
    () => {
      CssColorFormat.parse("hsl(1, 2%, 3%, 4%, 5)");
    },
    RangeError,
    "source",
  );

  const x1 = CssColorFormat.parse("hsl(  60deg , 100% , 50%  ,  0  )");
  assertStrictEquals(x1.red, 255 / 255);
  assertStrictEquals(x1.green, 255 / 255);
  assertStrictEquals(x1.blue, 0 / 255);
  assertStrictEquals(x1.alpha, 0 / 255);

  const x2 = CssColorFormat.parse(
    "hsla(  180.00deg , 100.00% , 50.00%  ,  0.00  )",
  );
  assertStrictEquals(x2.red, 0 / 255);
  assertStrictEquals(x2.green, 255 / 255);
  assertStrictEquals(x2.blue, 255 / 255);
  assertStrictEquals(x2.alpha, 0 / 255);

  const x2b = CssColorFormat.parse("hsla(-180.00deg,100.00%,50.00%,0.00)");
  assertStrictEquals(x2b.red, 0 / 255);
  assertStrictEquals(x2b.green, 255 / 255);
  assertStrictEquals(x2b.blue, 255 / 255);
  assertStrictEquals(x2b.alpha, 0 / 255);

  const x3 = CssColorFormat.parse(
    "hsla(  540.00 , 100.00% , 50.00%  ,  -40.00  )",
  );
  assertStrictEquals(x3.red, 0 / 255);
  assertStrictEquals(x3.green, 255 / 255);
  assertStrictEquals(x3.blue, 255 / 255);
  assertStrictEquals(x3.alpha, 0 / 255);

  const x4 = CssColorFormat.parse(
    "HSLA(  0.50TURN , 1400.00% , 50.00%  ,  0.00  )",
  );
  assertStrictEquals(x4.red, 0 / 255);
  assertStrictEquals(x4.green, 255 / 255);
  assertStrictEquals(x4.blue, 255 / 255);
  assertStrictEquals(x4.alpha, 0 / 255);

  const x5 = CssColorFormat.parse(
    "HSL(  +200.0000GRAD , +100.00% , +50.00%,+0.00  )",
  );
  assertStrictEquals(x5.red, 0 / 255);
  assertStrictEquals(x5.green, 255 / 255);
  assertStrictEquals(x5.blue, 255 / 255);
  assertStrictEquals(x5.alpha, 0 / 255);

  const x6 = CssColorFormat.parse(
    "HSL(  " + Math.PI + "RAD , 100.00% , 50.00%    )",
  );
  assertStrictEquals(x6.red, 0 / 255);
  assertStrictEquals(x6.green, 255 / 255);
  assertStrictEquals(x6.blue, 255 / 255);
  assertStrictEquals(x6.alpha, 255 / 255);

  const x7 = CssColorFormat.parse("HSL(  -540 , 100.00% , 500.00%  ,  +2  )");
  assertStrictEquals(x7.red, 255 / 255);
  assertStrictEquals(x7.green, 255 / 255);
  assertStrictEquals(x7.blue, 255 / 255);
  assertStrictEquals(x7.alpha, 255 / 255);
});
