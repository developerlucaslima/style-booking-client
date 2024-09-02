import { Outlet } from 'react-router-dom'

import { useAppRoutes } from '@/hooks/use-app-routes'

export function AppLayout() {
  useAppRoutes({ allowedRoles: ['USER'] })

  return (
    <>
      <h1>AppLayout</h1>
      <>
        <Outlet />
      </>
    </>
  )
}
