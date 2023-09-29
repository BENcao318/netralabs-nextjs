import { UserSignUpForm } from '@/components/user-signup-form'
import Image from 'next/image'
import React from 'react'
import NetraScaleLogo from '@/components/images/logo-white-whiteText.png'
import NetraLabsLogo from '@/components/images/BrandImage.png'

const page = () => {
  return (
    <>
      <img
        src="https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxMTE4Mjc2fA&force=true&w=1920"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        alt="background page"
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
        <div className="sm:w-[600px] absolute top-2/4 left-2/4 w-full max-w-[26rem] -translate-y-2/4 -translate-x-2/4 z-50">
          <UserSignUpForm />
        </div>
      </div>
    </>
  )
}

export default page
