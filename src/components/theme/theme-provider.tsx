import { useThemeStore } from '@/stores/use-theme-store'
import React, { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const theme = useThemeStore((state) => state.theme)

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			root.classList.add(systemTheme)
		} else {
			root.classList.add(theme)
		}
	}, [theme])

	return <>{children}</>
}
