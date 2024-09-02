import { Helmet } from 'react-helmet-async'

import { UserSignInForm } from '@/components/user-auth/user-sign-in-form'

export function UserSignIn() {
  return (
    <>
      <Helmet title="Sign In" />
      <UserSignInForm />
    </>
  )
}
