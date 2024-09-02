import { Helmet } from 'react-helmet-async'

import { AuthenticateForm } from '@/components/auth/authenticate-form'

export function UserSignIn() {
  return (
    <>
      <Helmet title="Sign In" />
      <AuthenticateForm />
    </>
  )
}
