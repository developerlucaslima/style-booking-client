import { NotFound } from '@/pages/404'
import type { RouteObject } from 'react-router-dom'

export const notFoundRoutes: RouteObject[] = [
	{
		path: '*',
		element: <NotFound />,
	},
]
