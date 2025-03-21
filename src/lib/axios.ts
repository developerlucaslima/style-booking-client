import axios from 'axios'
import { env } from '@/env'
import { useAuthStore } from '@/stores/use-auth-store'

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
})

api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
			console.log({ token })
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response ? error.response.status : null
		if (status === 401 && !error.config.__isRetryRequest) {
			try {
				error.config.__isRetryRequest = true

				const refreshResponse = await api.patch('/token/user-refresh')
				const { token } = refreshResponse.data

				useAuthStore.setState({ token })

				error.config.headers.Authorization = `Bearer ${token}`
				return api.request(error.config)
			} catch (refreshError) {
				useAuthStore.setState({ token: null, role: null })
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	},
)
