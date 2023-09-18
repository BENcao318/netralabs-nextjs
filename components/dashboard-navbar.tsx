'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'
import { Button } from './ui/button'
import BrandImg from '@/components/images/BrandImage.png'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import UserDropdownMenu from './user-dropdown-menu'

export default function DashboardNavbar() {
  const { data: session } = useSession()

  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/signIn')
  }

  const handleSignOut = () => {
    signOut()
  }

  const goToUserProfile = () => {
    router.push('/dashboard/users/profile')
  }

  // useEffect(() => {
  //   if (session) {
  //   }
  // }, [session])

  return (
    <>
      {session ? (
        <div className="sticky top rounded-lg transition-all px-6 py-6 w-full flex items-center justify-end">
          <UserDropdownMenu
            handleSignOut={handleSignOut}
            user={session.user}
            goToUserProfile={goToUserProfile}
          />
        </div>
      ) : (
        <div className="sticky top rounded-lg transition-all px-6 py-6 w-full flex items-center justify-end">
          <Button onClick={handleSignIn}>Sign in</Button>
        </div>
      )}
    </>
  )
}
