import { type } from "arktype"

/**
 * Types for Wplace API
 * @module
 */
/** */

export const Pixel = type({
	paintedBy: {
		id: "number",
		name: "string",
		"allianceId?": "number",
		"allianceName?": "string",
		"equippedFlag?": "number",
		"discord?": "string"
	},
	region: {
		id: "number",
		cityId: "number",
		name: "string",
		number: "number",
		countryId: "number"
	}
})

/**
 * Pixel metadata as returned by the API
 * 
 * Endpoints:
 * - GET /s0/pixel/{TX}/{TY}?x={PX}&y={PY}
 */
export type Pixel = typeof Pixel.infer

export const Profile = type({
	"allianceId?": "number",
	"allianceRole?": "string", // change to enum later ("member")
	banned: "boolean",
	charges: {
		cooldownMs: "number",
		count: "number",
		max: "number"
	},
	country: "string", // change to enum later (2-letter country codes)
	droplets: "number",
	"equippedFlag?": "number",
	"experiments?": type.Record("string", {
		"variant?": "string"
	}),
	extraColorsBitmap: "number",
	favoriteLocations: [{
		id: "number",
		name: "string",
		latitude: "number",
		longitude: "number"
	}],
	flagsBitmap: "string",
	id: "number",
	isCustomer: "boolean",
	level: "number",
	maxFavoriteLocations: "number",
	name: "string",
	needsPhoneVerification: "boolean",
	picture: "string",
	pixelsPainted: "number",
	showLastPixel: "boolean",
	timeoutUntil: "string.date.iso" // ISO 8601 date string
})

/**
 * Profile data
 * 
 * Endpoints:
 * - GET /me
 */
export type Profile = typeof Profile.infer

export const RandomPixel = type({
	pixel: {
		x: "number",
		y: "number",
	},
	tile: {
		x: "number",
		y: "number",
	}
})

/**
 * Random pixel coordinates
 * 
 * Endpoints:
 * - GET /s0/tile/random
 */
export type RandomPixel = typeof RandomPixel.infer

export type HeaderMap = Record<string, string>