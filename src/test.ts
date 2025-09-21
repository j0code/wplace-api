import WplaceAPI from "./main.js";

const api = new WplaceAPI()

const result = await api.getRandomPixel()

if (!result.ok) {
	throw result.error
}

const { value } = result

console.log(value)