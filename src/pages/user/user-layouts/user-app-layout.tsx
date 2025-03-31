import { Header } from '@/components/header'
import { useAppRoutes } from '@/hooks/use-app-routes'
import { Outlet } from 'react-router-dom'

export function UserAppLayout() {
	useAppRoutes({ allowedRoles: ['USER'] })

	return (
		<div className='flex min-h-screen flex-col antialiased'>
			<Header />

			<div className='flex flex-1 flex-col gap-4 p-8 pt-6'>
				<Outlet />
			</div>
		</div>
	)
}
