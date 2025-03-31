import { Helmet } from 'react-helmet-async'

import { UserSignUpForm } from '@/components/user-auth/user-sign-up-form'

export function UserSignUp() {
	return (
		<>
			<Helmet title='Sign Up' />
			<UserSignUpForm />
		</>
	)
}
