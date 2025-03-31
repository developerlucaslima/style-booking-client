import type { Role, ServiceGender } from '@/config/enum-types'
import { api } from '@/lib/axios'

export interface GetUserProfileResponse {
	id: string
	name: string
	serviceGender: ServiceGender
	email: string
	createdAt: Date | null
	role: Role
}

export async function getUserProfile() {
	const response = await api.get<{ user: GetUserProfileResponse }>('/me')
	return response.data.user
}
