export type Prettify<T> = {
	[K in keyof T]: Prettify<T[K]>;
} & {};

export type Brand<T extends string> = { readonly __brand: T };
