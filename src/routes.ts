const ROUTES = {
	GET_TILE: "/files/s0/tiles/%s/%s.png"
} as const

export default ROUTES

export type RouteName = keyof typeof ROUTES