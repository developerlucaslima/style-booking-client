import { Outlet } from 'react-router-dom'

import { useAuthRoutes } from '@/hooks/use-auth-routes'

export function AuthLayout() {
  useAuthRoutes()

  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <Outlet />
    </div>
  )
}
