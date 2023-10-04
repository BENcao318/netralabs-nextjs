'use client'
import LaunchedHackathonCard from '@/components/launched-hackathon-card'
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [hackathons, setHackathons] = useState<any>([])

  useEffect(() => {
    const getLaunchedHackathon = async () => {
      try {
        const res = await fetch('/api/hackathons')
        if (res.ok) {
          const data = await res.json()
          setHackathons(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getLaunchedHackathon()
  }, [setHackathons])

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="space-y-1 mt-6 ">
            <h2 className="text-2xl font-semibold tracking-tight">Join Now</h2>
            <p className="text-lg text-muted-foreground">
              Explore different hackathons. Join for free.
            </p>
          </div>
        </div>
        <Separator className="my-4 mb-12" />
        <div className="grid 2xl:grid-cols-2 gap-6 justify-items-center">
          {hackathons &&
            hackathons.map((hackathon: any) => (
              <LaunchedHackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
        </div>
      </div>
    </>
  )
}
