import { UserAuthForm } from '@/components/user-auth-form'
import Image from 'next/image'
import React from 'react'
import NetraScaleLogo from '@/components/images/logo-white-whiteText.png'
import NetraLabsLogo from '@/components/images/BrandImage.png'

const page = () => {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt="background page"
        className="absolute inset-0 z-0 h-full w-full opacity-80 object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="absolute top-6 left-6">
        <Image
          src={NetraScaleLogo}
          className="mx-auto"
          width={150}
          height={150}
          alt="logo"
        />
      </div>
      <div className="absolute flex items-center top-8 right-6 gap-3">
        <Image
          src={NetraLabsLogo}
          className="mx-auto"
          width={60}
          height={60}
          alt="logo"
        />
        <h1 className="text-3xl font-bold">NetraLabs</h1>
      </div>
      <div className="lg:p-8">
        <div className="sm:w-[350px] absolute top-2/4 left-2/4 w-full max-w-[26rem] -translate-y-2/4 -translate-x-2/4 z-50">
          <UserAuthForm />
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
        </div>
      </div>
    </>
  )
}

export default page
