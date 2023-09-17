'use client'
import { getHackathonByHackathonId } from '@/app/libs/hackathons'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Hackathon } from '@/lib/types'
import { Separator } from '@radix-ui/react-separator'
import { PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function page({ params }: { params: { id: string } }) {
  const [hackathon, setHackathon] = useState<Hackathon | undefined | null>()

  useEffect(() => {
    const getHackathonByHid = async () => {
      const res = await fetch(`/api/hackathons/${params.id}`)
      const data = await res.json()
      setHackathon(data)
    }
    getHackathonByHid()
  }, [setHackathon])

  return (
    <div className=" w-full">
      <div className="h-full px-4 py-6 lg:px-8 w-full justify-center">
        <Tabs defaultValue="overview" className="h-full space-y-6 w-full ">
          <div className="flex items-center justify-center">
            <TabsList className="flex ">
              <TabsTrigger value="overview" className="relative">
                Overview
              </TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="overview"
            className="border-none p-0 outline-none w-full flex justify-center"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Listen Now
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top picks for you. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4 bg-white" />

            <div className="mt-6 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Made for You
              </h2>
              <p className="text-sm text-muted-foreground">
                Your personal playlists. Updated daily.
              </p>
            </div>
            <Separator className="my-4" />
          </TabsContent>
          <TabsContent
            value="rules"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
          </TabsContent>
          <TabsContent
            value="resources"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
