import { getLaunchedHackathons } from '@/app/libs/hackathons'
import { Button } from '@/components/ui/button'
import LaunchedHackathonCard from '@/components/ui/launched-hackathon-card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default async function HackathonPage() {
  const hackathons = await getLaunchedHackathons()

  return (
    <>
      <div className="mx-5 lg:mx-10 2xl:mx-30">
        <div className="flex items-center justify-between">
          <div className="space-y-1 mt-6 ">
            <h2 className="text-2xl font-semibold tracking-tight">Join Now</h2>
            <p className="text-lg text-muted-foreground">
              Explore different hackathons. Join for free.
            </p>
          </div>
        </div>
        <Separator className="my-4 mb-12" />
        <div className="grid xl:grid-cols-2 gap-6 justify-items-center">
          {hackathons.map((hackathon) => (
            <LaunchedHackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    </>
  )
}
