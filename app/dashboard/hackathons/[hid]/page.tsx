'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { calculateTimeForHackathon, convertDateString } from '@/helpers/utils'
import { Hackathon } from '@/lib/types'
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function Page({ params }: { params: { hid: string } }) {
  const [hackathon, setHackathon] = useState<Hackathon | undefined | null>()
  const [progress, setProgress] = useState<any>(null)
  const [isJoined, setIsJoined] = useState<boolean>(false)
  const [hasProject, setHasProject] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const getHackathonByHid = async () => {
      const res = await fetch(`/api/hackathons/${params.hid}`)
      const data = await res.json()
      console.log('data', data)
      setHackathon(data)
      setIsJoined(data.isJoined)
      setHasProject(data.hasProject)
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
  }, [setHackathon, setProgress, params.hid])

  useEffect(() => {
    if (session) {
    }
  }, [session])

  const handleSignIn = () => {
    router.push('/auth/signIn')
  }

  const handleJoin = async () => {
    const res = await fetch('/api/hackathons/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hackathonId: params.hid,
        userId: session?.user.id,
      }),
    })

    if (res.ok) {
      setIsJoined(true)
      toast({
        title: 'Success!',
        description: 'You joined the hackathon.',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed 😓',
        description:
          'We had some issue add you in the hackathon. Please try again.',
      })
    }
  }

  const handleCreate = () => {
    router.push(`/dashboard/projects/create?hid=${hackathon?.id}`)
  }

  const handleEdit = () => {
    router.push(`/dashboard/projects/edit?pid=${hackathon?.projectId}`)
  }

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
                    progress.isRunning ? 'bg-green-600' : 'bg-sky-600'
                  }`}
                >
                  <span className="w-full text-center text-lg">
                    {progress.status}
                  </span>
                </Badge>
              </div>

              <div className="flex w-full justify-center mt-6">
                {progress.isRunning &&
                  (!session ? (
                    <Button
                      className="w-fit text-xl py-8 bg-sky-600"
                      onClick={handleSignIn}
                    >
                      Sign in to join
                    </Button>
                  ) : isJoined ? (
                    hasProject ? (
                      <Button
                        className="w-fit text-xl py-6 bg-teal-600 hover:ring-2 hover:ring-slate-200 font-bold"
                        onClick={handleEdit}
                      >
                        Edit your project
                      </Button>
                    ) : (
                      <Button
                        className="w-fit text-xl py-6 bg-green-800 hover:ring-2 hover:ring-slate-200 font-bold"
                        onClick={handleCreate}
                      >
                        Create your project
                      </Button>
                    )
                  ) : (
                    <Button
                      className="w-fit text-xl py-6 bg-orange-500 hover:ring-2 hover:ring-slate-200 font-bold"
                      onClick={handleJoin}
                    >
                      Click to join
                    </Button>
                  ))}
              </div>

              <div className="mt-5 text-xl flex flex-col py-6 mx-10 lg:mx-20">
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
//todo fix hackathon description title color mixed into background issue
