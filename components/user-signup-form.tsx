'use client'

import React from 'react'
import { TSignUpSchema, signUpSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Link from 'next/link'
import { Icons } from './ui/ui-icons'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type UserSignUpFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: TSignUpSchema) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const responseData = await res.json()
    if (!res.ok) {
      alert('Submitting form failed!')
      return
    }

    if (responseData.errors) {
      const errors = responseData.errors

      if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email,
        })
      } else if (errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password,
        })
      } else if (errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword,
        })
      } else {
        alert('Something went wrong!')
      }
      return
    }

    if (res.ok) {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      })

      if (!res?.error) {
        router.push('/dashboard/hackathons/')
        router.refresh()
      } else {
        router.push('/')
        router.refresh()
      }
    }
  }

  return (
    <>
      <div className={cn('grid gap-6', className)} {...props}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl"> Sign up</CardTitle>
            <CardDescription>
              To join conferences or participate in new hackathons, please fill
              out the registration form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register('name')}
                  placeholder="your name"
                  type="name"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500">{`${errors.name.message}`}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register('password')}
                  placeholder="**********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-red-500">{`${errors.password.message}`}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm password</Label>
                <Input
                  {...register('confirmPassword')}
                  placeholder="**********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                )}
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className=" flex justify-center">
              Already have an account?
              <Link
                href="/auth/signIn"
                className="underline underline-offset-4 hover:text-primary"
              >
                <span className="ml-2 font-bold">Sign in</span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
