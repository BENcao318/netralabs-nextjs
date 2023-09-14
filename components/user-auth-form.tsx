'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Icons } from './ui/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { TSignInSchema, signInSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { getSession, signIn } from 'next-auth/react'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: TSignInSchema) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    })

    if (!res?.error) {
      const session = await getSession()
      if (session?.user.isAdmin) {
        router.push('/manager')
      }
      router.push('/dashboard/hackathons')
    } else {
      setError('email', {
        type: 'server',
        message: 'Invalid email or password',
      })
    }
  }

  return (
    <>
      <div className={cn('grid gap-6', className)} {...props}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl"> Sign in</CardTitle>
            <CardDescription>
              Enter email and password below to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </form>

            {/* <div className="relative">
            <div className="absolute inset-0 flex items-center ">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
            {/* <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{' '}
            Github
          </Button> */}
          </CardContent>
          <CardFooter>
            <div className=" flex justify-center">
              Don't have an account?
              <Link
                href="/auth/signUp"
                className="underline underline-offset-4 hover:text-primary"
              >
                <span className="ml-2 font-bold">Sign up</span>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
