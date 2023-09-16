import { assertThrows } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string)", () => {
  assertThrows(
    () => {
      CssColorFormat.parse("");
    },
    TypeError,
    "colorString",
  );

  assertThrows(
    () => {
      CssColorFormat.parse(255 as unknown as string);
    },
    TypeError,
    "colorString",
  );
});
