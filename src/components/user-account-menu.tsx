import { useQuery } from '@tanstack/react-query'
import { ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { useAuthStore } from '@/stores/use-auth-store'
import { getUserProfile } from '@/api/get-user-profile'
import { DropdownThemeToggle } from './theme/dropdown-theme-toggle'

export function UserAccountMenu() {
	const navigate = useNavigate()
	const clearAuth = useAuthStore((state) => state.clearAuth)

	const { data: userProfile, isLoading: isLoadingUserProfile } = useQuery({
		queryKey: ['user-profile'],
		queryFn: getUserProfile,
		staleTime: Infinity,
	})

	console.log({ userProfile })

	const handleSignOut = () => {
		clearAuth()
		navigate('/sign-in', { replace: true })
	}

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' className='flex select-none items-center gap-2'>
						{isLoadingUserProfile ? <Skeleton className='h-4 w-40' /> : userProfile?.name}
						<ChevronDown className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end' className='w-56'>
					<DropdownMenuLabel className='flex flex-col'>
						{isLoadingUserProfile ? (
							<div className='space-y-1.5'>
								<Skeleton className='h-4 w-32' />
								<Skeleton className='h-3 w-24' />
							</div>
						) : (
							<>
								<span>{userProfile?.name}</span>
								<span className='font-normal text-muted-foreground text-xs'>
									{userProfile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownThemeToggle />

					<DropdownMenuItem asChild className='text-rose-500 dark:text-rose-400'>
						<button className='flex w-full items-center' onClick={handleSignOut}>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Dialog>
	)
}
