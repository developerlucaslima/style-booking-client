import logo from '@/assets/logo.svg'
import { Separator } from '@radix-ui/react-select'
import { NavLink } from './nav-link'
import { navItems } from '@/config/nav-items'
import { UserAccountMenu } from './user-account-menu'
export function Header() {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center gap-6 px-6'>
				<img src={logo} alt='Logo' className='h-6 w-6' />

				<Separator aria-orientation='vertical' className='h-6' />

				<nav className='flex items-center space-x-4 lg:space-x-6'>
					{navItems.map((item, index) => (
						<NavLink key={index} to={item.path}>
							<item.icon className={item.className} />
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className='ml-auto flex items-center gap-2'>
					<UserAccountMenu />
				</div>
			</div>
		</div>
	)
}
