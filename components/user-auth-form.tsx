"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Icons } from "./ui/ui-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TSignInSchema, signInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { set } from "date-fns";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: TSignInSchema) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (!res?.error) {
      const session = await getSession();
      if (session?.user.isAdmin === true) {
        router.push("/manager");
        router.refresh();
      } else {
        router.push("/dashboard/hackathons");
        router.refresh();
      }
    } else {
      setError("email", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  };

  const onGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    const res = await signIn("github", {
      redirect: false,
      callbackUrl: "/",
    });

    if (!res?.error) {
      const session = await getSession();
      if (session?.user.isAdmin === true) {
        router.push("/manager");
        router.refresh();
      } else {
        router.push("/dashboard/hackathons");
        router.refresh();
      }
    } else {
      setError("email", {
        type: "server",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
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
                  {...register("email")}
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
                  {...register("password")}
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

              {/* <Button
                onClick={async () => {
                  setValue('email', 'cby204@gmail.com')
                  setValue('password', '1234567890s!')
                  await signIn('credentials', {
                    redirect: false,
                    callbackUrl: '/',
                  })
                }}
              >
                User Sign in
              </Button>
              <Button
                onClick={async () => {
                  setValue('email', 'benc.netrascale@gmail.com')
                  setValue('password', '123456')
                  await signIn('credentials', {
                    redirect: false,
                    callbackUrl: '/',
                  })
                }}
              >
                Admin Sign in
              </Button> */}
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground bg-white px-2">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="w-full border-2 border-black"
              variant={"outline"}
              onClick={onGitHubSignIn}
              disabled={isGitHubLoading}
            >
              {isGitHubLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}
              Github
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-center">
              Don&apos;t have an account?
              <Link
                href="/auth/signUp"
                className="hover:text-primary underline underline-offset-4"
              >
                <span className="ml-2 font-bold">Sign up</span>
              </Link>
            </div>
            <p className="text-muted-foreground mt-8 px-2 text-center text-sm">
              By clicking Sign In, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
