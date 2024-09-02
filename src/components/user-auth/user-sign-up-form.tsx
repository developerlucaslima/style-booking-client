import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { userRegister } from '@/api/user-register'

import { Button } from '../ui/button'
import { CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AuthCard } from './user-auth-card'

const signInSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  serviceGender: z.enum(['MALE', 'FEMALE', 'BOTH']),
})
type UserSignUpForm = z.infer<typeof signInSchema>

export function UserSignUpForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UserSignUpForm>()

  const { mutateAsync: userRegisterFn } = useMutation({
    mutationFn: userRegister,
  })

  async function handleSignUp(data: UserSignUpForm) {
    try {
      await userRegisterFn({
        name: data.name,
        email: data.email,
        password: data.password,
        serviceGender: data.serviceGender,
      })

      toast.success('Seu cadastro foi feito com sucesso!', {
        action: {
          label: 'Sign In',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <AuthCard
      title="Crie grátis sua conta no Estilo Na Web"
      description="Falta pouca para se sentir ainda mais incrível"
    >
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col gap-4"
      >
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="name" {...register('name')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="flex gap-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                />
                <Button
                  onClick={togglePasswordVisibility}
                  type="button"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOpenIcon className="h-4 w-4" />
                  ) : (
                    <EyeNoneIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Gênero</Label>
              <div className="flex gap-1">
                <Controller
                  control={control}
                  name="serviceGender"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Procura serviços para qual gênero?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gênero</SelectLabel>
                          <SelectItem value="MALE">Masculino</SelectItem>
                          <SelectItem value="FEMALE">Feminino</SelectItem>
                          <SelectItem value="BOTH">Unisex</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Já possuo conta</Button>
          <Button disabled={isSubmitting} type="submit">
            Finalizar cadastro
          </Button>
        </CardFooter>
      </form>
    </AuthCard>
  )
}
