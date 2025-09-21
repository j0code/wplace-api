/**
 * Routes used in the API
 * @module
 */
const ROUTES = {
	/** Get tile at tileX;tileY */
	GET_TILE:         "/files/s0/tiles/%s/%s.png",
	/** Get pixel metadata on tileX;tileY at pixelX;pixelY */
	GET_PIXEL:        "/s0/pixel/%s/%s?x=%s&y=%s",
	/** Get own profile */
	GET_PROFILE:      "/me",
	/** Get own alliance */
	GET_ALLIANCE:     "/alliance",
	/** Get leaderboard */
	GET_LEADERBOARD:  "/%s/leaderboard/%s?countryID=%s",
	/**Get random pixel coordinates */
	GET_RANDOM_PIXEL: "/s0/tile/random",
} as const

export default ROUTES

/** Route names */
export type RouteName = keyof typeof ROUTES