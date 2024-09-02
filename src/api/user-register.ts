import { api } from '@/lib/axios'

export type ServiceGender = 'MALE' | 'FEMALE' | 'BOTH'
export interface UserRegisterBody {
  name: string
  email: string
  password: string
  serviceGender: ServiceGender
}

export async function userRegister({
  name,
  email,
  password,
  serviceGender,
}: UserRegisterBody) {
  console.log({ name, email, password, serviceGender })

  await api.post('/user-register', { name, email, password, serviceGender })
}
