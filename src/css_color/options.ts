namespace CssOptions {
  /*
export type _Options =
export type _ParseOptions = _Options & {
  */

  export type FormatOptions = /* _Options & */ {
    notation?: "hex" | "rgb" | "hsl"; //TODO hwb
    upperCase?: boolean;
    shortenIfPossible?: boolean;
    legacy?: boolean;
  };
}

export { type CssOptions };
