import { Helmet } from 'react-helmet-async'

import { RegisterForm } from '@/components/auth/register-form'

export function UserSignUp() {
  return (
    <>
      <Helmet title="Sign Up" />
      <RegisterForm />
    </>
  )
}
