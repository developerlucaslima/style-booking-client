import { RouteObject } from 'react-router-dom'

import { UserHome } from '@/pages/user/user-app/user-home'
import { UserSignIn } from '@/pages/user/user-auth/user-sign-in'
import { UserSignUp } from '@/pages/user/user-auth/user-sign-up'
import { UserAppLayout } from '@/pages/user/user-layouts/user-app-layout'
import { UserAuthLayout } from '@/pages/user/user-layouts/user-auth-layout'

export const usersRoutes: RouteObject[] = [
  {
    path: '/',
    element: <UserAuthLayout />,
    children: [
      { path: '/sign-in', element: <UserSignIn /> },
      { path: '/sign-up', element: <UserSignUp /> },
    ],
  },
  {
    path: '/',
    element: <UserAppLayout />,
    children: [
      { path: '/', element: <UserHome /> },
      // { path: '/', element: <SignIn /> },
    ],
  },
]
