import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
	token: string | null
	role: string | null
	setToken: (token: string) => void
	clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => {
	const storedToken = localStorage.getItem('token')
	let initialRole: string | null = null

	if (storedToken) {
		try {
			const decodedToken = jwtDecode<{ role: string }>(storedToken)
			initialRole = decodedToken.role
		} catch (error) {
			console.error('Failed to decode token', error)
			initialRole = null
		}
	}

	return {
		token: storedToken,
		role: initialRole,
		setToken: (token) => {
			localStorage.setItem('token', token)

			try {
				const decodedToken = jwtDecode<{ role: string }>(token)
				const role = decodedToken.role

				set({ token, role })
			} catch (error) {
				console.error('Failed to decode token', error)
				set({ token: null, role: null })
			}
		},
		clearAuth: () => {
			localStorage.removeItem('token')
			set({ token: null, role: null })
		},
	}
})
