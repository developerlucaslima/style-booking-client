// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'

import { establishmentRoutes } from './establishments-routes'
import { usersRoutes } from './users-routes'

const routes = [...establishmentRoutes, ...usersRoutes]

export const router = createBrowserRouter(routes)
