'use client'
import { Separator } from '@/components/ui/separator'
import UserProfileForm from '@/components/user-profile-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
      router.push('/auth/signIn')
    }
  }, [session])

  return (
    <>
      <div className="space-y-6 container mt-16 pb-36">
        <div>
          <h3 className="text-3xl font-bold">Edit your profile</h3>
        </div>
        <Separator />
        {session?.user && <UserProfileForm userId={session?.user.id} />}
      </div>
    </>
  )
}
