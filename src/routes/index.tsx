import { createBrowserRouter } from 'react-router-dom'

// import { establishmentRoutes } from './establishments-routes'
import { usersRoutes } from './users-routes'
import { notFoundRoutes } from './not-found-route'

export const router = createBrowserRouter([
	// ...establishmentRoutes,
	...usersRoutes,
	...notFoundRoutes,
])
