import axios from 'axios'

import { env } from '@/env'
import { useAuthStore } from '@/stores/use-auth-store'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()

    // Verifica se o erro é 401 e se não está tentando renovar o token
    if (error.response.status === 401 && !error.config.__isRetryRequest) {
      try {
        // Define que a requisição de refresh token não deve causar um loop de requisições
        error.config.__isRetryRequest = true

        const refreshResponse = await axios.patch('/token/user-refresh')
        const { token } = refreshResponse.data
        authStore.setToken(token)

        // Atualiza o header Authorization e refaz a requisição original
        error.config.headers.Authorization = `Bearer ${token}`
        return api.request(error.config)
      } catch (refreshError) {
        authStore.clearAuth()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
