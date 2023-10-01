import { assertStrictEquals } from "../deps.ts";
import { RgbColor } from "../../mod.ts";

Deno.test("RgbColor.prototype.equalsBytes(*)", () => {
  const c1 = RgbColor.fromHexString("#010203");
  const c2 = RgbColor.fromHexString("#010203");
  const c3 = RgbColor.fromHexString("#010203ff");
  const d1 = RgbColor.fromHexString("#000203");
  const d2 = RgbColor.fromHexString("#010003");
  const d3 = RgbColor.fromHexString("#010200");
  const d4 = RgbColor.fromHexString("#010203fe");
  assertStrictEquals(c1.equalsBytes(c2), true);
  assertStrictEquals(c1.equalsBytes(c3), true);
  assertStrictEquals(c1.equalsBytes(d1), false);
  assertStrictEquals(c1.equalsBytes(d2), false);
  assertStrictEquals(c1.equalsBytes(d3), false);
  assertStrictEquals(c1.equalsBytes(d4), false);
});

Deno.test("RgbColor.prototype.equalsBytes(*, {}) - ignoreAlpha", () => {
  const op = { ignoreAlpha: true } as const;
  const c1 = RgbColor.fromHexString("#010203", op);
  const c2 = RgbColor.fromHexString("#010203", op);
  const c3 = RgbColor.fromHexString("#010203ff", op);
  const d1 = RgbColor.fromHexString("#000203", op);
  const d2 = RgbColor.fromHexString("#010003", op);
  const d3 = RgbColor.fromHexString("#010200", op);
  const d4 = RgbColor.fromHexString("#010203fe", op);
  assertStrictEquals(c1.equalsBytes(c2), true);
  assertStrictEquals(c1.equalsBytes(c3), true);
  assertStrictEquals(c1.equalsBytes(d1), false);
  assertStrictEquals(c1.equalsBytes(d2), false);
  assertStrictEquals(c1.equalsBytes(d3), false);
  assertStrictEquals(c1.equalsBytes(d4), true);
});
