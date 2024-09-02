import { api } from '@/lib/axios'

export interface UserAuthenticateBody {
  email: string
  password: string
}
export async function userAuthenticate({
  email,
  password,
}: UserAuthenticateBody) {
  const response = await api.post('/user-auth', { email, password })
  return response.data
}
