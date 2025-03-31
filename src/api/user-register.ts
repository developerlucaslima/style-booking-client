import type { ServiceGender } from '@/config/enum-types'
import { api } from '@/lib/axios'

export interface UserRegisterBody {
	name: string
	email: string
	password: string
	serviceGender: ServiceGender
}

export async function userRegister({ name, email, password, serviceGender }: UserRegisterBody) {
	console.log({ name, email, password, serviceGender })

	await api.post('/user-register', { name, email, password, serviceGender })
}
