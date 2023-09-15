import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import getManagedHackathons from '../libs/getManagedHackathons'
import HackathonManageCard from '@/components/hackathon-manage-card'
import CreateNewHackathonCard from '@/components/create-new-hackathon-card'
import ManagerNavbar from '@/components/manager-navbar'

const page = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/signIn')
  }

  const creatorId = session?.user.id
  const createdHackathons = await getManagedHackathons(creatorId)

  return (
    <>
      <section className="container">
        <ManagerNavbar />
        <div className="mt-36 flex flex-wrap  gap-12 items-stretch container">
          {createdHackathons.length === 0 && (
            <div>
              <h3 className="text-center text-2xl">
                You haven't created any hackathons yet.
              </h3>
            </div>
          )}
          {createdHackathons.length !== 0 &&
            createdHackathons.map((hackathon) => (
              <HackathonManageCard key={hackathon.id} hackathon={hackathon} />
            ))}
          <div>
            <CreateNewHackathonCard />
          </div>
        </div>
      </section>
    </>
  )
}

export default page
