'use client'

import CreateHackathonForm from '@/components/create-hackathon-form'
import { Separator } from '@/components/ui/separator'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function page() {
  const { data: session } = useSession()

  if (!session) {
    return <div>loading or not logged in</div>
  }

  return (
    <>
      <div className="space-y-6 container mt-16 pb-36">
        <div>
          <h3 className="text-3xl font-bold">Create your hackathon</h3>
          <p className="text-md text-muted-foreground">
            Fill the form to create a new hackathon
          </p>
        </div>
        <Separator />
        <CreateHackathonForm creatorId={session.user.id} />
      </div>
    </>
  )
}
