import { Color } from "../color.ts";
import { _floatStringify, _FormatOptions, _Pattern } from "./utils.ts";

namespace _CssHsl {
  export function parse(source: string): Color {
    //TODO
    throw new Error("not implemented");
  }

  //XXX !legacy の場合に s,l を<number>にする記法は chrome が未実装なので、現バージョンでは対応しない
  export function format(
    color: Color,
    options?: _FormatOptions,
  ): string {
    const shortenIfPossible = options?.shortenIfPossible === true;

    const { h, s, l, a } = color.toHsl();
    const hS = (shortenIfPossible === true)
      ? _floatStringify(h, shortenIfPossible)
      : `${_floatStringify(h, shortenIfPossible)}deg`;
    const spS = `${_floatStringify(s * 100, shortenIfPossible)}%`;
    const lpS = `${_floatStringify(l * 100, shortenIfPossible)}%`;
    const aS = _floatStringify(a as number, shortenIfPossible);

    let result: string;
    if (options?.legacy === true) {
      if ((shortenIfPossible === true) && (a === 1)) {
        result = `hsl(${hS}, ${spS}, ${lpS})`;
      } else {
        result = `hsla(${hS}, ${spS}, ${lpS}, ${aS})`;
      }
    } else {
      if ((shortenIfPossible === true) && (a === 1)) {
        result = `hsl(${hS} ${spS} ${lpS})`;
      } else {
        result = `hsl(${hS} ${spS} ${lpS} / ${aS})`;
      }
    }
    return (options?.upperCase === true) ? result.toUpperCase() : result;
  }
}

export { _CssHsl };
