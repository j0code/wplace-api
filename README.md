# Wplace API

Unofficial library to interact with the Wplace.live backend API

## Docs
https://jsr.io/@j0code/wplace-api@0.1.0/doc

## Install
### JSR (node.js)
```sh
npx jsr add @j0code/wplace-api
```
### JSR (Deno)
```sh
deno add jsr:@j0code/wplace-api
```
### JSR (Bun)
```sh
bunx jsr add @j0code/wplace-api
```
### NPM
```sh
npm i wplace-api
```

## Usage Example
```ts
import WplaceAPI from "@j0code/wplace-api"

const api = new WplaceAPI()

const pixel = await api.getPixel(1, 2, 3, 4) // get pixel 3;4 from tile 1;2
console.log(pixel)
/* prints:
{
	paintedBy: {
		id: ...,
		name: '...',
		allianceId: 0,
		allianceName: '',
		equippedFlag: 0
	},
	region: { id: 0, cityId: 6919, name: 'Anchorage', number: 1, countryId: 235 }
}
*/

const tile = await api.getTile(1, 2) // get tile 1;2 as a pngjs PNG instance

await api.downloadTile(1, 2, "tile.png") // downloads tile 1;2 and saves it in ./tile.png

```