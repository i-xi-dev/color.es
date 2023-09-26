namespace Convert {
  /**
   * The object with the following optional fields.
   *
   * - `ignoreAlpha`:
   *     Whether to interpret `a` (alpha) as `1` or not.
   *     If `order` is `"argb"`, ignore `ignoreAlpha`.
   */
  export type FromOptions = {
    /**
     * Whether to interpret `a` (alpha) as `1` or not.
     *
     * If `order` is `"argb"`, ignore `ignoreAlpha`.
     */
    ignoreAlpha?: boolean;
  };

  /**
   * The object with the following optional fields.
   *
   * - `discardAlpha`:
   *     Whether to discard `a` (alpha).
   *     The default is `false`.
   * - `omitAlphaIfOpaque`:
   *     Whether to omit `a` (alpha) if alpha equals `1`.
   *     The default is `false`.
   */
  export type ToOptions = {
    /**
     * Whether to discard `a` (alpha).
     * The default is `false`.
     */
    discardAlpha?: boolean;

    /**
     * Whether to omit `a` (alpha) if alpha equals `1`.
     * The default is `false`.
     */
    omitAlphaIfOpaque?: boolean;
  };

  type RgbOptions = {
    mode?: "compat" | "bytes" | "precision";
  };

  export type FromRgbOptions = RgbOptions & FromOptions;

  export type ToRgbOptions = RgbOptions & ToOptions;

  type RgbOrderOptions = {
    order?: "argb" | "rgba"; //RgbBytes.Order;
  };

  export type FromArrayOptions = RgbOrderOptions & FromOptions;

  export type ToArrayOptions = RgbOrderOptions & ToOptions;

  type ToStringOptons = {
    lowerCase?: boolean;
  };

  export type FromHexStringOptions = RgbOrderOptions & FromOptions;

  export type ToHexStringOptions =
    & RgbOrderOptions
    & ToStringOptons
    & ToOptions;
}

export { type Convert };
