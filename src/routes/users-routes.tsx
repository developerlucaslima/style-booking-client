import { RouteObject } from 'react-router-dom'

import { Dashboard } from '@/pages/users/app/dashboard'
import { UserSignIn } from '@/pages/users/auth/user-sign-in'
import { UserSignUp } from '@/pages/users/auth/user-sign-up'
import { AppLayout } from '@/pages/users/layouts/app'
import { AuthLayout } from '@/pages/users/layouts/auth'

export const usersRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <UserSignIn /> },
      { path: '/sign-in', element: <UserSignIn /> },
      { path: '/sign-up', element: <UserSignUp /> },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      // { path: '/', element: <SignIn /> },
    ],
  },
]
