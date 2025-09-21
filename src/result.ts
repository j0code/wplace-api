export type Result<T, E> = {
	ok: true
	value: T
} | {
	ok: false
	error: E
}

export function ok(): Result<void, never>
export function ok<T>(value: T): Result<T, never>
export function ok<T = void>(...[value]: [] | [unknown]): Result<T, never> {
	return {
		ok: true,
		value
	} as Result<T, never>
}

export function err<E = Error>(error: E): Result<never, E> {
	return {
		ok: false,
		error
	}
}