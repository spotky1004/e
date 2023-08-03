import Decimal from "decimal.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/** @ts-ignore */
window.D = (value: number | string) => new Decimal(value);
