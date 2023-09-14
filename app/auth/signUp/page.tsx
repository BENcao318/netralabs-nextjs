import { UserSignUpForm } from '@/components/user-signup-form'
import React from 'react'

const page = () => {
  return (
    <>
      <img
        src="https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxMTE4Mjc2fA&force=true&w=1920"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="lg:p-8">
        <div className="sm:w-[600px] absolute top-2/4 left-2/4 w-full max-w-[26rem] -translate-y-2/4 -translate-x-2/4 z-50">
          <UserSignUpForm />
        </div>
      </div>
    </>
  )
}

export default page
