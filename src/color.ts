namespace Color {
  const _RgbSpace = {
    A98_RGB: "a98-rgb",
    DISPLAY_P3: "display-p3",
    PROPHOTO_RGB: "prophoto-rgb",
    REC2020: "rec2020",
    SRGB: "srgb",
    SRGB_LINEAR: "srgb-linear",
  } as const;

  const _XyzSpace = {
    XYZ: "xyz",
    XYZ_D50: "xyz-d50",
    XYZ_D65: "xyz-d65",
  } as const;

  export const Space = {
    ..._RgbSpace,
    ..._XyzSpace,
    //XXX 他のspace
  } as const;

  /**
   * The color space
   */
  export type Space = typeof Space[keyof typeof Space];

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
}

export { Color };
