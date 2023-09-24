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
    <Card className="min-w-[500px] max-w-[600px]">
      <CardHeader className="pb-3 text-center grid grid-rows-2">
        <CardTitle>{hackathon.name}</CardTitle>
        <CardDescription>{hackathon.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <div className="grid max-w-[240px] min-w-break-words md:mx-4">
          <div className="-mx-2 rounded-md p-2 transition-all">
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <p className="text-md text-muted-foreground">
                {`$${calculateTotalPrize(hackathon.prizes)} in prizes`}
              </p>
            </div>
          </div>
          <div className="-mx-2 rounded-md p-2 transition-all">
            <div className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              <p className="text-md text-muted-foreground">
                {hackathon.timeZone}
              </p>
            </div>
          </div>
        </div>

        <div className="grid max-w-[240px] break-words">
          <div className="-mx-2 rounded-md p-2 transition-all">
            <div className="flex items-center">
              <Map className="mr-2 h-5" />
              <p className="text-md text-muted-foreground">
                {hackathon.location}
              </p>
            </div>
          </div>

          <div className="-mx-2 rounded-md p-2 transition-all">
            <div className="flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              <p className="text-md text-muted-foreground">
                {convertDateStringToFormattedString(
                  hackathon.startDate,
                  hackathon.endDate
                )}
              </p>
            </div>
          </div>
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
