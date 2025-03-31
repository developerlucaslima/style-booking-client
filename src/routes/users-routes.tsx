import type { RouteObject } from 'react-router-dom'

import { UserHome } from '@/pages/user/user-app/user-home'
import { UserSignIn } from '@/pages/user/user-auth/user-sign-in'
import { UserSignUp } from '@/pages/user/user-auth/user-sign-up'
import { UserAppLayout } from '@/pages/user/user-layouts/user-app-layout'
import { UserAuthLayout } from '@/pages/user/user-layouts/user-auth-layout'
import { Error } from '@/pages/error'

export const usersRoutes: RouteObject[] = [
	{
		path: '/',
		element: <UserAuthLayout />,
		children: [
			{ path: 'sign-in', element: <UserSignIn /> }, // Caminho relativo a '/'
			{ path: 'sign-up', element: <UserSignUp /> }, // Caminho relativo a '/'
		],
	},
	{
		path: '/',
		element: <UserAppLayout />,
		errorElement: <Error />,
		children: [{ index: true, element: <UserHome /> }],
	},
]
