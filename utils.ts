/**
 * Flattens an intersection type into a single object type, so editors show
 * its fields instead of the intersection.
 */
export type Prettify<T> = {
	[K in keyof T]: Prettify<T[K]>;
} & {};

/**
 * Marks a string type with a compile-time tag, so ids of different resources
 * cannot be mixed up. The tag has no runtime cost.
 */
export type Brand<T extends string> = { readonly __brand: T };
