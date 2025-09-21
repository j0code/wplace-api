export default class WplaceAPI {

	public readonly options: APIOptions

	constructor(options: Partial<APIOptions>) {
		this.options = compileOptions(options, DEFAULT_API_OPTIONS)
	}

}

export type APIOptions = {
	API_ROOT: string
}

const DEFAULT_API_OPTIONS: APIOptions = {
	API_ROOT: "https://backend.wplace.live"
}

function compileOptions<OptionsType extends object>(options: Partial<OptionsType>, defaultOptions: OptionsType): OptionsType {
	const fullOptions: OptionsType = structuredClone(defaultOptions)
	const optionKeys = Object.keys(defaultOptions) as (keyof OptionsType)[]

	for (let k of optionKeys) {
		const value = fullOptions[k]
		if (k in options && typeof options[k] != "undefined" && options[k] != null) {
			fullOptions[k] = options[k]
		}
	}

	return fullOptions
}