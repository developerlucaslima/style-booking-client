import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { userAuthenticate } from '@/api/user-authenticate'
import { useAuthStore } from '@/stores/use-auth-store'

import { Button } from '../ui/button'
import { CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthCard } from './user-auth-card'

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})
type UserSignInForm = z.infer<typeof signInSchema>

export function UserSignInForm() {
	const [searchParams] = useSearchParams()
	const [showPassword, setShowPassword] = useState(false)
	const setToken = useAuthStore((state) => state.setToken)
	const navigate = useNavigate()
	function togglePasswordVisibility() {
		setShowPassword(!showPassword)
	}

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<UserSignInForm>({
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: userAuthenticate,
	})

	async function handleSignIn(data: UserSignInForm) {
		try {
			const { token } = await authenticate({
				email: data.email,
				password: data.password,
			})
			setToken(token)
		} catch (_error) {
			toast.error('Credenciais inválidas.')
		}
	}

	return (
		<AuthCard
			title='Bem-vindo ao Estilo Na Web'
			description='Falta pouca para se sentir ainda mais incrível'
		>
			<form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col gap-4'>
				<CardContent>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='email'>E-mail</Label>
							<Input id='email' type='email' {...register('email')} />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='password'>Senha</Label>
							<div className='flex gap-1'>
								<Input
									id='password'
									type={showPassword ? 'text' : 'password'}
									{...register('password')}
								/>
								<Button
									onClick={togglePasswordVisibility}
									type='button'
									size='icon'
									variant='ghost'
								>
									{showPassword ? (
										<EyeOpenIcon className='h-4 w-4' />
									) : (
										<EyeNoneIcon className='h-4 w-4' />
									)}
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button disabled={isSubmitting} type='submit'>
						Entrar
					</Button>
					<Button variant='outline' onClick={() => navigate('/sign-up')}>
						Criar conta
					</Button>
				</CardFooter>
			</form>
		</AuthCard>
	)
}
