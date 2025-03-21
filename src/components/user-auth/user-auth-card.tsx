import type { ReactNode } from 'react'

import logo from '@/assets/logo.svg'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

interface AuthCardProps {
	title: string
	description?: string
	children: ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
	return (
		<Card className='w-[350px]'>
			<CardHeader>
				<img src={logo} alt='Logo' className='h-32 pb-4' />
				<CardTitle className='text-center'>{title}</CardTitle>
				{description && <CardDescription className='text-center'>{description}</CardDescription>}
			</CardHeader>
			{children}
		</Card>
	)
}
