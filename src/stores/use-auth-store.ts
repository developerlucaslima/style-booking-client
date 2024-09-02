import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

interface AuthState {
  token: string | null
  role: string | null
  setToken: (token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('token')
    ? jwtDecode<{ role: string }>(localStorage.getItem('token')!).role
    : null,
  setToken: (token) => {
    localStorage.setItem('token', token)

    const decodedToken = jwtDecode<{ role: string }>(token)
    const role = decodedToken.role

    set({ token, role })
  },
  clearAuth: () => {
    localStorage.removeItem('token')
    set({ token: null, role: null })
  },
}))
