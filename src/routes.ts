const ROUTES = {
	GET_TILE:     "/files/s0/tiles/%s/%s.png",
	GET_PIXEL:    "/s0/pixel/%s/%s?x=%s&y=%s",
	GET_PROFILE:  "/me",
	GET_ALLIANCE: "/alliance"
} as const

export default ROUTES

export type RouteName = keyof typeof ROUTES