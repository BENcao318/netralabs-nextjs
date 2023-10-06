'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { CalendarCheck, Clock, Globe, Map, Medal } from 'lucide-react'
import {
  calculateTimeForHackathon,
  calculateTotalPrize,
  convertDateStringToFormattedString,
} from '@/helpers/utils'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Hackathon } from '@/lib/types'

export default function LaunchedHackathonCard({ hackathon }: Hackathon | any) {
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const progress = calculateTimeForHackathon(
    hackathon.startDate,
    hackathon.endDate,
    hackathon.timeZone,
    localTimeZone
  ).progress
  const router = useRouter()

  return (
    <Card className="w-[500px]">
      <CardHeader className="pb-3 text-center grid grid-rows-2">
        <CardTitle>{hackathon.name}</CardTitle>
        <CardDescription>{hackathon.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2  -mt-3 break-all  grid-flow-row-dense">
        <div className="flex items-center  rounded-md p-2 transition-all">
          <Clock className="mr-2 h-5 w-5" />
          <p className="text-md text-muted-foreground">
            {`$${calculateTotalPrize(hackathon.prizes)} in prizes`}
          </p>
        </div>
        <div className="flex items-center  rounded-md p-2 transition-all">
          <Map className="mr-2 h-8 w-8" />
          <p className="text-md text-muted-foreground">{hackathon.location}</p>
        </div>
        <div className="flex items-center rounded-md p-2 transition-all">
          <Globe className="mr-2 h-5 w-5" />
          <p className="text-md text-muted-foreground">{hackathon.timeZone}</p>
        </div>
        <div className="flex items-center  rounded-md p-2 transition-all">
          <CalendarCheck className="mr-2 h-5 w-5" />
          <p className="text-md text-muted-foreground">
            {convertDateStringToFormattedString(
              hackathon.startDate,
              hackathon.endDate
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge
          className={`py-2  w-fit ml-10 ${
            progress.isRunning ? 'bg-green-600' : 'bg-sky-600'
          }`}
        >
          <span className="w-full text-center text-lg">{progress.status}</span>
        </Badge>
        {progress.isRunning && (
          <Button
            className="text-lg border-2 bg-slate-100 text-slate-950 border-slate-950 hover:text-slate-100 mr-10 font-extrabold"
            onClick={() => router.push(`/dashboard/hackathons/${hackathon.id}`)}
          >
            View hackathon
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
