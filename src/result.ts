/**
 * Result type representing either a success (ok) or an error (err).
 * @module
 */
export type Result<T = void, E = never> = {
	ok: true
	value: T
} | {
	ok: false
	error: E
}

/** Create a successful Result */
export function ok(): Result<void, never>
export function ok<T>(value: T): Result<T, never>
export function ok<T = void>(...[value]: [] | [unknown]): Result<T, never> {
	return {
		ok: true,
		value
	} as Result<T, never>
}

/** Create an error Result */
export function err<E = Error>(error: E): Result<never, E> {
	return {
		ok: false,
		error
	}
}