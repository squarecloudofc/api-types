/* eslint-disable @typescript-eslint/ban-types */
export type Prettify<T> = {
  [K in keyof T]: Prettify<T[K]>;
} & {};
