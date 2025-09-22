import { format } from "node:util"
import ROUTES from "./routes.js"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import { PNG } from "pngjs"
import { err, ok, type Result } from "./result.js"
import { Pixel, RandomPixel, type HeaderMap } from "./types.js"
import { type } from "arktype"

/**
 * Wplace API client
 * @module
 */
export default class WplaceAPI {

	/** Options of API instance */
	public readonly options: APIOptions

	/**
	 * Create a new WplaceAPI instance
	 * @param options options for the API client
	 */
	constructor(options?: Partial<APIOptions>) {
		this.options = compileOptions(options, DEFAULT_API_OPTIONS)
	}

	/**
	 * Download a tile and save it to a file
	 * 
	 * Ok(true) means the tile was downloaded and saved successfully.
	 * 
	 * Ok(false) means the tile was empty (404).
	 * 
	 * Err(Error) means there was an error during the process.
	 * @param tileX x-coordinate of tile
	 * @param tileY y-coordinate of tile
	 * @param path path to save the tile to
	 * @returns Ok(boolean) on success, Err(Error) on failure
	 */
	async downloadTile(tileX: number, tileY: number, path: string): Promise<Result<boolean, Error>> {
		const result = await this.getPlain(format(ROUTES.GET_TILE, tileX, tileY))
		if (!result.ok) return result

		const res = result.value

		if (!res.ok) {
			if (res.status == 404) {
				return ok(false) // tile empty
			}
			return err(new Error(`Failed to download tile. Status: ${res.status}`))
		}

		const arrayBuffer = await res.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		await saveFile(path, buffer)

		return ok(true)
	}

	/**
	 * Get a tile as a PNG object
	 * 
	 * Ok(PNG) means the tile was downloaded successfully.
	 * 
	 * Ok(undefined) means the tile was empty (404).
	 * 
	 * Err(Error) means there was an error during the process.
	 * 
	 * @param tileX x-coordinate of tile
	 * @param tileY y-coordinate of tile
	 * @returns Ok(PNG | undefined) on success, Err(Error) on failure
	 * @see {@link https://www.npmjs.com/package/pngjs}
	 */
	async getTile(tileX: number, tileY: number): Promise<Result<PNG | undefined, Error>> {
		const result = await this.getPlain(format(ROUTES.GET_TILE, tileX, tileY))
		if (!result.ok) return result

		const res = result.value

		if (!res.ok) {
			if (res.status == 404) {
				return ok(undefined) // tile empty
			}
			return err(new Error(`Failed to download tile. Status: ${res.status}`))
		}

		const arrayBuffer = await res.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const png = PNG.sync.read(buffer)

		return ok(png)
	}

	/**
	 * Get pixel metadata
	 * @param tileX x-coordinate of tile
	 * @param tileY y-coordinate of tile
	 * @param pixelX x-coordinate of pixel on tile
	 * @param pixelY y-coordinate of pixel on tile
	 * @returns Ok(Pixel) on success, Err(Error | ArkError) on failure
	 * @see {@link https://arktype.io/docs/intro/setup}
	 */
	async getPixel(tileX: number, tileY: number, pixelX: number, pixelY: number): Promise<Result<Pixel, Error | type.errors>> {
		const result = await this.get(format(ROUTES.GET_PIXEL, tileX, tileY, pixelX, pixelY))
		if (!result.ok) return result

		const { res, data } = result.value

		if (!res.ok) {
			return err(new Error(`Failed to get pixel. Status: ${res.status}`))
		}

		const parsedData = Pixel(data)

		if (parsedData instanceof type.errors) {
			return err(parsedData)
		}

		return ok(parsedData)
	}

	/**
	 * Get random pixel coordinates
	 * @returns Ok(RandomPixel) on success, Err(Error | ArkError) on failure
	 * @see {@link https://arktype.io/docs/intro/setup}
	 */
	async getRandomPixel(): Promise<Result<RandomPixel, Error | type.errors>> {
		const result = await this.get(ROUTES.GET_RANDOM_PIXEL)
		if (!result.ok) return result

		const { res, data } = result.value

		if (!res.ok) {
			return err(new Error(`Failed to get random pixel. Status: ${res.status}`))
		}

		const parsedData = RandomPixel(data)

		if (parsedData instanceof type.errors) {
			return err(parsedData)
		}

		return ok(parsedData)
	}

	/**
	 * Internal: Perform a GET request (no json parsing)
	 * @param route API route to fetch
	 * @returns Response object
	 */
	private async getPlain(route: string, headers: HeaderMap = {}): Promise<Result<Response, Error>> {
		let res: Response

		try {
			res = await fetch(`${this.options.API_ROOT}${route}`, {
				method: "GET",
				headers: {
					...headers,
					"User-Agent": this.options.userAgent
				}
			})
		} catch (e) {
			return err(e as Error)
		}

		if (!res.ok && res.status == 429) {
			const retryAfter = res.headers.get("Retry-After")
			const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : this.options.defaultRetryAfter
			//console.log(`Rate limited. Retrying after ${waitTime}ms...`)

			return sleep(waitTime).then(() => this.getPlain(route, headers))
		}

		return ok(res)
	}

	/**
	 * Internal: Perform a GET request and parse JSON
	 * @param route API route to fetch
	 * @param headers optional HTTP headers
	 * @returns Ok({ res, data }) on success, Err(Error) on failure
	 */
	private async get(route: string, headers?: HeaderMap): Promise<Result<{ res: Response, data: unknown }, Error>> {
		const result = await this.getPlain(route, headers)
		if (!result.ok) return result

		const res = result.value
		
		try {
			const data = await res.json()
			return ok({ res, data })
		} catch (e) {
			return err(new Error("Failed to parse response as JSON.", { cause: e }))
		} 
	}

}

/**
 * Options for the Wplace API client
 */
export type APIOptions = {
	/** Base URL for the API */
	API_ROOT: string
	/** User-Agent used for HTTP requests */
	userAgent: string
	/** Default time in MS to wait before retrying request after 429 response */
	defaultRetryAfter: number
}

/** Default options for the Wplace API client */
const DEFAULT_API_OPTIONS: APIOptions = {
	API_ROOT: "https://backend.wplace.live",
	userAgent: "wplace-api-client/0.1",
	defaultRetryAfter: 20000
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

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}