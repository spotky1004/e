/// <reference types="react-scripts" />

import Decimal from "decimal.js";

declare global {
  type D = Decimal;
  const D: (value: number | string) => InstanceType<typeof Decimal>;
}
