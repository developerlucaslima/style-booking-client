import { Outlet } from 'react-router-dom'

import { useAuthRoutes } from '@/hooks/use-auth-routes'

export function UserAuthLayout() {
	useAuthRoutes()

	return (
		<div className='flex h-full min-h-screen items-center justify-center antialiased'>
			<Outlet />
		</div>
	)
}
