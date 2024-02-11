export type Prettify<T> = {
    [K in keyof T]: Prettify<T[K]>;
} & {};
//# sourceMappingURL=utils.d.ts.map