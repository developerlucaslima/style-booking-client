import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/stores/use-auth-store'

interface AllowedRoles {
  allowedRoles: string[]
}

/**
 * Hook that checks if the user is authenticated and has the required roles
 * to access the current route.
 *
 * This hook is used to prevent users from accessing the app if they are not authenticated.
 *
 * @param allowedRoles - Array of roles that are allowed to access the route.
 */
export function useAppRoutes({ allowedRoles }: AllowedRoles) {
  const navigate = useNavigate()
  const { token, role } = useAuthStore()

  useEffect(() => {
    // If the user is not authenticated, redirect them to the sign-in page.
    if (!token) {
      navigate('/sign-in', { replace: true })
    }
    // If the user is authenticated but doesn't have the required roles, redirect them to the access-denied page.
    else if (!allowedRoles.includes(role!)) {
      navigate('/access-denied', { replace: true })
    }
  }, [token, role, allowedRoles, navigate])
}
