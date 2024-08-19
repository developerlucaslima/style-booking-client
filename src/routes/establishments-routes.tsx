import { RouteObject } from 'react-router-dom'

import { Dashboard } from '@/pages/establishments/app/dashboard'
import { SignIn } from '@/pages/establishments/auth/sign-in'

export const establishmentRoutes: RouteObject[] = [
  { path: '/', element: <SignIn /> },
  { path: '/dashboard', element: <Dashboard /> },
]
