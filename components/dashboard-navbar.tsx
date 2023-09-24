'use client'
import { signOut, useSession } from 'next-auth/react'
import React, { use, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import UserDropdownMenu from './user-dropdown-menu'
import NotificationDropdownMenu from './notification-dropdown-menu'

export default function DashboardNavbar() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState([])

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

  useEffect(() => {
    const getUserNotifications = async () => {
      const res = await fetch('/api/users/notifications')
      if (res.ok) {
        const data = await res.json()
        setNotifications(data)
      }
    }
    getUserNotifications()
  }, [setNotifications])

  return (
    <>
      {session ? (
        <div className="sticky top rounded-lg transition-all px-6 py-6 w-full flex items-center justify-end container">
          <UserDropdownMenu
            handleSignOut={handleSignOut}
            user={session.user}
            goToUserProfile={goToUserProfile}
          />
          <NotificationDropdownMenu notifications={notifications} />
        </div>
      ) : (
        <div className="sticky top rounded-lg transition-all px-6 py-6 w-full flex items-center justify-end container">
          <Button onClick={handleSignIn}>Sign in</Button>
        </div>
      )}
    </>
  )
}
