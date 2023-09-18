'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { calculateTimeForHackathon, convertDateString } from '@/helpers/utils'
import { Hackathon } from '@/lib/types'
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

export default function page({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<Hackathon | undefined | null>()
  const [progress, setProgress] = useState<any>(null)

  useEffect(() => {
    const getHackathonByHid = async () => {
      const res = await fetch(`/api/hackathons/${params.id}`)
      const data = await res.json()
      setHackathon(data)

      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setProgress(
        calculateTimeForHackathon(
          data.startDate,
          data.endDate,
          data.timeZone,
          localTimeZone
        ).progress
      )
    }
    getHackathonByHid()
  }, [setHackathon, setProgress])

  return (
    <div className="container">
      <div className="h-full px-4 py-6 lg:px-8 w-full justify-center">
        {hackathon && (
          <Tabs defaultValue="overview" className="h-full space-y-6 w-full ">
            <div className="flex items-center justify-center">
              <TabsList className="flex py-6 bg-slate-300">
                <TabsTrigger
                  value="overview"
                  className="relative text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="rules"
                  className="text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                >
                  Rules
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="text-xl px-6 rounded-lg data-[state=active]:bg-orange-300 data-[state=active]:font-bold"
                >
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="overview"
              className="border-none p-0 outline-none w-full flex flex-col justify-center "
            >
              <div className="flex items-center justify-center mt-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold tracking-tight">
                    {hackathon.name}
                  </h2>
                  <p className="text-2xl text-muted-foreground text-center">
                    {hackathon.tagline}
                  </p>
                </div>
              </div>
              <div className="text-lg flex mx-auto gap-4 w-full justify-center mt-6 items-center">
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="font-semibold">Start Date:</div>
                    {hackathon.startDate}
                  </div>
                  <div className="flex gap-4">
                    <div className="font-semibold">End Date:</div>
                    {hackathon.endDate}
                  </div>
                </div>
                <Badge
                  className={`py-2  w-fit ${
                    progress.running ? 'bg-green-600' : 'bg-sky-600'
                  }`}
                >
                  <span className="w-full text-center text-lg">
                    {progress.status}
                  </span>
                </Badge>
              </div>
              <div className="mt-10 text-xl flex flex-col py-6 mx-10 lg:mx-20">
                {parse(hackathon.description)}
              </div>
              <Separator className="my-2 border border-slate-300 mx-10 lg:mx-20" />
              <div className=" text-xl flex flex-col py-6 mx-10 lg:mx-20">
                <h1 className="uppercase tracking-wide font-bold">Location</h1>
                <h6 className="mt-3">{hackathon.location}</h6>
              </div>
              <Separator className="my-2 border border-slate-300 mx-10 lg:mx-20" />
              <div className=" text-xl flex flex-col py-6 mx-10 lg:mx-20">
                <h1 className="uppercase tracking-wide font-bold">
                  Requirements
                </h1>
                <div className="mt-3">{parse(hackathon.requirements)}</div>
              </div>
              <Separator className="my-2 border border-slate-300 mx-10 lg:mx-20" />
              <div className="text-xl flex flex-col py-6 mx-10 lg:mx-20">
                <h1 className="uppercase tracking-wide font-bold">Prizes</h1>
                <div className="mt-3 flex gap-6 w-full">
                  {Array.isArray(hackathon.prizes) &&
                    hackathon.prizes.map((prize, index) => {
                      return (
                        <div className="w-full mx-auto" key={index}>
                          <div>🏆 {prize.name}</div>
                          <div>🪙 ${prize.value}</div>
                          <div>{prize.numberOfWinningTeams} winning teams</div>
                        </div>
                      )
                    })}
                </div>
              </div>
              <Separator className="my-2 border border-slate-300 mx-10 lg:mx-20" />
              <div className="text-xl flex flex-col py-6 mx-10 lg:mx-20">
                <h1 className="uppercase tracking-wide font-bold">Judges</h1>
                <div className="mt-3">{parse(hackathon.judges)}</div>
              </div>
            </TabsContent>
            <TabsContent
              value="rules"
              className="border-none p-0 outline-none w-full flex flex-col justify-center "
            >
              <div className="mt-3 text-lg">{parse(hackathon.rules)}</div>
            </TabsContent>
            <TabsContent
              value="resources"
              className="border-none p-0 outline-none w-full flex flex-col justify-center "
            >
              <div className="mt-3 text-lg">{parse(hackathon.resources)}</div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
