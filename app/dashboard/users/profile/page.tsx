import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Separator } from '@/components/ui/separator'
import UserProfileForm from '@/components/user-profile-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signIn')
  }

  return (
    <>
      <div className="space-y-6 container mt-16 pb-36">
        <div>
          <h3 className="text-3xl font-bold">Edit your profile</h3>
        </div>
        <Separator />
        {session && <UserProfileForm userId={session?.user.id} />}
      </div>
    </>
  )
}
