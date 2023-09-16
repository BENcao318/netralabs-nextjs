import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import getManagedHackathons from '../libs/get-managed-hackathons'
import HackathonManageCard from '@/components/hackathon-manage-card'
import CreateNewHackathonCard from '@/components/create-new-hackathon-card'

export default async function page() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/signIn')
  }

  const creatorId = session?.user.id
  const createdHackathons = await getManagedHackathons(creatorId)

  return (
    <>
      <div className="mt-36 flex flex-wrap  gap-12 items-stretch container">
        {createdHackathons.length === 0 && (
          <div>
            <h3 className="text-center text-2xl">
              You have not created any hackathons yet.
            </h3>
          </div>
        )}
        {createdHackathons.length !== 0 &&
          createdHackathons.map((hackathon: any) => (
            <HackathonManageCard key={hackathon.id} hackathon={hackathon} />
          ))}
        <div>
          <CreateNewHackathonCard />
        </div>
      </div>
    </>
  )
}
