import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/use-auth-store'

export function useAuthRoutes() {
	const navigate = useNavigate()
	const { token } = useAuthStore()

	useEffect(() => {
		if (token) {
			navigate('/', { replace: true })
		} else {
			navigate('/sign-in', { replace: true })
		}
	}, [token, navigate])
}
