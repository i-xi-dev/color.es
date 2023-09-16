import { assertThrows } from "../deps.ts";
import { Color, CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.format(object)", () => {
  assertThrows(
    () => {
      CssColorFormat.format({} as unknown as Color);
    },
    TypeError,
    "color",
  );
});
