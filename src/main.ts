import { format } from "node:util"
import ROUTES from "./routes.js"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

export default class WplaceAPI {

	public readonly options: APIOptions

	constructor(options?: Partial<APIOptions>) {
		this.options = compileOptions(options, DEFAULT_API_OPTIONS)
	}

	async downloadTile(tileX: number, tileY: number, path: string) {
		const res = await this.get(format(ROUTES.GET_TILE, tileX, tileY))

		if (!res.ok) {
			throw new Error(`Failed to download tile. Status: ${res.status}`)
		}

		const arrayBuffer = await res.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		await saveFile(path, buffer)

		console.log(`Downloaded tile at (${tileX}:${tileY}) to ${path}`)
	}

	private async get(route: string) {
		console.group(`GET ${route}`)
		const res = await fetch(`${this.options.API_ROOT}${route}`, {
			method: "GET"
		})
		console.log(`${res.status} ${res.statusText} (${res.headers.get("Content-Type")})`)
		
		//const data = await res.json()
		console.groupEnd()
		return res
	}

}

export type APIOptions = {
	API_ROOT: string
}

const DEFAULT_API_OPTIONS: APIOptions = {
	API_ROOT: "https://backend.wplace.live"
}

function compileOptions<OptionsType extends object>(options: Partial<OptionsType> | undefined, defaultOptions: OptionsType): OptionsType {
	if (!options) return defaultOptions
	
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

async function saveFile(path: string, data: Buffer) {
	try {
		await mkdir(dirname(path), { recursive: true })
		await writeFile(path, data)
	} catch (e) {
		throw new Error(`Failed to write tile to ${path}.`, { cause: e })
	}
}