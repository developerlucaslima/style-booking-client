import { RouteObject } from 'react-router-dom'

import { Dashboard } from '@/pages/users/app/dashboard'
import { SignIn } from '@/pages/users/auth/sign-in'
import { AppLayout } from '@/pages/users/layouts/app'

export const usersRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <SignIn /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
]
