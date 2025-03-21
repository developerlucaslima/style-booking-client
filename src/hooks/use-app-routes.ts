import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/use-auth-store'

interface AllowedRoles {
	allowedRoles: string[]
}

export function useAppRoutes({ allowedRoles }: AllowedRoles) {
	const navigate = useNavigate()
	const { token, role } = useAuthStore()

	useEffect(() => {
		if (!token) {
			navigate('/sign-in', { replace: true })
		}
		if (role && !allowedRoles.includes(role)) {
			navigate('/access-denied', { replace: true })
		}
	}, [token, role, allowedRoles, navigate])
}
