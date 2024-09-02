import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/use-auth-store'

/**
 * Hook that redirects the user to the home page if they are already authenticated.
 *
 * This hook is used to prevent users from accessing the sign-in page if they are already authenticated.
 */
export function useAuthRoutes() {
  const navigate = useNavigate()
  const { token } = useAuthStore()

  useEffect(() => {
    // If the user is authenticated, redirect them to the home page.
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])
}
