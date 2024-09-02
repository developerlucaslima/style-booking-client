import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from './components/ui/sonner'
import { queryClient } from './lib/react-query'
import { router } from './routes/router'

export function App() {
  return (
    <HelmetProvider>
      <Toaster />
      <Helmet titleTemplate="%s | estilo.na.web" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
