import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import {
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu'
import { useThemeStore } from '@/stores/use-theme-store'

export function DropdownThemeToggle() {
	const theme = useThemeStore((state) => state.theme)
	const setTheme = useThemeStore((state) => state.setTheme)
	const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => {
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
		}

		mediaQuery.addEventListener('change', handleChange)
		setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [])

	const currentTheme = theme === 'system' ? systemTheme : theme

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<div className='flex items-center'>
					{currentTheme === 'light' ? (
						<Sun className='mr-2 h-4 w-4' />
					) : (
						<Moon className='mr-2 h-4 w-4' />
					)}
					<span>Tema</span>
				</div>
			</DropdownMenuSubTrigger>

			<DropdownMenuSubContent>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<Sun className='mr-2 h-4 w-4' />
					<span>Claro</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<Moon className='mr-2 h-4 w-4' />
					<span>Escuro</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<span>Sistema</span>
				</DropdownMenuItem>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	)
}
