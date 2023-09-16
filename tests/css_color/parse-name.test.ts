import { assertStrictEquals } from "../deps.ts";
import { CssColorFormat } from "../../mod.ts";

Deno.test("CssColorFormat.parse(string) - name-10", () => {
  const c1 = CssColorFormat.parse("aliceblue");
  assertStrictEquals(c1.red, 0xf0 / 255);
  assertStrictEquals(c1.green, 0xf8 / 255);
  assertStrictEquals(c1.blue, 0xff / 255);
  assertStrictEquals(c1.alpha, 255 / 255);
  const c2 = CssColorFormat.parse("antiquewhite");
  assertStrictEquals(c2.red, 0xfa / 255);
  assertStrictEquals(c2.green, 0xeb / 255);
  assertStrictEquals(c2.blue, 0xd7 / 255);
  assertStrictEquals(c2.alpha, 255 / 255);
  const c3 = CssColorFormat.parse("aqua");
  assertStrictEquals(c3.red, 0x00 / 255);
  assertStrictEquals(c3.green, 0xff / 255);
  assertStrictEquals(c3.blue, 0xff / 255);
  assertStrictEquals(c3.alpha, 255 / 255);
  const c4 = CssColorFormat.parse("aquamarine");
  assertStrictEquals(c4.red, 0x7f / 255);
  assertStrictEquals(c4.green, 0xff / 255);
  assertStrictEquals(c4.blue, 0xd4 / 255);
  assertStrictEquals(c4.alpha, 255 / 255);
  const c5 = CssColorFormat.parse("azure");
  assertStrictEquals(c5.red, 0xf0 / 255);
  assertStrictEquals(c5.green, 0xff / 255);
  assertStrictEquals(c5.blue, 0xff / 255);
  assertStrictEquals(c5.alpha, 255 / 255);
  const c6 = CssColorFormat.parse("beige");
  assertStrictEquals(c6.red, 0xf5 / 255);
  assertStrictEquals(c6.green, 0xf5 / 255);
  assertStrictEquals(c6.blue, 0xdc / 255);
  assertStrictEquals(c6.alpha, 255 / 255);
  const c7 = CssColorFormat.parse("bisque");
  assertStrictEquals(c7.red, 0xff / 255);
  assertStrictEquals(c7.green, 0xe4 / 255);
  assertStrictEquals(c7.blue, 0xc4 / 255);
  assertStrictEquals(c7.alpha, 255 / 255);
  const c8 = CssColorFormat.parse("black");
  assertStrictEquals(c8.red, 0x00 / 255);
  assertStrictEquals(c8.green, 0x00 / 255);
  assertStrictEquals(c8.blue, 0x00 / 255);
  assertStrictEquals(c8.alpha, 255 / 255);
  const c9 = CssColorFormat.parse("blanchedalmond");
  assertStrictEquals(c9.red, 0xff / 255);
  assertStrictEquals(c9.green, 0xeb / 255);
  assertStrictEquals(c9.blue, 0xcd / 255);
  assertStrictEquals(c9.alpha, 255 / 255);
  const c10 = CssColorFormat.parse("blue");
  assertStrictEquals(c10.red, 0x00 / 255);
  assertStrictEquals(c10.green, 0x00 / 255);
  assertStrictEquals(c10.blue, 0xff / 255);
  assertStrictEquals(c10.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-20", () => {
  const c11 = CssColorFormat.parse("blueviolet");
  assertStrictEquals(c11.red, 0x8a / 255);
  assertStrictEquals(c11.green, 0x2b / 255);
  assertStrictEquals(c11.blue, 0xe2 / 255);
  assertStrictEquals(c11.alpha, 255 / 255);
  const c12 = CssColorFormat.parse("brown");
  assertStrictEquals(c12.red, 0xa5 / 255);
  assertStrictEquals(c12.green, 0x2a / 255);
  assertStrictEquals(c12.blue, 0x2a / 255);
  assertStrictEquals(c12.alpha, 255 / 255);
  const c13 = CssColorFormat.parse("burlywood");
  assertStrictEquals(c13.red, 0xde / 255);
  assertStrictEquals(c13.green, 0xb8 / 255);
  assertStrictEquals(c13.blue, 0x87 / 255);
  assertStrictEquals(c13.alpha, 255 / 255);
  const c14 = CssColorFormat.parse("cadetblue");
  assertStrictEquals(c14.red, 0x5f / 255);
  assertStrictEquals(c14.green, 0x9e / 255);
  assertStrictEquals(c14.blue, 0xa0 / 255);
  assertStrictEquals(c14.alpha, 255 / 255);
  const c15 = CssColorFormat.parse("chartreuse");
  assertStrictEquals(c15.red, 0x7f / 255);
  assertStrictEquals(c15.green, 0xff / 255);
  assertStrictEquals(c15.blue, 0x00 / 255);
  assertStrictEquals(c15.alpha, 255 / 255);
  const c16 = CssColorFormat.parse("chocolate");
  assertStrictEquals(c16.red, 0xd2 / 255);
  assertStrictEquals(c16.green, 0x69 / 255);
  assertStrictEquals(c16.blue, 0x1e / 255);
  assertStrictEquals(c16.alpha, 255 / 255);
  const c17 = CssColorFormat.parse("coral");
  assertStrictEquals(c17.red, 0xff / 255);
  assertStrictEquals(c17.green, 0x7f / 255);
  assertStrictEquals(c17.blue, 0x50 / 255);
  assertStrictEquals(c17.alpha, 255 / 255);
  const c18 = CssColorFormat.parse("cornflowerblue");
  assertStrictEquals(c18.red, 0x64 / 255);
  assertStrictEquals(c18.green, 0x95 / 255);
  assertStrictEquals(c18.blue, 0xed / 255);
  assertStrictEquals(c18.alpha, 255 / 255);
  const c19 = CssColorFormat.parse("cornsilk");
  assertStrictEquals(c19.red, 0xff / 255);
  assertStrictEquals(c19.green, 0xf8 / 255);
  assertStrictEquals(c19.blue, 0xdc / 255);
  assertStrictEquals(c19.alpha, 255 / 255);
  const c20 = CssColorFormat.parse("crimson");
  assertStrictEquals(c20.red, 0xdc / 255);
  assertStrictEquals(c20.green, 0x14 / 255);
  assertStrictEquals(c20.blue, 0x3c / 255);
  assertStrictEquals(c20.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-30", () => {
  const c21 = CssColorFormat.parse("cyan");
  assertStrictEquals(c21.red, 0x00 / 255);
  assertStrictEquals(c21.green, 0xff / 255);
  assertStrictEquals(c21.blue, 0xff / 255);
  assertStrictEquals(c21.alpha, 255 / 255);
  const c22 = CssColorFormat.parse("darkblue");
  assertStrictEquals(c22.red, 0x00 / 255);
  assertStrictEquals(c22.green, 0x00 / 255);
  assertStrictEquals(c22.blue, 0x8b / 255);
  assertStrictEquals(c22.alpha, 255 / 255);
  const c23 = CssColorFormat.parse("darkcyan");
  assertStrictEquals(c23.red, 0x00 / 255);
  assertStrictEquals(c23.green, 0x8b / 255);
  assertStrictEquals(c23.blue, 0x8b / 255);
  assertStrictEquals(c23.alpha, 255 / 255);
  const c24 = CssColorFormat.parse("darkgoldenrod");
  assertStrictEquals(c24.red, 0xb8 / 255);
  assertStrictEquals(c24.green, 0x86 / 255);
  assertStrictEquals(c24.blue, 0x0b / 255);
  assertStrictEquals(c24.alpha, 255 / 255);
  const c25 = CssColorFormat.parse("darkgray");
  assertStrictEquals(c25.red, 0xa9 / 255);
  assertStrictEquals(c25.green, 0xa9 / 255);
  assertStrictEquals(c25.blue, 0xa9 / 255);
  assertStrictEquals(c25.alpha, 255 / 255);
  const c26 = CssColorFormat.parse("darkgreen");
  assertStrictEquals(c26.red, 0x00 / 255);
  assertStrictEquals(c26.green, 0x64 / 255);
  assertStrictEquals(c26.blue, 0x00 / 255);
  assertStrictEquals(c26.alpha, 255 / 255);
  const c27 = CssColorFormat.parse("darkgrey");
  assertStrictEquals(c27.red, 0xa9 / 255);
  assertStrictEquals(c27.green, 0xa9 / 255);
  assertStrictEquals(c27.blue, 0xa9 / 255);
  assertStrictEquals(c27.alpha, 255 / 255);
  const c28 = CssColorFormat.parse("darkkhaki");
  assertStrictEquals(c28.red, 0xbd / 255);
  assertStrictEquals(c28.green, 0xb7 / 255);
  assertStrictEquals(c28.blue, 0x6b / 255);
  assertStrictEquals(c28.alpha, 255 / 255);
  const c29 = CssColorFormat.parse("darkmagenta");
  assertStrictEquals(c29.red, 0x8b / 255);
  assertStrictEquals(c29.green, 0x00 / 255);
  assertStrictEquals(c29.blue, 0x8b / 255);
  assertStrictEquals(c29.alpha, 255 / 255);
  const c30 = CssColorFormat.parse("darkolivegreen");
  assertStrictEquals(c30.red, 0x55 / 255);
  assertStrictEquals(c30.green, 0x6b / 255);
  assertStrictEquals(c30.blue, 0x2f / 255);
  assertStrictEquals(c30.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-40", () => {
  const c31 = CssColorFormat.parse("darkorange");
  assertStrictEquals(c31.red, 0xff / 255);
  assertStrictEquals(c31.green, 0x8c / 255);
  assertStrictEquals(c31.blue, 0x00 / 255);
  assertStrictEquals(c31.alpha, 255 / 255);
  const c32 = CssColorFormat.parse("darkorchid");
  assertStrictEquals(c32.red, 0x99 / 255);
  assertStrictEquals(c32.green, 0x32 / 255);
  assertStrictEquals(c32.blue, 0xcc / 255);
  assertStrictEquals(c32.alpha, 255 / 255);
  const c33 = CssColorFormat.parse("darkred");
  assertStrictEquals(c33.red, 0x8b / 255);
  assertStrictEquals(c33.green, 0x00 / 255);
  assertStrictEquals(c33.blue, 0x00 / 255);
  assertStrictEquals(c33.alpha, 255 / 255);
  const c34 = CssColorFormat.parse("darksalmon");
  assertStrictEquals(c34.red, 0xe9 / 255);
  assertStrictEquals(c34.green, 0x96 / 255);
  assertStrictEquals(c34.blue, 0x7a / 255);
  assertStrictEquals(c34.alpha, 255 / 255);
  const c35 = CssColorFormat.parse("darkseagreen");
  assertStrictEquals(c35.red, 0x8f / 255);
  assertStrictEquals(c35.green, 0xbc / 255);
  assertStrictEquals(c35.blue, 0x8f / 255);
  assertStrictEquals(c35.alpha, 255 / 255);
  const c36 = CssColorFormat.parse("darkslateblue");
  assertStrictEquals(c36.red, 0x48 / 255);
  assertStrictEquals(c36.green, 0x3d / 255);
  assertStrictEquals(c36.blue, 0x8b / 255);
  assertStrictEquals(c36.alpha, 255 / 255);
  const c37 = CssColorFormat.parse("darkslategray");
  assertStrictEquals(c37.red, 0x2f / 255);
  assertStrictEquals(c37.green, 0x4f / 255);
  assertStrictEquals(c37.blue, 0x4f / 255);
  assertStrictEquals(c37.alpha, 255 / 255);
  const c38 = CssColorFormat.parse("darkslategrey");
  assertStrictEquals(c38.red, 0x2f / 255);
  assertStrictEquals(c38.green, 0x4f / 255);
  assertStrictEquals(c38.blue, 0x4f / 255);
  assertStrictEquals(c38.alpha, 255 / 255);
  const c39 = CssColorFormat.parse("darkturquoise");
  assertStrictEquals(c39.red, 0x00 / 255);
  assertStrictEquals(c39.green, 0xce / 255);
  assertStrictEquals(c39.blue, 0xd1 / 255);
  assertStrictEquals(c39.alpha, 255 / 255);
  const c40 = CssColorFormat.parse("darkviolet");
  assertStrictEquals(c40.red, 0x94 / 255);
  assertStrictEquals(c40.green, 0x00 / 255);
  assertStrictEquals(c40.blue, 0xd3 / 255);
  assertStrictEquals(c40.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-50", () => {
  const c41 = CssColorFormat.parse("deeppink");
  assertStrictEquals(c41.red, 0xff / 255);
  assertStrictEquals(c41.green, 0x14 / 255);
  assertStrictEquals(c41.blue, 0x93 / 255);
  assertStrictEquals(c41.alpha, 255 / 255);
  const c42 = CssColorFormat.parse("deepskyblue");
  assertStrictEquals(c42.red, 0x00 / 255);
  assertStrictEquals(c42.green, 0xbf / 255);
  assertStrictEquals(c42.blue, 0xff / 255);
  assertStrictEquals(c42.alpha, 255 / 255);
  const c43 = CssColorFormat.parse("dimgray");
  assertStrictEquals(c43.red, 0x69 / 255);
  assertStrictEquals(c43.green, 0x69 / 255);
  assertStrictEquals(c43.blue, 0x69 / 255);
  assertStrictEquals(c43.alpha, 255 / 255);
  const c44 = CssColorFormat.parse("dimgrey");
  assertStrictEquals(c44.red, 0x69 / 255);
  assertStrictEquals(c44.green, 0x69 / 255);
  assertStrictEquals(c44.blue, 0x69 / 255);
  assertStrictEquals(c44.alpha, 255 / 255);
  const c45 = CssColorFormat.parse("dodgerblue");
  assertStrictEquals(c45.red, 0x1e / 255);
  assertStrictEquals(c45.green, 0x90 / 255);
  assertStrictEquals(c45.blue, 0xff / 255);
  assertStrictEquals(c45.alpha, 255 / 255);
  const c46 = CssColorFormat.parse("firebrick");
  assertStrictEquals(c46.red, 0xb2 / 255);
  assertStrictEquals(c46.green, 0x22 / 255);
  assertStrictEquals(c46.blue, 0x22 / 255);
  assertStrictEquals(c46.alpha, 255 / 255);
  const c47 = CssColorFormat.parse("floralwhite");
  assertStrictEquals(c47.red, 0xff / 255);
  assertStrictEquals(c47.green, 0xfa / 255);
  assertStrictEquals(c47.blue, 0xf0 / 255);
  assertStrictEquals(c47.alpha, 255 / 255);
  const c48 = CssColorFormat.parse("forestgreen");
  assertStrictEquals(c48.red, 0x22 / 255);
  assertStrictEquals(c48.green, 0x8b / 255);
  assertStrictEquals(c48.blue, 0x22 / 255);
  assertStrictEquals(c48.alpha, 255 / 255);
  const c49 = CssColorFormat.parse("fuchsia");
  assertStrictEquals(c49.red, 0xff / 255);
  assertStrictEquals(c49.green, 0x00 / 255);
  assertStrictEquals(c49.blue, 0xff / 255);
  assertStrictEquals(c49.alpha, 255 / 255);
  const c50 = CssColorFormat.parse("gainsboro");
  assertStrictEquals(c50.red, 0xdc / 255);
  assertStrictEquals(c50.green, 0xdc / 255);
  assertStrictEquals(c50.blue, 0xdc / 255);
  assertStrictEquals(c50.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-60", () => {
  const c51 = CssColorFormat.parse("ghostwhite");
  assertStrictEquals(c51.red, 0xf8 / 255);
  assertStrictEquals(c51.green, 0xf8 / 255);
  assertStrictEquals(c51.blue, 0xff / 255);
  assertStrictEquals(c51.alpha, 255 / 255);
  const c52 = CssColorFormat.parse("gold");
  assertStrictEquals(c52.red, 0xff / 255);
  assertStrictEquals(c52.green, 0xd7 / 255);
  assertStrictEquals(c52.blue, 0x00 / 255);
  assertStrictEquals(c52.alpha, 255 / 255);
  const c53 = CssColorFormat.parse("goldenrod");
  assertStrictEquals(c53.red, 0xda / 255);
  assertStrictEquals(c53.green, 0xa5 / 255);
  assertStrictEquals(c53.blue, 0x20 / 255);
  assertStrictEquals(c53.alpha, 255 / 255);
  const c54 = CssColorFormat.parse("gray");
  assertStrictEquals(c54.red, 0x80 / 255);
  assertStrictEquals(c54.green, 0x80 / 255);
  assertStrictEquals(c54.blue, 0x80 / 255);
  assertStrictEquals(c54.alpha, 255 / 255);
  const c55 = CssColorFormat.parse("green");
  assertStrictEquals(c55.red, 0x00 / 255);
  assertStrictEquals(c55.green, 0x80 / 255);
  assertStrictEquals(c55.blue, 0x00 / 255);
  assertStrictEquals(c55.alpha, 255 / 255);
  const c56 = CssColorFormat.parse("greenyellow");
  assertStrictEquals(c56.red, 0xad / 255);
  assertStrictEquals(c56.green, 0xff / 255);
  assertStrictEquals(c56.blue, 0x2f / 255);
  assertStrictEquals(c56.alpha, 255 / 255);
  const c57 = CssColorFormat.parse("grey");
  assertStrictEquals(c57.red, 0x80 / 255);
  assertStrictEquals(c57.green, 0x80 / 255);
  assertStrictEquals(c57.blue, 0x80 / 255);
  assertStrictEquals(c57.alpha, 255 / 255);
  const c58 = CssColorFormat.parse("honeydew");
  assertStrictEquals(c58.red, 0xf0 / 255);
  assertStrictEquals(c58.green, 0xff / 255);
  assertStrictEquals(c58.blue, 0xf0 / 255);
  assertStrictEquals(c58.alpha, 255 / 255);
  const c59 = CssColorFormat.parse("hotpink");
  assertStrictEquals(c59.red, 0xff / 255);
  assertStrictEquals(c59.green, 0x69 / 255);
  assertStrictEquals(c59.blue, 0xb4 / 255);
  assertStrictEquals(c59.alpha, 255 / 255);
  const c60 = CssColorFormat.parse("indianred");
  assertStrictEquals(c60.red, 0xcd / 255);
  assertStrictEquals(c60.green, 0x5c / 255);
  assertStrictEquals(c60.blue, 0x5c / 255);
  assertStrictEquals(c60.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-70", () => {
  const c61 = CssColorFormat.parse("indigo");
  assertStrictEquals(c61.red, 0x4b / 255);
  assertStrictEquals(c61.green, 0x00 / 255);
  assertStrictEquals(c61.blue, 0x82 / 255);
  assertStrictEquals(c61.alpha, 255 / 255);
  const c62 = CssColorFormat.parse("ivory");
  assertStrictEquals(c62.red, 0xff / 255);
  assertStrictEquals(c62.green, 0xff / 255);
  assertStrictEquals(c62.blue, 0xf0 / 255);
  assertStrictEquals(c62.alpha, 255 / 255);
  const c63 = CssColorFormat.parse("khaki");
  assertStrictEquals(c63.red, 0xf0 / 255);
  assertStrictEquals(c63.green, 0xe6 / 255);
  assertStrictEquals(c63.blue, 0x8c / 255);
  assertStrictEquals(c63.alpha, 255 / 255);
  const c64 = CssColorFormat.parse("lavender");
  assertStrictEquals(c64.red, 0xe6 / 255);
  assertStrictEquals(c64.green, 0xe6 / 255);
  assertStrictEquals(c64.blue, 0xfa / 255);
  assertStrictEquals(c64.alpha, 255 / 255);
  const c65 = CssColorFormat.parse("lavenderblush");
  assertStrictEquals(c65.red, 0xff / 255);
  assertStrictEquals(c65.green, 0xf0 / 255);
  assertStrictEquals(c65.blue, 0xf5 / 255);
  assertStrictEquals(c65.alpha, 255 / 255);
  const c66 = CssColorFormat.parse("lawngreen");
  assertStrictEquals(c66.red, 0x7c / 255);
  assertStrictEquals(c66.green, 0xfc / 255);
  assertStrictEquals(c66.blue, 0x00 / 255);
  assertStrictEquals(c66.alpha, 255 / 255);
  const c67 = CssColorFormat.parse("lemonchiffon");
  assertStrictEquals(c67.red, 0xff / 255);
  assertStrictEquals(c67.green, 0xfa / 255);
  assertStrictEquals(c67.blue, 0xcd / 255);
  assertStrictEquals(c67.alpha, 255 / 255);
  const c68 = CssColorFormat.parse("lightblue");
  assertStrictEquals(c68.red, 0xad / 255);
  assertStrictEquals(c68.green, 0xd8 / 255);
  assertStrictEquals(c68.blue, 0xe6 / 255);
  assertStrictEquals(c68.alpha, 255 / 255);
  const c69 = CssColorFormat.parse("lightcoral");
  assertStrictEquals(c69.red, 0xf0 / 255);
  assertStrictEquals(c69.green, 0x80 / 255);
  assertStrictEquals(c69.blue, 0x80 / 255);
  assertStrictEquals(c69.alpha, 255 / 255);
  const c70 = CssColorFormat.parse("lightcyan");
  assertStrictEquals(c70.red, 0xe0 / 255);
  assertStrictEquals(c70.green, 0xff / 255);
  assertStrictEquals(c70.blue, 0xff / 255);
  assertStrictEquals(c70.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-80", () => {
  const c71 = CssColorFormat.parse("lightgoldenrodyellow");
  assertStrictEquals(c71.red, 0xfa / 255);
  assertStrictEquals(c71.green, 0xfa / 255);
  assertStrictEquals(c71.blue, 0xd2 / 255);
  assertStrictEquals(c71.alpha, 255 / 255);
  const c72 = CssColorFormat.parse("lightgray");
  assertStrictEquals(c72.red, 0xd3 / 255);
  assertStrictEquals(c72.green, 0xd3 / 255);
  assertStrictEquals(c72.blue, 0xd3 / 255);
  assertStrictEquals(c72.alpha, 255 / 255);
  const c73 = CssColorFormat.parse("lightgreen");
  assertStrictEquals(c73.red, 0x90 / 255);
  assertStrictEquals(c73.green, 0xee / 255);
  assertStrictEquals(c73.blue, 0x90 / 255);
  assertStrictEquals(c73.alpha, 255 / 255);
  const c74 = CssColorFormat.parse("lightgrey");
  assertStrictEquals(c74.red, 0xd3 / 255);
  assertStrictEquals(c74.green, 0xd3 / 255);
  assertStrictEquals(c74.blue, 0xd3 / 255);
  assertStrictEquals(c74.alpha, 255 / 255);
  const c75 = CssColorFormat.parse("lightpink");
  assertStrictEquals(c75.red, 0xff / 255);
  assertStrictEquals(c75.green, 0xb6 / 255);
  assertStrictEquals(c75.blue, 0xc1 / 255);
  assertStrictEquals(c75.alpha, 255 / 255);
  const c76 = CssColorFormat.parse("lightsalmon");
  assertStrictEquals(c76.red, 0xff / 255);
  assertStrictEquals(c76.green, 0xa0 / 255);
  assertStrictEquals(c76.blue, 0x7a / 255);
  assertStrictEquals(c76.alpha, 255 / 255);
  const c77 = CssColorFormat.parse("lightseagreen");
  assertStrictEquals(c77.red, 0x20 / 255);
  assertStrictEquals(c77.green, 0xb2 / 255);
  assertStrictEquals(c77.blue, 0xaa / 255);
  assertStrictEquals(c77.alpha, 255 / 255);
  const c78 = CssColorFormat.parse("lightskyblue");
  assertStrictEquals(c78.red, 0x87 / 255);
  assertStrictEquals(c78.green, 0xce / 255);
  assertStrictEquals(c78.blue, 0xfa / 255);
  assertStrictEquals(c78.alpha, 255 / 255);
  const c79 = CssColorFormat.parse("lightslategray");
  assertStrictEquals(c79.red, 0x77 / 255);
  assertStrictEquals(c79.green, 0x88 / 255);
  assertStrictEquals(c79.blue, 0x99 / 255);
  assertStrictEquals(c79.alpha, 255 / 255);
  const c80 = CssColorFormat.parse("lightslategrey");
  assertStrictEquals(c80.red, 0x77 / 255);
  assertStrictEquals(c80.green, 0x88 / 255);
  assertStrictEquals(c80.blue, 0x99 / 255);
  assertStrictEquals(c80.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-90", () => {
  const c81 = CssColorFormat.parse("lightsteelblue");
  assertStrictEquals(c81.red, 0xb0 / 255);
  assertStrictEquals(c81.green, 0xc4 / 255);
  assertStrictEquals(c81.blue, 0xde / 255);
  assertStrictEquals(c81.alpha, 255 / 255);
  const c82 = CssColorFormat.parse("lightyellow");
  assertStrictEquals(c82.red, 0xff / 255);
  assertStrictEquals(c82.green, 0xff / 255);
  assertStrictEquals(c82.blue, 0xe0 / 255);
  assertStrictEquals(c82.alpha, 255 / 255);
  const c83 = CssColorFormat.parse("lime");
  assertStrictEquals(c83.red, 0x00 / 255);
  assertStrictEquals(c83.green, 0xff / 255);
  assertStrictEquals(c83.blue, 0x00 / 255);
  assertStrictEquals(c83.alpha, 255 / 255);
  const c84 = CssColorFormat.parse("limegreen");
  assertStrictEquals(c84.red, 0x32 / 255);
  assertStrictEquals(c84.green, 0xcd / 255);
  assertStrictEquals(c84.blue, 0x32 / 255);
  assertStrictEquals(c84.alpha, 255 / 255);
  const c85 = CssColorFormat.parse("linen");
  assertStrictEquals(c85.red, 0xfa / 255);
  assertStrictEquals(c85.green, 0xf0 / 255);
  assertStrictEquals(c85.blue, 0xe6 / 255);
  assertStrictEquals(c85.alpha, 255 / 255);
  const c86 = CssColorFormat.parse("magenta");
  assertStrictEquals(c86.red, 0xff / 255);
  assertStrictEquals(c86.green, 0x00 / 255);
  assertStrictEquals(c86.blue, 0xff / 255);
  assertStrictEquals(c86.alpha, 255 / 255);
  const c87 = CssColorFormat.parse("maroon");
  assertStrictEquals(c87.red, 0x80 / 255);
  assertStrictEquals(c87.green, 0x00 / 255);
  assertStrictEquals(c87.blue, 0x00 / 255);
  assertStrictEquals(c87.alpha, 255 / 255);
  const c88 = CssColorFormat.parse("mediumaquamarine");
  assertStrictEquals(c88.red, 0x66 / 255);
  assertStrictEquals(c88.green, 0xcd / 255);
  assertStrictEquals(c88.blue, 0xaa / 255);
  assertStrictEquals(c88.alpha, 255 / 255);
  const c89 = CssColorFormat.parse("mediumblue");
  assertStrictEquals(c89.red, 0x00 / 255);
  assertStrictEquals(c89.green, 0x00 / 255);
  assertStrictEquals(c89.blue, 0xcd / 255);
  assertStrictEquals(c89.alpha, 255 / 255);
  const c90 = CssColorFormat.parse("mediumorchid");
  assertStrictEquals(c90.red, 0xba / 255);
  assertStrictEquals(c90.green, 0x55 / 255);
  assertStrictEquals(c90.blue, 0xd3 / 255);
  assertStrictEquals(c90.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-100", () => {
  const c91 = CssColorFormat.parse("mediumpurple");
  assertStrictEquals(c91.red, 0x93 / 255);
  assertStrictEquals(c91.green, 0x70 / 255);
  assertStrictEquals(c91.blue, 0xdb / 255);
  assertStrictEquals(c91.alpha, 255 / 255);
  const c92 = CssColorFormat.parse("mediumseagreen");
  assertStrictEquals(c92.red, 0x3c / 255);
  assertStrictEquals(c92.green, 0xb3 / 255);
  assertStrictEquals(c92.blue, 0x71 / 255);
  assertStrictEquals(c92.alpha, 255 / 255);
  const c93 = CssColorFormat.parse("mediumslateblue");
  assertStrictEquals(c93.red, 0x7b / 255);
  assertStrictEquals(c93.green, 0x68 / 255);
  assertStrictEquals(c93.blue, 0xee / 255);
  assertStrictEquals(c93.alpha, 255 / 255);
  const c94 = CssColorFormat.parse("mediumspringgreen");
  assertStrictEquals(c94.red, 0x00 / 255);
  assertStrictEquals(c94.green, 0xfa / 255);
  assertStrictEquals(c94.blue, 0x9a / 255);
  assertStrictEquals(c94.alpha, 255 / 255);
  const c95 = CssColorFormat.parse("mediumturquoise");
  assertStrictEquals(c95.red, 0x48 / 255);
  assertStrictEquals(c95.green, 0xd1 / 255);
  assertStrictEquals(c95.blue, 0xcc / 255);
  assertStrictEquals(c95.alpha, 255 / 255);
  const c96 = CssColorFormat.parse("mediumvioletred");
  assertStrictEquals(c96.red, 0xc7 / 255);
  assertStrictEquals(c96.green, 0x15 / 255);
  assertStrictEquals(c96.blue, 0x85 / 255);
  assertStrictEquals(c96.alpha, 255 / 255);
  const c97 = CssColorFormat.parse("midnightblue");
  assertStrictEquals(c97.red, 0x19 / 255);
  assertStrictEquals(c97.green, 0x19 / 255);
  assertStrictEquals(c97.blue, 0x70 / 255);
  assertStrictEquals(c97.alpha, 255 / 255);
  const c98 = CssColorFormat.parse("mintcream");
  assertStrictEquals(c98.red, 0xf5 / 255);
  assertStrictEquals(c98.green, 0xff / 255);
  assertStrictEquals(c98.blue, 0xfa / 255);
  assertStrictEquals(c98.alpha, 255 / 255);
  const c99 = CssColorFormat.parse("mistyrose");
  assertStrictEquals(c99.red, 0xff / 255);
  assertStrictEquals(c99.green, 0xe4 / 255);
  assertStrictEquals(c99.blue, 0xe1 / 255);
  assertStrictEquals(c99.alpha, 255 / 255);
  const c100 = CssColorFormat.parse("moccasin");
  assertStrictEquals(c100.red, 0xff / 255);
  assertStrictEquals(c100.green, 0xe4 / 255);
  assertStrictEquals(c100.blue, 0xb5 / 255);
  assertStrictEquals(c100.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-110", () => {
  const c101 = CssColorFormat.parse("navajowhite");
  assertStrictEquals(c101.red, 0xff / 255);
  assertStrictEquals(c101.green, 0xde / 255);
  assertStrictEquals(c101.blue, 0xad / 255);
  assertStrictEquals(c101.alpha, 255 / 255);
  const c102 = CssColorFormat.parse("navy");
  assertStrictEquals(c102.red, 0x00 / 255);
  assertStrictEquals(c102.green, 0x00 / 255);
  assertStrictEquals(c102.blue, 0x80 / 255);
  assertStrictEquals(c102.alpha, 255 / 255);
  const c103 = CssColorFormat.parse("oldlace");
  assertStrictEquals(c103.red, 0xfd / 255);
  assertStrictEquals(c103.green, 0xf5 / 255);
  assertStrictEquals(c103.blue, 0xe6 / 255);
  assertStrictEquals(c103.alpha, 255 / 255);
  const c104 = CssColorFormat.parse("olive");
  assertStrictEquals(c104.red, 0x80 / 255);
  assertStrictEquals(c104.green, 0x80 / 255);
  assertStrictEquals(c104.blue, 0x00 / 255);
  assertStrictEquals(c104.alpha, 255 / 255);
  const c105 = CssColorFormat.parse("olivedrab");
  assertStrictEquals(c105.red, 0x6b / 255);
  assertStrictEquals(c105.green, 0x8e / 255);
  assertStrictEquals(c105.blue, 0x23 / 255);
  assertStrictEquals(c105.alpha, 255 / 255);
  const c106 = CssColorFormat.parse("orange");
  assertStrictEquals(c106.red, 0xff / 255);
  assertStrictEquals(c106.green, 0xa5 / 255);
  assertStrictEquals(c106.blue, 0x00 / 255);
  assertStrictEquals(c106.alpha, 255 / 255);
  const c107 = CssColorFormat.parse("orangered");
  assertStrictEquals(c107.red, 0xff / 255);
  assertStrictEquals(c107.green, 0x45 / 255);
  assertStrictEquals(c107.blue, 0x00 / 255);
  assertStrictEquals(c107.alpha, 255 / 255);
  const c108 = CssColorFormat.parse("orchid");
  assertStrictEquals(c108.red, 0xda / 255);
  assertStrictEquals(c108.green, 0x70 / 255);
  assertStrictEquals(c108.blue, 0xd6 / 255);
  assertStrictEquals(c108.alpha, 255 / 255);
  const c109 = CssColorFormat.parse("palegoldenrod");
  assertStrictEquals(c109.red, 0xee / 255);
  assertStrictEquals(c109.green, 0xe8 / 255);
  assertStrictEquals(c109.blue, 0xaa / 255);
  assertStrictEquals(c109.alpha, 255 / 255);
  const c110 = CssColorFormat.parse("palegreen");
  assertStrictEquals(c110.red, 0x98 / 255);
  assertStrictEquals(c110.green, 0xfb / 255);
  assertStrictEquals(c110.blue, 0x98 / 255);
  assertStrictEquals(c110.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-120", () => {
  const c111 = CssColorFormat.parse("paleturquoise");
  assertStrictEquals(c111.red, 0xaf / 255);
  assertStrictEquals(c111.green, 0xee / 255);
  assertStrictEquals(c111.blue, 0xee / 255);
  assertStrictEquals(c111.alpha, 255 / 255);
  const c112 = CssColorFormat.parse("palevioletred");
  assertStrictEquals(c112.red, 0xdb / 255);
  assertStrictEquals(c112.green, 0x70 / 255);
  assertStrictEquals(c112.blue, 0x93 / 255);
  assertStrictEquals(c112.alpha, 255 / 255);
  const c113 = CssColorFormat.parse("papayawhip");
  assertStrictEquals(c113.red, 0xff / 255);
  assertStrictEquals(c113.green, 0xef / 255);
  assertStrictEquals(c113.blue, 0xd5 / 255);
  assertStrictEquals(c113.alpha, 255 / 255);
  const c114 = CssColorFormat.parse("peachpuff");
  assertStrictEquals(c114.red, 0xff / 255);
  assertStrictEquals(c114.green, 0xda / 255);
  assertStrictEquals(c114.blue, 0xb9 / 255);
  assertStrictEquals(c114.alpha, 255 / 255);
  const c115 = CssColorFormat.parse("peru");
  assertStrictEquals(c115.red, 0xcd / 255);
  assertStrictEquals(c115.green, 0x85 / 255);
  assertStrictEquals(c115.blue, 0x3f / 255);
  assertStrictEquals(c115.alpha, 255 / 255);
  const c116 = CssColorFormat.parse("pink");
  assertStrictEquals(c116.red, 0xff / 255);
  assertStrictEquals(c116.green, 0xc0 / 255);
  assertStrictEquals(c116.blue, 0xcb / 255);
  assertStrictEquals(c116.alpha, 255 / 255);
  const c117 = CssColorFormat.parse("plum");
  assertStrictEquals(c117.red, 0xdd / 255);
  assertStrictEquals(c117.green, 0xa0 / 255);
  assertStrictEquals(c117.blue, 0xdd / 255);
  assertStrictEquals(c117.alpha, 255 / 255);
  const c118 = CssColorFormat.parse("powderblue");
  assertStrictEquals(c118.red, 0xb0 / 255);
  assertStrictEquals(c118.green, 0xe0 / 255);
  assertStrictEquals(c118.blue, 0xe6 / 255);
  assertStrictEquals(c118.alpha, 255 / 255);
  const c119 = CssColorFormat.parse("purple");
  assertStrictEquals(c119.red, 0x80 / 255);
  assertStrictEquals(c119.green, 0x00 / 255);
  assertStrictEquals(c119.blue, 0x80 / 255);
  assertStrictEquals(c119.alpha, 255 / 255);
  const c120 = CssColorFormat.parse("rebeccapurple");
  assertStrictEquals(c120.red, 0x66 / 255);
  assertStrictEquals(c120.green, 0x33 / 255);
  assertStrictEquals(c120.blue, 0x99 / 255);
  assertStrictEquals(c120.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-130", () => {
  const c121 = CssColorFormat.parse("red");
  assertStrictEquals(c121.red, 0xff / 255);
  assertStrictEquals(c121.green, 0x00 / 255);
  assertStrictEquals(c121.blue, 0x00 / 255);
  assertStrictEquals(c121.alpha, 255 / 255);
  const c122 = CssColorFormat.parse("rosybrown");
  assertStrictEquals(c122.red, 0xbc / 255);
  assertStrictEquals(c122.green, 0x8f / 255);
  assertStrictEquals(c122.blue, 0x8f / 255);
  assertStrictEquals(c122.alpha, 255 / 255);
  const c123 = CssColorFormat.parse("royalblue");
  assertStrictEquals(c123.red, 0x41 / 255);
  assertStrictEquals(c123.green, 0x69 / 255);
  assertStrictEquals(c123.blue, 0xe1 / 255);
  assertStrictEquals(c123.alpha, 255 / 255);
  const c124 = CssColorFormat.parse("saddlebrown");
  assertStrictEquals(c124.red, 0x8b / 255);
  assertStrictEquals(c124.green, 0x45 / 255);
  assertStrictEquals(c124.blue, 0x13 / 255);
  assertStrictEquals(c124.alpha, 255 / 255);
  const c125 = CssColorFormat.parse("salmon");
  assertStrictEquals(c125.red, 0xfa / 255);
  assertStrictEquals(c125.green, 0x80 / 255);
  assertStrictEquals(c125.blue, 0x72 / 255);
  assertStrictEquals(c125.alpha, 255 / 255);
  const c126 = CssColorFormat.parse("sandybrown");
  assertStrictEquals(c126.red, 0xf4 / 255);
  assertStrictEquals(c126.green, 0xa4 / 255);
  assertStrictEquals(c126.blue, 0x60 / 255);
  assertStrictEquals(c126.alpha, 255 / 255);
  const c127 = CssColorFormat.parse("seagreen");
  assertStrictEquals(c127.red, 0x2e / 255);
  assertStrictEquals(c127.green, 0x8b / 255);
  assertStrictEquals(c127.blue, 0x57 / 255);
  assertStrictEquals(c127.alpha, 255 / 255);
  const c128 = CssColorFormat.parse("seashell");
  assertStrictEquals(c128.red, 0xff / 255);
  assertStrictEquals(c128.green, 0xf5 / 255);
  assertStrictEquals(c128.blue, 0xee / 255);
  assertStrictEquals(c128.alpha, 255 / 255);
  const c129 = CssColorFormat.parse("sienna");
  assertStrictEquals(c129.red, 0xa0 / 255);
  assertStrictEquals(c129.green, 0x52 / 255);
  assertStrictEquals(c129.blue, 0x2d / 255);
  assertStrictEquals(c129.alpha, 255 / 255);
  const c130 = CssColorFormat.parse("silver");
  assertStrictEquals(c130.red, 0xc0 / 255);
  assertStrictEquals(c130.green, 0xc0 / 255);
  assertStrictEquals(c130.blue, 0xc0 / 255);
  assertStrictEquals(c130.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-140", () => {
  const c131 = CssColorFormat.parse("skyblue");
  assertStrictEquals(c131.red, 0x87 / 255);
  assertStrictEquals(c131.green, 0xce / 255);
  assertStrictEquals(c131.blue, 0xeb / 255);
  assertStrictEquals(c131.alpha, 255 / 255);
  const c132 = CssColorFormat.parse("slateblue");
  assertStrictEquals(c132.red, 0x6a / 255);
  assertStrictEquals(c132.green, 0x5a / 255);
  assertStrictEquals(c132.blue, 0xcd / 255);
  assertStrictEquals(c132.alpha, 255 / 255);
  const c133 = CssColorFormat.parse("slategray");
  assertStrictEquals(c133.red, 0x70 / 255);
  assertStrictEquals(c133.green, 0x80 / 255);
  assertStrictEquals(c133.blue, 0x90 / 255);
  assertStrictEquals(c133.alpha, 255 / 255);
  const c134 = CssColorFormat.parse("slategrey");
  assertStrictEquals(c134.red, 0x70 / 255);
  assertStrictEquals(c134.green, 0x80 / 255);
  assertStrictEquals(c134.blue, 0x90 / 255);
  assertStrictEquals(c134.alpha, 255 / 255);
  const c135 = CssColorFormat.parse("snow");
  assertStrictEquals(c135.red, 0xff / 255);
  assertStrictEquals(c135.green, 0xfa / 255);
  assertStrictEquals(c135.blue, 0xfa / 255);
  assertStrictEquals(c135.alpha, 255 / 255);
  const c136 = CssColorFormat.parse("springgreen");
  assertStrictEquals(c136.red, 0x00 / 255);
  assertStrictEquals(c136.green, 0xff / 255);
  assertStrictEquals(c136.blue, 0x7f / 255);
  assertStrictEquals(c136.alpha, 255 / 255);
  const c137 = CssColorFormat.parse("steelblue");
  assertStrictEquals(c137.red, 0x46 / 255);
  assertStrictEquals(c137.green, 0x82 / 255);
  assertStrictEquals(c137.blue, 0xb4 / 255);
  assertStrictEquals(c137.alpha, 255 / 255);
  const c138 = CssColorFormat.parse("tan");
  assertStrictEquals(c138.red, 0xd2 / 255);
  assertStrictEquals(c138.green, 0xb4 / 255);
  assertStrictEquals(c138.blue, 0x8c / 255);
  assertStrictEquals(c138.alpha, 255 / 255);
  const c139 = CssColorFormat.parse("teal");
  assertStrictEquals(c139.red, 0x00 / 255);
  assertStrictEquals(c139.green, 0x80 / 255);
  assertStrictEquals(c139.blue, 0x80 / 255);
  assertStrictEquals(c139.alpha, 255 / 255);
  const c140 = CssColorFormat.parse("thistle");
  assertStrictEquals(c140.red, 0xd8 / 255);
  assertStrictEquals(c140.green, 0xbf / 255);
  assertStrictEquals(c140.blue, 0xd8 / 255);
  assertStrictEquals(c140.alpha, 255 / 255);
});

Deno.test("CssColorFormat.parse(string) - name-148", () => {
  const c141 = CssColorFormat.parse("tomato");
  assertStrictEquals(c141.red, 0xff / 255);
  assertStrictEquals(c141.green, 0x63 / 255);
  assertStrictEquals(c141.blue, 0x47 / 255);
  assertStrictEquals(c141.alpha, 255 / 255);
  const c142 = CssColorFormat.parse("turquoise");
  assertStrictEquals(c142.red, 0x40 / 255);
  assertStrictEquals(c142.green, 0xe0 / 255);
  assertStrictEquals(c142.blue, 0xd0 / 255);
  assertStrictEquals(c142.alpha, 255 / 255);
  const c143 = CssColorFormat.parse("violet");
  assertStrictEquals(c143.red, 0xee / 255);
  assertStrictEquals(c143.green, 0x82 / 255);
  assertStrictEquals(c143.blue, 0xee / 255);
  assertStrictEquals(c143.alpha, 255 / 255);
  const c144 = CssColorFormat.parse("wheat");
  assertStrictEquals(c144.red, 0xf5 / 255);
  assertStrictEquals(c144.green, 0xde / 255);
  assertStrictEquals(c144.blue, 0xb3 / 255);
  assertStrictEquals(c144.alpha, 255 / 255);
  const c145 = CssColorFormat.parse("white");
  assertStrictEquals(c145.red, 0xff / 255);
  assertStrictEquals(c145.green, 0xff / 255);
  assertStrictEquals(c145.blue, 0xff / 255);
  assertStrictEquals(c145.alpha, 255 / 255);
  const c146 = CssColorFormat.parse("whitesmoke");
  assertStrictEquals(c146.red, 0xf5 / 255);
  assertStrictEquals(c146.green, 0xf5 / 255);
  assertStrictEquals(c146.blue, 0xf5 / 255);
  assertStrictEquals(c146.alpha, 255 / 255);
  const c147 = CssColorFormat.parse("yellow");
  assertStrictEquals(c147.red, 0xff / 255);
  assertStrictEquals(c147.green, 0xff / 255);
  assertStrictEquals(c147.blue, 0x00 / 255);
  assertStrictEquals(c147.alpha, 255 / 255);
  const c148 = CssColorFormat.parse("yellowgreen");
  assertStrictEquals(c148.red, 0x9a / 255);
  assertStrictEquals(c148.green, 0xcd / 255);
  assertStrictEquals(c148.blue, 0x32 / 255);
  assertStrictEquals(c148.alpha, 255 / 255);
});
