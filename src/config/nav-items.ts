import { Home } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

interface NavItem {
	path: string
	label: string
	icon: ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
	className?: string
}

export const navItems: NavItem[] = [
	{
		path: '/',
		label: 'Home',
		icon: Home,
		className: 'h-4 w-4',
	},
]
