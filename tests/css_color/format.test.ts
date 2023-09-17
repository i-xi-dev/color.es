import { assertThrows } from "../deps.ts";
import { CssColorFormat, RgbColor } from "../../mod.ts";

Deno.test("CssColorFormat.format(object)", () => {
  assertThrows(
    () => {
      CssColorFormat.format({} as unknown as RgbColor);
    },
    TypeError,
    "color",
  );
});
